// src/components/ArcallNotesGrid.tsx

interface ArcallNotesGridProps {
  data: any[];
  summaryData: any[];
  onRowClick: (customerId: string) => void;
}

export default function ArcallNotesGrid({ data, summaryData, onRowClick }: ArcallNotesGridProps) {
  return (
    <div className="flex flex-col gap-6">
      <div className="bg-white rounded-xl shadow border p-4">
        <table className="w-full text-xs border-collapse">
          <thead>
            <tr className="bg-gray-200 text-left">
              <th className="px-3 py-2 border font-semibold">User</th>
              <th className="px-3 py-2 border font-semibold text-right">Number of Notes</th>
            </tr>
          </thead>
          <tbody>
            {summaryData.length === 0 ? (
              <tr><td colSpan={2} className="text-center py-4 text-gray-500">No summary records</td></tr>
            ) : (
              summaryData.map((row, idx) => (
                <tr key={idx} className={idx % 2 === 0 ? "bg-white" : "bg-[#f2f200]/20"}>
                  <td className="px-3 py-2 border">{row.last_maintained_by}</td>
                  <td className="px-3 py-2 border text-right">{row.COUNT}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <div className="bg-white rounded-xl shadow border p-4">
        <table className="w-full text-xs border-collapse">
          <thead>
            <tr className="bg-[#161d2e] text-white text-left">
              <th className="px-3 py-2 border">Customer Id</th>
              <th className="px-3 py-2 border">Name</th>
              <th className="px-3 py-2 border">Date</th>
              <th className="px-3 py-2 border">Last Maintained BY</th>
              <th className="px-3 py-2 border">Notes</th>
            </tr>
          </thead>
          <tbody>
            {data.length === 0 ? (
              <tr><td colSpan={5} className="text-center py-4 text-gray-500">No records found</td></tr>
            ) : (
              data.map((row, idx) => (
                <tr key={idx} className={idx % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                  <td className="px-3 py-2 border text-center">{row.customer_id}</td>
                  <td className="px-3 py-2 border">
                    <button
                      onClick={() => onRowClick(row.customer_id)}
                      className="text-blue-600 hover:underline font-semibold text-left"
                    >
                      {row.customer_name}
                    </button>
                  </td>
                  <td className="px-3 py-2 border text-center">
                    {row.date_last_modified ? new Date(row.date_last_modified).toLocaleDateString("en-US") : "—"}
                  </td>
                  <td className="px-3 py-2 border">{row.last_maintained_by}</td>
                  <td className="px-3 py-2 border break-words">{row.notes}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}