interface ProfileModalProps {
  onOpenProfile: () => void;
  onLogout: () => void;
}

export default function ProfileModal({
  onOpenProfile,
  onLogout,
}: ProfileModalProps) {
  return (
    <div
      className="
        absolute
        right-8
        top-16
        w-55
        bg-[#1b1b1b]
        border
        border-[#333]
        rounded-xl
        p-4
        shadow-xl
        z-50
      "
    >
      <p className="font-semibold">Jack</p>

      <p className="text-sm text-gray-400">Admin</p>

      <hr className="my-3 border-[#333]" />

      <button
        onClick={onOpenProfile}
        className="
          w-full
          text-left
          py-2
          hover:text-red-500
        "
      >
        Profile
      </button>

      <button
        onClick={onLogout}
        className="
          w-full
          text-left
          py-2
          hover:text-red-500
        "
      >
        Logout
      </button>
    </div>
  );
}
