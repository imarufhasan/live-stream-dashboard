import { useMemo, useState } from "react";
import { Eye, Search, UserCheck, UserX } from "lucide-react";

import { sellers, type Seller } from "../../data/sellers";
import SellerDetailsModal from "../../components/sellers/SellerDetailsModal";
import LiveVideoModal from "../../components/sellers/LiveVideoModal";

export default function SellerList() {
  const ITEMS_PER_PAGE = 5;

  const [sellerList, setSellerList] = useState(sellers);
  const [selectedSeller, setSelectedSeller] = useState<Seller | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState("");

  const [selectedLiveSeller, setSelectedLiveSeller] = useState<Seller | null>(
    null,
  );

  const [liveModalOpen, setLiveModalOpen] = useState(false);

  // =========================
  // Search
  // =========================

  const filteredSellers = useMemo(() => {
    const keyword = search.toLowerCase().trim();

    return sellerList.filter(
      (seller) =>
        seller.storeName.toLowerCase().includes(keyword) ||
        seller.sellerName.toLowerCase().includes(keyword) ||
        seller.email.toLowerCase().includes(keyword),
    );
  }, [search, sellerList]);

  // =========================
  // Pagination
  // =========================

  const totalPages = Math.ceil(filteredSellers.length / ITEMS_PER_PAGE);

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;

  const currentSellers = filteredSellers.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE,
  );

  // =========================
  // Seller Actions
  // =========================

  const handleViewSeller = (seller: Seller) => {
    setSelectedSeller(seller);
    setModalOpen(true);
  };

  const handleToggleBlock = (id: number) => {
    setSellerList((prev) =>
      prev.map((seller) =>
        seller.id === id
          ? {
              ...seller,
              isBlocked: !seller.isBlocked,
            }
          : seller,
      ),
    );

    // Future API
    // await blockSeller(id)
  };

  const handleOpenLive = (seller: Seller) => {
    if (!seller.liveVideoUrl) return;

    setSelectedLiveSeller(seller);
    setLiveModalOpen(true);
  };

  // =========================
  // Pagination Handlers
  // =========================

  const handlePrevious = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const handleNext = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  return (
    <div className="w-full min-w-0">
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
        <h1 className="text-2xl font-bold text-white sm:text-3xl">
          All Seller
        </h1>

        {/* Search */}
        <div className="relative w-full lg:w-80">
          <Search
            size={18}
            className="
              absolute
              left-3
              top-1/2
              -translate-y-1/2
              text-gray-400
            "
          />

          <input
            type="text"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setCurrentPage(1);
            }}
            placeholder="Search seller..."
            className="
              w-full
              rounded-lg
              border
              border-[#333]
              bg-[#1a1a1a]
              py-3
              pl-10
              pr-4
              text-sm
              text-white
              outline-none
              transition
              placeholder:text-gray-500
              focus:border-red-500
            "
          />
        </div>
      </div>

      {/* ========================================
          Desktop Seller Table
          Visible on lg+
      ======================================== */}

      <div
        className="
          hidden
          overflow-hidden
          rounded-xl
          border
          border-[#333]
          bg-[#151515]
          lg:block
        "
      >
        <table className="w-full">
          {/* Table Header */}
          <thead className="bg-[#333]">
            <tr className="text-left text-gray-200">
              <th className="px-6 py-4">Store Name</th>

              <th className="px-6 py-4">Seller Name</th>

              <th className="px-6 py-4">Active Products</th>

              <th className="px-6 py-4">Rating</th>

              <th className="px-6 py-4">Live Status</th>

              <th className="px-6 py-4 text-center">Action</th>
            </tr>
          </thead>

          {/* Table Body */}
          <tbody>
            {currentSellers.length > 0 ? (
              currentSellers.map((seller) => (
                <tr
                  key={seller.id}
                  className="
                    border-t
                    border-[#333]
                    transition-colors
                    hover:bg-[#1d1d1d]
                  "
                >
                  {/* Store Name */}
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <img
                        src={seller.avatar}
                        alt={seller.storeName}
                        className="
                          h-9
                          w-9
                          shrink-0
                          rounded-full
                          object-cover
                        "
                      />

                      <span className="text-gray-300">{seller.storeName}</span>
                    </div>
                  </td>

                  {/* Seller Name */}
                  <td className="px-6 py-4 text-gray-300">
                    {seller.sellerName}
                  </td>

                  {/* Active Products */}
                  <td className="px-6 py-4 text-gray-300">
                    {seller.activeProducts} Items
                  </td>

                  {/* Rating */}
                  <td className="px-6 py-4">
                    <span className="text-yellow-400">★</span>

                    <span className="ml-1 text-gray-300">{seller.rating}</span>
                  </td>

                  {/* Live Status */}
                  <td className="px-6 py-4">
                    {seller.liveStatus === "Live Now" ? (
                      <button
                        type="button"
                        disabled={!seller.liveVideoUrl}
                        onClick={() => handleOpenLive(seller)}
                        className="
                          inline-flex
                          items-center
                          gap-2
                          rounded-md
                          bg-[#333]
                          px-3
                          py-1.5
                          text-xs
                          text-red-400
                          transition
                          hover:bg-red-600
                          hover:text-white
                          disabled:cursor-not-allowed
                          disabled:opacity-50
                        "
                      >
                        <span className="h-2 w-2 rounded-full bg-red-500" />
                        Live Now
                      </button>
                    ) : (
                      <span
                        className="
                          inline-block
                          rounded-md
                          bg-[#333]
                          px-3
                          py-1.5
                          text-xs
                          text-gray-400
                        "
                      >
                        Offline
                      </span>
                    )}
                  </td>

                  {/* Actions */}
                  <td className="px-6 py-4">
                    <div className="flex justify-center gap-3">
                      {/* View */}
                      <button
                        type="button"
                        onClick={() => handleViewSeller(seller)}
                        className="
                          rounded-lg
                          bg-[#252525]
                          p-2
                          text-gray-300
                          transition
                          hover:bg-blue-600
                          hover:text-white
                        "
                        title="View seller"
                      >
                        <Eye size={18} />
                      </button>

                      {/* Block / Unblock */}
                      <button
                        type="button"
                        onClick={() => handleToggleBlock(seller.id)}
                        className={`
                          rounded-lg
                          p-2
                          transition
                          ${
                            seller.isBlocked
                              ? "bg-red-600 text-white"
                              : "bg-[#252525] text-gray-300 hover:bg-red-600 hover:text-white"
                          }
                        `}
                        title={
                          seller.isBlocked ? "Unblock seller" : "Block seller"
                        }
                      >
                        {seller.isBlocked ? (
                          <UserCheck size={18} />
                        ) : (
                          <UserX size={18} />
                        )}
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={6}
                  className="
                    py-16
                    text-center
                    text-gray-400
                  "
                >
                  No seller found
                </td>
              </tr>
            )}
          </tbody>
        </table>

        {/* Desktop Pagination */}
        {filteredSellers.length > 0 && (
          <div
            className="
              flex
              items-center
              justify-between
              gap-4
              border-t
              border-[#333]
              p-5
            "
          >
            {/* Showing Text */}
            <p className="text-sm text-gray-400">
              Showing{" "}
              <span className="font-medium text-white">{startIndex + 1}</span>-
              <span className="font-medium text-white">
                {Math.min(startIndex + ITEMS_PER_PAGE, filteredSellers.length)}
              </span>{" "}
              of{" "}
              <span className="font-medium text-white">
                {filteredSellers.length}
              </span>{" "}
              sellers
            </p>

            {/* Pagination Buttons */}
            <div className="flex items-center gap-2">
              {/* Previous */}
              <button
                type="button"
                disabled={currentPage === 1}
                onClick={handlePrevious}
                className="
                  rounded-md
                  bg-[#252525]
                  px-4
                  py-2
                  text-sm
                  text-white
                  transition
                  hover:bg-[#353535]
                  disabled:cursor-not-allowed
                  disabled:opacity-40
                "
              >
                Previous
              </button>

              {/* Page Numbers */}
              <div className="flex items-center gap-2">
                {Array.from({ length: totalPages }).map((_, index) => {
                  const page = index + 1;

                  return (
                    <button
                      type="button"
                      key={page}
                      onClick={() => setCurrentPage(page)}
                      className={`
                        h-10
                        w-10
                        rounded-md
                        text-sm
                        transition
                        ${
                          currentPage === page
                            ? "bg-red-600 text-white"
                            : "bg-[#252525] text-gray-300 hover:bg-[#353535]"
                        }
                      `}
                    >
                      {page}
                    </button>
                  );
                })}
              </div>

              {/* Next */}
              <button
                type="button"
                disabled={currentPage === totalPages}
                onClick={handleNext}
                className="
                  rounded-md
                  bg-[#252525]
                  px-4
                  py-2
                  text-sm
                  text-white
                  transition
                  hover:bg-[#353535]
                  disabled:cursor-not-allowed
                  disabled:opacity-40
                "
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>

      {/* ========================================
          Mobile / Tablet Seller Cards
          Visible below lg
      ======================================== */}

      <div className="space-y-3 lg:hidden">
        {currentSellers.length > 0 ? (
          currentSellers.map((seller) => (
            <div
              key={seller.id}
              className="
                w-full
                rounded-xl
                border
                border-[#333]
                bg-[#151515]
                p-4
              "
            >
              {/* Seller Header */}
              <div className="flex items-center gap-3">
                <img
                  src={seller.avatar}
                  alt={seller.storeName}
                  className="
                    h-12
                    w-12
                    shrink-0
                    rounded-full
                    object-cover
                  "
                />

                <div className="min-w-0 flex-1">
                  <h3 className="truncate font-medium text-white">
                    {seller.storeName}
                  </h3>

                  <p className="mt-0.5 truncate text-xs text-gray-500">
                    {seller.sellerName}
                  </p>
                </div>

                {/* Rating */}
                <div className="shrink-0 text-right">
                  <div className="flex items-center gap-1">
                    <span className="text-yellow-400">★</span>

                    <span className="text-sm text-gray-300">
                      {seller.rating}
                    </span>
                  </div>
                </div>
              </div>

              {/* Seller Details */}
              <div
                className="
                  mt-4
                  space-y-3
                  border-t
                  border-[#333]
                  pt-4
                "
              >
                {/* Active Products */}
                <div className="flex items-center justify-between gap-4">
                  <span className="text-xs text-gray-500">Active Products</span>

                  <span className="text-sm text-gray-300">
                    {seller.activeProducts} Items
                  </span>
                </div>

                {/* Live Status */}
                <div className="flex items-center justify-between gap-4">
                  <span className="text-xs text-gray-500">Live Status</span>

                  {seller.liveStatus === "Live Now" ? (
                    <button
                      type="button"
                      disabled={!seller.liveVideoUrl}
                      onClick={() => handleOpenLive(seller)}
                      className="
                        inline-flex
                        items-center
                        gap-2
                        rounded-md
                        bg-[#333]
                        px-3
                        py-1.5
                        text-xs
                        text-red-400
                        transition
                        hover:bg-red-600
                        hover:text-white
                        disabled:cursor-not-allowed
                        disabled:opacity-50
                      "
                    >
                      <span className="h-2 w-2 rounded-full bg-red-500" />
                      Live Now
                    </button>
                  ) : (
                    <span
                      className="
                        rounded-md
                        bg-[#333]
                        px-3
                        py-1.5
                        text-xs
                        text-gray-400
                      "
                    >
                      Offline
                    </span>
                  )}
                </div>

                {/* Email */}
                <div className="flex items-start justify-between gap-4">
                  <span className="shrink-0 text-xs text-gray-500">Email</span>

                  <span
                    className="
                      max-w-[70%]
                      break-all
                      text-right
                      text-sm
                      text-gray-300
                    "
                  >
                    {seller.email}
                  </span>
                </div>
              </div>

              {/* Actions */}
              <div className="mt-4 flex gap-2">
                {/* View */}
                <button
                  type="button"
                  onClick={() => handleViewSeller(seller)}
                  className="
                    flex
                    flex-1
                    items-center
                    justify-center
                    gap-2
                    rounded-lg
                    bg-[#252525]
                    py-2.5
                    text-sm
                    text-gray-300
                    transition
                    hover:bg-blue-600
                    hover:text-white
                  "
                >
                  <Eye size={17} />
                  View
                </button>

                {/* Block / Unblock */}
                <button
                  type="button"
                  onClick={() => handleToggleBlock(seller.id)}
                  className={`
                    flex
                    flex-1
                    items-center
                    justify-center
                    gap-2
                    rounded-lg
                    py-2.5
                    text-sm
                    transition
                    ${
                      seller.isBlocked
                        ? "bg-red-600 text-white"
                        : "bg-[#252525] text-gray-300 hover:bg-red-600 hover:text-white"
                    }
                  `}
                >
                  {seller.isBlocked ? (
                    <>
                      <UserCheck size={17} />
                      Unblock
                    </>
                  ) : (
                    <>
                      <UserX size={17} />
                      Block
                    </>
                  )}
                </button>
              </div>
            </div>
          ))
        ) : (
          <div
            className="
              rounded-xl
              border
              border-[#333]
              bg-[#151515]
              py-16
              text-center
              text-gray-400
            "
          >
            No seller found
          </div>
        )}

        {/* ========================================
            Mobile Pagination
        ======================================== */}

        {filteredSellers.length > 0 && (
          <div
            className="
              flex
              items-center
              justify-between
              gap-3
              rounded-xl
              border
              border-[#333]
              bg-[#151515]
              p-3
            "
          >
            {/* Previous */}
            <button
              type="button"
              disabled={currentPage === 1}
              onClick={handlePrevious}
              className="
                rounded-lg
                bg-[#252525]
                px-3
                py-2
                text-xs
                text-white
                transition
                hover:bg-[#353535]
                disabled:cursor-not-allowed
                disabled:opacity-40
              "
            >
              Previous
            </button>

            {/* Current Page */}
            <span className="whitespace-nowrap text-xs text-gray-400">
              Page <span className="font-medium text-white">{currentPage}</span>{" "}
              of <span className="font-medium text-white">{totalPages}</span>
            </span>

            {/* Next */}
            <button
              type="button"
              disabled={currentPage === totalPages}
              onClick={handleNext}
              className="
                rounded-lg
                bg-[#252525]
                px-3
                py-2
                text-xs
                text-white
                transition
                hover:bg-[#353535]
                disabled:cursor-not-allowed
                disabled:opacity-40
              "
            >
              Next
            </button>
          </div>
        )}
      </div>

      {/* ========================================
          Live Video Modal
      ======================================== */}

      <LiveVideoModal
        open={liveModalOpen}
        videoUrl={selectedLiveSeller?.liveVideoUrl}
        sellerName={selectedLiveSeller?.sellerName || ""}
        onClose={() => {
          setLiveModalOpen(false);
          setSelectedLiveSeller(null);
        }}
      />

      {/* ========================================
          Seller Details Modal
      ======================================== */}

      <SellerDetailsModal
        open={modalOpen}
        seller={selectedSeller}
        onClose={() => {
          setModalOpen(false);
          setSelectedSeller(null);
        }}
        sellerName={selectedSeller?.sellerName || ""}
      />
    </div>
  );
}
