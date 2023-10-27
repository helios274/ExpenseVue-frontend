import React from "react";

const SearchBar = React.forwardRef(function searchBar({}, ref) {
  return (
    <div className="flex md:w-[380px] h-full border-[2px] border-quaternary rounded-md dark:border-secondary">
      <input
        type="search"
        placeholder="Search here"
        className="py-1 md:py-2 outline-none px-1 dark:rounded-l-[3px] dark:bg-primary rounded-l-md flex-grow"
      />
      <button className="px-4 bg-quaternary rounded-r-[3px] text-secondary font-medium hover:bg-tertiary dark:border-secondary">
        Search
      </button>
    </div>
  );
});

export default SearchBar;
