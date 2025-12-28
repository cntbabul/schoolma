
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
