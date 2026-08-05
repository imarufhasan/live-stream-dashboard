import { useState } from "react";
import type { AdminProfile } from "../../data/profile";

type Props = {
  open: boolean;
  profile: AdminProfile;
  onClose: () => void;
  onSave: (data: {
    firstName: string;
    lastName: string;
    email: string;
  }) => void;
};

export default function EditProfileModal({
  open,
  profile,
  onClose,
  onSave,
}: Props) {
  const [firstName, setFirstName] = useState(profile.firstName);
  const [lastName, setLastName] = useState(profile.lastName);
  const [email, setEmail] = useState(profile.email);
  const [saving, setSaving] = useState(false);

  if (!open) return null;

  const handleSave = () => {
    setSaving(true);
    setTimeout(() => {
      onSave({ firstName, lastName, email });
      setSaving(false);
      onClose();
    }, 500);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-5"
      onClick={onClose}
    >
      <div
        className="w-full max-w-sm rounded-2xl border border-[#3a3a3a] bg-[#2b2b2b] p-6 text-white"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-center text-lg font-bold">Edit Profile</h2>

        <div className="mt-5 grid grid-cols-2 gap-3">
          <div>
            <p className="mb-2 text-sm font-medium text-gray-200">First name</p>
            <input
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              placeholder="First name"
              className="w-full rounded-lg border border-[#555] bg-[#3a3a3a] px-3 py-2.5 text-sm text-white placeholder-gray-500 outline-none focus:border-red-700"
            />
          </div>
          <div>
            <p className="mb-2 text-sm font-medium text-gray-200">Last name</p>
            <input
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              placeholder="Last name"
              className="w-full rounded-lg border border-[#555] bg-[#3a3a3a] px-3 py-2.5 text-sm text-white placeholder-gray-500 outline-none focus:border-red-700"
            />
          </div>
        </div>

        <div className="mt-4">
          <p className="mb-2 text-sm font-medium text-gray-200">Email</p>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            type="email"
            className="w-full rounded-lg border border-[#555] bg-[#3a3a3a] px-3 py-2.5 text-sm text-white placeholder-gray-500 outline-none focus:border-red-700"
          />
        </div>

        <div className="mt-6 flex justify-center">
          <button
            onClick={handleSave}
            disabled={saving || !firstName || !lastName || !email}
            className="rounded-full bg-red-900 px-8 py-2.5 text-sm font-semibold transition hover:bg-red-800 disabled:opacity-50"
          >
            {saving ? "Saving…" : "Save Changes"}
          </button>
        </div>
      </div>
    </div>
  );
}
