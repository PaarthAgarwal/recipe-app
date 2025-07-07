export const fetchRecipesBySearch = async (query: string) => {
  try {
    const response = await fetch(
      `https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`,
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
    console.error("Error fetching recipes:", error);
    throw error;
  }
};
