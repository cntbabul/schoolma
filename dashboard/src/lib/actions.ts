"use server"
import { revalidatePath } from "next/cache";
import {
    ClassSchema,
    ExamSchema,
    StudentSchema,
    SubjectSchema,
    TeacherSchema,
} from "./formValidationSchemas";
import prisma from "./prisma";
import { clerkClient } from "@clerk/nextjs/server";

type CurrentState = { success: boolean; error: boolean; message?: string };

export const createSubject = async (currentState: CurrentState, data: SubjectSchema) => {
    try {
        await prisma.subject.create({
            data: {
                name: data.name,
                teachers: {
                    connect: data.teachers.map((teacherId) => ({ id: teacherId }))
                }
            }
        })
        return { success: true, error: false }
    } catch (err) {
        console.log(err)
        return { success: false, error: true }
    }
}
export const updateSubject = async (
    currentState: CurrentState,
    data: SubjectSchema
) => {
    try {
        await prisma.subject.update({
            where: {
                id: data.id,
            },
            data: {
                name: data.name,
                teachers: {
                    set: data.teachers.map((teacherId) => ({ id: teacherId })),
                },
            },
        });

        // revalidatePath("/list/subjects");
        return { success: true, error: false };
    } catch (err) {
        console.log(err);
        return { success: false, error: true };
    }
};

export const createClass = async (
    currentState: CurrentState,
    data: ClassSchema
) => {
    try {
        await prisma.class.create({
            data: {
                name: data.name,
                capacity: data.capacity,
                gradeId: data.gradeId,
                supervisorId: data.supervisorId && data.supervisorId !== "" ? data.supervisorId : undefined,
            },
        });

        // revalidatePath("/list/class");
        return { success: true, error: false };
    } catch (err) {
        console.log(err);
        return { success: false, error: true };
    }
};

export const updateClass = async (
    currentState: CurrentState,
    data: ClassSchema
) => {
    try {
        await prisma.class.update({
            where: {
                id: data.id,
            },
            data: {
                name: data.name,
                capacity: data.capacity,
                gradeId: data.gradeId,
                supervisorId: data.supervisorId && data.supervisorId !== "" ? data.supervisorId : undefined,
            },
        });

        // revalidatePath("/list/class");
        return { success: true, error: false };
    } catch (err) {
        console.log(err);
        return { success: false, error: true };
    }
};

export const createTeacher = async (
    currentState: CurrentState,
    data: TeacherSchema
) => {
    let clerkUserId: string | null = null;

    try {
        console.log("Creating teacher with data:", data);

        const clerk = await clerkClient();
        console.log("Clerk client initialized");

        const user = await clerk.users.createUser({
            username: data.username,
            password: data.password,
            firstName: data.name,
            lastName: data.surname,
            publicMetadata: { role: "teacher" }
        });
        clerkUserId = user.id;
        console.log("Clerk user created:", user.id);

        await prisma.teacher.create({
            data: {
                id: user.id,
                username: data.username,
                name: data.name,
                surname: data.surname,
                email: data.email || null,
                phone: data.phone || null,
                address: data.address,
                img: data.img || null,
                bloodType: data.bloodType,
                sex: data.sex,
                birthday: data.birthday,
                ...(data.subjects && data.subjects.length > 0
                    ? {
                        subjects: {
                            connect: data.subjects.map((subjectId: string) => ({
                                id: parseInt(subjectId),
                            })),
                        },
                    }
                    : {}),
            },
        });
        console.log("Teacher created in database");

        // revalidatePath("/list/teachers");
        return { success: true, error: false };
    } catch (err: any) {
        console.error("Error creating teacher:", err);

        // If we created a Clerk user but database insertion failed, clean up
        if (clerkUserId) {
            try {
                const clerk = await clerkClient();
                await clerk.users.deleteUser(clerkUserId);
                console.log("Cleaned up Clerk user:", clerkUserId);
            } catch (cleanupErr) {
                console.error("Failed to cleanup Clerk user:", cleanupErr);
            }
        }

        // Check for Clerk-specific errors
        if (err && err.errors && Array.isArray(err.errors)) {
            const clerkErrors = err.errors;
            console.error("Clerk errors:", clerkErrors);

            if (clerkErrors.length > 0) {
                return {
                    success: false,
                    error: true,
                    message: clerkErrors[0].message || "Something went wrong!"
                };
            }
        }

        // Check for Prisma unique constraint errors
        if (err.code === 'P2002') {
            const fields = err.meta?.target || ['field'];
            return {
                success: false,
                error: true,
                message: `A teacher with this ${fields.join(', ')} already exists. Please use different values.`
            };
        }

        // Generic Prisma errors
        if (err.code && err.code.startsWith('P')) {
            return {
                success: false,
                error: true,
                message: "Database error occurred. Please try again."
            };
        }

        return { success: false, error: true };
    }
};

export const updateTeacher = async (
    currentState: CurrentState,
    data: TeacherSchema
) => {
    if (!data.id) {
        return { success: false, error: true };
    }
    try {
        const clerk = await clerkClient();
        const user = await clerk.users.updateUser(data.id, {
            username: data.username,
            ...(data.password !== "" && { password: data.password }),
            firstName: data.name,
            lastName: data.surname,
        });

        await prisma.teacher.update({
            where: {
                id: data.id,
            },
            data: {
                // Password is only updated in Clerk, not in database
                username: data.username,
                name: data.name,
                surname: data.surname,
                email: data.email || null,
                phone: data.phone || null,
                address: data.address,
                img: data.img || null,
                bloodType: data.bloodType,
                sex: data.sex,
                birthday: data.birthday,
                ...(data.subjects && data.subjects.length > 0
                    ? {
                        subjects: {
                            set: data.subjects.map((subjectId: string) => ({
                                id: parseInt(subjectId),
                            })),
                        },
                    }
                    : {}),
            },
        });
        // revalidatePath("/list/teachers");
        return { success: true, error: false };
    } catch (err: any) {
        console.error("Error updating teacher:", err);

        // Check for Clerk-specific errors
        if (err && err.errors && Array.isArray(err.errors)) {
            const clerkErrors = err.errors;
            console.error("Clerk errors:", clerkErrors);

            // Check for duplicate username
            const duplicateUsernameError = clerkErrors.find(
                (e: any) => e.code === 'form_identifier_exists' || e.code === 'form_username_exists'
            );
            if (duplicateUsernameError) {
                return {
                    success: false,
                    error: true,
                    message: duplicateUsernameError.message || "That username is already taken. Please try another."
                };
            }

            // Return first Clerk error message
            if (clerkErrors.length > 0) {
                return {
                    success: false,
                    error: true,
                    message: clerkErrors[0].message || "Failed to update user account."
                };
            }
        }

        // Check for Clerk user not found (404)
        if (err.status === 404 || err.code === 'resource_not_found') {
            return {
                success: false,
                error: true,
                message: "User account not found in authentication system. This teacher may have been created before Clerk integration."
            };
        }

        // Check for Prisma unique constraint errors
        if (err.code === 'P2002') {
            const fields = err.meta?.target || ['field'];
            return {
                success: false,
                error: true,
                message: `A teacher with this ${fields.join(', ')} already exists.`
            };
        }

        // Generic Prisma errors
        if (err.code && err.code.startsWith('P')) {
            return {
                success: false,
                error: true,
                message: "Database error occurred. Please try again."
            };
        }

        return {
            success: false,
            error: true,
            message: "Failed to update teacher. Please try again."
        };
    }
};

export const deleteTeacher = async (
    currentState: CurrentState,
    data: FormData
) => {
    const id = data.get("id") as string;
    try {
        // First delete from database, then from Clerk
        await prisma.teacher.delete({
            where: {
                id: id,
            },
        });

        // Only delete from Clerk if database deletion succeeded
        const clerk = await clerkClient();
        await clerk.users.deleteUser(id);

        // revalidatePath("/list/teachers");
        return { success: true, error: false };
    } catch (err: any) {
        console.error("Error deleting teacher:", err);

        // Check for record not found error
        if (err.code === 'P2025') {
            return {
                success: false,
                error: true,
                message: "Teacher not found. They may have already been deleted."
            };
        }

        // Check for foreign key constraint errors (both Prisma and Postgres codes)
        if (err.code === 'P2003' || err.code === 'P2014' || err.cause?.originalCode === '23001' || err.cause?.code === '23001') {
            return {
                success: false,
                error: true,
                message: "Cannot delete teacher. They have related records (lessons, classes, etc.). Please delete those first."
            };
        }

        // Check for other Prisma errors
        if (err.code && err.code.startsWith('P')) {
            return {
                success: false,
                error: true,
                message: "Database error occurred while deleting teacher."
            };
        }

        return { success: false, error: true };
    }
};

export const createStudent = async (
    currentState: CurrentState,
    data: StudentSchema
) => {
    console.log(data);
    try {
        const classItem = await prisma.class.findUnique({
            where: { id: data.classId },
            include: { _count: { select: { students: true } } },
        });

        if (classItem && classItem.capacity === classItem._count.students) {
            return { success: false, error: true };
        }

        const clerk = await clerkClient();
        const user = await clerk.users.createUser({
            username: data.username,
            password: data.password,
            firstName: data.name,
            lastName: data.surname,
            publicMetadata: { role: "student" }
        });

        await prisma.student.create({
            data: {
                id: user.id,
                username: data.username,
                name: data.name,
                surname: data.surname,
                email: data.email || null,
                phone: data.phone || null,
                address: data.address,
                img: data.img || null,
                bloodType: data.bloodType,
                sex: data.sex,
                birthday: data.birthday,
                gradeId: data.gradeId,
                classId: data.classId,
                parentId: data.parentId,
            },
        });

        // revalidatePath("/list/students");
        return { success: true, error: false };
    } catch (err) {
        console.log(err);
        return { success: false, error: true };
    }
};

export const updateStudent = async (
    currentState: CurrentState,
    data: StudentSchema
) => {
    if (!data.id) {
        return { success: false, error: true };
    }
    try {
        const clerk = await clerkClient();
        const user = await clerk.users.updateUser(data.id, {
            username: data.username,
            ...(data.password !== "" && { password: data.password }),
            firstName: data.name,
            lastName: data.surname,
        });

        await prisma.student.update({
            where: {
                id: data.id,
            },
            data: {
                // Password is only updated in Clerk, not in database
                username: data.username,
                name: data.name,
                surname: data.surname,
                email: data.email || null,
                phone: data.phone || null,
                address: data.address,
                img: data.img || null,
                bloodType: data.bloodType,
                sex: data.sex,
                birthday: data.birthday,
                gradeId: data.gradeId,
                classId: data.classId,
                parentId: data.parentId,
            },
        });
        // revalidatePath("/list/students");
        return { success: true, error: false };
    } catch (err: any) {
        console.error("Error updating student:", err);

        // Check for Clerk-specific errors
        if (err && err.errors && Array.isArray(err.errors)) {
            const clerkErrors = err.errors;
            console.error("Clerk errors:", clerkErrors);

            // Check for duplicate username
            const duplicateUsernameError = clerkErrors.find(
                (e: any) => e.code === 'form_identifier_exists' || e.code === 'form_username_exists'
            );
            if (duplicateUsernameError) {
                return {
                    success: false,
                    error: true,
                    message: duplicateUsernameError.message || "That username is already taken. Please try another."
                };
            }

            // Return first Clerk error message
            if (clerkErrors.length > 0) {
                return {
                    success: false,
                    error: true,
                    message: clerkErrors[0].message || "Failed to update user account."
                };
            }
        }

        // Check for Clerk user not found (404)
        if (err.status === 404 || err.code === 'resource_not_found') {
            return {
                success: false,
                error: true,
                message: "User account not found in authentication system."
            };
        }

        // Check for Prisma unique constraint errors
        if (err.code === 'P2002') {
            const fields = err.meta?.target || ['field'];
            return {
                success: false,
                error: true,
                message: `A student with this ${fields.join(', ')} already exists.`
            };
        }

        // Generic Prisma errors
        if (err.code && err.code.startsWith('P')) {
            return {
                success: false,
                error: true,
                message: "Database error occurred. Please try again."
            };
        }

        return {
            success: false,
            error: true,
            message: "Failed to update student. Please try again."
        };
    }
};

export const deleteStudent = async (
    currentState: CurrentState,
    data: FormData
) => {
    const id = data.get("id") as string;
    try {
        // First delete from database, then from Clerk
        // This order prevents orphaned database records
        await prisma.student.delete({
            where: {
                id: id,
            },
        });

        // Only delete from Clerk if database deletion succeeded
        const clerk = await clerkClient();
        await clerk.users.deleteUser(id);

        // revalidatePath("/list/students");
        return { success: true, error: false };
    } catch (err: any) {
        console.error("Error deleting student:", err);

        // Check for record not found error
        if (err.code === 'P2025') {
            return {
                success: false,
                error: true,
                message: "Student not found. They may have already been deleted."
            };
        }

        // Check for foreign key constraint errors (both Prisma and Postgres codes)
        if (err.code === 'P2003' || err.code === 'P2014' || err.cause?.originalCode === '23001' || err.cause?.code === '23001') {
            return {
                success: false,
                error: true,
                message: "Cannot delete student. They have related records (results, attendance, etc.). Please delete those first."
            };
        }

        // Check for other Prisma errors
        if (err.code && err.code.startsWith('P')) {
            return {
                success: false,
                error: true,
                message: "Database error occurred while deleting student."
            };
        }

        return { success: false, error: true };
    }
};

export const createExam = async (
    currentState: CurrentState,
    data: ExamSchema
) => {
    // const { userId, sessionClaims } = auth();
    // const role = (sessionClaims?.metadata as { role?: string })?.role;

    try {
        // if (role === "teacher") {
        //   const teacherLesson = await prisma.lesson.findFirst({
        //     where: {
        //       teacherId: userId!,
        //       id: data.lessonId,
        //     },
        //   });

        //   if (!teacherLesson) {
        //     return { success: false, error: true };
        //   }
        // }

        await prisma.exam.create({
            data: {
                title: data.title,
                startTime: data.startTime,
                endTime: data.endTime,
                lessonId: data.lessonId,
            },
        });

        // revalidatePath("/list/subjects");
        return { success: true, error: false };
    } catch (err) {
        console.log(err);
        return { success: false, error: true };
    }
};

export const updateExam = async (
    currentState: CurrentState,
    data: ExamSchema
) => {
    // const { userId, sessionClaims } = auth();
    // const role = (sessionClaims?.metadata as { role?: string })?.role;

    try {
        // if (role === "teacher") {
        //   const teacherLesson = await prisma.lesson.findFirst({
        //     where: {
        //       teacherId: userId!,
        //       id: data.lessonId,
        //     },
        //   });

        //   if (!teacherLesson) {
        //     return { success: false, error: true };
        //   }
        // }

        await prisma.exam.update({
            where: {
                id: data.id,
            },
            data: {
                title: data.title,
                startTime: data.startTime,
                endTime: data.endTime,
                lessonId: data.lessonId,
            },
        });

        // revalidatePath("/list/subjects");
        return { success: true, error: false };
    } catch (err) {
        console.log(err);
        return { success: false, error: true };
    }
};

export const deleteExam = async (
    currentState: CurrentState,
    data: FormData
) => {
    const id = data.get("id") as string;

    // const { userId, sessionClaims } = auth();
    // const role = (sessionClaims?.metadata as { role?: string })?.role;

    try {
        await prisma.exam.delete({
            where: {
                id: parseInt(id),
                // ...(role === "teacher" ? { lesson: { teacherId: userId! } } : {}),
            },
        });

        // revalidatePath("/list/subjects");
        return { success: true, error: false };
    } catch (err) {
        console.log(err);
        return { success: false, error: true };
    }
};


export const deleteLesson = async (
    currentState: CurrentState,
    data: FormData
) => {
    const id = data.get("id") as string;
    try {
        await prisma.lesson.delete({
            where: {
                id: parseInt(id),
            },
        });
        return { success: true, error: false };
    } catch (err: any) {
        console.error("Error deleting lesson:", err);
        if (err.code === 'P2025') {
            return {
                success: false,
                error: true,
                message: "Lesson not found. It may have already been deleted."
            };
        }
        if (err.code === 'P2003' || err.code === 'P2014' || err.cause?.originalCode === '23001' || err.cause?.code === '23001') {
            return {
                success: false,
                error: true,
                message: "Cannot delete lesson. It has related records (exams, assignments, etc.). Please delete those first."
            };
        }
        if (err.code && err.code.startsWith('P')) {
            return {
                success: false,
                error: true,
                message: "Database error occurred while deleting lesson."
            };
        }
        return { success: false, error: true };
    }
};

export const deleteSubject = async (
    currentState: CurrentState,
    data: FormData
) => {
    const id = data.get("id") as string;
    try {
        await prisma.subject.delete({
            where: {
                id: parseInt(id),
            },
        });
        return { success: true, error: false };
    } catch (err: any) {
        console.error("Error deleting subject:", err);
        if (err.code === 'P2025') {
            return {
                success: false,
                error: true,
                message: "Subject not found. It may have already been deleted."
            };
        }
        if (err.code === 'P2003' || err.code === 'P2014' || err.cause?.originalCode === '23001' || err.cause?.code === '23001') {
            return {
                success: false,
                error: true,
                message: "Cannot delete subject. It has related records (teachers, lessons, etc.). Please delete those first."
            };
        }
        if (err.code && err.code.startsWith('P')) {
            return {
                success: false,
                error: true,
                message: "Database error occurred while deleting subject."
            };
        }
        return { success: false, error: true };
    }
};

export const deleteClass = async (
    currentState: CurrentState,
    data: FormData
) => {
    const id = data.get("id") as string;
    try {
        await prisma.class.delete({
            where: {
                id: parseInt(id),
            },
        });
        return { success: true, error: false };
    } catch (err: any) {
        console.error("Error deleting class:", err);
        if (err.code === 'P2025') {
            return {
                success: false,
                error: true,
                message: "Class not found. It may have already been deleted."
            };
        }
        if (err.code === 'P2003' || err.code === 'P2014' || err.cause?.originalCode === '23001' || err.cause?.code === '23001') {
            return {
                success: false,
                error: true,
                message: "Cannot delete class. It has related records (students, lessons, etc.). Please delete those first."
            };
        }
        if (err.code && err.code.startsWith('P')) {
            return {
                success: false,
                error: true,
                message: "Database error occurred while deleting class."
            };
        }
        return { success: false, error: true };
    }
};
