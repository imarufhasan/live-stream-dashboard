import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { X } from "lucide-react";
import { toast } from "sonner";

const OTP_LENGTH = 6;

export default function VerifyEmail() {
  const [otp, setOtp] = useState<string[]>(Array(OTP_LENGTH).fill(""));
  const inputsRef = useRef<(HTMLInputElement | null)[]>([]);
  const navigate = useNavigate();

  const handleClose = () => navigate(-1);

  const handleChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return; // digits only
    const next = [...otp];
    next[index] = value.slice(-1);
    setOtp(next);

    if (value && index < OTP_LENGTH - 1) {
      inputsRef.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>,
  ) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputsRef.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    const pasted = e.clipboardData
      .getData("text")
      .replace(/\D/g, "")
      .slice(0, OTP_LENGTH);
    if (!pasted) return;
    e.preventDefault();
    const next = Array(OTP_LENGTH).fill("");
    pasted.split("").forEach((char, i) => (next[i] = char));
    setOtp(next);
    inputsRef.current[Math.min(pasted.length, OTP_LENGTH - 1)]?.focus();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const code = otp.join("");
    if (code.length < OTP_LENGTH) {
      toast.error("Please enter the full 6-digit code");
      return;
    }
    // TODO: hook up your "verify OTP" API call here
    toast.success("Email verified successfully");
    navigate("/reset-password");
  };

  const handleResend = () => {
    // TODO: hook up your "resend OTP" API call here
    toast.success("A new code has been sent to your email");
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
          Verify Email
        </h1>
        <p
          className="text-center text-xs sm:text-sm text-gray-400 mt-3 mb-6 sm:mb-8 px-2"
          style={{ fontFamily: "'Inter', system-ui, sans-serif" }}
        >
          Please check your email and enter the code
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="flex justify-center gap-2 sm:gap-3">
            {otp.map((digit, i) => (
              <input
                key={i}
                ref={(el) => {
                  inputsRef.current[i] = el;
                }}
                type="text"
                inputMode="numeric"
                maxLength={1}
                value={digit}
                onChange={(e) => handleChange(i, e.target.value)}
                onKeyDown={(e) => handleKeyDown(i, e)}
                onPaste={handlePaste}
                className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/5 border border-white/15
                           text-white text-center text-lg font-semibold outline-none
                           focus:border-white/40 transition-colors"
              />
            ))}
          </div>

          <button
            type="submit"
            className="w-full flex items-center justify-center gap-2 rounded-full
                       bg-linear-to-b from-[#7a1f1f] to-[#5c1717] text-white font-semibold
                       py-3 sm:py-3.5 text-sm sm:text-base shadow-lg shadow-red-950/40
                       hover:from-[#8a2424] hover:to-[#6b1c1c] transition-colors"
          >
            Verify OTP
          </button>

          <p
            className="text-center text-xs sm:text-sm text-gray-400"
            style={{ fontFamily: "'Inter', system-ui, sans-serif" }}
          >
            Don't get the code?{" "}
            <button
              type="button"
              onClick={handleResend}
              className="text-red-500 hover:text-red-400 font-medium transition-colors"
            >
              Resend Otp.
            </button>
          </p>
        </form>
      </div>
    </div>
  );
}
