import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Mail, X } from "lucide-react";
import { toast } from "sonner";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleClose = () => navigate(-1);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: hook up your "send reset code" API call here
    toast.success("Verification code sent to your email");
    navigate("/verify-email");
  };

  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black/70 px-4 py-8 overflow-y-auto"
      style={{ fontFamily: "'Raleway', system-ui, sans-serif" }}
    >
      <div className="relative w-full max-w-md rounded-3xl bg-[#141416] border border-white/5 shadow-2xl p-6 sm:p-10">
        {/* Close */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full
                     bg-white/10 text-white hover:bg-white/20 transition-colors"
          aria-label="Close"
        >
          <X size={16} />
        </button>

        {/* Header */}
        <h1 className="text-center text-3xl sm:text-4xl font-bold text-white tracking-tight">
          Forgot Password
        </h1>
        <p
          className="text-center text-xs sm:text-sm text-gray-400 mt-3 mb-6 sm:mb-8 px-2"
          style={{ fontFamily: "'Inter', system-ui, sans-serif" }}
        >
          Please enter your Email to reset your passwords.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
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
                required
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

          <button
            type="submit"
            className="w-full flex items-center justify-center gap-2 rounded-full
                       bg-linear-to-b from-[#7a1f1f] to-[#5c1717] text-white font-semibold
                       py-3 sm:py-3.5 mt-2 text-sm sm:text-base shadow-lg shadow-red-950/40
                       hover:from-[#8a2424] hover:to-[#6b1c1c] transition-colors"
          >
            Verify Mail
          </button>
        </form>
      </div>
    </div>
  );
}
