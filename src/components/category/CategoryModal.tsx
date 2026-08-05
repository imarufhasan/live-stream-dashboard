import { X, Camera } from "lucide-react";
import { useState } from "react";
import type { Category } from "../../data/category";

type Props = {
  open: boolean;
  mode: "add" | "edit";
  initialData?: Category | null;
  onClose: () => void;
  onSave: (data: {
    name: string;
    imageFile: File | null;
    existingImage?: string;
  }) => void;
};

export default function CategoryModal({
  open,
  mode,
  initialData,
  onClose,
  onSave,
}: Props) {
  const [name, setName] = useState(initialData?.name ?? "");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(
    initialData?.image ?? null,
  );

  if (!open) return null;

  const handleImagePick = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] ?? null;
    setImageFile(file);
    if (file) setImagePreview(URL.createObjectURL(file));
  };

  const handleSubmit = () => {
    onSave({ name, imageFile, existingImage: initialData?.image });
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
          <h2 className="text-xl font-bold">
            {mode === "add" ? "Add New Category" : "Edit Category"}
          </h2>
          <button
            onClick={onClose}
            className="flex h-9 w-9 items-center justify-center rounded-full bg-[#3a3a3a] text-gray-300 hover:bg-[#454545] hover:text-white"
          >
            <X size={18} />
          </button>
        </div>

        <div className="mt-5">
          <p className="mb-2 text-sm font-medium text-gray-200">Name</p>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Name"
            className="w-full rounded-full border border-[#555] bg-transparent px-4 py-3 text-sm text-white placeholder-gray-500 outline-none focus:border-red-700"
          />
        </div>

        <div className="mt-5">
          <p className="mb-2 text-sm font-medium text-gray-200">Image</p>
          <label className="flex h-32 w-full cursor-pointer flex-col items-center justify-center rounded-xl border border-dashed border-[#666] text-gray-500 hover:border-gray-400 hover:text-gray-300">
            {imagePreview ? (
              <img
                src={imagePreview}
                alt="Category preview"
                className="h-full w-full rounded-xl object-cover"
              />
            ) : (
              <Camera size={26} />
            )}
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleImagePick}
            />
          </label>
        </div>

        <button
          onClick={handleSubmit}
          disabled={!name}
          className="mt-8 w-full rounded-full bg-red-900 py-3.5 font-bold transition hover:bg-red-800 disabled:cursor-not-allowed disabled:opacity-40"
        >
          {mode === "add" ? "Add Category" : "Save Changes"}
        </button>
      </div>
    </div>
  );
}
