"use client";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { CiSearch } from "react-icons/ci";

const Search = () => {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      router.push(`/search?query=${searchQuery}`);
    }
  };

  return (
    <div className="border-2 border-[#a7a7a7] w-full flex flex-row space-x-2 justify-center items-center p-2 rounded-xl">
      <CiSearch color="#a7a7a7" size={24} />
      <input
        type="text"
        className="bg-transparent outline-none w-full placeholder-[#a7a7a7]"
        placeholder="Search..."
        onChange={handleSearch}
        onKeyDown={handleKeyDown}
        value={searchQuery}
      />
    </div>
  );
};

export default Search;
