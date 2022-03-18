import {useState, useEffect} from "react";

const useGeoLocation = () => {
    const [location, setLocation] = useState({
        loading: true,
        coordinates: {latitude: "", longitude: ""},
    });

    const onSuccess = (location) => {
        setLocation({
            loading: false,
            coordinates: {
                latitude: location.coords.latitude,
                longitude: location.coords.longitude,
            },
        });
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
        const interval = setInterval(() => {
            navigator.geolocation.getCurrentPosition(onSuccess, onError);
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    return {
        loading: location.loading,
        coordinates: location.coordinates,
    };
};

export default useGeoLocation;
