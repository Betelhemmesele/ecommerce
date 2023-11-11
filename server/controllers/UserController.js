const DataTypes = require("sequelize");
const { sequelize } = require("../models/index");
const User = require("../models/User")(sequelize, DataTypes);
const {
  sendConfirmationEmail,
  sendWelcomeEmail,
  sendRestPasswordLink,
} = require("../service/Emailservice");
const { generateConfirmationCode } = require("../service/Code");
const bcrypt = require("bcryptjs");
const generateToken = require("../middelware/generateToken");
const jwt = require("jsonwebtoken");

exports.getAllUsers = async () => {
  try {
    const users = await User.User.findAll();
    console.log(users);
  } catch (error) {
    console.error("Error retrieving users:", error);
  }
};

exports.registerUser = async (req, res, next) => {
  const { email } = req.body;
  // Check if the user already exists
  const existingUser = await User.User.findOne({ where: { email } });
  if (existingUser) {
    return res.status(409).json({ error: "User already exists" });
  }
  try {
    const confirmationCode = generateConfirmationCode();
    const user = await User.User.create(req.body);
    user.confirmationCode = confirmationCode;
    await user.save();
    // Send confirmation email
    await sendConfirmationEmail(
      user.email,
      confirmationCode,
      user.firstName,
      user.lastName
    );
    const token = await generateToken({ id: user._id });
    if (!token) return next({ status: 500 });
    res.cookie("jwt", token, {
      httpOnly: true,
      secure: false,
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
    res.status(201).json({
      success: true,
      user,
      message: "Please confirm/verify your email.",
    });
  } catch (error) {
    console.log(error);
  }
};
exports.confirmEmail = async (req, res, next) => {
  const { confirmationCode } = req.body;
  try {
    const user = await User.User.findOne({ where: { confirmationCode } });
    if (!user) {
      return next(new Error("Invalid confirmation code/User not found"));
    }
    user.isConfirmed = true;
    user.confirmationCode = "Confirmed";
    await user.save();

    await sendWelcomeEmail(user.email, user.firstName, user.lastName);

    res
      .status(200)
      .json({ success: true, message: "Your account has been confirmed" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};
exports.loginUser = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    // Find the user based on the email
    const user = await User.User.findOne({ where: { email } });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Check if the password is correct
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: "Invalid password" });
    }

    const token = await generateToken({
      id: user.id,
    });

    res.cookie("jwt", token, {
      httpOnly: true,
      secure: false,
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.json({ token });
    console.log("Logged in");
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};
exports.logoutUser = async (req, res, next) => {
  res.clearCookie("rememberMe");
  res.status(200).json({ success: true, message: "Logged out successfully" });
};
exports.forgotPassword = async (req, res, next) => {
  const { email } = req.body;
  const user = await User.User.findOne({ where: { email } });
  if (!user) {
    return res
      .status(400)
      .json({ error: "User with this email does not exist" });
  } else {
    try {
      const token = await generateToken({ id: user.id });
      if (!token) return next({ status: 500 });
      res.cookie("jwt", token, {
        httpOnly: true,
        secure: false,
        maxAge: 7 * 24 * 60 * 60 * 1000,
      });
      await sendRestPasswordLink(email, user.id, token);
      res.status(200).json("verfiy with the link");
    } catch (err) {
      console.log(err);
    }
  }
};

exports.resetPassword = async (req, res, next) => {
  const { id, token } = req.params;
  const { password } = req.body;

  hashedpassword = await bcrypt.hash(password, 10);
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, async (err, decoded) => {
    if (err) {
      return res.json({ Status: "Error with token" });
    } else {
      try {
        const result = await User.User.update(
          { password: hashedpassword },
          { where: { id: id } }
        );
        if (result[0] === 0) {
          console.log("User not found");
          return;
        }
        console.log("Password has been reset successfully");
      } catch (error) {
        console.error("Error resetting password:", error);
      }
    }
  });
};
