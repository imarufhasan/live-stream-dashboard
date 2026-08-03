import { Routes, Navigate, Route } from "react-router-dom";
import SignIn from "./components/auth/SignIn";
import "./App.css";

function App() {
  return (
    <Routes>
      {/* First page the app opens to */}
      <Route path="/" element={<Navigate to="/signin" replace />} />
      <Route path="/signin" element={<SignIn />} />
    </Routes>
  );
}

export default App;
