import React from 'react'
import { currentUser } from '@clerk/nextjs/server'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import prisma from '@/lib/prisma'
import FormModal from '@/components/FormModal'

const ProfilePage = async () => {
    const user = await currentUser();

    if (!user) {
        notFound();
    }

    const role = user.publicMetadata.role as string;
    let userData = null;
    let relatedData = null;

    // Fetch user data based on role
    if (role === 'teacher') {
        userData = await prisma.teacher.findUnique({
            where: { id: user.id },
            include: {
                subjects: true,
                classes: true,
            }
        });

        // Fetch all subjects for the form dropdown
        relatedData = {
            subjects: await prisma.subject.findMany()
        };
    } else if (role === 'student') {
        userData = await prisma.student.findUnique({
            where: { id: user.id },
            include: {
                class: true,
                grade: true,
            }
        });

        // Fetch classes and grades for the form dropdown
        relatedData = {
            classes: await prisma.class.findMany({ include: { _count: { select: { students: true } } } }),
            grades: await prisma.grade.findMany(),
            parents: await prisma.parent.findMany()
        };
    } else if (role === 'parent') {
        userData = await prisma.parent.findUnique({
            where: { id: user.id },
            include: {
                students: true,
            }
        });

        // Fetch students for the form dropdown
        relatedData = {
            students: await prisma.student.findMany()
        };
    }

    return (
        <div className="flex-1 p-4 flex flex-col gap-4">
            <h1 className="text-2xl font-bold">Profile</h1>

            <div className="bg-white p-6 rounded-md">
                <div className="flex items-center gap-6 mb-6">
                    <Image
                        src={(userData as any)?.img || user.imageUrl || "/noAvatar.png"}
                        alt="Profile"
                        width={100}
                        height={100}
                        className="rounded-full object-cover w-24 h-24"
                    />
                    <div className="flex-1">
                        <div className="flex items-center justify-between">
                            <div>
                                <h2 className="text-xl font-semibold">
                                    {(userData as any)?.name || user.firstName} {(userData as any)?.surname || user.lastName}
                                </h2>
                                <p className="text-gray-500 capitalize">{role}</p>
                            </div>
                            {userData && (
                                <FormModal
                                    table={role as "teacher" | "student" | "parent"}
                                    type="update"
                                    data={userData}
                                    relatedData={relatedData}
                                />
                            )}
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="border-b pb-3">
                        <p className="text-sm text-gray-500">Username</p>
                        <p className="font-medium">{user.username || 'N/A'}</p>
                    </div>
                    <div className="border-b pb-3">
                        <p className="text-sm text-gray-500">First Name</p>
                        <p className="font-medium">{(userData as any)?.name || 'N/A'}</p>
                    </div>
                    <div className="border-b pb-3">
                        <p className="text-sm text-gray-500">Last Name</p>
                        <p className="font-medium">{(userData as any)?.surname || 'N/A'}</p>
                    </div>
                    <div className="border-b pb-3">
                        <p className="text-sm text-gray-500">Email</p>
                        <p className="font-medium">{userData?.email || 'N/A'}</p>
                    </div>
                    <div className="border-b pb-3">
                        <p className="text-sm text-gray-500">Phone</p>
                        <p className="font-medium">{userData?.phone || 'N/A'}</p>
                    </div>
                    <div className="border-b pb-3">
                        <p className="text-sm text-gray-500">Address</p>
                        <p className="font-medium">{userData?.address || 'N/A'}</p>
                    </div>
                    <div className="border-b pb-3">
                        <p className="text-sm text-gray-500">Blood Type</p>
                        <p className="font-medium">{(userData as any)?.bloodType || 'N/A'}</p>
                    </div>
                    <div className="border-b pb-3">
                        <p className="text-sm text-gray-500">Birthday</p>
                        <p className="font-medium">{(userData as any)?.birthday ? new Intl.DateTimeFormat('en-US').format(new Date((userData as any).birthday)) : 'N/A'}</p>
                    </div>
                    <div className="border-b pb-3">
                        <p className="text-sm text-gray-500">Sex</p>
                        <p className="font-medium capitalize">{(userData as any)?.sex?.toLowerCase() || 'N/A'}</p>
                    </div>

                    {role === 'teacher' && userData && (
                        <>
                            <div className="border-b pb-3">
                                <p className="text-sm text-gray-500">Subjects</p>
                                <p className="font-medium">
                                    {(userData as any).subjects?.map((s: any) => s.name).join(', ') || 'None'}
                                </p>
                            </div>
                            <div className="border-b pb-3">
                                <p className="text-sm text-gray-500">Classes</p>
                                <p className="font-medium">
                                    {(userData as any).classes?.length || 0} classes
                                </p>
                            </div>
                        </>
                    )}

                    {role === 'student' && userData && (
                        <>
                            <div className="border-b pb-3">
                                <p className="text-sm text-gray-500">Class</p>
                                <p className="font-medium">{(userData as any).class?.name || 'N/A'}</p>
                            </div>
                            <div className="border-b pb-3">
                                <p className="text-sm text-gray-500">Grade</p>
                                <p className="font-medium">{(userData as any).grade?.level || 'N/A'}</p>
                            </div>
                        </>
                    )}

                    {role === 'parent' && userData && (
                        <div className="border-b pb-3">
                            <p className="text-sm text-gray-500">Children</p>
                            <p className="font-medium">
                                {(userData as any).students?.length || 0} student(s)
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default ProfilePage
