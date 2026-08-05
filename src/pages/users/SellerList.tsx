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
  // const [liveSeller, setLiveSeller] = useState<Seller | null>(null);
  const [selectedLiveSeller, setSelectedLiveSeller] = useState<Seller | null>(
    null,
  );

  const [liveModalOpen, setLiveModalOpen] = useState(false);

  const filteredSellers = useMemo(() => {
    const keyword = search.toLowerCase().trim();

    return sellerList.filter(
      (seller) =>
        seller.storeName.toLowerCase().includes(keyword) ||
        seller.sellerName.toLowerCase().includes(keyword) ||
        seller.email.toLowerCase().includes(keyword),
    );
  }, [search, sellerList]);

  const totalPages = Math.ceil(filteredSellers.length / ITEMS_PER_PAGE);

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;

  const currentSellers = filteredSellers.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE,
  );

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

    // future API

    // await blockSeller(id)
  };

  const handleOpenLive = (seller: Seller) => {
    if (!seller.liveVideoUrl) return;

    setSelectedLiveSeller(seller);
    setLiveModalOpen(true);
  };

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-3xl font-bold text-white">All Seller</h1>

        <div className="relative w-80">
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
            py-2.5
            pl-10
            pr-4
            text-white
            outline-none
            focus:border-red-500
            "
          />
        </div>
      </div>

      <div
        className="
        overflow-hidden
        rounded-xl
        border
        border-[#333]
        bg-[#151515]
        "
      >
        <table className="w-full">
          <thead className="bg-[#333]">
            <tr className="text-left text-gray-200">
              <th className="px-6 py-3">Store Name</th>

              <th className="px-6 py-3">Seller Name</th>

              <th className="px-6 py-3">Active Products</th>

              <th className="px-6 py-3">Rating</th>

              <th className="px-6 py-3">Live Status</th>

              <th className="px-6 py-3 text-center">Action</th>
            </tr>
          </thead>

          <tbody>
            {currentSellers.length > 0 ? (
              currentSellers.map((seller) => (
                <tr
                  key={seller.id}
                  className="
              border-t
              border-[#333]
              hover:bg-[#1d1d1d]
              "
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <img
                        src={seller.avatar}
                        className="
                    h-9
                    w-9
                    rounded-full
                    object-cover
                    "
                      />

                      <span className="text-gray-300">{seller.storeName}</span>
                    </div>
                  </td>

                  <td className="px-6 py-4 text-gray-300">
                    {seller.sellerName}
                  </td>

                  <td className="px-6 py-4 text-gray-300">
                    {seller.activeProducts} Items
                  </td>

                  <td className="px-6 py-4">
                    <span className="text-yellow-400">★</span>

                    <span className="ml-1 text-gray-300">{seller.rating}</span>
                  </td>

                  <td className="px-6 py-4">
                    {seller.liveStatus === "Live Now" ? (
                      <button
                        disabled={!seller.liveVideoUrl}
                        onClick={() => handleOpenLive(seller)}
                        className="
  inline-flex
  items-center
  gap-2
  rounded-md
  bg-[#333]
  px-3
  py-1
  text-xs
  text-red-400
  hover:bg-red-600
  hover:text-white
  transition
  disabled:cursor-not-allowed
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
                    py-1
                    text-xs
                    text-gray-400
                    "
                      >
                        Offline
                      </span>
                    )}
                  </td>

                  <td className="px-6 py-4">
                    <div className="flex justify-center gap-3">
                      <button
                        onClick={() => handleViewSeller(seller)}
                        className="
  rounded-lg
  bg-[#252525]
  p-2
  text-gray-300
  hover:bg-blue-600
  hover:text-white
  transition
  "
                      >
                        <Eye size={18} />
                      </button>

                      {/* <button
                        className="
                    rounded-lg
                    bg-[#252525]
                    p-2
                    text-green-500
                    hover:bg-green-600
                    hover:text-white
                    "
                      >
                        <UserCheck size={18} />
                      </button> */}
                      <button
                        onClick={() => handleToggleBlock(seller.id)}
                        className={`
rounded-lg
p-2
${seller.isBlocked ? "bg-red-600 text-white" : "bg-[#252525] text-gray-300"}
`}
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

        {filteredSellers.length > 0 && (
          <div className="flex items-center justify-between border-t border-[#333] p-5">
            <p className="text-sm text-gray-400">
              Showing{" "}
              <span className="text-white font-medium">{startIndex + 1}</span>-
              <span className="text-white font-medium">
                {Math.min(startIndex + ITEMS_PER_PAGE, filteredSellers.length)}
              </span>{" "}
              of{" "}
              <span className="text-white font-medium">
                {filteredSellers.length}
              </span>
              sellers
            </p>

            <div className="flex gap-2">
              <button
                disabled={currentPage === 1}
                onClick={() => setCurrentPage((prev) => prev - 1)}
                className="
px-4
py-2
rounded-md
bg-[#252525]
text-white
disabled:opacity-40
"
              >
                Previous
              </button>

              {Array.from({ length: totalPages }).map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentPage(index + 1)}
                  className={`
h-10
w-10
rounded-md
${
  currentPage === index + 1
    ? "bg-red-600 text-white"
    : "bg-[#252525] text-gray-300"
}
`}
                >
                  {index + 1}
                </button>
              ))}

              <button
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage((prev) => prev + 1)}
                className="
px-4
py-2
rounded-md
bg-[#252525]
text-white
disabled:opacity-40
"
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>

      <LiveVideoModal
        open={liveModalOpen}
        videoUrl={selectedLiveSeller?.liveVideoUrl}
        sellerName={selectedLiveSeller?.sellerName || ""}
        onClose={() => {
          setLiveModalOpen(false);
          setSelectedLiveSeller(null);
        }}
      />

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
