// src/components/dashboard/Header.tsx

import { useState } from "react";
import { ChevronDown, Menu } from "lucide-react";

import ProfileModal from "./ProfileModal";
import LogoutModal from "./LogoutModal";
import ProfileCard from "./ProfileCard";
import EditProfileModal from "./EditProfileModal";
import ChangePasswordModal from "./ChangePasswordModal";

import { dummyProfile } from "../../data/profile";
import type { AdminProfile } from "../../data/profile";

interface HeaderProps {
  onLogout: () => void;
  onMenuClick: () => void;
}

export default function Header({ onLogout, onMenuClick }: HeaderProps) {
  const [profile, setProfile] = useState<AdminProfile>(dummyProfile);

  const [profileOpen, setProfileOpen] = useState(false);
  const [profileCardOpen, setProfileCardOpen] = useState(false);
  const [editProfileOpen, setEditProfileOpen] = useState(false);
  const [changePasswordOpen, setChangePasswordOpen] = useState(false);
  const [logoutOpen, setLogoutOpen] = useState(false);

  const handleAvatarChange = (file: File) => {
    const url = URL.createObjectURL(file);

    setProfile((prev) => ({
      ...prev,
      avatar: url,
    }));
  };

  return (
    <>
      <header className="relative flex h-15 items-center justify-between gap-3 border-b border-[#252525] bg-[#151515] px-4 sm:px-8">
        {/* Mobile menu button */}
        <button
          onClick={onMenuClick}
          className="rounded-lg p-1.5 text-[#999] hover:bg-[#1e1e1e] hover:text-white lg:hidden"
          title="Open menu"
        >
          <Menu size={22} />
        </button>

        {/* Profile button */}
        <button
          onClick={() => {
            setProfileCardOpen(false);
            setProfileOpen((prev) => !prev);
          }}
          className="ml-auto flex items-center gap-3"
        >
          <span className="hidden sm:inline">{profile.firstName}</span>

          <img
            src={profile.avatar}
            className="h-10 w-10 rounded-full object-cover"
            alt={profile.firstName}
          />

          <ChevronDown size={18} />
        </button>

        {/* Profile dropdown */}
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

        {/* Profile details */}
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

      {/* Edit profile modal */}
      <EditProfileModal
        open={editProfileOpen}
        profile={profile}
        onClose={() => setEditProfileOpen(false)}
        onSave={(data) => {
          setProfile((prev) => ({
            ...prev,
            ...data,
          }));
        }}
      />

      {/* Change password modal */}
      <ChangePasswordModal
        open={changePasswordOpen}
        onClose={() => setChangePasswordOpen(false)}
        onSave={() => {
          // API call here
        }}
      />

      {/* Logout modal */}
      <LogoutModal
        open={logoutOpen}
        onClose={() => setLogoutOpen(false)}
        onConfirm={onLogout}
      />
    </>
  );
}
