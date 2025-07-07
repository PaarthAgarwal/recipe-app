import SearchPage from "@/containers/Search/Search";
import { Suspense } from "react";
const page = () => {
  return (
    <Suspense>
      <div className="overflow-x-hidden">
        <SearchPage />
      </div>
    </Suspense>
  );
};

export default page;
