import { useState } from "react";
import { LoaderCircle, X } from "lucide-react";

import type { Report } from "../../data/report";

interface ReportModalProps {
  open: boolean;
  report: Report | null;
  onClose: () => void;
  onResolve: (id: number) => void;
  onDismiss: (id: number) => void;
}

export default function ReportModal({
  open,
  report,
  onClose,
  onResolve,
  onDismiss,
}: ReportModalProps) {
  const [imageLoading, setImageLoading] = useState(true);

  if (!open || !report) return null;

  const isPending = report.status === "pending";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4">
      <div className="w-full max-w-sm rounded-2xl bg-[#1e1e1e] p-5 text-white shadow-xl">
        {/* Header */}
        <div className="flex items-center justify-between">
          <h2 className="text-base font-semibold">Report Details</h2>

          <button
            onClick={onClose}
            className="rounded-full p-1 text-gray-400 hover:bg-[#2a2a2a] hover:text-white"
            title="Close"
          >
            <X size={18} />
          </button>
        </div>

        {/* Title */}
        <div className="mt-4">
          <p className="text-xs font-medium text-gray-400">Title</p>
          <p className="mt-1 text-sm font-semibold text-white">
            {report.title}
          </p>
        </div>

        {/* Description */}
        <div className="mt-4">
          <p className="text-xs font-medium text-gray-400">Description</p>
          <p className="mt-1 text-sm leading-relaxed text-gray-300">
            {report.description}
          </p>
        </div>

        {/* Image */}
        <div className="mt-4">
          <p className="text-xs font-medium text-gray-400">Image</p>

          <div className="relative mt-2 flex h-40 w-full items-center justify-center overflow-hidden rounded-lg bg-[#151515]">
            {imageLoading && (
              <LoaderCircle
                size={22}
                className="absolute animate-spin text-gray-400"
              />
            )}

            <img
              src={report.image}
              alt="Report evidence"
              onLoad={() => setImageLoading(false)}
              onError={() => setImageLoading(false)}
              className={`h-full w-full object-cover transition-opacity duration-200 ${
                imageLoading ? "opacity-0" : "opacity-100"
              }`}
            />
          </div>
        </div>

        {/* Status */}
        {!isPending && (
          <p
            className={`mt-4 text-xs font-medium ${
              report.status === "resolved" ? "text-green-500" : "text-gray-500"
            }`}
          >
            This report has already been {report.status}.
          </p>
        )}

        {/* Footer actions */}
        <div className="mt-5 flex items-center gap-3">
          <button
            onClick={() => onDismiss(report.id)}
            disabled={!isPending}
            className="flex-1 rounded-full border border-[#444] bg-transparent py-2.5 text-sm font-semibold text-gray-300 transition hover:bg-[#2a2a2a] disabled:cursor-not-allowed disabled:opacity-40"
          >
            Dismiss
          </button>

          <button
            onClick={() => onResolve(report.id)}
            disabled={!isPending}
            className="flex-1 rounded-full bg-red-900 py-2.5 text-sm font-semibold text-white transition hover:bg-red-800 disabled:cursor-not-allowed disabled:opacity-40"
          >
            Resolve
          </button>
        </div>
      </div>
    </div>
  );
}
