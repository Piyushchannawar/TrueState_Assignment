import React, { useEffect, useState, useCallback } from "react";
import TopBar from "../components/TopBar";
import SalesTable from "../components/SalesTable";
import Pagination from "../components/Pagination";
import StatsCards from "../components/StatsCards";
import Filters from "../components/Filters";
import { getSales } from "../services/api";

export default function Dashboard() {
  const [sales, setSales] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);

  const [filters, setFilters] = useState({
    search: "",
    sortBy: "",
    page: 1,
    limit: 10,
    region: [],
    gender: [],
    category: [],
    tags: [],
    payment: [],
    minAge: "",
    maxAge: "",
  });

  const fetch = useCallback(async () => {
    try {
      setLoading(true);
      const res = await getSales(filters);
      setSales(res.data.results || []);
      setTotal(res.data.total || 0);
    } catch (err) {
      console.error("Fetch sales error", err);
    } finally {
      setLoading(false);
    }
  }, [filters]);

  useEffect(() => {
    fetch();
  }, [fetch]);

  return (
    <div className="flex bg-gray-100">
      <aside className="w-60 h-screen bg-white border-r p-4 fixed left-0 top-0 hidden lg:block">
        <h2 className="font-semibold text-xl mb-6">Sales Managment System</h2>

        <nav className="space-y-3 text-sm text-gray-700">
          <div className="py-2 px-3 rounded hover:bg-gray-100 cursor-pointer">
            Dashboard
          </div>
          <div className="py-2 px-3 rounded hover:bg-gray-100 cursor-pointer">
            Sales
          </div>
        </nav>
      </aside>

      <main className="ml-60 flex-1 p-6">
        <TopBar filters={filters} setFilters={setFilters} />
        <Filters filters={filters} setFilters={setFilters} />
        <StatsCards sales={sales} />
        <div className="mt-4 bg-white rounded-lg shadow">
          <SalesTable data={sales} loading={loading} />
          <Pagination total={total} page={filters.page} limit={filters.limit}
            onPage={(p) => setFilters((s) => ({ ...s, page: p }))}
          />
        </div>
      </main>
    </div>
  );
}
