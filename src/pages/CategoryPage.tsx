import { useMemo, useState } from "react";
import { Search, Pencil, Trash2 } from "lucide-react";

import { categories as initialCategories } from "../data/category";
import type { Category } from "../data/category";
import CategoryModal from "../components/category/CategoryModal";
import Pagination from "../components/common/Pagination";

const PER_PAGE = 5;

export default function CategoryPage() {
  const [categories, setCategories] = useState<Category[]>(initialCategories);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  const [modalOpen, setModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<"add" | "edit">("add");
  const [editing, setEditing] = useState<Category | null>(null);

  const filtered = useMemo(
    () =>
      categories.filter((c) =>
        c.name.toLowerCase().includes(search.toLowerCase())
      ),
    [categories, search]
  );

  const rows = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE);

  const openAdd = () => {
    setModalMode("add");
    setEditing(null);
    setModalOpen(true);
  };

  const openEdit = (category: Category) => {
    setModalMode("edit");
    setEditing(category);
    setModalOpen(true);
  };

  const handleDelete = (id: number) => {
    setCategories((prev) => prev.filter((c) => c.id !== id));
  };

  const handleSave = (data: { name: string; imageFile: File | null; existingImage?: string }) => {
    const image = data.imageFile ? URL.createObjectURL(data.imageFile) : data.existingImage;

    if (modalMode === "add") {
      setCategories((prev) => [
        ...prev,
        {
          id: Math.max(0, ...prev.map((c) => c.id)) + 1,
          name: data.name,
          image:
            image ??
            `https://ui-avatars.com/api/?name=${encodeURIComponent(
              data.name
            )}&background=444444&color=fff&size=64&bold=true`,
        },
      ]);
    } else if (editing) {
      setCategories((prev) =>
        prev.map((c) =>
          c.id === editing.id ? { ...c, name: data.name, image: image ?? c.image } : c
        )
      );
    }
  };

  return (
    <div className="min-h-screen bg-black p-5 text-white">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h1 className="text-xl font-semibold">Category</h1>

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
            onClick={openAdd}
            className="whitespace-nowrap rounded-full bg-red-900 px-5 py-2.5 text-sm font-semibold transition hover:bg-red-800"
          >
            +Add New Category
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="mt-5 overflow-hidden rounded-xl border border-[#333]">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-[#2a2a2a] text-gray-300">
              <th className="p-3 text-left font-medium">Category Name</th>
              <th className="p-3 text-center font-medium">Image</th>
              <th className="p-3 text-right font-medium">Action</th>
            </tr>
          </thead>
          <tbody>
            {rows.length === 0 ? (
              <tr>
                <td colSpan={3} className="p-6 text-center text-gray-500">
                  No categories found.
                </td>
              </tr>
            ) : (
              rows.map((c) => (
                <tr key={c.id} className="border-t border-[#2a2a2a]">
                  <td className="p-3 text-gray-300">{c.name}</td>
                  <td className="p-3 text-center">
                    <img
                      src={c.image}
                      alt={c.name}
                      className="mx-auto h-10 w-10 rounded-full object-cover"
                    />
                  </td>
                  <td className="p-3">
                    <div className="flex items-center justify-end gap-3">
                      <button
                        onClick={() => openEdit(c)}
                        className="rounded-full p-1.5 text-gray-300 hover:bg-[#222] hover:text-white"
                        title="Edit category"
                      >
                        <Pencil size={16} />
                      </button>
                      <button
                        onClick={() => handleDelete(c.id)}
                        className="rounded-full p-1.5 text-red-500 hover:bg-red-950/40"
                        title="Delete category"
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

      <CategoryModal
        open={modalOpen}
        mode={modalMode}
        initialData={editing}
        onClose={() => setModalOpen(false)}
        onSave={handleSave}
      />
    </div>
  );
}