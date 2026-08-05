import { X } from "lucide-react";
import { useState } from "react";

type Props = {
  open: boolean;
  onClose: () => void;
  onSave: (data: { name: string; email: string; password: string }) => void;
};

export default function AddAdminModal({ open, onClose, onSave }: Props) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  if (!open) return null;

  const handleSubmit = () => {
    onSave({ name, email, password });
    setName("");
    setEmail("");
    setPassword("");
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-5"
      onClick={onClose}
    >
      <div
        className="w-full max-w-md rounded-2xl border border-[#3a3a3a] bg-[#2b2b2b] p-6 text-white"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold">Add New Admin</h2>
          <button
            onClick={onClose}
            className="flex h-9 w-9 items-center justify-center rounded-full bg-[#3a3a3a] text-gray-300 hover:bg-[#454545] hover:text-white"
          >
            <X size={18} />
          </button>
        </div>

        <Field label="Name">
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Name"
            className="w-full rounded-full border border-[#555] bg-transparent px-4 py-3 text-sm text-white placeholder-gray-500 outline-none focus:border-red-700"
          />
        </Field>

        <Field label="Email">
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            type="email"
            className="w-full rounded-full border border-[#555] bg-transparent px-4 py-3 text-sm text-white placeholder-gray-500 outline-none focus:border-red-700"
          />
        </Field>

        <Field label="Password">
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            type="password"
            className="w-full rounded-full border border-[#555] bg-transparent px-4 py-3 text-sm text-white placeholder-gray-500 outline-none focus:border-red-700"
          />
        </Field>

        <button
          onClick={handleSubmit}
          disabled={!name || !email || !password}
          className="mt-8 w-full rounded-full bg-red-900 py-3.5 font-bold transition hover:bg-red-800 disabled:cursor-not-allowed disabled:opacity-40"
        >
          Make Admin
        </button>
      </div>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="mt-5">
      <p className="mb-2 text-sm font-medium text-gray-200">{label}</p>
      {children}
    </div>
  );
}