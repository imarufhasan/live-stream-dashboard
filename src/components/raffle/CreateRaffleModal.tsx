import { X, Camera, ChevronDown } from "lucide-react";
import { useState } from "react";
import { prizeCategories } from "../../data/raffle";

type Props = {
  open: boolean;
  onClose: () => void;
  onCreate?: (data: {
    name: string;
    category: string;
    description: string;
    maxTickets: number;
    drawDate: string;
    drawTime: string;
    imageFile: File | null;
  }) => void;
};

export default function CreateRaffleModal({ open, onClose, onCreate }: Props) {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [maxTickets, setMaxTickets] = useState("1000");
  const [drawDate, setDrawDate] = useState("");
  const [drawTime, setDrawTime] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  if (!open) return null;

  const handleImagePick = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] ?? null;
    setImageFile(file);
    setImagePreview(file ? URL.createObjectURL(file) : null);
  };

  const handleLaunch = () => {
    onCreate?.({
      name,
      category,
      description,
      maxTickets: Number(maxTickets) || 0,
      drawDate,
      drawTime,
      imageFile,
    });
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-5"
      onClick={onClose}
    >
      <div
        className="max-h-[92vh] w-full max-w-md overflow-y-auto rounded-2xl border border-[#3a3a3a] bg-[#2b2b2b] p-6 text-white"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold">Create Weekly Raffle</h2>
          <button
            onClick={onClose}
            className="flex h-9 w-9 items-center justify-center rounded-full bg-[#3a3a3a] text-gray-300 hover:bg-[#454545] hover:text-white"
          >
            <X size={18} />
          </button>
        </div>

        {/* Prize Name */}
        <Field label="Prize Name">
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Name"
            className="w-full rounded-full border border-[#555] bg-transparent px-4 py-3 text-sm text-white placeholder-gray-500 outline-none focus:border-red-700"
          />
        </Field>

        {/* Prize Category */}
        <Field label="Prize Category">
          <div className="relative">
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full appearance-none rounded-full border border-[#555] bg-transparent px-4 py-3 text-sm text-white outline-none focus:border-red-700"
            >
              <option value="" disabled className="bg-[#2b2b2b]">
                Select category
              </option>
              {prizeCategories.map((c) => (
                <option key={c} value={c} className="bg-[#2b2b2b]">
                  {c}
                </option>
              ))}
            </select>
            <ChevronDown
              size={16}
              className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-gray-400"
            />
          </div>
        </Field>

        {/* Prize Description */}
        <Field label="Prize Description">
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Description"
            rows={4}
            className="w-full resize-none rounded-xl border border-[#555] bg-transparent px-4 py-3 text-sm text-white placeholder-gray-500 outline-none focus:border-red-700"
          />
        </Field>

        {/* Image */}
        <Field label="Image">
          <label className="flex h-32 w-full cursor-pointer flex-col items-center justify-center rounded-xl border border-dashed border-[#666] text-gray-500 hover:border-gray-400 hover:text-gray-300">
            {imagePreview ? (
              <img
                src={imagePreview}
                alt="Prize preview"
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
        </Field>

        {/* Max Tickets */}
        <Field label="Max Tickets">
          <input
            value={maxTickets}
            onChange={(e) => setMaxTickets(e.target.value)}
            placeholder="1000"
            type="number"
            className="w-full rounded-full border border-[#555] bg-transparent px-4 py-3 text-sm text-white placeholder-gray-500 outline-none focus:border-red-700"
          />
        </Field>

        {/* Draw Date / Draw Time */}
        <div className="mt-5 grid grid-cols-2 gap-4">
          <Field label="Draw Date" noMarginTop>
            <input
              value={drawDate}
              onChange={(e) => setDrawDate(e.target.value)}
              type="date"
              placeholder="mm/dd/yyyy"
              className="w-full rounded-full border border-[#555] bg-transparent px-4 py-3 text-sm text-white placeholder-gray-500 outline-none focus:border-red-700 [color-scheme:dark]"
            />
          </Field>

          <Field label="Draw Time" noMarginTop>
            <input
              value={drawTime}
              onChange={(e) => setDrawTime(e.target.value)}
              type="time"
              placeholder="Time"
              className="w-full rounded-full border border-[#555] bg-transparent px-4 py-3 text-sm text-white placeholder-gray-500 outline-none focus:border-red-700 [color-scheme:dark]"
            />
          </Field>
        </div>

        {/* Launch */}
        <button
          onClick={handleLaunch}
          disabled={!name || !category}
          className="mt-8 w-full rounded-full bg-red-900 py-3.5 font-bold transition hover:bg-red-800 disabled:cursor-not-allowed disabled:opacity-40"
        >
          Launch Raffle
        </button>
      </div>
    </div>
  );
}

function Field({
  label,
  children,
  noMarginTop,
}: {
  label: string;
  children: React.ReactNode;
  noMarginTop?: boolean;
}) {
  return (
    <div className={noMarginTop ? "" : "mt-5"}>
      <p className="mb-2 text-sm font-medium text-gray-200">{label}</p>
      {children}
    </div>
  );
}
