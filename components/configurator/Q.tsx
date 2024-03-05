import React from 'react'

interface Props {
    question: string,
    handleQuestion: (answer: boolean) => void
}
export default function Q({question, handleQuestion}: Props) {
  
    return (
    <div className='flex w-full bg-blue-500 text-white'>
        {question}
        <div className="flex">
            <div className="flex">TAK</div>
            <div className="flex">NIE</div>
        </div>
    </div>
  )
}
