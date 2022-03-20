import Image from "next/image";
import { useEffect, useState } from "react";
import useGeoLocation from "../hooks/useGeoLocation";
import distanceFromLocation from "../utils/distanceFromLocation";
import { locationCoordinates } from "../data/locationCoordinates";
import { useAuth } from "../context/AuthContext";
import { doc, updateDoc, increment } from "firebase/firestore";
import { db } from "../firebase";

export default function LocationQuestion({ imgUrl, totalQue, setAnswer, answer }) {
  const hint = "Find this location, and get the new clue there!";
  const [distance, setDistance] = useState(0);
  const [inputVal, setInputVal] = useState("");
  const { loading, err, coordinates } = useGeoLocation();
  const { questionsNum, setQuestionsNum } = useAuth();
  const { user } = useAuth();
  useEffect(() => {
    if (!loading && coordinates) {
      setDistance(
        distanceFromLocation(
          coordinates.latitude,
          locationCoordinates.first.latitude,
          coordinates.longitude,
          locationCoordinates.first.longitude,
        ) * 1000,
      );
    }
  }, [coordinates, loading]);

  if (err) {
    return <div>Errrrr</div>;
  }
  return (
    <>
      <div className="relative w-full h-64">
        <Image
          src={imgUrl}
          alt="Question Image"
          layout="fill"
          objectFit="cover"
          className="w-full h-full rounded-md absolute"
        />
      </div>
      <div className="text-slate-500 text-sm p-4">Hint: {hint}</div>
      <div className="w-full bg-slate-900 rounded-md py-4 text-slate-400 text-sm px-4">
        <p className="text-slate-300 mb-4">Your Progress</p>
        <div className="flex py-1">
          <p className="flex-1">Latitude:</p>
          <p className="flex-1">{coordinates?.latitude ? coordinates.latitude : "loading..."}</p>
        </div>
        <div className="flex py-1">
          <p className="flex-1">Longitude:</p>
          <p className="flex-1">{coordinates?.longitude ? coordinates.longitude : "loading..."}</p>
        </div>
        <div className="flex py-1">
          <p className="flex-1">Distance Remaining:</p>
          <p className="flex-1">{distance?.toFixed(3)}m</p>
        </div>
      </div>
      <div className="mt-8 text-md text-slate-300 ">
        <p>Answer</p>
        <input
          type="text"
          onChange={(e) => setInputVal(e.target.value)}
          className="w-full rounded-lg bg-slate-900 mt-4 h-12 p-4 focus:ring-1 focus:ring-slate-700 focus:outline-none"
        />
      </div>
      <div className="flex w-full justify-center mt-8">
        <button
          onClick={async (e) => {
            if (
              !e.target.className.split(" ").includes("cursor-not-allowed") &&
              totalQue > questionsNum &&
              user
            ) {
              setQuestionsNum(parseInt(questionsNum, 10) + 1);
              const AnsDocRef = doc(db, "answers", user.uid);
              await updateDoc(AnsDocRef, {
                qNum: increment(1),
              });
              const ans = answer;
              ans.push(inputVal.toLowerCase().trim());
              setAnswer(ans);
            }
          }}
          className={`${
            distance > 100 || !coordinates?.latitude || inputVal === "" ? "cursor-not-allowed" : ""
          } text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-6 py-2.5 text-center mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800`}
        >
          Next
        </button>
      </div>
    </>
  );
}
