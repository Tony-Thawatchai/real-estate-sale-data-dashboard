// custom hook to generate marker location that inside bounds
import { useEffect, useState } from "react";

const useInBoundMarkers = (bounds, filteredData) => {
  const [inBoundMarkers, setInBoundMarkers] = useState([]);

  useEffect(() => {
    if (bounds) {
      const inBoundMarker = filteredData.filter((location) => {
        return (
          location.longitude >= bounds._sw.lng &&
          location.longitude <= bounds._ne.lng &&
          location.latitude >= bounds._sw.lat &&
          location.latitude <= bounds._ne.lat
        );
      });
      setInBoundMarkers(inBoundMarker);
    }
  }, [bounds, filteredData]);

  return inBoundMarkers;
};

export default useInBoundMarkers;