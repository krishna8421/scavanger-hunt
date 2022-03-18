import React, { useState, useEffect } from "react";

const useGeoLocation = () => {
  const [location, setLocation] = useState({
    loading: true,
    coordinates: { latitude: "", longitude: "" },
  });
  const [reload, setReload] = useState(false);

  const onSuccess = (location) => {
    setLocation({
      loading: false,
      coordinates: {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      },
    });
    setReload(false);
  };

  const onError = (error) => {
    setLocation({
      loading: false,
      error: {
        code: error.code,
        message: error.message,
      },
    });
  };

  useEffect(() => {
    if (!("geolocation" in navigator)) {
      onError({
        code: 0,
        message: "Geolocation not supported",
      });
    }
    setInterval(() => {
      navigator.geolocation.getCurrentPosition(onSuccess, onError);
    }, 1000);
  }, []);

  return {
    loading: location.loading,
    coordinates: location.coordinates,
    reload: () => setReload(!reload),
  };
};

export default useGeoLocation;
