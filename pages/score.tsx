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

  console.log(userDataArray.map((u)=>{
    return {
        name: u.name,
        email: u.email,
        score: u.score,
    }
  }))
  return (
    <div className="flex  flex-col overflow-hidden  text-slate-200 items-center background-main w-screen min-h-screen pt-12">
      {userDataArray.map((user)=> {
        return (
            <div className="flex w-[25rem] mb-16 items-center">
                <h1 className="font-Oxygen mr-8 flex-1">{user.name}</h1>
                <h1 className="text-lg text-center flex-1">{user.score}</h1>
            </div>
        );
      })}
    </div>
  );
};

export default Score;
