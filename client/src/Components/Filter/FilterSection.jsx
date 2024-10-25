import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/Accordian";
import FilterWrap from "./FilterWrap";
import { Search } from 'lucide-react';



function FilterSection({
  filterKeys,
  handleFilterKeyChange,
  handleFilterValueChange,
}) {
  return (
    <div className="mt-16 mb-4 border-y-contrast  border-y-2 ">
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="item-1">
          <AccordionTrigger className="flex items-center justify-between py-4 font-bold ">
            <Search size={24} className="mr-2" />
            <h2 className="flex-grow text-left text-h2 tracking-wide">Filters</h2>
            
          </AccordionTrigger>
          <AccordionContent className="transition-all duration-200 ease-in-out">
            <FilterWrap
              filterKeys={filterKeys}
              handleFilterKeyChange={handleFilterKeyChange}
              handleFilterValueChange={handleFilterValueChange}
            />
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}

export default FilterSection;
