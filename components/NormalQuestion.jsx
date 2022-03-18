import {useState} from "react";

export default function NormalQuestion({question, hint, setQuestionsNum, questionsNum, totalQue, setAnswer, answer}) {
    const [inputVal, setInputVal] = useState("");
    return (<>
        <div
            className="rounded-xl w-full bg-gray-900 py-2 px-4 mt-2 border border-slate-800 text-slate-300 overflow-x-hidden text-lg">
            {question}
        </div>
        <div className="text-slate-500 text-sm p-4">
            Hint: {hint}
        </div>
        <div className="mt-8 text-md text-slate-300 ">
            <p>Answer</p>
            <input
                type="text"
                onChange={(e) => setInputVal(e.target.value)}
                className="w-full rounded-lg bg-slate-900 mt-4 h-12 p-4 focus:ring-1 focus:ring-slate-700 focus:outline-none"/>
        </div>
        <div className="flex w-full justify-center mt-8">
            <button
                onClick={(e) => {
                    if (!e.target.className.split(" ").includes("cursor-not-allowed") && totalQue > questionsNum) {
                        setQuestionsNum(questionsNum + 1);
                        const ans = answer
                        ans.push(inputVal.toLowerCase().trim())
                        setAnswer(ans)
                    }
                }}
                className={`${inputVal === "" ? "cursor-not-allowed" : ""} text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-6 py-2.5 text-center mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800`}
            >
                Next
            </button>
        </div>
    </>)
}
