import { db } from "../firebase";
import { getDocs, collection } from "firebase/firestore";
import { useEffect, useState } from "react";

const Score = () => {
  const [userDataArray, setUserDataArray] = useState([]);
  useEffect(() => {
    const getData = async () => {
      const userRef = collection(db, "users");
      const allData = await getDocs(userRef);
      let dataArr = [];
      allData.forEach((element) => {
        dataArr.push(element.data());
      });
      dataArr.sort((a, b) => b.score - a.score);
      setUserDataArray(dataArr);
    };
    getData();
  }, []);

  console.log(
    userDataArray.map((u) => {
      return {
        name: u.name,
        email: u.email,
        score: u.score,
      };
    }),
  );
  return (
    <div className="flex  flex-col overflow-hidden  text-slate-200 items-center background-main w-screen min-h-screen pt-12">
      {userDataArray.map((user, i) => {
        return (
          <div
            key={i}
            className={`flex sm:w-[30rem] w-11/12 mb-16 items-center p-6 ${
              i === 0 || i === 1 || i === 2
                ? "text-3xl font-semibold border border-slate-700 rounded-xl "
                : ""
            } ${
              i === 0
                ? "bg-[#C9B037]"
                : i === 1
                ? "bg-[#f2f3f4] text-black"
                : i === 2
                ? "bg-[#9f6C36]"
                : ""
            }`}
          >
            <h1 className="font-Oxygen mr-2 flex-1">
              {i === 0 ? `${i + 1}st` : i === 1 ? `${i + 1}nd` : i === 2 ? `${i + 1}rd` : i + 1}
            </h1>
            <h1 className="font-Oxygen mr-8 flex-1">{user.name}</h1>
            <h1 className="text-center flex-1">{user.score}</h1>
          </div>
        );
      })}
    </div>
  );
};

export default Score;
