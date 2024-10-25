import { useMemo } from "react";

const useProcessOverviewData = (csvData) => {
  const overviewData = useMemo(() => {
    if (!csvData) return null;

    const overviewData = {
      lengthOfData: {
        start: null,
        end: null,
      },
      averagePrice: {
        oneBedroom: 0,
        twoBedroom: 0,
      },
      averagePricePerSqFt: {
        oneBathroom: 0,
        twoBathroom: 0,
      },
      totalTransactions: 0,
      topMonths: [],
      bottomMonths: [],
    };

    const oneBedroomPrices = [];
    const twoBedroomPrices = [];
    const oneBathroomPrices = [];
    const twoBathroomPrices = [];
    const transactionMonths = {};

    csvData.forEach((item) => {
      const transactionDate = new Date(item.date);
      const year = transactionDate.getFullYear();
      if (
        !overviewData.lengthOfData.start ||
        year < overviewData.lengthOfData.start
      ) {
        overviewData.lengthOfData.start = year;
      }
      if (
        !overviewData.lengthOfData.end ||
        year > overviewData.lengthOfData.end
      ) {
        overviewData.lengthOfData.end = year;
      }
      const price = parseFloat(item.price);
      const sqFt = parseFloat(item.area_sqft);
      const bedrooms = parseInt(item.bedrooms);
      const bathrooms = parseInt(item.bathrooms);
      const month = transactionDate.toLocaleString("default", {
        month: "long",
      });

      if (bedrooms === 1) {
        oneBedroomPrices.push(price);
      } else if (bedrooms === 2) {
        twoBedroomPrices.push(price);
      }

      if (bathrooms === 1) {
        oneBathroomPrices.push(price / sqFt);
      } else if (bathrooms === 2) {
        twoBathroomPrices.push(price / sqFt);
      }

      if (!transactionMonths[month]) {
        transactionMonths[month] = 0;
      }
      transactionMonths[month]++;
    });

    overviewData.averagePrice.oneBedroom =
      oneBedroomPrices.reduce((acc, price) => acc + price, 0) /
      oneBedroomPrices.length;
    overviewData.averagePrice.twoBedroom =
      twoBedroomPrices.reduce((acc, price) => acc + price, 0) /
      twoBedroomPrices.length;
    overviewData.averagePricePerSqFt.oneBathroom =
      oneBathroomPrices.reduce((acc, price) => acc + price, 0) /
      oneBathroomPrices.length;
    overviewData.averagePricePerSqFt.twoBathroom =
      twoBathroomPrices.reduce((acc, price) => acc + price, 0) /
      twoBathroomPrices.length;
    overviewData.totalTransactions = csvData.length;
    overviewData.topMonths = Object.entries(transactionMonths)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 3);
    overviewData.bottomMonths = Object.entries(transactionMonths)
      .sort((a, b) => a[1] - b[1])
      .slice(0, 3);

    return overviewData;
  }, [csvData]);

  return overviewData;
};

export default useProcessOverviewData;