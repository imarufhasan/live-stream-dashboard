import { useState } from "react";
import { ChevronDown } from "lucide-react";

import ProfileModal from "./ProfileModal";
import LogoutModal from "./LogoutModal";
import ProfileCard from "./ProfileCard";
import EditProfileModal from "./EditProfileModal";
import ChangePasswordModal from "./ChangePasswordModal";
import { dummyProfile } from "../../data/profile";
import type { AdminProfile } from "../../data/profile";

interface HeaderProps {
  onLogout: () => void;
}

export default function Header({ onLogout }: HeaderProps) {
  const [profile, setProfile] = useState<AdminProfile>(dummyProfile);

  const [profileOpen, setProfileOpen] = useState(false);
  const [profileCardOpen, setProfileCardOpen] = useState(false);
  const [editProfileOpen, setEditProfileOpen] = useState(false);
  const [changePasswordOpen, setChangePasswordOpen] = useState(false);
  const [logoutOpen, setLogoutOpen] = useState(false);

  const handleAvatarChange = (file: File) => {
    const url = URL.createObjectURL(file);
    setProfile((prev) => ({ ...prev, avatar: url }));
  };

  return (
    <>
      <header className="relative flex h-15 items-center justify-end border-b border-[#252525] bg-[#151515] px-8">
        <button
          onClick={() => {
            setProfileCardOpen(false);
            setProfileOpen((prev) => !prev);
          }}
          className="flex items-center gap-3"
        >
          <span>{profile.firstName}</span>

          <img
            src={profile.avatar}
            className="h-10 w-10 rounded-full object-cover"
            alt={profile.firstName}
          />

          <ChevronDown size={18} />
        </button>

        {profileOpen && (
          <ProfileModal
            onOpenProfile={() => {
              setProfileOpen(false);
              setProfileCardOpen(true);
            }}
            onLogout={() => {
              setProfileOpen(false);
              setLogoutOpen(true);
            }}
          />
        )}

        {profileCardOpen && (
          <ProfileCard
            profile={profile}
            onAvatarChange={handleAvatarChange}
            onEditProfile={() => {
              setProfileCardOpen(false);
              setEditProfileOpen(true);
            }}
            onChangePassword={() => {
              setProfileCardOpen(false);
              setChangePasswordOpen(true);
            }}
          />
        )}
      </header>

      <EditProfileModal
        open={editProfileOpen}
        profile={profile}
        onClose={() => setEditProfileOpen(false)}
        onSave={(data) => setProfile((prev) => ({ ...prev, ...data }))}
      />

      <ChangePasswordModal
        open={changePasswordOpen}
        onClose={() => setChangePasswordOpen(false)}
        onSave={() => {
          // In a real app, call your API to update the password here.
        }}
      />

      <LogoutModal
        open={logoutOpen}
        onClose={() => setLogoutOpen(false)}
        onConfirm={onLogout}
      />
    </>
  );
}
