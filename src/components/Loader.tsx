import React from "react";
import Lottie from "react-lottie";
import animationData from "@/functions/lottie.json";

const defaultOptions = {
  loop: true,
  autoplay: true,
  animationData: animationData,
  rendererSettings: {
    preserveAspectRatio: "xMidYMid slice",
  },
};

const Loader: React.FC = () => {
  return (
    <div className="flex justify-center items-center h-full w-full">
      <Lottie options={defaultOptions} height={100} width={100} />
    </div>
  );
};

export default Loader;
