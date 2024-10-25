import React from "react";
import FilterCard from "./FilterCard";
import { keyMappings, filterableKeys } from "../../lib/keyMappings";


function FilterWrap({
  filterKeys,
  handleFilterKeyChange,
  handleFilterValueChange,
}) {
  return (
    <div className="flex row flex-wrap gap-0.5 justify-between">
      
      {filterableKeys.map((key) => (
        <div key={key} className="mb-4 w-[49%] ">
          <FilterCard
            cardKey={key}
            displayName={keyMappings[key]}
            filterKeys={filterKeys}
            handleFilterKeyChange={handleFilterKeyChange}
            handleFilterValueChange={handleFilterValueChange}
          />
        </div>
      ))}
      
    </div>
  );
}

export default FilterWrap;
