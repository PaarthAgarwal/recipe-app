"use client";
import Card from "@/components/Card/Card";
import Filter from "@/components/Filter";
import Search from "@/components/Search";
import { fetchRecipesBySearch } from "@/functions/fetchRecipesBySearch";
import Loader from "@/components/Loader";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { IoArrowBack } from "react-icons/io5";

const SearchPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedArea, setSelectedArea] = useState<string | null>(null);
  const [recipes, setRecipes] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [filtersOpen, setFiltersOpen] = useState<boolean>(false);
  const getAllRecipesByCategories = async (category: string) => {
    try {
      const response = await fetch(
        `https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`,
        {
          cache: "force-cache",
        }
      );
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      return data.meals || [];
    } catch (error) {
      console.error("Error fetching recipes by category:", error);
      throw error;
    }
  };

  const getAllRecipesByAreas = async (area: string) => {
    try {
      const response = await fetch(
        `https://www.themealdb.com/api/json/v1/1/filter.php?a=${area}`,
        {
          cache: "force-cache",
        }
      );
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      return data.meals || [];
    } catch (error) {
      console.error("Error fetching recipes by area:", error);
      throw error;
    }
  };

  const getCommonRecipes = (categoryRecipes: any[], areaRecipes: any[]) => {
    const categoryIds = new Set(categoryRecipes.map((recipe) => recipe.idMeal));
    return areaRecipes.filter((recipe) => categoryIds.has(recipe.idMeal));
  };

  useEffect(() => {
    const query = searchParams.get("query") || "";
    const category = searchParams.get("category");
    const area = searchParams.get("area");

    if (category) setSelectedCategory(category);
    if (area) setSelectedArea(area);

    const fetchRecipes = async () => {
      setLoading(true);
      setError(null);
      try {
        let fetchedRecipes: any[] = [];
        if (query) {
          fetchedRecipes = await fetchRecipesBySearch(query);
          console.log(query, fetchedRecipes);
        } else {
          if (category && category !== "All" && area && area !== "All") {
            const categoryRecipes = await getAllRecipesByCategories(category);
            const areaRecipes = await getAllRecipesByAreas(area);
            fetchedRecipes = getCommonRecipes(categoryRecipes, areaRecipes);
          } else if (category && category !== "All") {
            fetchedRecipes = await getAllRecipesByCategories(category);
          } else if (area && area !== "All") {
            fetchedRecipes = await getAllRecipesByAreas(area);
          }
        }
        setRecipes(fetchedRecipes);
      } catch (error) {
        setError("Failed to fetch recipes");
      } finally {
        setLoading(false);
      }
    };

    fetchRecipes();
  }, [searchParams]);

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
    <div className="p-4 pt-10 flex space-y-5 flex-col w-screen min-h-screen overflow-x-hidden">
      <div className="flex flex-row w-full justify-start items-center">
        <IoArrowBack size={24} onClick={() => router.push("/")} />
        <h1 className="font-bold text-center w-full">Search Recipes</h1>
      </div>
      <div className="flex flex-row space-x-3">
        <Search />
        <Filter
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          selectedArea={selectedArea}
          setSelectedArea={setSelectedArea}
          handleFilter={handleFilter}
          setFiltersOpen={setFiltersOpen}
          filtersOpen={filtersOpen}
        />
      </div>
      <div className="flex flex-row justify-between items-center">
        <h1 className="font-bold ">Search Result</h1>
        <p className="text-xs text-[#A9A9A9]">{recipes.length} results</p>
      </div>
      {loading ? (
        <Loader />
      ) : // <p>Loading...</p>
        error ? (
          <p className="text-red-500">{error}</p>
        ) : (
          <>
            {recipes.length === 0 && (
              <div className="flex w-full justify-center items-center text-gray-400">
                No Recipes in the selected filters
              </div>
            )}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
              {recipes.map((recipe) => (
                <Card key={recipe.idMeal} recipe={recipe} />
              ))}
            </div>
          </>
        )}
    </div>
  );
};

export default SearchPage;
