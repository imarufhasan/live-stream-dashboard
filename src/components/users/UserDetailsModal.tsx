import type { User } from "../../data/users";
import { Mail, Phone, UserRound, ShieldCheck } from "lucide-react";

type Props = {
  open: boolean;
  user: User | null;
  onClose: () => void;
};

export default function UserDetailsModal({ open, user, onClose }: Props) {
  if (!open || !user) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <div
        className="
        w-105
        rounded-xl
        border
        border-[#333]
        bg-[#181818]
        p-6
        shadow-xl
        "
      >
        {/* Header */}
        <div className="flex flex-col items-center">
          <img
            src={user.avatar}
            alt={user.name}
            className="
            h-24
            w-24
            rounded-full
            border
            border-[#444]
            object-cover
            "
          />

          <h2 className="mt-4 text-2xl font-semibold text-white">
            {user.name}
          </h2>

          <p className="text-sm text-gray-400">User ID #{user.id}</p>

          <span
            className={`
            mt-3
            rounded-full
            px-4
            py-1
            text-xs
            ${
              user.isBlocked
                ? "bg-red-600/20 text-red-400"
                : "bg-green-600/20 text-green-400"
            }
            `}
          >
            {user.isBlocked ? "Blocked" : "Active"}
          </span>
        </div>

        {/* User Info */}

        <div className="mt-8 space-y-4">
          <div
            className="
            flex
            items-center
            gap-3
            rounded-lg
            bg-[#222]
            p-3
            "
          >
            <UserRound size={20} className="text-gray-400" />

            <div>
              <p className="text-xs text-gray-500">Full Name</p>

              <p className="text-sm text-white">{user.name}</p>
            </div>
          </div>

          <div
            className="
            flex
            items-center
            gap-3
            rounded-lg
            bg-[#222]
            p-3
            "
          >
            <Mail size={20} className="text-gray-400" />

            <div>
              <p className="text-xs text-gray-500">Email</p>

              <p className="text-sm text-white">{user.email}</p>
            </div>
          </div>

          <div
            className="
            flex
            items-center
            gap-3
            rounded-lg
            bg-[#222]
            p-3
            "
          >
            <Phone size={20} className="text-gray-400" />

            <div>
              <p className="text-xs text-gray-500">Phone</p>

              <p className="text-sm text-white">{user.phone}</p>
            </div>
          </div>

          <div
            className="
            flex
            items-center
            gap-3
            rounded-lg
            bg-[#222]
            p-3
            "
          >
            <ShieldCheck size={20} className="text-gray-400" />

            <div>
              <p className="text-xs text-gray-500">Account Status</p>

              <p className="text-sm text-white">
                {user.isBlocked ? "Account blocked" : "Account active"}
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}

        <div className="mt-8 flex justify-end">
          <button
            onClick={onClose}
            className="
            rounded-lg
            bg-red-600
            px-6
            py-2
            text-white
            transition
            hover:bg-red-700
            "
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
