import { useRef, useState } from "react";
import {
  Image as ImageIcon,
  Bold,
  Italic,
  Underline,
  AlignLeft,
  AlignCenter,
  AlignRight,
  IndentDecrease,
  IndentIncrease,
} from "lucide-react";

type Props = {
  title: string;
  initialContent: string;
  publishLabel?: string;
};

const FONT_SIZES = ["10", "12", "14", "16", "18", "20", "24", "28", "32"];

export default function PolicyEditor({
  title,
  initialContent,
  publishLabel = "Publish",
}: Props) {
  const editorRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [fontSize, setFontSize] = useState("12");
  const [publishing, setPublishing] = useState(false);
  const [lastPublished, setLastPublished] = useState<string | null>(null);

  const exec = (command: string, value?: string) => {
    editorRef.current?.focus();
    document.execCommand(command, false, value);
  };

  const applyFontSize = (px: string) => {
    setFontSize(px);
    editorRef.current?.focus();
    document.execCommand("fontSize", false, "7");
    const editor = editorRef.current;
    if (!editor) return;
    editor.querySelectorAll('font[size="7"]').forEach((el) => {
      (el as HTMLElement).removeAttribute("size");
      (el as HTMLElement).style.fontSize = `${px}px`;
    });
  };

  const handleImagePick = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      exec("insertImage", reader.result as string);
    };
    reader.readAsDataURL(file);
    e.target.value = "";
  };

  const handlePublish = () => {
    setPublishing(true);
    setTimeout(() => {
      setPublishing(false);
      setLastPublished(
        new Date().toLocaleString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
          day: "2-digit",
          month: "short",
          year: "numeric",
        })
      );
    }, 700);
  };

  return (
    <div className="min-h-screen bg-black p-5 text-white">
      <h1 className="text-xl font-semibold">{title}</h1>

      <div className="mt-5 max-w-4xl rounded-2xl border border-[#333] bg-[#1a1a1a] p-4">
        {/* Toolbar */}
        <div className="flex flex-wrap items-center gap-1 border-b border-[#333] pb-3">
          <ToolbarButton onClick={() => fileInputRef.current?.click()} title="Insert image">
            <ImageIcon size={15} />
          </ToolbarButton>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleImagePick}
          />

          <select
            value={fontSize}
            onChange={(e) => applyFontSize(e.target.value)}
            className="ml-1 rounded-md border border-[#444] bg-[#222] px-2 py-1.5 text-xs text-gray-200 outline-none"
          >
            {FONT_SIZES.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>

          <Divider />

          <ToolbarButton onClick={() => exec("bold")} title="Bold">
            <Bold size={15} />
          </ToolbarButton>
          <ToolbarButton onClick={() => exec("italic")} title="Italic">
            <Italic size={15} />
          </ToolbarButton>
          <ToolbarButton onClick={() => exec("underline")} title="Underline">
            <Underline size={15} />
          </ToolbarButton>

          <Divider />

          <ToolbarButton onClick={() => exec("justifyLeft")} title="Align left">
            <AlignLeft size={15} />
          </ToolbarButton>
          <ToolbarButton onClick={() => exec("justifyCenter")} title="Align center">
            <AlignCenter size={15} />
          </ToolbarButton>
          <ToolbarButton onClick={() => exec("justifyRight")} title="Align right">
            <AlignRight size={15} />
          </ToolbarButton>

          <Divider />

          <ToolbarButton onClick={() => exec("outdent")} title="Decrease indent">
            <IndentDecrease size={15} />
          </ToolbarButton>
          <ToolbarButton onClick={() => exec("indent")} title="Increase indent">
            <IndentIncrease size={15} />
          </ToolbarButton>
        </div>

        {/* Editable content */}
        <div
          ref={editorRef}
          contentEditable
          suppressContentEditableWarning
          className="mt-4 min-h-[260px] rounded-lg px-1 text-sm leading-relaxed text-gray-300 outline-none"
          dangerouslySetInnerHTML={{ __html: initialContent }}
        />

        {/* Footer */}
        <div className="mt-6 flex flex-col items-center gap-2">
          <button
            onClick={handlePublish}
            disabled={publishing}
            className="rounded-full bg-red-900 px-10 py-3 text-sm font-bold transition hover:bg-red-800 disabled:opacity-60"
          >
            {publishing ? "Publishing…" : publishLabel}
          </button>

          {lastPublished && !publishing && (
            <p className="text-xs text-gray-500">
              Last published {lastPublished}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

function ToolbarButton({
  children,
  onClick,
  title,
}: {
  children: React.ReactNode;
  onClick: () => void;
  title: string;
}) {
  return (
    <button
      type="button"
      onMouseDown={(e) => e.preventDefault()}
      onClick={onClick}
      title={title}
      className="rounded-md p-1.5 text-gray-300 hover:bg-[#2a2a2a] hover:text-white"
    >
      {children}
    </button>
  );
}

function Divider() {
  return <span className="mx-1 h-5 w-px bg-[#333]" />;
}