type Props = {
  page: number;
  totalItems: number;
  perPage: number;
  onPageChange: (page: number) => void;
};

export default function Pagination({ page, totalItems, perPage, onPageChange }: Props) {
  const totalPages = Math.max(1, Math.ceil(totalItems / perPage));

  // Only render pagination controls when there's more than one page worth of data
  if (totalItems <= perPage) return null;

  return (
    <div className="mt-5 flex items-center justify-between px-1">
      <p className="text-xs text-gray-400">
        Showing {(page - 1) * perPage + 1}
        {"-"}
        {Math.min(page * perPage, totalItems)} of {totalItems}
      </p>

      <div className="flex items-center gap-2">
        <button
          onClick={() => onPageChange(Math.max(1, page - 1))}
          disabled={page === 1}
          className="rounded-md border border-[#444] px-3 py-1.5 text-sm text-gray-300 disabled:opacity-40 hover:bg-[#222]"
        >
          Prev
        </button>

        {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
          <button
            key={p}
            onClick={() => onPageChange(p)}
            className={`h-8 w-8 rounded-md text-sm transition ${
              p === page
                ? "bg-red-900 text-white"
                : "text-gray-400 hover:bg-[#222] hover:text-white"
            }`}
          >
            {p}
          </button>
        ))}

        <button
          onClick={() => onPageChange(Math.min(totalPages, page + 1))}
          disabled={page === totalPages}
          className="rounded-md border border-[#444] px-3 py-1.5 text-sm text-gray-300 disabled:opacity-40 hover:bg-[#222]"
        >
          Next
        </button>
      </div>
    </div>
  );
}