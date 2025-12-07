export default function SalesTable({ data = [], loading }) {
  return (
    <div className="overflow-x-auto bg-white rounded-xl shadow-sm border border-gray-200">
      <table className="min-w-full text-sm">
        <thead className="bg-gradient-to-r from-blue-50 via-green-50 to-rose-50 border-b border-gray-200">
          <tr>
            {[
              "Transaction ID",
              "Date",
              "Customer ID",
              "Customer Name",
              "Phone",
              "Gender",
              "Age",
              "Category",
              "Quantity",
            ].map((h) => (
              <th
                key={h}
                className="p-3 text-left font-semibold text-gray-700">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <tr>
              <td colSpan="9" className="p-6 text-center text-gray-500">
                Loading...
              </td>
            </tr>
          ) : data.length === 0 ? (
            <tr>
              <td colSpan="9" className="p-6 text-center text-gray-500">
                No results
              </td>
            </tr>
          ) : (
            data.map((r, i) => (
              <tr
                key={r._id}
                className={`transition ${
                  i % 2 === 0 ? "bg-white" : "bg-gray-50"
                } hover:bg-blue-50`}
              >
                <td className="p-3">{r.productId || "-"}</td>
                <td className="p-3">
                  {r.date ? new Date(r.date).toISOString().slice(0, 10) : "-"}
                </td>
                <td className="p-3">{r.customerId || "-"}</td>
                <td className="p-3">{r.customerName || "-"}</td>
                <td className="p-3">{r.phoneNumber || "-"}</td>
                <td className="p-3">{r.gender || "-"}</td>
                <td className="p-3">{r.age ?? "-"}</td>
                <td className="p-3">{r.productCategory || "-"}</td>
                <td className="p-3 font-medium">{r.quantity ?? "-"}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
