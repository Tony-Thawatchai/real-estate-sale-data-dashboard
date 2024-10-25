import React from "react";
import { keyMappings } from "../../lib/keyMappings";
import { Card, CardHeader, CardTitle, CardContent } from "../ui/Card";
import RangeFilter from "./RangeFilter";
import DateFilter from "./DateFilter";
import StringFilter from "./StringFilter";

function FilterCard({
  cardKey,
  filterKeys,
  handleFilterKeyChange,
  handleFilterValueChange,
}) {
  const isSelected = filterKeys[cardKey];

  const handleCardClick = () => {
    handleFilterKeyChange(cardKey, !isSelected);
  };

  const handleInputClick = (e) => {
    e.stopPropagation();
  };

  const renderInput = () => {
    const { type, displayName } = keyMappings[cardKey];

    switch (type) {
      case "range":
        return (
          <RangeFilter
            displayName={displayName}
            filterValue={filterKeys[cardKey]}
            onChange={(value) => handleFilterValueChange(cardKey, value)}
            onClick={handleInputClick}
          />
        );
      case "date":
        return (
          <DateFilter
            displayName={displayName}
            filterValue={filterKeys[cardKey]}
            onChange={(value) => handleFilterValueChange(cardKey, value)}
            onClick={handleInputClick}
          />
        );
      default:
        return (
          <StringFilter displayName={displayName} filterValue={filterKeys[cardKey]} onChange={(value) => handleFilterValueChange(cardKey, value)} onClick={handleInputClick} />
        );
    }
  };

  const { displayName } = keyMappings[cardKey];

  return (
    <Card
      className={`w-full cursor-pointer  ${isSelected ? "bg-sparkOrange" : ""}`}
      onClick={handleCardClick}
    >
      <CardHeader>
        <CardTitle className="!text-sm font-normal">{displayName}</CardTitle>
      </CardHeader>
      {isSelected && <CardContent>{renderInput()}</CardContent>}
    </Card>
  );
}

export default FilterCard;
