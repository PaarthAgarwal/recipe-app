import Image from "next/image";
import React from "react";
import { FaStar } from "react-icons/fa";

type Recipe = {
  strMeal: string;
  strMealThumb: string;
};

type Props = {
  recipe: Recipe;
};

const SearchCard = ({ recipe }: Props) => {
  return (
    <div className="relative aspect-square rounded-xl">
      <div className="bg-gradient-to-t rounded-xl from-black to-transparent w-full h-full absolute" />
      <Image
        src={recipe.strMealThumb}
        alt={recipe.strMeal}
        className="rounded-xl h-full w-full object-cover"
        width={1000}
        height={1000}
        unoptimized
      />
      <div className="absolute top-5 right-5 bg-[#FFE1B3] rounded-full px-2 py-0.5 justify-center items-center flex flex-row space-x-1">
        <FaStar color="#FFAD30" size={12} />
        <span className="text-xs">4.0</span>
      </div>
      <div className="absolute flex-col bottom-2 left-2 md:bottom-5 md:left-5 rounded-xl">
        <h1 className="text-white text-sm font-semibold w-4/5">
          {recipe.strMeal}
        </h1>
        <p className="text-[#A9A9A9] text-sm">By Chef Paarth</p>
      </div>
    </div>
  );
};

export default SearchCard;