import { useState, useEffect } from "react";

const useGeoLocation = () => {
  const [location, setLocation] = useState({
    loading: true,
    coordinates: { latitude: "", longitude: "" },
  });
  const [err, setErr] = useState("");

  const onSuccess = (location) => {
    setLocation({
      loading: false,
      coordinates: {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      },
    });
  };

  const onError = (error) => setErr(error.message);

  useEffect(() => {
    if (!("geolocation" in navigator)) {
      onError({
        code: 0,
        message: "Geolocation not supported",
      });
    }
    const interval = setInterval(() => {
      navigator.geolocation.getCurrentPosition(onSuccess, onError);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return {
    loading: location.loading,
    coordinates: location.coordinates,
    err,
  };
};

export default useGeoLocation;
