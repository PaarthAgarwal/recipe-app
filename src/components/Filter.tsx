"use client";
import Loader from "@/components/Loader";
import React, { useState, useEffect } from "react";
import { VscSettings } from "react-icons/vsc";

const getAllCategories = async () => {
  const res = await fetch(
    "https://www.themealdb.com/api/json/v1/1/list.php?c=list",
    {
      cache: "force-cache",
    }
  );
  const data = await res.json();
  return data.meals.map((meal: any) => meal.strCategory);
};
const getAllAreas = async () => {
  const res = await fetch(
    "https://www.themealdb.com/api/json/v1/1/list.php?a=list"
    ,
    {
      cache: "force-cache",
    });
  const data = await res.json();
  return data.meals.map((meal: any) => meal.strArea);
};

const Filter = ({
  selectedArea,
  setSelectedArea,
  selectedCategory,
  setSelectedCategory,
  handleFilter,
  filtersOpen,
  setFiltersOpen,
}: any) => {
  const [categories, setCategories] = useState<string[]>([]);
  const [areas, setAreas] = useState<string[]>([]);
  const [areasLoading, setAreasLoading] = useState<boolean>(true);
  const [areasError, setAreasError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoading(true);
        const fetchedCategories = await getAllCategories();
        console.log(fetchedCategories);
        setCategories(["All", ...fetchedCategories]);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch categories");
        setLoading(false);
      }
    };
    const fetchAreas = async () => {
      try {
        setAreasLoading(true);
        const fetchedAreas = await getAllAreas();
        setAreas(["All", ...fetchedAreas]);
        setAreasLoading(false);
      } catch (err) {
        setAreasError("Failed to fetch areas");
        setAreasLoading(false);
      }
    };
    fetchAreas();
    fetchCategories();
  }, []);

  const toggleCategory = (category: string) => {
    setSelectedCategory(category === selectedCategory ? null : category);
  };

  const toggleArea = (area: string) => {
    setSelectedArea(area === selectedArea ? null : area);
  };

  return (
    <div className="bg-[#129575] flex justify-center p-2 items-center w-10 h-10 rounded-xl">
      <VscSettings
        color="white"
        size={24}
        className=""
        onClick={() => setFiltersOpen(true)}
      />
      {filtersOpen && (
        <div className="absolute top-0 left-0 right-0 z-50 flex flex-col items-center p-4 bg-white rounded-lg shadow-md">
          <h2 className="text-xl font-bold mb-4">Filter Search</h2>
          <div className="mb-4">
            <h3 className="text-lg font-semibold mb-2">Category</h3>
            {loading ? (
              <Loader />
            ) : // <p>Loading...</p>
            error ? (
              <p className="text-red-500">{error}</p>
            ) : (
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <button
                    key={category}
                    className={`px-3 py-1 text-sm rounded-xl ${
                      selectedCategory === category
                        ? "bg-[#129575] text-white"
                        : "bg-transparent border border-[#71B1A1] text-[#71B1A1]"
                    }`}
                    onClick={() => toggleCategory(category)}
                  >
                    {category}
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="mb-4">
            <h3 className="text-lg font-semibold mb-2">Area</h3>
            {areasLoading ? (
              <Loader />
            ) : // <p>Loading...</p>
            areasError ? (
              <p className="text-red-500">{areasError}</p>
            ) : (
              <div className="flex flex-wrap gap-2">
                {areas.map((area) => (
                  <button
                    key={area}
                    className={`px-3 py-1 rounded-xl text-sm ${
                      selectedArea === area
                        ? "bg-[#129575] text-white"
                        : "bg-transparent border border-[#71B1A1] text-[#71B1A1]"
                    }`}
                    onClick={() => toggleArea(area)}
                  >
                    {area}
                  </button>
                ))}
              </div>
            )}
          </div>

          <button
            className="px-10 text-sm py-2 bg-[#129575] text-white rounded-xl"
            onClick={handleFilter}
          >
            Filter
          </button>
        </div>
      )}
    </div>
  );
};

export default Filter;
