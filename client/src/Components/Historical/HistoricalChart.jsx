import React from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Line,
  LineChart,
  XAxis,
  YAxis,
} from "recharts";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
} from "../ui/Chart";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/Card";
import TrendingInfo from "./TrendingInfo";
import Loader from "../ui/Loader";
import useHistoricalData from "../../hooks/useHistoricalData";
import { Receipt } from "lucide-react";

function HistoricalChart({ csvData }) {
  // process data for historical chart
  const historicalData = useHistoricalData(csvData);

  const chartConfig = {
    oneBedroom: {
      label: "1 Bedroom",
      color: "#f46b44",
    },
    twoBedroom: {
      label: "2 Bedroom",
      color: "#60a5fa",
    },
    threeBedroom: {
      label: "3 Bedroom",
      color: "#2563eb",
    },
  };

  return (
    <>
      {!historicalData ? (
        <Loader />
      ) : (
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>
              <Receipt className="h-6 w-6 mr-2 inline-block" />
              Average Price/Sq.Ft. by # Bedroom</CardTitle>
            <CardDescription>
              {historicalData[historicalData.length - 1]?.month} -{" "}
              {historicalData[0]?.month}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig}>
              <LineChart
                accessibilityLayer
                data={historicalData}
                margin={{
                  left: 12,
                  right: 12,
                }}
              >
                <CartesianGrid vertical={false} />
                <XAxis
                  dataKey="month"
                  tickLine={false}
                  axisLine={false}
                  tickMargin={8}
                  reversed={true}
                  tickFormatter={(value) => value.slice(0, 3)}
                />
                <YAxis
                  tickLine={false}
                  axisLine={false}
                  tickMargin={8}
                  tickCount={5}
                  tickFormatter={(value) =>
                    new Intl.NumberFormat("en-US", {
                      style: "currency",
                      currency: "CAD",
                      minimumFractionDigits: 0,
                      maximumFractionDigits: 0,
                    }).format(value)
                  }
                />
                <ChartTooltip
                  cursor={false}
                  content={<ChartTooltipContent />}
                />
                <ChartLegend content={<ChartLegendContent />} />
                <Line
                  dataKey="oneBedroom"
                  type="monotone"
                  stroke="var(--color-oneBedroom)"
                  strokeWidth={2}
                  dot={false}
                  
                />
                <Line
                  dataKey="twoBedroom"
                  type="monotone"
                  stroke="var(--color-twoBedroom)"
                  strokeWidth={2}
                  dot={false}
                />
                <Line
                  dataKey="threeBedroom"
                  type="monotone"
                  stroke="var(--color-threeBedroom)"
                  strokeWidth={2}
                  dot={false}
                />
              </LineChart>
            </ChartContainer>
          </CardContent>
          <CardFooter>
            <div className="flex w-full items-start gap-2 text-sm justify-between">
              
                <TrendingInfo
                label="1 Bedroom unit"
                currentValue={historicalData[0]?.oneBedroom}
                previousValue={historicalData[historicalData.length - 1]?.oneBedroom}
              />
              <TrendingInfo
                label="2 Bedrooms unit"
                currentValue={historicalData[0]?.twoBedroom}
                previousValue={historicalData[historicalData.length - 1]?.twoBedroom}
              />
              <TrendingInfo
                label="3 Bedrooms unit"
                currentValue={historicalData[0]?.threeBedroom}
                previousValue={historicalData[historicalData.length - 1]?.threeBedroom}
              />
              
            </div>
          </CardFooter>
        </Card>
      )}
    </>
  );
}

export default HistoricalChart;
