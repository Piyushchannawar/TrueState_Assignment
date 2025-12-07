export default function Pagination({ total = 0, page = 1, limit = 10, onPage }) {
  const totalPages = Math.ceil(total / limit);

  if (totalPages <= 1) return null;

  const getPages = () => {
    const pages = [];
    const maxVisible = 5;
    let start = Math.max(1, page - 2);
    let end = Math.min(totalPages, page + 2);

    if (page <= 3) {
      start = 1;
      end = Math.min(totalPages, maxVisible);
    } else if (page >= totalPages - 2) {
      start = Math.max(1, totalPages - maxVisible + 1);
      end = totalPages;
    }

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }
    return pages;
  };

  const pages = getPages();

  return (
    <div className="flex items-center justify-center gap-2 p-4">
      <button
        onClick={() => onPage(page - 1)}
        disabled={page === 1}
        className="px-3 py-1 border rounded disabled:opacity-50 cursor-pointer disabled:cursor-default"
      >
        Prev
      </button>
      
      {pages[0] !== 1 && (
        <>
          <button
            className={`px-3 py-1 border rounded cursor-pointer ${
              page === 1 ? "bg-indigo-600 text-white" : "bg-white"
            }`}
            onClick={() => onPage(1)}
          >
            1
          </button>
          <span className="px-2 text-gray-500">...</span>
        </>
      )}
      {pages.map((p) => (
        <button
          key={p}
          onClick={() => onPage(p)}
          className={`px-3 py-1 border rounded cursor-pointer ${
            page === p ? "bg-indigo-600 text-white" : "bg-white"
          }`}
        >
          {p}
        </button>
      ))}

      {pages[pages.length - 1] !== totalPages && (
        <>
          <span className="px-2 text-gray-500">...</span>
          <button
            className={`px-3 py-1 border rounded cursor-pointer ${
              page === totalPages ? "bg-indigo-600 text-white" : "bg-white"
            }`}
            onClick={() => onPage(totalPages)}
          >
            {totalPages}
          </button>
        </>
      )}

      <button
        onClick={() => onPage(page + 1)}
        disabled={page === totalPages}
        className="px-3 py-1 border rounded disabled:opacity-50 cursor-pointer disabled:cursor-default"
      >
        Next
      </button>
    </div>
  );
}
