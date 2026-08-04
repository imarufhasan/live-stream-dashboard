import { useState } from "react";
import { ChevronDown } from "lucide-react";

import ProfileModal from "./ProfileModal";
import LogoutModal from "./LogoutModal";

interface HeaderProps {
  onLogout: () => void;
}

export default function Header({ onLogout }: HeaderProps) {
  const [profileOpen, setProfileOpen] = useState(false);
  const [logoutOpen, setLogoutOpen] = useState(false);

  return (
    <>
      <header className="relative flex h-15 items-center justify-end border-b border-[#252525] bg-[#151515] px-8">
        <button
          onClick={() => setProfileOpen((prev) => !prev)}
          className="flex items-center gap-3"
        >
          <span>Jack</span>

          <img
            src="https://i.pravatar.cc/40"
            className="h-10 w-10 rounded-full"
            alt=""
          />

          <ChevronDown size={18} />
        </button>

        {profileOpen && (
          <ProfileModal
            onLogout={() => {
              setProfileOpen(false);
              setLogoutOpen(true);
            }}
          />
        )}
      </header>

      <LogoutModal
        open={logoutOpen}
        onClose={() => setLogoutOpen(false)}
        onConfirm={onLogout}
      />
    </>
  );
}
