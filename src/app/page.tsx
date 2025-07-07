"use client";
import Filter from "@/components/Filter";
import Header from "@/components/Header";
import Search from "@/components/Search";
import VoiceSearch from "@/components/VoiceSearch";
import Categories from "@/containers/Home/Categories";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Home() {
  const router = useRouter();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedArea, setSelectedArea] = useState<string | null>(null);
  const [filtersOpen, setFiltersOpen] = useState<boolean>(false);

  const handleFilter = () => {
    let queryParams = [];
    if (selectedCategory && selectedCategory !== "All") {
      queryParams.push(`category=${selectedCategory}`);
    }
    if (selectedArea && selectedArea !== "All") {
      queryParams.push(`area=${selectedArea}`);
    }
    const queryString =
      queryParams.length > 0 ? `?${queryParams.join("&")}` : "";
    router.push(`/search${queryString}`);
    setFiltersOpen(false);
  };

  return (
    <main className="p-4 pt-10 flex space-y-5 scrollbar-hide flex-col w-screen min-h-screen overflow-x-hidden">
      <Header />
      <div className="flex flex-row space-x-3 z-50">
        <Search />
        <Filter
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          selectedArea={selectedArea}
          setSelectedArea={setSelectedArea}
          filtersOpen={filtersOpen}
          setFiltersOpen={setFiltersOpen}
          handleFilter={handleFilter}
        />
        <VoiceSearch />
      </div>
      <div className="flex flex-col space-y-5">
        <Categories />
      </div>
    </main>
  );
}
