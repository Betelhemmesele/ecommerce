import SignupPage from "./pages/SignupPage";
import LoginPage from "./pages/LoginPage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ConfirmationPage from "./pages/ConfirmationPage";
import Home from "./pages/Home";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import VerfiyEmail from "./pages/VerfiyEmail";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/confirmation" element={<ConfirmationPage />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset_password/:id/:token" element={<ResetPassword />} />
        <Route path="/verfiy" element = {<VerfiyEmail/>}/>
      </Routes>
    </Router>
  );
}

export default App;
