import NormalQuestion from "./NormalQuestion";
import LocationQuestion from "./LocationQuestion";
import { useEffect, useState } from "react";
import FinalPage from "./FinalPage";
import { doc, updateDoc, getDoc } from "firebase/firestore";
import { db } from "../firebase";
import { useAuth } from "../context/AuthContext";

export default function Questions() {
  const [answer, setAnswer] = useState([]);
  const { user, questionsNum, loading } = useAuth();
  useEffect(() => {
    if (user) {
      const saveAnswer = async () => {
        const AnsDocRef = doc(db, "answers", user.uid);
        const res = await getDoc(AnsDocRef);
        const data = res.data();
        console.log(data);
        if (!data?.answer && !loading) {
          await updateDoc(AnsDocRef, {
            answer: answer,
          });
        }
      };
      if (questionsNum === 4 && user) {
        saveAnswer().then();
      }
    }
  }, [questionsNum]);

  const questions = [
    <NormalQuestion
      answer={answer}
      setAnswer={setAnswer}
      totalQue={4}
      key={1}
      question={"1"}
      hint={"Please enter your name and age"}
    />,
    <LocationQuestion
      answer={answer}
      setAnswer={setAnswer}
      totalQue={4}
      key={2}
      imgUrl={"/place.jpeg"}
    />,
    <NormalQuestion
      answer={answer}
      setAnswer={setAnswer}
      totalQue={4}
      key={3}
      question={"3"}
      hint={"Please enter your name and age"}
    />,

    <LocationQuestion
      answer={answer}
      setAnswer={setAnswer}
      totalQue={4}
      key={4}
      imgUrl={"/place.jpeg"}
    />,
    <FinalPage key={5} />,
  ];
  return (
    <div className="max-w-[30rem] p-4 md:p-6 shadow-lg shadow-slate-800/50 border border-slate-600 rounded-xl mx-2">
      {questions[questionsNum]}
    </div>
  );
}
