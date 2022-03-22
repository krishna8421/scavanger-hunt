import Image from "next/image";
import { useEffect, useState } from "react";
import useGeoLocation from "../hooks/useGeoLocation";
import distanceFromLocation from "../utils/distanceFromLocation";
import { useAuth } from "../context/AuthContext";
import { doc, updateDoc, increment } from "firebase/firestore";
import { db } from "../firebase";
import EnableLocation from "./EnableLocation";
import { TOTAL_Q } from "../constants";

export default function LocationQuestion({ imgUrl, latitude, longitude, hint }) {
  const distanceRange = process.env.NODE_ENV === "development" ? 99999999 : 50;
  const [distance, setDistance] = useState(0);
  const toShow = distance < distanceRange && distance !== 0;
  const { loading, err, coordinates } = useGeoLocation();
  const { questionsNum, setQuestionsNum } = useAuth();
  const { user } = useAuth();

  useEffect(() => {
    if (!loading && coordinates) {
      setDistance(
        distanceFromLocation(coordinates.latitude, latitude, coordinates.longitude, longitude) *
          1000,
      );
    }
  }, [coordinates, loading]);

  if (err) {
    return <EnableLocation />;
  }
  return (
    <>
      <div className="relative sm:h-96 h-80 w-96">
        <Image
          src={imgUrl}
          alt="Question Image"
          layout="fill"
          objectFit="cover"
          className="w-full h-full rounded-md absolute"
        />
      </div>
      <div className="text-slate-500 text-sm p-4">Hint: {hint}</div>

      <div
        className={`w-full bg-slate-900 rounded-md py-4 text-sm px-4 ${
          toShow ? "bg-green-500" : "bg-red-500"
        } text-white`}
      >
        <div className="flex py-1 items-center">
          <p className="flex-1">Distance Remaining:</p>
          <p className="flex-1">{distance?.toFixed(3)}m</p>
        </div>
      </div>
      {toShow ? (
        <span className="text-sm w-full flex text-green-500 justify-center mt-4">
          You can proceed now
        </span>
      ) : (
        ""
      )}

      <div className="flex w-full justify-center mt-8">
        <button
          onClick={async (e) => {
            if (
              !e.target.className.split(" ").includes("cursor-not-allowed") &&
              TOTAL_Q > questionsNum &&
              user
            ) {
              setQuestionsNum(questionsNum + 1);
              const AnsDocRef = doc(db, "users", user.uid);
              await updateDoc(AnsDocRef, {
                qNum: increment(1),
              });
            }
          }}
          className={`${
            distance > distanceRange || distance === 0 || !coordinates?.latitude
              ? "cursor-not-allowed"
              : ""
          } text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-6 py-2.5 text-center mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800`}
        >
          Next
        </button>
      </div>
    </>
  );
}
