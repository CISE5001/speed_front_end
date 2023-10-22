import React from "react";
import Link from "next/link";
import Image from "next/image";

const NavigationBar = () => (
  <div className="bg-transparent p-4 flex items-center justify-between">
    <div className = "mr-4">
      <Image
        src="/speedlogo.png"
        alt="Speed Logo"
        width={200}
        height={20}
        
      />
    </div>

    <div className="space-x-4">
      <Link href="/">
        <button className="px-4 py-2 bg-transparent text-blue-600 hover:text-blue-700 rounded focus:outline-none focus:ring-2 focus:ring-blue-400 font-bold italic">
          HOME
        </button>
      </Link>
      <Link href="/moderation">
        <button className="px-4 py-2 bg-transparent text-blue-600 hover:text-blue-700 rounded focus:outline-none focus:ring-2 focus:ring-blue-400 font-bold  italic">
          MODERATOR
        </button>
      </Link>
      <Link href="/analyst">
        <button className="px-4 py-2 bg-transparent text-blue-600 hover:text-blue-700 rounded focus:outline-none focus:ring-2 focus:ring-blue-400 font-bold  italic">
          ANALYST
        </button>
      </Link>
      <Link href="/admin">
        <button className="px-4 py-2 bg-transparent text-blue-600 hover:text-blue-700 rounded focus:outline-none focus:ring-2 focus:ring-blue-400 font-bold  italic">
          ADMIN
        </button>
      </Link>
    </div>
  </div>
);

export default NavigationBar;
