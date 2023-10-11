import React from "react";
import axios from 'axios';
import { useRouter } from 'next/router';

interface SortableTableProps {
  headers: { key: string; label: string }[];
  data: any[];
}

const SortableTable: React.FC<SortableTableProps> = ({ headers, data }) => {

  const router = useRouter();
  
  const handleViewDetails = (articleId: string) => {
    // Navigate to the desired page with the article ID. Adjust the URL as needed.
    router.push(`/viewArticle/${articleId}`);
  };

  return (
    <table className="min-w-full divide-y divide-gray-200 custom-table">
      <thead className="bg-gray-200">
        <tr>
          {headers?.map((header) => (
            <th key={header.key} className="px-6 py-3 text-left text-xs font-medium text-black-500 uppercase tracking-wider">
              {header.label}
            </th>
          ))}
          <th className="px-6 py-3 text-left text-xs font-medium text-black-500 uppercase tracking-wider">View Details</th>
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
            <td>
              <button onClick={() => handleViewDetails(row._id)} className="text-blue-500 hover:text-blue-700">View Details</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default SortableTable;