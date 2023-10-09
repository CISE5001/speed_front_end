import React from "react";
import axios from 'axios';
import { useRouter } from 'next/router';

interface SortableTableProps {
  headers: { key: string; label: string }[];
  data: any[];
}

const SortableTable: React.FC<SortableTableProps> = ({ headers, data }) => {

  const router = useRouter();

  const handleDelete = async (itemToDelete: any) => {
    try {
      // Prompt the user for confirmation
      const userConfirmed = window.confirm("Are you sure you want to delete this article?");

      // If the user cancels, abort the deletion
      if (!userConfirmed) return;
      const id = itemToDelete.id;
      const url = `https://speed-back-end-git-feature-working-cise5001.vercel.app/api/articles/${id}`;
      console.log(url);
      await axios.delete(url);
      const response = await axios.get('https://speed-back-end-git-feature-working-cise5001.vercel.app/api/articles');
      
      router.replace(router.asPath);

      if (response.data) {
        console.log("Successfully changed status");
      }
    } catch (error) {
      console.error("Error deleting article:", error);
    }
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
              <button onClick={() => handleDelete(row)} className="text-red-500 hover:text-red-700">Delete</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default SortableTable;
