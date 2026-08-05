import { useState } from "react";
import { Mail, Plus, X } from "lucide-react";

let nextId = 3;

type SupportEmail = {
  id: number;
  value: string;
};

export default function ContactSupport() {
  const [emails, setEmails] = useState<SupportEmail[]>([
    { id: 1, value: "support@pokelive.com" },
    { id: 2, value: "help@pokelive.com" },
  ]);
  const [saved, setSaved] = useState(false);

  const handleChange = (id: number, value: string) => {
    setEmails((prev) => prev.map((e) => (e.id === id ? { ...e, value } : e)));
    setSaved(false);
  };

  const handleAdd = () => {
    setEmails((prev) => [...prev, { id: nextId++, value: "" }]);
    setSaved(false);
  };

  const handleRemove = (id: number) => {
    setEmails((prev) => prev.filter((e) => e.id !== id));
    setSaved(false);
  };

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="min-h-screen bg-black p-5 text-white">
      <h1 className="text-xl font-semibold">Contact Support</h1>

      <div className="mt-5 max-w-sm rounded-2xl border border-[#333] bg-[#262626] p-4">
        <div className="flex items-center gap-2">
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#3a3a3a] text-gray-300">
            <Mail size={14} />
          </span>
          <p className="text-sm font-medium">Support Email</p>
        </div>

        <div className="mt-4 space-y-3">
          {emails.map((email) => (
            <div key={email.id} className="flex items-center gap-2">
              <input
                value={email.value}
                onChange={(e) => handleChange(email.id, e.target.value)}
                placeholder="xxxxxxx@gmail.com"
                type="email"
                className="w-full rounded-full border border-[#555] bg-transparent px-4 py-2.5 text-sm text-white placeholder-gray-500 outline-none focus:border-red-700"
              />
              <button
                onClick={() => handleRemove(email.id)}
                className="shrink-0 rounded-full p-1 text-gray-400 hover:text-white"
                title="Remove email"
              >
                <X size={16} />
              </button>
            </div>
          ))}

          {emails.length === 0 && (
            <p className="text-xs text-gray-500">
              No support emails added yet.
            </p>
          )}
        </div>

        <div className="mt-4 flex justify-end">
          <button
            onClick={handleAdd}
            title="Add another support email"
            className="flex h-9 w-9 items-center justify-center rounded-full bg-red-900 text-white transition hover:bg-red-800"
          >
            <Plus size={18} />
          </button>
        </div>
      </div>

      <button
        onClick={handleSave}
        className="mt-5 rounded-full bg-red-900 px-8 py-3 text-sm font-bold transition hover:bg-red-800"
      >
        {saved ? "Saved ✓" : "Save Changes"}
      </button>
    </div>
  );
}