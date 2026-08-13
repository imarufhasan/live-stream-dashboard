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

  /* ========================================
     Search
  ======================================== */

  const filtered = useMemo(() => {
    const keyword = search.toLowerCase().trim();

    return categories.filter((category) =>
      category.name.toLowerCase().includes(keyword),
    );
  }, [categories, search]);

  /* ========================================
     Pagination
  ======================================== */

  //const totalPages = Math.max(1, Math.ceil(filtered.length / PER_PAGE));

  const rows = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE);

  /* ========================================
     Add
  ======================================== */

  const openAdd = () => {
    setModalMode("add");
    setEditing(null);
    setModalOpen(true);
  };

  /* ========================================
     Edit
  ======================================== */

  const openEdit = (category: Category) => {
    setModalMode("edit");
    setEditing(category);
    setModalOpen(true);
  };

  /* ========================================
     Delete
  ======================================== */

  const handleDelete = (id: number) => {
    setCategories((prev) => prev.filter((category) => category.id !== id));

    // Keep page valid after deleting last item
    setPage((currentPage) => {
      const remainingItems = filtered.length - 1;

      const newTotalPages = Math.max(1, Math.ceil(remainingItems / PER_PAGE));

      return Math.min(currentPage, newTotalPages);
    });
  };

  /* ========================================
     Save Category
  ======================================== */

  const handleSave = (data: {
    name: string;
    imageFile: File | null;
    existingImage?: string;
  }) => {
    const image = data.imageFile
      ? URL.createObjectURL(data.imageFile)
      : data.existingImage;

    if (modalMode === "add") {
      setCategories((prev) => [
        ...prev,
        {
          id: Math.max(0, ...prev.map((category) => category.id)) + 1,

          name: data.name,

          image:
            image ??
            `https://ui-avatars.com/api/?name=${encodeURIComponent(
              data.name,
            )}&background=444444&color=fff&size=64&bold=true`,
        },
      ]);

      // New category will be available from first page
      setPage(1);
    } else if (editing) {
      setCategories((prev) =>
        prev.map((category) =>
          category.id === editing.id
            ? {
                ...category,
                name: data.name,
                image: image ?? category.image,
              }
            : category,
        ),
      );
    }
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
        <h1 className="text-xl font-semibold sm:text-2xl">Category</h1>

        {/* Search + Add */}
        <div
          className="
            flex
            w-full
            flex-col
            gap-3
            sm:w-auto
            sm:flex-row
            sm:items-center
          "
        >
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

          {/* Add Button */}
          <button
            type="button"
            onClick={openAdd}
            className="
              w-full
              whitespace-nowrap
              rounded-full
              bg-red-900
              px-5
              py-2.5
              text-sm
              font-semibold
              transition
              hover:bg-red-800
              sm:w-auto
            "
          >
            + Add New Category
          </button>
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
              <th className="p-3 text-left font-medium">Category Name</th>

              <th className="p-3 text-center font-medium">Image</th>

              <th className="p-3 text-right font-medium">Action</th>
            </tr>
          </thead>

          <tbody>
            {rows.length === 0 ? (
              <tr>
                <td
                  colSpan={3}
                  className="
                    p-10
                    text-center
                    text-gray-500
                  "
                >
                  No categories found.
                </td>
              </tr>
            ) : (
              rows.map((category) => (
                <tr
                  key={category.id}
                  className="
                    border-t
                    border-[#2a2a2a]
                    transition
                    hover:bg-[#1b1b1b]
                  "
                >
                  {/* Category Name */}
                  <td className="p-3 text-gray-300">{category.name}</td>

                  {/* Image */}
                  <td className="p-3 text-center">
                    <img
                      src={category.image}
                      alt={category.name}
                      className="
                        mx-auto
                        h-10
                        w-10
                        rounded-full
                        border
                        border-[#444]
                        object-cover
                      "
                    />
                  </td>

                  {/* Action */}
                  <td className="p-3">
                    <div
                      className="
                        flex
                        items-center
                        justify-end
                        gap-3
                      "
                    >
                      {/* Edit */}
                      <button
                        type="button"
                        onClick={() => openEdit(category)}
                        className="
                          rounded-full
                          p-1.5
                          text-gray-300
                          transition
                          hover:bg-[#222]
                          hover:text-white
                        "
                        title="Edit category"
                      >
                        <Pencil size={16} />
                      </button>

                      {/* Delete */}
                      <button
                        type="button"
                        onClick={() => handleDelete(category.id)}
                        className="
                          rounded-full
                          p-1.5
                          text-red-500
                          transition
                          hover:bg-red-950/40
                        "
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
            No categories found.
          </div>
        ) : (
          rows.map((category) => (
            <div
              key={category.id}
              className="
                flex
                min-w-0
                items-center
                justify-between
                gap-4
                rounded-xl
                border
                border-[#333]
                bg-[#171717]
                p-4
                transition
                hover:bg-[#1b1b1b]
              "
            >
              {/* Left: Image + Name */}
              <div
                className="
                  flex
                  min-w-0
                  items-center
                  gap-3
                "
              >
                <img
                  src={category.image}
                  alt={category.name}
                  className="
                    h-11
                    w-11
                    shrink-0
                    rounded-full
                    border
                    border-[#444]
                    object-cover
                  "
                />

                <div className="min-w-0">
                  <p className="text-xs text-gray-500">Category</p>

                  <p
                    className="
                      mt-0.5
                      wrap-break-word
                      text-sm
                      font-medium
                      text-white
                    "
                  >
                    {category.name}
                  </p>
                </div>
              </div>

              {/* Right: Actions */}
              <div
                className="
                  flex
                  shrink-0
                  items-center
                  gap-1
                "
              >
                {/* Edit */}
                <button
                  type="button"
                  onClick={() => openEdit(category)}
                  className="
                    rounded-full
                    p-2
                    text-gray-300
                    transition
                    hover:bg-[#292929]
                    hover:text-white
                  "
                  title="Edit category"
                  aria-label="Edit category"
                >
                  <Pencil size={17} />
                </button>

                {/* Delete */}
                <button
                  type="button"
                  onClick={() => handleDelete(category.id)}
                  className="
                    rounded-full
                    p-2
                    text-red-500
                    transition
                    hover:bg-red-950/40
                  "
                  title="Delete category"
                  aria-label="Delete category"
                >
                  <Trash2 size={17} />
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
        <div
          className="
            mt-4
            overflow-hidden
            rounded-xl
            border
            border-[#333]
            bg-[#171717]
          "
        >
          <Pagination
            page={page}
            totalItems={filtered.length}
            perPage={PER_PAGE}
            onPageChange={setPage}
          />
        </div>
      )}

      {/* ========================================
          Category Modal
      ======================================== */}

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
