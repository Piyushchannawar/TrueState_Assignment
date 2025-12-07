import React from "react";
import { CubeIcon, CurrencyRupeeIcon, TagIcon } from "@heroicons/react/24/outline";

export default function StatsCards({ sales }) {
  const totalUnits = sales.reduce((s, r) => s + (Number(r.quantity) || 0), 0);
  const totalAmount = sales.reduce((s, r) => s + (Number(r.totalAmount) || 0), 0);
  const totalDiscount = sales.reduce(
    (s, r) => s + ((Number(r.totalAmount) - Number(r.finalAmount)) || 0),
    0
  );

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">

      {/* Total Units */}
      <div className="p-5 rounded-xl shadow-sm bg-gradient-to-br from-blue-50 to-blue-100 border border-blue-200 hover:shadow-md transition">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-gray-600">Total Units Sold</span>
          <CubeIcon className="w-6 h-6 text-blue-500" />
        </div>
        <div className="mt-2 text-2xl font-bold text-blue-700">{totalUnits}</div>
      </div>

      {/* Total Amount */}
      <div className="p-5 rounded-xl shadow-sm bg-gradient-to-br from-green-50 to-green-100 border border-green-200 hover:shadow-md transition">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-gray-600">Total Amount</span>
          <CurrencyRupeeIcon className="w-6 h-6 text-green-600" />
        </div>
        <div className="mt-2 text-2xl font-bold text-green-700">
          ₹{Math.round(totalAmount)}
        </div>
      </div>

      {/* Total Discount */}
      <div className="p-5 rounded-xl shadow-sm bg-gradient-to-br from-rose-50 to-rose-100 border border-rose-200 hover:shadow-md transition">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-gray-600">Total Discount</span>
          <TagIcon className="w-6 h-6 text-rose-500" />
        </div>
        <div className="mt-2 text-2xl font-bold text-rose-700">
          ₹{Math.round(totalDiscount)}
        </div>
      </div>

    </div>
  );
}
