"use client";

import { testBackend } from "@/app/client/api";
import React from "react";

const Zero = () => {
  const [data, setData] = React.useState<string | null>(null);

  const handleFetch = async () => {
    const data = await testBackend();
    setData(data);
  };

  return (
    <>
      <button
        className="hover:cursor-pointer rounded-full border bg-slate-900 text-white hover:text-black border-solid border-black/[.08] dark:border-white/[.145] transition-colors flex items-center justify-center hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] hover:border-transparent font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 w-full sm:w-auto md:w-[158px]"
        rel="noopener noreferrer"
        onClick={handleFetch}
      >
        Test backend
      </button>
      {data && <p>{data}</p>}
    </>
  );
};

export default Zero;
