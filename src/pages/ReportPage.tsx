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

  /* ========================================
     Search
  ======================================== */

  const filtered = useMemo(() => {
    const keyword = search.toLowerCase().trim();

    return reports.filter(
      (report) =>
        report.reporter.toLowerCase().includes(keyword) ||
        report.reportId.toLowerCase().includes(keyword) ||
        report.title.toLowerCase().includes(keyword),
    );
  }, [reports, search]);

  /* ========================================
     Pagination
  ======================================== */

  //const totalPages = Math.max(1, Math.ceil(filtered.length / PER_PAGE));

  const rows = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE);

  /* ========================================
     View Report
  ======================================== */

  const openView = (report: Report) => {
    setViewing(report);
    setModalOpen(true);
  };

  /* ========================================
     Resolve
  ======================================== */

  const handleResolve = (id: number) => {
    setReports((prev) =>
      prev.map((report) =>
        report.id === id
          ? {
              ...report,
              status: "resolved",
            }
          : report,
      ),
    );

    setModalOpen(false);
  };

  /* ========================================
     Dismiss
  ======================================== */

  const handleDismiss = (id: number) => {
    setReports((prev) =>
      prev.map((report) =>
        report.id === id
          ? {
              ...report,
              status: "dismissed",
            }
          : report,
      ),
    );

    setModalOpen(false);
  };

  /* ========================================
     Status Styles
  ======================================== */

  const statusStyles: Record<Report["status"], string> = {
    pending: "bg-yellow-950/40 text-yellow-500",

    resolved: "bg-green-950/40 text-green-500",

    dismissed: "bg-[#2a2a2a] text-gray-400",
  };

  return (
    <div className="w-full min-w-0 text-white">
      {/* ========================================
          Header
      ======================================== */}

      <div
        className="
          flex
          flex-col
          gap-4
          sm:flex-row
          sm:items-center
          sm:justify-between
        "
      >
        {/* Title */}
        <h1
          className="
            text-xl
            font-semibold
            sm:text-2xl
          "
        >
          Report
        </h1>

        {/* Search */}
        <div
          className="
            relative
            w-full
            sm:w-56
            md:w-64
          "
        >
          <Search
            size={16}
            className="
              pointer-events-none
              absolute
              left-4
              top-1/2
              -translate-y-1/2
              text-gray-500
            "
          />

          <input
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
            placeholder="Search..."
            className="
              w-full
              rounded-full
              border
              border-[#444]
              bg-[#1a1a1a]
              py-2.5
              pl-10
              pr-4
              text-sm
              text-white
              placeholder-gray-500
              outline-none
              transition
              focus:border-red-700
            "
          />
        </div>
      </div>

      {/* ========================================
          Desktop Table
      ======================================== */}

      <div
        className="
          mt-5
          hidden
          overflow-hidden
          rounded-xl
          border
          border-[#333]
          lg:block
        "
      >
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
                <td
                  colSpan={5}
                  className="
                    p-10
                    text-center
                    text-gray-500
                  "
                >
                  No reports found.
                </td>
              </tr>
            ) : (
              rows.map((report) => (
                <tr
                  key={report.id}
                  className="
                    border-t
                    border-[#2a2a2a]
                    transition
                    hover:bg-[#1b1b1b]
                  "
                >
                  {/* Report ID */}
                  <td className="p-3 text-gray-300">{report.reportId}</td>

                  {/* Reporter */}
                  <td className="p-3 text-gray-300">{report.reporter}</td>

                  {/* Date */}
                  <td className="p-3 text-gray-300">{report.dateTime}</td>

                  {/* Status */}
                  <td className="p-3">
                    <span
                      className={`
                        inline-flex
                        rounded-full
                        px-3
                        py-1
                        text-xs
                        font-medium
                        capitalize
                        ${statusStyles[report.status]}
                      `}
                    >
                      {report.status}
                    </span>
                  </td>

                  {/* Actions */}
                  <td className="p-3">
                    <div
                      className="
                        flex
                        items-center
                        justify-end
                        gap-2
                      "
                    >
                      {/* View */}
                      <button
                        type="button"
                        onClick={() => openView(report)}
                        className="
                          flex
                          items-center
                          gap-1.5
                          rounded-full
                          border
                          border-[#444]
                          px-3
                          py-1.5
                          text-xs
                          font-medium
                          text-gray-300
                          transition
                          hover:bg-[#222]
                          hover:text-white
                        "
                      >
                        <Eye size={14} />
                        View
                      </button>

                      {/* Resolve */}
                      <button
                        type="button"
                        onClick={() => handleResolve(report.id)}
                        disabled={report.status !== "pending"}
                        className="
                          flex
                          items-center
                          gap-1.5
                          rounded-full
                          border
                          border-[#444]
                          px-3
                          py-1.5
                          text-xs
                          font-medium
                          text-gray-300
                          transition
                          hover:bg-[#222]
                          hover:text-white
                          disabled:cursor-not-allowed
                          disabled:opacity-40
                        "
                      >
                        <CheckCircle2 size={14} />
                        Resolve
                      </button>

                      {/* Dismiss */}
                      <button
                        type="button"
                        onClick={() => handleDismiss(report.id)}
                        disabled={report.status !== "pending"}
                        className="
                          flex
                          items-center
                          gap-1.5
                          rounded-full
                          border
                          border-[#444]
                          px-3
                          py-1.5
                          text-xs
                          font-medium
                          text-red-500
                          transition
                          hover:bg-red-950/40
                          disabled:cursor-not-allowed
                          disabled:opacity-40
                        "
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

      {/* ========================================
          Mobile / Tablet Cards
      ======================================== */}

      <div
        className="
          mt-5
          space-y-3
          lg:hidden
        "
      >
        {rows.length === 0 ? (
          <div
            className="
              rounded-xl
              border
              border-[#333]
              bg-[#171717]
              px-4
              py-12
              text-center
              text-sm
              text-gray-500
            "
          >
            No reports found.
          </div>
        ) : (
          rows.map((report) => (
            <div
              key={report.id}
              className="
                min-w-0
                rounded-xl
                border
                border-[#333]
                bg-[#171717]
                p-4
              "
            >
              {/* Top */}
              <div
                className="
                  flex
                  items-start
                  justify-between
                  gap-3
                "
              >
                <div className="min-w-0">
                  <p className="text-xs text-gray-500">Report ID</p>

                  <p
                    className="
                      mt-1
                      break-all
                      text-sm
                      font-medium
                      text-white
                    "
                  >
                    {report.reportId}
                  </p>
                </div>

                <span
                  className={`
                    shrink-0
                    rounded-full
                    px-3
                    py-1
                    text-xs
                    font-medium
                    capitalize
                    ${statusStyles[report.status]}
                  `}
                >
                  {report.status}
                </span>
              </div>

              {/* Details */}
              <div
                className="
                  mt-4
                  grid
                  grid-cols-1
                  gap-3
                  sm:grid-cols-2
                "
              >
                <div className="min-w-0">
                  <p className="text-xs text-gray-500">Reporter</p>

                  <p className="mt-1 wrap-break-word text-sm text-gray-300">
                    {report.reporter}
                  </p>
                </div>

                <div className="min-w-0">
                  <p className="text-xs text-gray-500">Date &amp; Time</p>

                  <p className="mt-1 wrap-break-word text-sm text-gray-300">
                    {report.dateTime}
                  </p>
                </div>

                <div className="min-w-0 sm:col-span-2">
                  <p className="text-xs text-gray-500">Report</p>

                  <p className="mt-1 wrap-break-word text-sm text-gray-300">
                    {report.title}
                  </p>
                </div>
              </div>

              {/* Actions */}
              <div
                className="
                  mt-4
                  grid
                  grid-cols-1
                  gap-2
                  sm:grid-cols-3
                "
              >
                <button
                  type="button"
                  onClick={() => openView(report)}
                  className="
                    flex
                    items-center
                    justify-center
                    gap-1.5
                    rounded-lg
                    border
                    border-[#444]
                    px-3
                    py-2
                    text-xs
                    font-medium
                    text-gray-300
                    transition
                    hover:bg-[#222]
                    hover:text-white
                  "
                >
                  <Eye size={14} />
                  View
                </button>

                <button
                  type="button"
                  onClick={() => handleResolve(report.id)}
                  disabled={report.status !== "pending"}
                  className="
                    flex
                    items-center
                    justify-center
                    gap-1.5
                    rounded-lg
                    border
                    border-[#444]
                    px-3
                    py-2
                    text-xs
                    font-medium
                    text-gray-300
                    transition
                    hover:bg-[#222]
                    hover:text-white
                    disabled:cursor-not-allowed
                    disabled:opacity-40
                  "
                >
                  <CheckCircle2 size={14} />
                  Resolve
                </button>

                <button
                  type="button"
                  onClick={() => handleDismiss(report.id)}
                  disabled={report.status !== "pending"}
                  className="
                    flex
                    items-center
                    justify-center
                    gap-1.5
                    rounded-lg
                    border
                    border-[#444]
                    px-3
                    py-2
                    text-xs
                    font-medium
                    text-red-500
                    transition
                    hover:bg-red-950/40
                    disabled:cursor-not-allowed
                    disabled:opacity-40
                  "
                >
                  <Ban size={14} />
                  Dismiss
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* ========================================
          Pagination
      ======================================== */}

      {filtered.length > 0 && (
        <Pagination
          page={page}
          totalItems={filtered.length}
          perPage={PER_PAGE}
          onPageChange={setPage}
        />
      )}

      {/* ========================================
          Modal
      ======================================== */}

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
