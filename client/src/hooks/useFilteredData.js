import { useEffect, useState } from "react";
import { keyMappings } from "../lib/keyMappings";

const useFilteredData = (csvData, filterKeys, filterValues) => {
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    const filterData = () => {
      if (!csvData) return;

      const filtered = csvData.filter((item) =>
        Object.entries(filterKeys).every(([key, isChecked]) => {
          if (!isChecked) return true;

          const { type } = keyMappings[key];

          // add condition to check if filterValues[key] is undefined, if so return true
          if (filterValues[key] === undefined) return true;
          
          const filterValue = filterValues[key];

          switch (type) {
            case "range":
              const { min, max } = filterValue;
              const itemValue = item[key];
              return (
                (min === undefined || min === "" || itemValue >= min) &&
                (max === undefined || max === "" || itemValue <= max)
              );

            case "date":
              const { from, to } = filterValue;
              const itemDate = new Date(item[key]);
              return (
                (from === undefined || itemDate >= new Date(from)) &&
                (to === undefined || itemDate <= new Date(to))
              );
            default:
              return String(item[key])
                .toLowerCase()
                .includes(String(filterValue.value).toLowerCase());
          }
        })
      );

      // Find the first active filter key to sort by
      const activeFilterKey = Object.keys(filterKeys).find(
        (key) => filterKeys[key]
      );

      setFilteredData(filtered);
    };

    filterData();
  }, [filterValues, csvData]);

  return filteredData;
};

export default useFilteredData;
