"use client"
import Image from 'next/image';

import React, { useState } from 'react';
import Calendar from 'react-calendar';
// css imported in layout
type ValuePiece = Date | null;
type Value = ValuePiece | ValuePiece[];

const events = [
    {
        id: 1,
        title: "Lorem ipsum dolo",
        description: "Lorem, ipsum drporis!",
        time: "10:00 AM",
    },
    {
        id: 2,
        title: "Lorem ipsum dolor",
        description: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Deserunt ducimus vel laudantium mollitia fugiat, exercitationem blanditiis explicabo modi quae corporis!",
        time: "10:00 AM",
    }, {
        id: 3,
        title: "Lorem ipsulo",
        description: "Lorem, ipsum drporis!",
        time: "10:00 AM",
    }, {
        id: 4,
        title: "Lorem ipsum dolo",
        description: "Lorem, ipsum drporis!",
        time: "10:00 AM",
    }

]

const EventCalendar = () => {
    const [value, onChange] = useState<Value>(new Date())
    return (
        <div className='bg-white p-4 rounded-md'>
            <Calendar onChange={onChange as any} value={value as any} />
            <div className='flex items-center justify-between'>
                <h1 className='text-lg font-semibold' >Events</h1>
                <Image src="/moreDark.png" alt="more" width={20} height={20} />
            </div>
            <div className='flex flex-col gap-4' >
                {events.map((event) => (
                    <div className='p-5 rounded-md border-2  bg-gray-100 border-t-4 odd:border-t-lamaSky even:border-t-lamaPurple' key={event.id}>
                        <div className='flex justify-between items-center'>
                            <h1 className='font-semibold text-gray-600'>{event.title}</h1>
                            <span className='text-gray-300 text-xs'>{event.time}</span>
                        </div>
                        <p className='mt-2 text-gray-400 text-sm'>{event.description}</p>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default EventCalendar