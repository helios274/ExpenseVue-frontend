import React from "react";

const PageNotFound = () => {
  return (
    <div className="flex flex-col mt-16 items-center">
      <h1 className="text-6xl sm:text-9xl font-bold sm:font-extrabold dark:text-secondary">
        404
      </h1>
      <h1 className="text-xl sm:text-3xl font-bold mt-4 dark:text-secondary">
        Requested Page Not Found
      </h1>
    </div>
  );
};

export default PageNotFound;
