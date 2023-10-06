import React from "react";
import Link from 'next/link';

const NavigationBar = () => (
    <div className="bg-gray-200 p-4 flex justify-between items-center">

    <Link href="/">
        <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400">Home</button>
    </Link>
    <Link href="/moderation">
        <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400">Moderator</button>
    </Link>
    <Link href="/analyst">
        <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400">Analyst</button>
    </Link>
    <Link href="/admin">
        <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400">Admin</button>
    </Link>
  </div>
);

export default NavigationBar;
