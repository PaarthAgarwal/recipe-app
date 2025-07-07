"use client";

import Card from "@/components/Card/Card";
import Loader from "@/components/Loader";
import React, { useState, useEffect } from "react";

const categoryList = [
  { id: 1, name: "All", slug: "all" },
  { id: 2, name: "Chicken", slug: "chicken" },
  { id: 3, name: "Vegetarian", slug: "vegetarian" },
  { id: 4, name: "Dessert", slug: "dessert" },
];

const PREVIEW_CATEGORIES = ["Chicken", "Vegetarian", "Dessert"];

const Categories = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [recipes, setRecipes] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRecipes = async () => {
      setLoading(true);
      setError(null);

      try {
        let meals: any[] = [];

        if (selectedCategory === "All") {
          const promises = PREVIEW_CATEGORIES.map(async (cat) => {
            const res = await fetch(
              `https://www.themealdb.com/api/json/v1/1/filter.php?c=${cat}`
            );
            const data = await res.json();
            return data.meals || [];
          });

          const results = await Promise.all(promises);
          meals = results.flat();

          meals = meals.sort(() => 0.5 - Math.random());
        } else {
          const url = `https://www.themealdb.com/api/json/v1/1/filter.php?c=${selectedCategory}`;
          const res = await fetch(url);
          const data = await res.json();
          meals = data.meals || [];
        }

        setRecipes(meals);
      } catch (e) {
        setError("Failed to fetch recipes");
        console.error("Error fetching recipes:", e);
      } finally {
        setLoading(false);
      }
    };

    fetchRecipes();
  }, [selectedCategory]);

  return (
    <div className="flex flex-col space-y-5">
      <div className="flex flex-row justify-evenly items-center">
        {categoryList.map((value) => (
          <button
            key={value.id}
            className={`${value.name === selectedCategory
              ? "bg-[#129575] rounded-xl text-white"
              : "text-[#129575]"
              } px-4 py-2 text-sm cursor-pointer`}
            onClick={() => setSelectedCategory(value.name)}
          >
            {value.name}
          </button>
        ))}
      </div>

      <div className="overflow-x-scroll z-30">
        {loading ? (
          <Loader />
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
            {recipes.map((recipe) => (
              <Card key={recipe.idMeal} recipe={recipe} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Categories;