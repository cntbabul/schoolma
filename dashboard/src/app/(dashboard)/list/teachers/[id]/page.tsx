import React from 'react'
import Image from 'next/image'
import BigCalendarContainer from '@/components/BigCalendarContainer'
import Announcements from '@/components/Announcements'
import Link from 'next/link'
import Performance from '@/components/Performance'
import FormModal from '@/components/FormModal'
import prisma from '@/lib/prisma'
import { notFound } from 'next/navigation'

const SingleTeacherPage = async ({ params }: { params: { id: string } }) => {
    const { id } = params;

    const teacher = await prisma.teacher.findUnique({
        where: { id },
        include: {
            subjects: true,
            classes: true,
            lessons: {
                include: {
                    subject: true,
                    class: true,
                }
            }
        }
    });

    if (!teacher) {
        notFound();
    }

    // Fetch all subjects for the update form
    const subjects = await prisma.subject.findMany();

    // Format birthday
    const formattedBirthday = new Intl.DateTimeFormat('en-US').format(teacher.birthday);

    return (
        <div className="flex-1 p-4 flex flex-col gap-4  xl:flex-row">
            {/* left  */}
            <div className='w-full xl:w-2/3'>
                {/* top  */}
                <div className="flex flex-col lg:flex-row gap-4">
                    {/* user info card  */}
                    <div className="bg-lamaSky py-6 px-4 rounded-md flex-1 flex gap-4">
                        <div className="w-1/3">
                            <Image
                                src={teacher.img || "/noAvatar.png"}
                                alt={teacher.name}
                                width={144}
                                height={144}
                                className='w-36 h-36 rounded-full object-cover'
                            />
                        </div>
                        <div className="w-2/3 flex flex-col justify-between gap-4">

                            <div className='flex items-center justify-between'>
                                <h1 className='text-xl font-semibold'>{teacher.name} {teacher.surname}</h1>
                                <FormModal
                                    table="teacher"
                                    type="update"
                                    data={teacher}
                                    relatedData={{ subjects }}
                                />
                            </div>
                            <p className='text-sm text-gray-500'>{teacher.subjects.map(s => s.name).join(", ") || "No subjects assigned"}</p>
                            <div className='flex items-center justify-between gap-2 flex-wrap text-xs font-medium'>
                                <div className='w-full md:w-1/3 lg:w-full 2xl:w-1/3 flex itms-center gap-2'>
                                    <Image src="/blood.png" alt="blood" width={14} height={14} />
                                    <span>{teacher.bloodType}</span>
                                </div>
                                <div className='w-full md:w-1/3 lg:w-full 2xl:w-1/3 flex itms-center gap-2'>
                                    <Image src="/date.png" alt="date" width={14} height={14} />
                                    <span>{formattedBirthday}</span>
                                </div>
                                <div className='w-full md:w-1/3 lg:w-full 2xl:w-1/3 flex itms-center gap-2'>
                                    <Image src="/mail.png" alt="email" width={14} height={14} />
                                    <span>{teacher.email || "N/A"}</span>
                                </div>
                                <div className='w-full md:w-1/3 lg:w-full 2xl:w-1/3 flex itms-center gap-2'>
                                    <Image src="/phone.png" alt="phone" width={14} height={14} />
                                    <span>{teacher.phone || "N/A"}</span>
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
                            <Image src="/singleLesson.png" alt='' width={24} height={24} className='h-6 w-6' />
                            <div className="">
                                <h1 className="text-xl font-semibold">{teacher.lessons.length}</h1>
                                <p className="text-sm text-gray-400">Lessons</p>
                            </div>
                        </div>
                        <div className="bg-white p-4 rounded-md flex gap-4 w-full md:w-[48%] xl:w-[45%] 2xl:w-[48%]  ">
                            <Image src="/singleBranch.png" alt='' width={24} height={24} className='h-6 w-6' />
                            <div className="">
                                <h1 className="text-xl font-semibold">{teacher.subjects.length}</h1>
                                <p className="text-sm text-gray-400">Subjects</p>
                            </div>
                        </div>
                        <div className="bg-white p-4 rounded-md flex gap-4 w-full md:w-[48%] xl:w-[45%] 2xl:w-[48%]  ">
                            <Image src="/singleClass.png" alt='' width={24} height={24} className='h-6 w-6' />
                            <div className="">
                                <h1 className="text-xl font-semibold">{teacher.classes.length}</h1>
                                <p className="text-sm text-gray-400">Classes</p>
                            </div>
                        </div>

                    </div>
                </div>
                {/* bottom  */}
                <div className="mt-4 bg-white rounded-md p-4 h-[800px]">
                    <h1>Teacher&apos;s Schedule</h1>
                    <BigCalendarContainer type="teacherId" id={teacher.id} />
                </div>
            </div>
            {/* right  */}
            <div className='w-full xl:w-1/3 flex flex-col gap-4'>
                <div className="bg-white p-4 rounded-md">
                    <h1 className='text-xl font-semibold'>Shortcuts</h1>
                    <div className="mt-4 flex gap-4 flex-wrap text-xs text-gray-500">
                        <Link
                            className="p-3 rounded-md bg-lamaSkyLight"
                            href={`/list/classes?supervisorId=${teacher.id}`}
                        >
                            Teacher&apos;s Classes
                        </Link>
                        <Link
                            className="p-3 rounded-md bg-lamaPurpleLight"
                            href={`/list/students?teacherId=${teacher.id}`}
                        >
                            Teacher&apos;s Students
                        </Link>
                        <Link
                            className="p-3 rounded-md bg-lamaYellowLight"
                            href={`/list/lessons?teacherId=${teacher.id}`}
                        >
                            Teacher&apos;s Lessons
                        </Link>
                        <Link
                            className="p-3 rounded-md bg-pink-50"
                            href={`/list/exams?teacherId=${teacher.id}`}
                        >
                            Teacher&apos;s Exams
                        </Link>
                        <Link
                            className="p-3 rounded-md bg-lamaSkyLight"
                            href={`/list/assignments?teacherId=${teacher.id}`}
                        >
                            Teacher&apos;s Assignments
                        </Link>
                    </div>
                </div>
                <div className=""><Performance /></div>
                <Announcements />
            </div>
        </div>
    )
}

export default SingleTeacherPage