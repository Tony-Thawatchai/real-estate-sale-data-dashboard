import { useState, useEffect } from "react";

const useUserLocation = () => {
  const [userLocation, setUserLocation] = useState(null);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setUserLocation({ latitude, longitude });
        },
        (error) => {
          console.error("Error fetching user location:", error);
        }
      );
    }
  }, []);

  return userLocation;
};

export default useUserLocation;