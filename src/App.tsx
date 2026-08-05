import { Routes, Navigate, Route } from "react-router-dom";
import SignIn from "./components/auth/SignIn";
import ForgotPassword from "./components/auth/Forgotpassword";
import VerifyEmail from "./components/auth/Verifyemail";
import ResetPassword from "./components/auth/Resetpassword";
import AppRoutes from "./routes/AppRoutes";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/signin" replace />} />
      <Route path="/signin" element={<SignIn />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/verify-email" element={<VerifyEmail />} />
      <Route path="/reset-password" element={<ResetPassword />} />

      <Route path="/*" element={<AppRoutes />} />
    </Routes>
  );
}

export default App;
