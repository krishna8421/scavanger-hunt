import useGeoLocation from "../hooks/useGeoLocation";
import distanceFromLocation from "../utils/distanceFromLocation";
import { locationCoordinates } from "../data/locationCoordinates";
import { useEffect, useState } from "react";
import NavBar from "../components/NavBar";
import moment from "moment";

export default function Home() {
  const [distance, setDistance] = useState(0);
  const { loading, coordinates, reload } = useGeoLocation();

  useEffect(() => {
    if (!loading && coordinates) {
      setDistance(
        distanceFromLocation(
          coordinates.latitude,
          locationCoordinates.first.latitude,
          coordinates.longitude,
          locationCoordinates.first.longitude
        ) * 1000
      );
    }
  }, [coordinates, loading]);

  return (
    <div className="flex flex-col items-center">
      <NavBar />
      <div className="mt-[10vh] flex flex-col items-center p-4 bg-slate-100 h-48 w-96 rounded-xl">
        <p className="text-lg font-semibold pb-3 ">Your Location</p>
        <div className="flex flex-col w-10/12">
        <span className="py-3">Latitude:   &nbsp;&nbsp;&nbsp; &nbsp;{coordinates.latitude}</span>
        <span className="py-3">Longitude:   &nbsp;&nbsp;{coordinates.longitude}</span>
        </div>
      </div>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div>
          <pre>{JSON.stringify(coordinates, null, 2)}</pre>
          <pre> Distance Remaining: {distance.toFixed(3)}m</pre>
        </div>
      )}
      <button onClick={reload}>Refresh</button>
    </div>
  );
}
