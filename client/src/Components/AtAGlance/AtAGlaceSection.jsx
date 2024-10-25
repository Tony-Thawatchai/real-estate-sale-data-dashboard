import React from "react";
import {
  Card,
  CardHeader,
  CardContent,
  CardTitle,
  CardDescription,
} from "../ui/Card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../ui/Carousel";
import AtAGlaceCardPrice from "./AtAGlanceCardPrice";
import { Glasses } from 'lucide-react';

function AtAGlaceSection({ processOverviewData }) {
  return (
    <div>
      <Card className="w-full mt-4">
        <CardHeader>
          <CardTitle className="flex items-center">
            {/* add glasses icon */}
            <Glasses size={24} className="inline-block mr-2" />
            At a Glance</CardTitle>
          <CardDescription>
            Overview of real estate sale in{" "}
            {processOverviewData.lengthOfData.start ===
            processOverviewData.lengthOfData.end
              ? processOverviewData.lengthOfData.start
              : `${processOverviewData.lengthOfData.start} - ${processOverviewData.lengthOfData.end}`}
          </CardDescription>
        </CardHeader>
        <CardContent className="flex justify-center">
          <Carousel
            className="w-full max-w-[85%] "
            opts={{
              align: "start",
              loop: true,
            }}
          >
            <CarouselContent>
              <CarouselItem className="md:basis-1/2 lg:basis-1/3">
                <AtAGlaceCardPrice
                  title="Average Price"
                  prices={processOverviewData.averagePrice}
                  showDescription={true}
                  isCurrency={true}
                />
              </CarouselItem>
              <CarouselItem className="md:basis-1/2 lg:basis-1/3">
                <AtAGlaceCardPrice
                  title="Average Price Per SqFt"
                  prices={processOverviewData.averagePricePerSqFt}
                  showDescription={true}
                  isCurrency={true}
                />
              </CarouselItem>
              <CarouselItem className="md:basis-1/2 lg:basis-1/3">
                <AtAGlaceCardPrice
                  title="Total Transactions"
                  prices={{
                    "Total Transactions": processOverviewData.totalTransactions,
                  }}
                  showDescription={false}
                  isCurrency={false}
                />
              </CarouselItem>
              <CarouselItem className="md:basis-1/2 lg:basis-1/3">
                <AtAGlaceCardPrice
                  title="Most active months"
                  prices={Object.fromEntries(processOverviewData.topMonths)}
                  showDescription={true}
                  isCurrency={false}
                />
              </CarouselItem>
              <CarouselItem className="md:basis-1/2 lg:basis-1/3">
                <AtAGlaceCardPrice
                  title="Least active months"
                  prices={Object.fromEntries(processOverviewData.bottomMonths)}
                  showDescription={true}
                  isCurrency={false}
                />
              </CarouselItem>
            </CarouselContent>
            <CarouselPrevious>Previous</CarouselPrevious>
            <CarouselNext>Next</CarouselNext>
          </Carousel>
        </CardContent>
      </Card>
    </div>
  );
}

export default AtAGlaceSection;
