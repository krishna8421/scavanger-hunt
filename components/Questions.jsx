import NormalQuestion from "./NormalQuestion";
import LocationQuestion from "./LocationQuestion";
import {useEffect, useState} from "react";
import FinalPage from "./FinalPage";
import {collection, addDoc} from "firebase/firestore";
import {db} from "../firebase";
import {useAuth} from "../context/AuthContext";


export default function Questions() {
    const [questionsNum, setQuestionsNum] = useState(0);
    const [answer, setAnswer] = useState([]);
    const {user} = useAuth()
    console.log(user)
    useEffect(() => {
        const saveAnswer = async () => {
            await addDoc(collection(db, "answers"), {
                name: user.displayName,
                email: user.email,
                answer,
            });
        };
        if (questionsNum === 4 && user) {
            saveAnswer().then()
        }
    }, [questionsNum])

    const questions = [
        <NormalQuestion
            setQuestionsNum={setQuestionsNum}
            answer={answer}
            setAnswer={setAnswer}
            questionsNum={questionsNum} totalQue={4} key={1}
            question={"What is your name? and what is your age?"}
            hint={"Please enter your name and age"}
        />,
        <LocationQuestion
            setQuestionsNum={setQuestionsNum}
            answer={answer} setAnswer={setAnswer}
            questionsNum={questionsNum}
            totalQue={4} key={2}
            imgUrl={"/place.jpeg"}
        />,
        <NormalQuestion
            setQuestionsNum={setQuestionsNum} answer={answer}
            setAnswer={setAnswer}
            questionsNum={questionsNum}
            totalQue={4} key={3}
            question={"What is your name? and what is your age?"}
            hint={"Please enter your name and age"}
        />,

        <LocationQuestion
            setQuestionsNum={setQuestionsNum}
            answer={answer}
            setAnswer={setAnswer}
            questionsNum={questionsNum}
            totalQue={4} key={4}
            imgUrl={"/place.jpeg"}/>,
        <FinalPage key={5}
        />
    ]
    return (
        <div className="max-w-[30rem] p-4 md:p-6 shadow-lg shadow-slate-800/50 border border-slate-600 rounded-xl mx-2">
            {questions[questionsNum]}
        </div>
    );
}
