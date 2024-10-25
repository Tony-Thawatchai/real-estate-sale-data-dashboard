// TrendingInfo.jsx
import React from "react";
import { TrendingUp, TrendingDown } from "lucide-react";

const TrendingInfo = ({ label, currentValue, previousValue }) => {
  const isTrendingDown = currentValue < previousValue;
  const trendPercentage = (
    ((currentValue - previousValue) / previousValue) *
    100
  ).toFixed(2);

  return (
    <div className="flex items-start gap-2 font-medium leading-none flex-col ">
      <p>
        {label} is trending {isTrendingDown ? "down" : "up"}{" "}
      </p>
      <p>
        by {trendPercentage}% this period{" "}
        {isTrendingDown ? (
          <TrendingDown className="h-4 w-4 inline-block " />
        ) : (
          <TrendingUp className="h-4 w-4 inline-block" />
        )}
      </p>
    </div>
  );
};

export default TrendingInfo;
