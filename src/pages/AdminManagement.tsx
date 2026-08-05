import { useMemo, useState } from "react";
import { Search, UserCheck, UserX, Trash2 } from "lucide-react";

import { admins as initialAdmins } from "../data/admin";
import type { Admin } from "../data/admin";
import AddAdminModal from "../components/admin/AddAdminModal";
import Pagination from "../components/common/Pagination";

const PER_PAGE = 5;

export default function AdminManagement() {
  const [admins, setAdmins] = useState<Admin[]>(initialAdmins);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [modalOpen, setModalOpen] = useState(false);

  const filtered = useMemo(
    () =>
      admins.filter(
        (a) =>
          a.name.toLowerCase().includes(search.toLowerCase()) ||
          a.email.toLowerCase().includes(search.toLowerCase())
      ),
    [admins, search]
  );

  const rows = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE);

  const handleToggleBlock = (id: number) => {
    setAdmins((prev) =>
      prev.map((a) =>
        a.id === id
          ? { ...a, status: a.status === "Active" ? "Blocked" : "Active" }
          : a
      )
    );
  };

  const handleDelete = (id: number) => {
    setAdmins((prev) => prev.filter((a) => a.id !== id));
  };

  const handleAdd = (data: { name: string; email: string; password: string }) => {
    setAdmins((prev) => [
      ...prev,
      {
        id: Math.max(0, ...prev.map((a) => a.id)) + 1,
        name: data.name,
        email: data.email,
        status: "Active",
        avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(
          data.name
        )}&background=333333&color=fff&size=64`,
      },
    ]);
  };

  return (
    <div className="min-h-screen bg-black p-5 text-white">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h1 className="text-xl font-semibold">Make Admin</h1>

        <div className="flex items-center gap-3">
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

          <button
            onClick={() => setModalOpen(true)}
            className="whitespace-nowrap rounded-full bg-red-900 px-5 py-2.5 text-sm font-semibold transition hover:bg-red-800"
          >
            +Add New Admin
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="mt-5 overflow-hidden rounded-xl border border-[#333]">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-[#2a2a2a] text-gray-300">
              <th className="p-3 text-left font-medium">Name</th>
              <th className="p-3 text-left font-medium">Email</th>
              <th className="p-3 text-right font-medium">Action</th>
            </tr>
          </thead>
          <tbody>
            {rows.length === 0 ? (
              <tr>
                <td colSpan={3} className="p-6 text-center text-gray-500">
                  No admins found.
                </td>
              </tr>
            ) : (
              rows.map((a) => (
                <tr key={a.id} className="border-t border-[#2a2a2a]">
                  <td className="p-3">
                    <div className="flex items-center gap-2">
                      <span className="text-gray-300">{a.name}</span>
                      {a.status === "Blocked" && (
                        <span className="rounded bg-red-900/40 px-2 py-0.5 text-[10px] font-semibold text-red-400">
                          Blocked
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="p-3 text-gray-300">{a.email}</td>
                  <td className="p-3">
                    <div className="flex items-center justify-end gap-3">
                      <button
                        onClick={() => handleToggleBlock(a.id)}
                        className={`rounded-full p-1.5 hover:bg-[#222] ${
                          a.status === "Active" ? "text-green-500" : "text-gray-500"
                        }`}
                        title={a.status === "Active" ? "Block admin" : "Unblock admin"}
                      >
                        {a.status === "Active" ? (
                          <UserCheck size={16} />
                        ) : (
                          <UserX size={16} />
                        )}
                      </button>
                      <button
                        onClick={() => handleDelete(a.id)}
                        className="rounded-full p-1.5 text-red-500 hover:bg-red-950/40"
                        title="Delete admin"
                      >
                        <Trash2 size={16} />
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

      <AddAdminModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onSave={handleAdd}
      />
    </div>
  );
}