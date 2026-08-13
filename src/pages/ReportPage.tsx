import { useMemo, useState } from "react";
import { Search, Eye, CheckCircle2, Ban } from "lucide-react";
import Pagination from "../components/common/Pagination";
import ReportModal from "../components/report/ReportModal";

import { reports as initialReports, type Report } from "../data/report";

const PER_PAGE = 5;

export default function ReportPage() {
  const [reports, setReports] = useState<Report[]>(initialReports);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  const [modalOpen, setModalOpen] = useState(false);
  const [viewing, setViewing] = useState<Report | null>(null);

  const filtered = useMemo(
    () =>
      reports.filter(
        (r) =>
          r.reporter.toLowerCase().includes(search.toLowerCase()) ||
          r.reportId.toLowerCase().includes(search.toLowerCase()) ||
          r.title.toLowerCase().includes(search.toLowerCase()),
      ),
    [reports, search],
  );

  const rows = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE);

  const openView = (report: Report) => {
    setViewing(report);
    setModalOpen(true);
  };

  const handleResolve = (id: number) => {
    setReports((prev) =>
      prev.map((r) => (r.id === id ? { ...r, status: "resolved" } : r)),
    );
    setModalOpen(false);
  };

  const handleDismiss = (id: number) => {
    setReports((prev) =>
      prev.map((r) => (r.id === id ? { ...r, status: "dismissed" } : r)),
    );
    setModalOpen(false);
  };

  const statusStyles: Record<Report["status"], string> = {
    pending: "bg-yellow-950/40 text-yellow-500",
    resolved: "bg-green-950/40 text-green-500",
    dismissed: "bg-[#2a2a2a] text-gray-400",
  };

  return (
    <div className="min-h-screen bg-black p-5 text-white">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h1 className="text-xl font-semibold">Report</h1>

        <div className="relative">
          <Search
            size={16}
            className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-gray-500"
          />
          <input
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
            placeholder="Search..."
            className="w-56 rounded-full border border-[#444] bg-[#1a1a1a] py-2.5 pl-10 pr-4 text-sm text-white placeholder-gray-500 outline-none focus:border-red-700"
          />
        </div>
      </div>

      {/* Table */}
      <div className="mt-5 overflow-hidden rounded-xl border border-[#333]">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-[#2a2a2a] text-gray-300">
              <th className="p-3 text-left font-medium">Report ID</th>
              <th className="p-3 text-left font-medium">Reporter</th>
              <th className="p-3 text-left font-medium">Date &amp; Time</th>
              <th className="p-3 text-left font-medium">Status</th>
              <th className="p-3 text-right font-medium">Action</th>
            </tr>
          </thead>
          <tbody>
            {rows.length === 0 ? (
              <tr>
                <td colSpan={5} className="p-6 text-center text-gray-500">
                  No reports found.
                </td>
              </tr>
            ) : (
              rows.map((r) => (
                <tr key={r.id} className="border-t border-[#2a2a2a]">
                  <td className="p-3 text-gray-300">{r.reportId}</td>
                  <td className="p-3 text-gray-300">{r.reporter}</td>
                  <td className="p-3 text-gray-300">{r.dateTime}</td>
                  <td className="p-3">
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-medium capitalize ${statusStyles[r.status]}`}
                    >
                      {r.status}
                    </span>
                  </td>
                  <td className="p-3">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => openView(r)}
                        className="flex items-center gap-1.5 rounded-full border border-[#444] px-3 py-1.5 text-xs font-medium text-gray-300 transition hover:bg-[#222] hover:text-white"
                        title="View report"
                      >
                        <Eye size={14} />
                        View
                      </button>
                      <button
                        onClick={() => handleResolve(r.id)}
                        disabled={r.status !== "pending"}
                        className="flex items-center gap-1.5 rounded-full border border-[#444] px-3 py-1.5 text-xs font-medium text-gray-300 transition hover:bg-[#222] hover:text-white disabled:cursor-not-allowed disabled:opacity-40"
                        title="Resolve report"
                      >
                        <CheckCircle2 size={14} />
                        Resolve
                      </button>
                      <button
                        onClick={() => handleDismiss(r.id)}
                        disabled={r.status !== "pending"}
                        className="flex items-center gap-1.5 rounded-full border border-[#444] px-3 py-1.5 text-xs font-medium text-red-500 transition hover:bg-red-950/40 disabled:cursor-not-allowed disabled:opacity-40"
                        title="Dismiss report"
                      >
                        <Ban size={14} />
                        Dismiss
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <Pagination
        page={page}
        totalItems={filtered.length}
        perPage={PER_PAGE}
        onPageChange={setPage}
      />

      <ReportModal
        open={modalOpen}
        report={viewing}
        onClose={() => setModalOpen(false)}
        onResolve={handleResolve}
        onDismiss={handleDismiss}
      />
    </div>
  );
}
