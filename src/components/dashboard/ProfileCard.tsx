import { Camera, Mail, Pencil, ChevronRight } from "lucide-react";
import { useRef } from "react";
import type { AdminProfile } from "../../data/profile";

type Props = {
  profile: AdminProfile;
  onAvatarChange: (file: File) => void;
  onEditProfile: () => void;
  onChangePassword: () => void;
};

export default function ProfileCard({
  profile,
  onAvatarChange,
  onEditProfile,
  onChangePassword,
}: Props) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handlePick = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) onAvatarChange(file);
    e.target.value = "";
  };

  return (
    <div className="absolute right-8 top-16 z-50 w-72 rounded-2xl border border-[#333] bg-[#1b1b1b] p-5 shadow-xl">
      {/* Avatar */}
      <div className="relative w-fit">
        <img
          src={profile.avatar}
          alt={`${profile.firstName} ${profile.lastName}`}
          className="h-16 w-16 rounded-full border-2 border-[#333] object-cover"
        />
        <button
          onClick={() => fileInputRef.current?.click()}
          className="absolute -bottom-1 -right-1 flex h-6 w-6 items-center justify-center rounded-full bg-red-900 text-white ring-2 ring-[#1b1b1b] hover:bg-red-800"
          title="Change photo"
        >
          <Camera size={12} />
        </button>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handlePick}
        />
      </div>

      {/* Name */}
      <div className="mt-3 flex items-center gap-2">
        <p className="font-semibold">
          {profile.firstName} {profile.lastName}
        </p>
        <button
          onClick={onEditProfile}
          className="text-gray-400 hover:text-white"
          title="Edit profile"
        >
          <Pencil size={13} />
        </button>
      </div>

      {/* Email */}
      <div className="mt-1 flex items-center gap-2 text-sm text-gray-400">
        <Mail size={13} />
        <span>{profile.email}</span>
      </div>

      {/* Change password */}
      <button
        onClick={onChangePassword}
        className="mt-4 flex w-full items-center justify-between border-t border-[#2a2a2a] pt-4 text-sm text-gray-300 hover:text-white"
      >
        <span>Change Password</span>
        <ChevronRight size={16} className="text-gray-500" />
      </button>
    </div>
  );
}