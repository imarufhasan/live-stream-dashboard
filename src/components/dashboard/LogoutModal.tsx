interface LogoutModalProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export default function LogoutModal({
  open,
  onClose,
  onConfirm,
}: LogoutModalProps) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-999 flex items-center justify-center bg-black/70">
      <div className="w-100 rounded-2xl bg-[#181818] border border-[#2d2d2d] p-6">
        <h2 className="text-xl font-semibold text-white">Logout</h2>

        <p className="mt-3 text-sm text-gray-400">
          Are you sure you want to logout?
        </p>

        <div className="mt-8 flex justify-end gap-3">
          <button
            onClick={onClose}
            className="rounded-lg border border-[#333] px-5 py-2 text-white hover:bg-[#242424]"
          >
            Cancel
          </button>

          <button
            onClick={onConfirm}
            className="rounded-lg bg-red-600 px-5 py-2 text-white hover:bg-red-700"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}
