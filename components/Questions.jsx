import NormalQuestion from "./NormalQuestion";
import LocationQuestion from "./LocationQuestion";
import FinalPage from "./FinalPage";
import { useAuth } from "../context/AuthContext";
import { questions } from "../data/questions";

export default function Questions() {
  const { questionsNum } = useAuth();
  const questionsPage = [
    <NormalQuestion
      totalQue={7}
      key={1}
      question={questions.Q1.question}
      hint={questions.Q1.hint}
      points={questions.Q1.points}
      answer={questions.Q1.answer}
    />,
    <LocationQuestion
      totalQue={7}
      key={2}
      imgUrl={questions.Q2.url}
      latitude={questions.Q2.latitude}
      longitude={questions.Q2.longitude}
    />,
    <NormalQuestion
      totalQue={7}
      key={3}
      question={questions.Q3.question}
      hint={questions.Q3.hint}
      points={questions.Q3.points}
      answer={questions.Q3.answer}
    />,

    <LocationQuestion
      totalQue={7}
      key={4}
      imgUrl={questions.Q4.url}
      latitude={questions.Q4.latitude}
      longitude={questions.Q4.longitude}
    />,
    <NormalQuestion
      totalQue={7}
      key={5}
      question={questions.Q5.question}
      hint={questions.Q5.hint}
      points={questions.Q5.points}
      answer={questions.Q5.answer}
    />,
    <LocationQuestion
      totalQue={7}
      key={6}
      imgUrl={questions.Q6.url}
      latitude={questions.Q6.latitude}
      longitude={questions.Q6.longitude}
    />,
    <NormalQuestion
      totalQue={7}
      key={7}
      question={questions.Q7.question}
      hint={questions.Q7.hint}
      points={questions.Q7.points}
      answer={questions.Q7.answer}
    />,
    <FinalPage key={7} />,
  ];
  return (
    <div className="max-w-[30rem] p-8 md:p-6 mb-8 shadow-lg shadow-slate-800/50 border border-slate-600 rounded-xl mx-2">
      {questionsPage[questionsNum]}
    </div>
  );
}
