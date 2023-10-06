import React from "react";

interface SortableTableProps {
  headers: { key: string; label: string }[];
  data: any[];
}

const SortableTable: React.FC<SortableTableProps> = ({ headers, data }) => (
  <table className="min-w-full divide-y divide-gray-200 custom-table">
    <thead className="bg-gray-200">
      <tr>
        {headers?.map((header) => (
          <th key={header.key} className="px-6 py-3 text-left text-xs font-medium text-black-500 uppercase tracking-wider">
            {header.label}
          </th>
        ))}
      </tr>
    </thead>
    <tbody className="bg-white divide-y divide-gray-200">
      {data?.map((row, i) => (
        <tr key={i} className="hover:bg-gray-100">
          {headers?.map((header) => (
            <td key={header.key} className="px-6 py-4 whitespace-nowrap">
              {row[header.key]}
            </td>
          ))}
        </tr>
      ))}
    </tbody>
  </table>
);

export default SortableTable;
