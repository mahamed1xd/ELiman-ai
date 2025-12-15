'use client'
import Link from "next/link"
import { useEffect, useState } from "react"

export default function quizesPage() {
    const [quizes, setQuizes] = useState([])
    const [selectedQuiz, setSelectedQuiz] = useState(null)
    const handelQuiz = (quiz) => {
        setSelectedQuiz(quiz)
        console.log(quiz);
        
        document.getElementById('my_modal_1').showModal()
    }
    useEffect(() => {
        const getQuizes = async () => {
            const res = await fetch('https://basera-quizs.vercel.app/api/categories')
            const data = await res.json()
            setQuizes(data)
            console.log(data);
        }
        getQuizes()
    }, [])
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
        {quizes.map((quiz, i) => (
            <div key={i} className="bg-base-100 cursor-pointer shadow-lg m-2 rounded-2xl hover:bg-base-200 border-1 border-base-200 duration-300 hover:scale-105"
           onClick={() => {handelQuiz(quiz)}}
           >
                <div className="card-body direction-rtl text-right">
                    <h2 className="card-title text-primary cursor-pointer">أسئلة : {quiz.arabicName}</h2>
                    <p className="text-base-content cursor-pointer text-md">{quiz.description}</p>
                </div>
            </div>
        ))}
        {/* Open the modal using document.getElementById('ID').showModal() method */}
<dialog id="my_modal_1" className="modal">
  <div className="modal-box w-[80%] max-h-[95vh]">
    <h3 className="font-bold text-lg">{selectedQuiz?.arabicName}</h3>
    {selectedQuiz?.topics.map((topic, i) => (
        <p key={i} className="p-4">{topic.name}</p>
    ))}
    <div className="modal-action">
      <form method="dialog">
        {/* if there is a button in form, it will close the modal */}
        <button className="btn">Close</button>
      </form>
    </div>
  </div>
</dialog>
        </div>
    )
}