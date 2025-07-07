
import Image from "next/image";
import React from "react";

const Header = () => {
  return (
    <div className="flex flex-row justify-between items-center h-full ">
      <div className="flex flex-col space-y-1">
        <h1 className="text-xl font-semibold">Hello Jay</h1>
        <p className="text-xs text-gray-400">What are you having today?</p>
      </div>
      <Image
        src="/profile-image.png"


        alt=""
        width={1000}
        height={1000}
        className="bg-[#FFCE80] w-10 h-10 rounded-xl"
      />
    </div>
  );
};

export default Header;
