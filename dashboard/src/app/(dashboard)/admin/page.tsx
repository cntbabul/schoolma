import React from 'react'
import UserCard from '@/components/UserCard'
import FinanceChart from '@/components/FinanceChart'
import EventCalendar from '@/components/EventCalendar'
import Announcements from '@/components/Announcements'
import CountChartContainer from '@/components/CountChartContainer'
import AttendanceChartContainer from '@/components/AttendanceChartContainer'



const Admin = () => {
    return (
        <div className='p-4 flex gap-4 flex-col md:flex-row'>
            {/* left      */}
            <div className='w-full lg:w-2/3 flex flex-col gap-8'>
                {/* user card  */}
                <div className='flex gap-4 justify-between flex-wrap'>

                    <UserCard type="admin" />
                    <UserCard type="teacher" />
                    <UserCard type="student" />
                    <UserCard type="parent" />
                </div>
                {/* middle chart  */}
                <div className='flex gap-4 flex-col lg:flex-row'>
                    {/* count chart  */}
                    <div className='w-full lg:w-1/3 h-[450px]'>
                        <CountChartContainer />
                    </div>
                    {/* Attendance chart  */}
                    <div className='w-full lg:w-2/3 h-[450px]'>
                        <AttendanceChartContainer />
                    </div>
                </div>
                {/* Bottom Chart  */}
                <div className='w-full h-[500px]'>
                    <FinanceChart />
                </div>
            </div>
            {/* right  */}
            <div className='w-full lg:w-1/3 flex flex-col gap-8'>
                <EventCalendar />
                <Announcements />

            </div>
        </div>
    )
}

export default Admin;
