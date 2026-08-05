import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

type Props = {
  open: boolean;
  onClose: () => void;
  onSave: (newPassword: string) => void;
};

export default function ChangePasswordModal({ open, onClose, onSave }: Props) {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  if (!open) return null;

  const reset = () => {
    setNewPassword("");
    setConfirmPassword("");
    setShowNew(false);
    setShowConfirm(false);
    setError(null);
    setSaving(false);
  };

  const handleClose = () => {
    reset();
    onClose();
  };

  const handleSave = () => {
    if (newPassword.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }
    if (newPassword !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    setError(null);
    setSaving(true);
    setTimeout(() => {
      onSave(newPassword);
      reset();
      onClose();
    }, 500);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-5"
      onClick={handleClose}
    >
      <div
        className="w-full max-w-sm rounded-2xl border border-[#3a3a3a] bg-[#2b2b2b] p-6 text-white"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-center text-lg font-bold">Change Password</h2>

        <div className="mt-5">
          <p className="mb-2 text-sm font-medium text-gray-200">New Password</p>
          <div className="relative">
            <input
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              type={showNew ? "text" : "password"}
              placeholder="Password"
              className="w-full rounded-full border border-[#555] bg-transparent px-4 py-3 pr-11 text-sm text-white placeholder-gray-500 outline-none focus:border-red-700"
            />
            <button
              onClick={() => setShowNew((v) => !v)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
              title={showNew ? "Hide password" : "Show password"}
            >
              {showNew ? <Eye size={16} /> : <EyeOff size={16} />}
            </button>
          </div>
        </div>

        <div className="mt-4">
          <p className="mb-2 text-sm font-medium text-gray-200">Confirm Password</p>
          <div className="relative">
            <input
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              type={showConfirm ? "text" : "password"}
              placeholder="Password"
              className="w-full rounded-full border border-[#555] bg-transparent px-4 py-3 pr-11 text-sm text-white placeholder-gray-500 outline-none focus:border-red-700"
            />
            <button
              onClick={() => setShowConfirm((v) => !v)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
              title={showConfirm ? "Hide password" : "Show password"}
            >
              {showConfirm ? <Eye size={16} /> : <EyeOff size={16} />}
            </button>
          </div>
        </div>

        {error && <p className="mt-3 text-center text-xs text-red-500">{error}</p>}

        <div className="mt-6 flex justify-center">
          <button
            onClick={handleSave}
            disabled={saving || !newPassword || !confirmPassword}
            className="rounded-full bg-red-900 px-8 py-2.5 text-sm font-semibold transition hover:bg-red-800 disabled:opacity-50"
          >
            {saving ? "Saving…" : "Save Changes"}
          </button>
        </div>
      </div>
    </div>
  );
}