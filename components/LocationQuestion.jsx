import Image from "next/image";
import {useEffect, useState} from "react";
import useGeoLocation from "../hooks/useGeoLocation";
import distanceFromLocation from "../utils/distanceFromLocation";
import {locationCoordinates} from "../data/locationCoordinates";

export default function LocationQuestion({imgUrl, setQuestionsNum, questionsNum, totalQue, setAnswer, answer}) {
    const hint = "Find this location, and get the new clue there!";
    const [distance, setDistance] = useState(0);
    const {loading, coordinates} = useGeoLocation();

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
    return (<>
        <div className="relative w-full h-64">
            <Image
                src={imgUrl}
                alt="Question Image"
                layout="fill"
                objectFit="cover"
                className="w-full h-full rounded-md absolute"
            />
        </div>
        <div className="text-slate-500 text-sm p-4">
            Hint: {hint}
        </div>
        <div className="w-full bg-slate-900 rounded-md py-4 text-slate-400 text-sm px-4">
            <p className="text-slate-300 mb-4">Your Progress</p>
            <div className="flex py-1">
                <p className="flex-1">Latitude:</p>
                <p className="flex-1">{coordinates.latitude}</p>
            </div>
            <div className="flex py-1">
                <p className="flex-1">Longitude:</p>
                <p className="flex-1">{coordinates.longitude}</p>
            </div>
            <div className="flex py-1">
                <p className="flex-1">Distance Remaining:</p>
                <p className="flex-1">{distance.toFixed(3)}m</p>
            </div>
        </div>
        <div className="flex w-full justify-center mt-8">
            <button
                onClick={(e) => {
                    if (!e.target.className.split(" ").includes("cursor-not-allowed") && totalQue > questionsNum) {
                        setQuestionsNum(questionsNum + 1);
                        const ans = answer
                        ans.push(true)
                        setAnswer(ans)
                    }
                }}
                className={`${distance > 150 ? "cursor-not-allowed" : ""} text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-6 py-2.5 text-center mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800`}
            >
                Next
            </button>
        </div>
    </>)
}
