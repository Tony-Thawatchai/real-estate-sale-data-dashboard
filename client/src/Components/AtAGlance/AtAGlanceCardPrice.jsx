import React from "react";
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "../ui/Card";

const AtAGlaceCardPrice = ({ title, prices , showDescription , isCurrency}) => {
  return (
    <Card className="h-full flex flex-col">
      <CardHeader>
        <CardTitle className="text-h5">{title}</CardTitle>
      </CardHeader>
      <CardContent className="flex justify-around flex-wrap gap-4 flex-grow items-center">
      {Object.entries(prices).map(([key, value]) => (
          <div key={key} className="">
            {isCurrency ? (<p className="text-3xl text-sparkOrange dark:text-sparkOrange text-center font-bold">
              ${value.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </p>) : (<p className="text-3xl text-sparkOrange dark:text-sparkOrange text-center font-bold">
              {value.toLocaleString()}
            </p>)}
           
            {showDescription && (<p className="text-sm text-muted-foreground dark:text-dark-muted-foreground  text-center">
              {key.replace(/([A-Z])/g, ' $1').trim()}:
            </p>)}
            
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default AtAGlaceCardPrice;