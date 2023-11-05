const nodemailer = require("nodemailer");

var transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "bmekonnenad@gmail.com",
    pass: "wpuidlxrqvextory",
  },
});

exports.sendConfirmationEmail = async (
  email,
  confirmationCode,
  firstName,
  lastName
) => {
  const mailOptions = {
    from: "CodeAvengers",
    to: email,
    subject: "Account Confirmation",
    // text: `Please click the following link to confirm your account: ${process.env.CLIENT_URL}/confirm-email/${confirmationCode}`,
    text: `Hey ${firstName} ${lastName},<br><br>A sign in attempt requires further verification because we did not recognize your device. To complete the sign in, enter the verification code on the unrecognized device.
      <br><br><br>&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;Verification code:<br>&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;<span style="font-size: 32px;"><b>${confirmationCode}</b></span>.<br><br>Thanks,<br>codeAvengers`,
    html: `Hey ${firstName} ${lastName},<br><br>A sign in attempt requires further verification because we did not recognize your device. To complete the sign in, enter the verification code on the unrecognized device.
      <br><br>&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;Verification code:<br>&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;<span style="font-size: 32px;"><b>${confirmationCode}</b></span>.<br><br>Thanks,<br>codeAvengers.`,
  };

  await transporter.sendMail(mailOptions);
};

exports.sendWelcomeEmail = async (email, firstName, lastName) => {
  const mailOptions = {
    from: "Code Avengers",
    to: email,
    subject: "Welcome to codeAvengers",
    text: `Welcome ${firstName} ${lastName},<br><br>You’ve just opened an account and are set to begin a user.<br><br>Thanks,<br>codeAvengers`,
    html: `Welcome to our website ${firstName} ${lastName},<br><br>You have just opened an account and are set to begin to signin to your account.
      <br><br>Thanks,<br>codeAvengers.</p>`,
  };

  await transporter.sendMail(mailOptions);
};
exports.sendRestPasswordLink = async (email,id,token) => {
  var mailOptions = {
    from: 'Code Avengers',
    to:email,
    subject: 'Reset Password Link',
    text: `http://localhost:3000/reset_password/${id}/${token}`
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      return res.send({ Status: "Success" });
    }
  });
};
