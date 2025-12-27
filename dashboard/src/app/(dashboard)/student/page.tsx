import React from 'react'
import Announcements from '@/components/Announcements'
import EventCalendar from '@/components/EventCalendar'
import BigCalendarContainer from '@/components/BigCalendarContainer'
import { getCurrentUserId } from '@/lib/utils'
import prisma from '@/lib/prisma'

const studentPage = async () => {
    const userId = await getCurrentUserId();
    const classItem = await prisma.class.findMany({
        where: {
            students: { some: { id: userId! } },
        },
    });
    // console.log(classItem);
    return (
        <div className='p-4 flex gap-4 flex-col xl:flex-row'>
            {/* left  */}
            <div className='w-full xl:w-2/3 h-[80vh]'>
                <div className='h-full bg-white p-4 rounded-md'>
                    <h1 className='text-xl font-semibold'>Schedule 4(A)</h1>
                    <BigCalendarContainer type="classId" id={classItem[0].id} />
                </div>
            </div>
            {/* right  */}
            <div className='w-full xl:w-1/3 flex flex-col gap-8'>
                <EventCalendar />
                <Announcements />
            </div>
        </div>
    )
}

export default studentPage