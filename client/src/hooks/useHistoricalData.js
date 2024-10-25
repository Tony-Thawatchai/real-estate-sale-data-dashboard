// custom hook to process the data of each unit sold to monthly average price per square foot by each room type (1-3 bedrooms)

// example data
// "id","area_sqft","bedrooms","bathrooms","price","date","address","latitude","longitude"
// "57782","817","1","1","1240000","2023-01-16","1550 ALBERNI STREET","49.2898","-123.13131"
// "57849","3018","3","4","3930000","2023-06-01","2088 BARCLAY STREET","49.2925","-123.14203"
// "87394","1940","2","3","1928000","2023-07-06","2150 40TH AVENUE W","49.23526","-123.15672"
// "38119","1360","2","2","1350000","2023-07-12","1480 HOWE STREET","49.27489","-123.13117"
// "116559","733","2","2","865000","2023-02-01","8189 CAMBIE STREET","49.21013","-123.11834"
// "97088","918","2","2","1188000","2023-01-11","528 KING EDWARD AVENUE W","49.2488157","-123.116557"
// "37891","802","2","2","838000","2023-04-15","2689 KINGSWAY","49.23867","-123.05047"
// "28174","812","2","2","935000","2023-02-23","38 SMITHE STREET","49.2745863","-123.1128816"
// "67640","921","2","2","960000","2023-02-04","1383 MARINASIDE CRESCENT","49.27177","-123.12209"

// output
// [
// { month: "January", oneBedroom: 1000, twoBedroom: 1200, threeBedroom: 1500 },
// { month: "February", oneBedroom: 1100, twoBedroom: 1300, threeBedroom: 1600 },
// ]
import { useState, useEffect } from "react";

const useHistoricalData = (csvData) => {
  const [historicalData, setHistoricalData] = useState([]);

  useEffect(() => {
    const processData = () => {
      if (!csvData) return;
      const monthlyData = csvData.reduce((acc, unit) => {
        const date = new Date(unit.date);
        const month = date.toLocaleString("default", { month: "long" });
        const year = date.getFullYear();
        const type = unit.bedrooms;

        if (!acc[`${month} ${year}`]) {
          acc[`${month} ${year}`] = {
            oneBedroom: [],
            twoBedroom: [],
            threeBedroom: [],
          };
        }

        switch (type) {
          case 1:
            acc[`${month} ${year}`].oneBedroom.push(
              unit.price / unit.area_sqft
            );
            break;
          case 2:
            acc[`${month} ${year}`].twoBedroom.push(
              unit.price / unit.area_sqft
            );
            break;
          case 3:
            acc[`${month} ${year}`].threeBedroom.push(
              unit.price / unit.area_sqft
            );
            break;
        }

        return acc;
      }, {});

      const processedData = Object.keys(monthlyData).map((key) => {
        const data = monthlyData[key];
        const oneBedroom =
          data.oneBedroom.length > 0
            ? data.oneBedroom.reduce((acc, price) => acc + price, 0) /
              data.oneBedroom.length
            : 0;
        const twoBedroom =
          data.twoBedroom.length > 0
            ? data.twoBedroom.reduce((acc, price) => acc + price, 0) /
              data.twoBedroom.length
            : 0;
        const threeBedroom =
          data.threeBedroom.length > 0
            ? data.threeBedroom.reduce((acc, price) => acc + price, 0) /
              data.threeBedroom.length
            : 0;

        return {
          month: key,
          oneBedroom: Math.round(oneBedroom),
          twoBedroom: Math.round(twoBedroom),
          threeBedroom: Math.round(threeBedroom),
        };
      });

      //   reverse the order of the data
    //   processedData.reverse();
      setHistoricalData(processedData);
    };

    processData();
  }, [csvData]);

  return historicalData;
};

export default useHistoricalData;
