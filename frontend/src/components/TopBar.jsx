import React, { useState, useEffect } from "react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";

export default function TopBar({ filters, setFilters }) {
  const [query, setQuery] = useState(filters.search || "");

  useEffect(() => {
    const tid = setTimeout(() => {
      setFilters((s) => ({ ...s, search: query, page: 1 }));
    }, 300);
    return () => clearTimeout(tid);
  }, [query, setFilters]);

  return (
    <div className="flex items-center justify-between gap-4 mb-4">
      <div className="flex items-center gap-3 w-full">
        <div className="relative flex-1">
          <MagnifyingGlassIcon className="w-5 h-5 absolute left-3 top-3 text-gray-400" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Name, Phone no."
            className="w-full pl-10 pr-4 py-2 border rounded-lg bg-white"
          />
        </div>

        <select
          value={filters.sortBy}
          onChange={(e) => setFilters((s) => ({ ...s, sortBy: e.target.value, page: 1 }))}
          className="px-3 py-2 border rounded-lg  bg-white cursor-pointer"
        >
          <option value="">Sort by</option>
          <option value="name">Customer Name (A-Z)</option>
          <option value="date">Date (Newest)</option>
          <option value="quantity">Quantity</option>
        </select>
      </div>
    </div>
  );
}
