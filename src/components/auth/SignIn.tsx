import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Mail, Eye, EyeOff, ArrowRight } from "lucide-react";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = () => {
    console.log({ email, password });
    navigate("/dashboard");
  };

  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-[#0d0d0f] px-4 py-8 overflow-y-auto"
      style={{ fontFamily: "'Raleway', system-ui, sans-serif" }}
    >
      <div className="w-full max-w-md rounded-3xl bg-[#141416] border border-white/5 shadow-2xl p-6 sm:p-10">
        {/* Header */}
        <h1 className="text-center text-5xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight">
          Welcome Back !
        </h1>
        <p
          className="text-center text-xs sm:text-sm text-gray-400 mt-3 mb-6 sm:mb-8 px-2"
          style={{ fontFamily: "'Inter', system-ui, sans-serif" }}
        >
          Please enter your email and password to continue
        </p>

        <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
          {/* Email */}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-semibold text-white mb-2"
            >
              Email
            </label>
            <div className="relative">
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                className="w-full rounded-full bg-transparent border border-white/15 text-white placeholder-gray-500
                           px-4 sm:px-5 py-3 sm:py-3.5 pr-12 text-sm sm:text-base outline-none focus:border-white/40 transition-colors"
              />
              <Mail
                size={18}
                className="absolute right-4 sm:right-5 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none"
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-semibold text-white mb-2"
            >
              Password
            </label>
            <div className="relative">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                className="w-full rounded-full bg-transparent border border-white/15 text-white placeholder-gray-500
                           px-4 sm:px-5 py-3 sm:py-3.5 pr-12 text-sm sm:text-base outline-none focus:border-white/40 transition-colors"
              />
              <button
                type="button"
                onClick={() => setShowPassword((v) => !v)}
                className="absolute right-4 sm:right-5 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300 transition-colors"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          {/* Forgot password */}
          <div className="text-right">
            <Link
              to="/forgot-password"
              className="text-xs sm:text-sm font-medium text-red-500 hover:text-red-400 transition-colors"
            >
              Forgot Password?
            </Link>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full flex items-center justify-center gap-2 rounded-full
                       bg-linear-to-b from-[#7a1f1f] to-[#5c1717] text-white font-semibold
                       py-3 sm:py-3.5 mt-2 text-sm sm:text-base shadow-lg shadow-red-950/40
                       hover:from-[#8a2424] hover:to-[#6b1c1c] transition-colors"
          >
            Log In
            <ArrowRight size={18} />
          </button>
        </form>
      </div>
    </div>
  );
}
