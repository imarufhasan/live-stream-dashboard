import { Eye, Search } from "lucide-react";
import { useState } from "react";

import { sellerApprovals } from "../data/sellerApprovals";
import type { SellerApproval } from "../data/sellerApprovals";

import ReviewApplicationModal from "../components/approvals/ReviewApplicationModal";

export default function SellerApprovals() {
  const [selected, setSelected] = useState<SellerApproval | null>(null);

  const [search, setSearch] = useState("");

  const [page, setPage] = useState(1);

  const rowsPerPage = 5;

  // =========================
  // Search
  // =========================

  const filtered = sellerApprovals.filter(
    (item) =>
      item.applicantName.toLowerCase().includes(search.toLowerCase()) ||
      item.storeName.toLowerCase().includes(search.toLowerCase()),
  );

  // =========================
  // Pagination
  // =========================

  const totalPages = Math.ceil(filtered.length / rowsPerPage);

  const paginated = filtered.slice(
    (page - 1) * rowsPerPage,
    page * rowsPerPage,
  );

  const handlePrevious = () => {
    setPage((prev) => Math.max(prev - 1, 1));
  };

  const handleNext = () => {
    setPage((prev) => Math.min(prev + 1, totalPages));
  };

  return (
    <div className="w-full min-w-0 text-white">
      {/* ========================================
          Header
      ======================================== */}

      <div
        className="
          mb-5
          flex
          flex-col
          gap-4
          sm:mb-6
          lg:flex-row
          lg:items-center
          lg:justify-between
        "
      >
        {/* Title */}
        <h1 className="text-2xl font-semibold sm:text-3xl">Seller Approvals</h1>

        {/* Search */}
        <div
          className="
            flex
            w-full
            items-center
            gap-2
            rounded-xl
            border
            border-[#555]
            bg-[#222]
            px-4
            py-2.5
            lg:w-80
          "
        >
          <Search size={18} className="shrink-0 text-gray-400" />

          <input
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
            placeholder="Search applicant or store..."
            className="
              min-w-0
              w-full
              bg-transparent
              text-sm
              text-white
              outline-none
              placeholder:text-gray-500
            "
          />
        </div>
      </div>

      {/* ========================================
          Desktop Table
          Visible on lg+
      ======================================== */}

      <div
        className="
          hidden
          overflow-hidden
          rounded-xl
          border
          border-[#444]
          bg-[#151515]
          lg:block
        "
      >
        <table className="w-full text-sm">
          {/* Header */}
          <thead className="bg-[#3d3d3d]">
            <tr>
              <th className="p-4 text-left">Applicant Name</th>

              <th className="p-4 text-left">Requested Store</th>

              <th className="p-4 text-left">Category</th>

              <th className="p-4 text-left">Applied Date</th>

              <th className="p-4 text-center">Action</th>
            </tr>
          </thead>

          {/* Body */}
          <tbody>
            {paginated.length > 0 ? (
              paginated.map((item) => (
                <tr
                  key={item.id}
                  className="
                    border-t
                    border-[#333]
                    transition
                    hover:bg-[#1d1d1d]
                  "
                >
                  <td className="p-4 text-gray-300">{item.applicantName}</td>

                  <td className="p-4 text-gray-300">{item.storeName}</td>

                  <td className="p-4 text-gray-300">{item.category}</td>

                  <td className="p-4 text-gray-300">{item.appliedDate}</td>

                  <td className="p-4 text-center">
                    <button
                      type="button"
                      onClick={() => setSelected(item)}
                      className="
                        inline-flex
                        rounded-lg
                        bg-[#252525]
                        p-2
                        text-gray-300
                        transition
                        hover:bg-blue-600
                        hover:text-white
                      "
                      title="Review application"
                    >
                      <Eye size={18} />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={5}
                  className="
                    py-16
                    text-center
                    text-gray-400
                  "
                >
                  No seller application found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* ========================================
          Mobile / Tablet Cards
          Visible below lg
      ======================================== */}

      <div className="space-y-3 lg:hidden">
        {paginated.length > 0 ? (
          paginated.map((item) => (
            <div
              key={item.id}
              className="
                w-full
                rounded-xl
                border
                border-[#444]
                bg-[#151515]
                p-4
              "
            >
              {/* Applicant */}
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0 flex-1">
                  <p className="text-xs text-gray-500">Applicant Name</p>

                  <h3 className="mt-1 truncate text-base font-semibold text-white">
                    {item.applicantName}
                  </h3>
                </div>

                {/* View Button */}
                <button
                  type="button"
                  onClick={() => setSelected(item)}
                  className="
                    shrink-0
                    rounded-lg
                    bg-[#252525]
                    p-2.5
                    text-gray-300
                    transition
                    hover:bg-blue-600
                    hover:text-white
                  "
                  title="Review application"
                >
                  <Eye size={18} />
                </button>
              </div>

              {/* Details */}
              <div
                className="
                  mt-4
                  space-y-3
                  border-t
                  border-[#333]
                  pt-4
                "
              >
                {/* Store */}
                <div className="flex items-start justify-between gap-4">
                  <span className="shrink-0 text-xs text-gray-500">
                    Requested Store
                  </span>

                  <span className="text-right text-sm text-gray-300">
                    {item.storeName}
                  </span>
                </div>

                {/* Category */}
                <div className="flex items-start justify-between gap-4">
                  <span className="shrink-0 text-xs text-gray-500">
                    Category
                  </span>

                  <span className="text-right text-sm text-gray-300">
                    {item.category}
                  </span>
                </div>

                {/* Applied Date */}
                <div className="flex items-start justify-between gap-4">
                  <span className="shrink-0 text-xs text-gray-500">
                    Applied Date
                  </span>

                  <span className="text-right text-sm text-gray-300">
                    {item.appliedDate}
                  </span>
                </div>
              </div>

              {/* Review Button */}
              <button
                type="button"
                onClick={() => setSelected(item)}
                className="
                  mt-4
                  flex
                  w-full
                  items-center
                  justify-center
                  gap-2
                  rounded-lg
                  bg-[#252525]
                  py-2.5
                  text-sm
                  font-medium
                  text-gray-300
                  transition
                  hover:bg-blue-600
                  hover:text-white
                "
              >
                <Eye size={17} />
                Review Application
              </button>
            </div>
          ))
        ) : (
          <div
            className="
              rounded-xl
              border
              border-[#444]
              bg-[#151515]
              py-16
              text-center
              text-gray-400
            "
          >
            No seller application found
          </div>
        )}
      </div>

      {/* ========================================
          Pagination
      ======================================== */}

      {filtered.length > 0 && (
        <>
          {/* Desktop Pagination */}
          <div
            className="
              mt-5
              hidden
              items-center
              justify-end
              gap-2
              lg:flex
            "
          >
            {/* Previous */}
            <button
              type="button"
              disabled={page === 1}
              onClick={handlePrevious}
              className="
                rounded-lg
                bg-[#333]
                px-4
                py-2
                text-sm
                transition
                hover:bg-[#444]
                disabled:cursor-not-allowed
                disabled:opacity-40
              "
            >
              Prev
            </button>

            {/* Page Numbers */}
            {Array.from({ length: totalPages }, (_, i) => (
              <button
                type="button"
                key={i}
                onClick={() => setPage(i + 1)}
                className={`
                    rounded-lg
                    px-4
                    py-2
                    text-sm
                    transition
                    ${
                      page === i + 1
                        ? "bg-red-600 text-white"
                        : "bg-[#333] text-gray-300 hover:bg-[#444]"
                    }
                  `}
              >
                {i + 1}
              </button>
            ))}

            {/* Next */}
            <button
              type="button"
              disabled={page === totalPages}
              onClick={handleNext}
              className="
                rounded-lg
                bg-[#333]
                px-4
                py-2
                text-sm
                transition
                hover:bg-[#444]
                disabled:cursor-not-allowed
                disabled:opacity-40
              "
            >
              Next
            </button>
          </div>

          {/* Mobile Pagination */}
          <div
            className="
              mt-4
              flex
              items-center
              justify-between
              gap-3
              rounded-xl
              border
              border-[#333]
              bg-[#151515]
              p-3
              lg:hidden
            "
          >
            {/* Previous */}
            <button
              type="button"
              disabled={page === 1}
              onClick={handlePrevious}
              className="
                rounded-lg
                bg-[#333]
                px-3
                py-2
                text-xs
                text-white
                transition
                hover:bg-[#444]
                disabled:cursor-not-allowed
                disabled:opacity-40
              "
            >
              Prev
            </button>

            {/* Page Info */}
            <p className="whitespace-nowrap text-xs text-gray-400">
              Page <span className="font-medium text-white">{page}</span> of{" "}
              <span className="font-medium text-white">{totalPages}</span>
            </p>

            {/* Next */}
            <button
              type="button"
              disabled={page === totalPages}
              onClick={handleNext}
              className="
                rounded-lg
                bg-[#333]
                px-3
                py-2
                text-xs
                text-white
                transition
                hover:bg-[#444]
                disabled:cursor-not-allowed
                disabled:opacity-40
              "
            >
              Next
            </button>
          </div>
        </>
      )}

      {/* ========================================
          Review Application Modal
      ======================================== */}

      <ReviewApplicationModal
        seller={selected}
        open={!!selected}
        onClose={() => setSelected(null)}
      />
    </div>
  );
}
