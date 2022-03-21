import NormalQuestion from "./NormalQuestion";
import LocationQuestion from "./LocationQuestion";
import FinalPage from "./FinalPage";
import { useAuth } from "../context/AuthContext";
import { questions } from "../data/questions";

export default function Questions() {
  const { questionsNum } = useAuth();
  const questionsPage = [
    <NormalQuestion
      key={1}
      qn={1}
      question={questions.Q1.question}
      difficulty={questions.Q1.difficulty}
      points={questions.Q1.points}
      answer={questions.Q1.answer}
    />,
    <LocationQuestion
      key={2}
      imgUrl={questions.Q2.url}
      latitude={questions.Q2.latitude}
      longitude={questions.Q2.longitude}
      hint={questions.Q2.hint}
    />,
    <NormalQuestion
      key={3}
      qn={2}
      question={questions.Q3.question}
      difficulty={questions.Q3.difficulty}
      points={questions.Q3.points}
      answer={questions.Q3.answer}
    />,

    <LocationQuestion
      key={4}
      imgUrl={questions.Q4.url}
      latitude={questions.Q4.latitude}
      longitude={questions.Q4.longitude}
      hint={questions.Q4.hint}
    />,
    <NormalQuestion
      key={5}
      qn={3}
      question={questions.Q5.question}
      difficulty={questions.Q5.difficulty}
      points={questions.Q5.points}
      answer={questions.Q5.answer}
    />,
    <LocationQuestion
      key={6}
      imgUrl={questions.Q6.url}
      latitude={questions.Q6.latitude}
      longitude={questions.Q6.longitude}
      hint={questions.Q6.hint}
    />,
    <NormalQuestion
      key={7}
      qn={4}
      question={questions.Q7.question}
      difficulty={questions.Q7.difficulty}
      points={questions.Q7.points}
      answer={questions.Q7.answer}
    />,
    <LocationQuestion
      key={8}
      imgUrl={questions.Q8.url}
      latitude={questions.Q8.latitude}
      longitude={questions.Q8.longitude}
      hint={questions.Q8.hint}
    />,
    <NormalQuestion
      key={9}
      qn={5}
      question={questions.Q9.question}
      difficulty={questions.Q9.difficulty}
      points={questions.Q9.points}
      answer={questions.Q9.answer}
    />,
    <FinalPage key={7} />,
  ];
  return (
    <div className="max-w-[30rem] bg-black p-8 md:p-6 mb-8 shadow-lg shadow-slate-800/50 border border-slate-600 rounded-xl mx-2">
      {questionsPage[questionsNum]}
    </div>
  );
}
