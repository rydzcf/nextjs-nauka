import React, { useState } from 'react'
import { Switch } from '../ui/switch'

interface Props {
    question: string,
    answer?: boolean
}

export default function Q({question, answer}: Props) {
    if (!answer) answer = false
    const [isToggle, setIsToggle] = useState(answer)
    console.log(isToggle)
    return (
    <div className='flex w-full bg-blue-500 text-white'>
        {question}
        <div className="flex">
            <Switch checked={isToggle}
                      onCheckedChange={() => setIsToggle(!isToggle)}/>
        </div>
    </div>
  )
}
