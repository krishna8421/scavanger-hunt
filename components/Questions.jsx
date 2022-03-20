import NormalQuestion from "./NormalQuestion";
import LocationQuestion from "./LocationQuestion";
import { useEffect, useState } from "react";
import FinalPage from "./FinalPage";
import { doc, updateDoc, getDoc } from "firebase/firestore";
import { db } from "../firebase";
import { useAuth } from "../context/AuthContext";
import { questions } from "../data/questions";

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

  const questionsPage = [
    <NormalQuestion
      answer={answer}
      setAnswer={setAnswer}
      totalQue={4}
      key={1}
      question={questions.Q1.question}
      hint={questions.Q1.hint}
    />,
    <LocationQuestion
      answer={answer}
      setAnswer={setAnswer}
      totalQue={4}
      key={2}
      imgUrl={questions.Q2.url}
      hint={questions.Q2.hint}
    />,
    <NormalQuestion
      answer={answer}
      setAnswer={setAnswer}
      totalQue={4}
      key={3}
      question={questions.Q3.question}
      hint={questions.Q3.hint}
    />,

    <LocationQuestion
      answer={answer}
      setAnswer={setAnswer}
      totalQue={4}
      key={4}
      imgUrl={questions.Q2.url}
      hint={questions.Q4.hint}
    />,
    <FinalPage key={5} />,
  ];
  return (
    <div className="max-w-[30rem] p-12 md:p-6 mb-8 shadow-lg shadow-slate-800/50 border border-slate-600 rounded-xl mx-2">
      {questionsPage[questionsNum]}
    </div>
  );
}
