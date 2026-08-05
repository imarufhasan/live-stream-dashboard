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

  const filtered = sellerApprovals.filter(
    (item) =>
      item.applicantName.toLowerCase().includes(search.toLowerCase()) ||
      item.storeName.toLowerCase().includes(search.toLowerCase()),
  );

  const totalPages = Math.ceil(filtered.length / rowsPerPage);

  const paginated = filtered.slice(
    (page - 1) * rowsPerPage,
    page * rowsPerPage,
  );

  return (
    <div className="min-h-screen bg-black p-5 text-white">
      <div className="mb-5 flex justify-between items-center">
        <h1 className="text-xl font-semibold">Seller Approvals</h1>

        <div
          className="
flex
items-center
gap-2
rounded-xl
border
border-[#555]
bg-[#222]
px-4
py-2
"
        >
          <Search size={18} />

          <input
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
            placeholder="Search..."
            className="
bg-transparent
outline-none
text-sm
"
          />
        </div>
      </div>

      <div
        className="
overflow-hidden
rounded-lg
border
border-[#444]
bg-[#151515]
"
      >
        <table className="w-full text-sm">
          <thead className="bg-[#3d3d3d]">
            <tr>
              <th className="p-3 text-left">Applicant Name</th>

              <th className="p-3 text-left">Requested Store</th>

              <th className="p-3 text-left">Category</th>

              <th className="p-3 text-left">Applied Date</th>

              <th className="p-3 text-center">Action</th>
            </tr>
          </thead>

          <tbody>
            {paginated.map((item) => (
              <tr key={item.id} className="border-t border-[#333]">
                <td className="p-3 text-gray-300">{item.applicantName}</td>

                <td className="p-3 text-gray-300">{item.storeName}</td>

                <td className="p-3 text-gray-300">{item.category}</td>

                <td className="p-3 text-gray-300">{item.appliedDate}</td>

                <td className="p-3 text-center">
                  <button onClick={() => setSelected(item)}>
                    <Eye size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}

      <div
        className="
mt-5
flex
justify-end
gap-2
"
      >
        <button
          disabled={page === 1}
          onClick={() => setPage(page - 1)}
          className="
rounded-lg
bg-[#333]
px-4
py-2
disabled:opacity-40
"
        >
          Prev
        </button>

        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i}
            onClick={() => setPage(i + 1)}
            className={`
rounded-lg
px-4
py-2
${page === i + 1 ? "bg-red-600" : "bg-[#333]"}
`}
          >
            {i + 1}
          </button>
        ))}

        <button
          disabled={page === totalPages}
          onClick={() => setPage(page + 1)}
          className="
rounded-lg
bg-[#333]
px-4
py-2
disabled:opacity-40
"
        >
          Next
        </button>
      </div>

      <ReviewApplicationModal
        seller={selected}
        open={!!selected}
        onClose={() => setSelected(null)}
      />
    </div>
  );
}
