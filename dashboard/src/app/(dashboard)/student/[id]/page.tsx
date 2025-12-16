import { useRouter } from 'next/navigation'
import React from 'react'
import Image from 'next/image'
import BigCalendar from '@/components/BigCalendar'
import Announcements from '@/components/Announcements'
import Link from 'next/link'
import Performance from '@/components/Performance'
const SingleStudentPage = () => {

    return (
        <div className="flex-1 p-4 flex flex-col gap-4  xl:flex-row">
            {/* left  */}
            <div className='w-full xl:w-2/3'>
                {/* top  */}
                <div className="flex flex-col lg:flex-row gap-4">
                    {/* user info card  */}
                    <div className="bg-lamaSky py-6 px-4 rounded-md flex-1 flex gap-4">
                        <div className="w-1/3">
                            <Image src="https://images.pexels.com/photos/10319784/pexels-photo-10319784.jpeg" alt="" width={144} height={144} className='w-36 h-36 rounded-full object-cover' />
                        </div>
                        <div className="w-2/3 flex flex-col justify-between gap-4">
                            <h1 className='text-xl font-semibold'>Student Name</h1>
                            <p className='text-sm text-gray-500'>Teacher Position</p>
                            <div className='flex items-center justify-between gap-2 flex-wrap text-xs font-medium'>
                                <div className='w-full md:w-1/3 lg:w-full 2xl:w-1/3 flex itms-center gap-2'>
                                    <Image src="/blood.png" alt="blood" width={14} height={14} />
                                    <span>A+</span>
                                </div>
                                <div className='w-full md:w-1/3 lg:w-full 2xl:w-1/3 flex itms-center gap-2'>
                                    <Image src="/date.png" alt="blood" width={14} height={14} />
                                    <span>12/12/2022</span>
                                </div>
                                <div className='w-full md:w-1/3 lg:w-full 2xl:w-1/3 flex itms-center gap-2'>
                                    <Image src="/mail.png" alt="blood" width={14} height={14} />
                                    <span>teacher@test.com</span>
                                </div>
                                <div className='w-full md:w-1/3 lg:w-full 2xl:w-1/3 flex itms-center gap-2'>
                                    <Image src="/phone.png" alt="blood" width={14} height={14} />
                                    <span>+91 9860123456</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* small card  */}
                    <div className="flex-1 flex gap-4 justify-between flex-wrap">
                        {/* card  */}
                        <div className="bg-white p-4 rounded-md flex gap-4 w-full md:w-[48%] xl:w-[45%] 2xl:w-[48%]  ">
                            <Image src="/singleAttendance.png" alt='' width={24} height={24} className='h-6 w-6' />
                            <div className="">
                                <h1 className="text-xl font-semibold">90%</h1>
                                <p className="text-sm text-gray-400">Attendance</p>
                            </div>
                        </div>
                        <div className="bg-white p-4 rounded-md flex gap-4 w-full md:w-[48%] xl:w-[45%] 2xl:w-[48%]  ">
                            <Image src="/singleBranch.png" alt='' width={24} height={24} className='h-6 w-6' />
                            <div className="">
                                <h1 className="text-xl font-semibold">6th</h1>
                                <p className="text-sm text-gray-400">Grade</p>
                            </div>
                        </div>
                        <div className="bg-white p-4 rounded-md flex gap-4 w-full md:w-[48%] xl:w-[45%] 2xl:w-[48%]  ">
                            <Image src="/singleLesson.png" alt='' width={24} height={24} className='h-6 w-6' />
                            <div className="">
                                <h1 className="text-xl font-semibold">18</h1>
                                <p className="text-sm text-gray-400">Lessons</p>
                            </div>
                        </div>
                        <div className="bg-white p-4 rounded-md flex gap-4 w-full md:w-[48%] xl:w-[45%] 2xl:w-[48%]  ">
                            <Image src="/singleClass.png" alt='' width={24} height={24} className='h-6 w-6' />
                            <div className="">
                                <h1 className="text-xl font-semibold">6A</h1>
                                <p className="text-sm text-gray-400">Class</p>
                            </div>
                        </div>

                    </div>
                </div>
                {/* bottom  */}
                <div className="mt-4 bg-white rounded-md p-4 h-[800px]">
                    <h1>Student&apos;s Schedule</h1>
                    <BigCalendar />
                </div>
            </div>
            {/* right  */}
            <div className='w-full xl:w-1/3 flex flex-col gap-4'>
                <div className="bg-white p-4 rounded-md">
                    <h1 className='text-xl font-semibold'>Shortcuts</h1>
                    <div className="mt-4 flex gap-4 flex-wrap text-xs text-gray-500">
                        <Link href="/" className='p-3 rounded-md bg-lamaSkyLight'>Student&apos;s Lessons</Link>
                        <Link href="/" className='p-3 rounded-md bg-lamaYellowLight'>Student&apos;s Teacher</Link>
                        <Link href="/" className='p-3 rounded-md bg-lamaPurpleLight'>Student&apos;s Attendance</Link>
                        <Link href="/" className='p-3 rounded-md bg-lamaSky'>Student&apos;s Exam</Link>
                        {/* <Link href="/" className='p-3 rounded-md bg-lamaYellow'>Teacher&apos;s Schedule</Link> */}
                    </div>
                </div>
                <div className=""><Performance /></div>
                <Announcements />
            </div>
        </div>
    )
}

export default SingleStudentPage