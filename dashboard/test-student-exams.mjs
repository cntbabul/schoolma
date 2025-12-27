import { PrismaClient } from '@/generated/prisma';
import { PrismaPg } from '@prisma/adapter-pg';
import { Pool } from 'pg';

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
    throw new Error('DATABASE_URL environment variable is not set');
}

const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function checkStudentExams() {
    const studentId = 'user_378UCAmGnIuXpjGiyb7zZ2zjBuZ';

    console.log('🔍 Checking student:', studentId);
    console.log('─────────────────────────────────────────\n');

    // 1. Find the student
    const student = await prisma.student.findUnique({
        where: { id: studentId },
        include: {
            class: true,
        },
    });

    if (!student) {
        console.log('❌ Student not found!');
        console.log('Available students:');
        const allStudents = await prisma.student.findMany({
            select: { id: true, name: true, surname: true, class: { select: { name: true } } },
        });
        allStudents.forEach(s => {
            console.log(`  - ${s.id} | ${s.name} ${s.surname} | Class: ${s.class.name}`);
        });
        await prisma.$disconnect();
        return;
    }

    console.log('✅ Student found:');
    console.log(`   Name: ${student.name} ${student.surname}`);
    console.log(`   Class: ${student.class.name} (ID: ${student.classId})`);
    console.log('');

    // 2. Find exams for this student's class
    const exams = await prisma.exam.findMany({
        where: {
            lesson: {
                class: {
                    students: {
                        some: {
                            id: studentId,
                        },
                    },
                },
            },
        },
        include: {
            lesson: {
                include: {
                    subject: true,
                    class: true,
                    teacher: true,
                },
            },
        },
    });

    console.log(`📚 Exams available for this student: ${exams.length}`);
    console.log('─────────────────────────────────────────\n');

    if (exams.length === 0) {
        console.log('❌ No exams found for this student!');
    } else {
        exams.forEach((exam, index) => {
            console.log(`${index + 1}. ${exam.lesson.subject.name}`);
            console.log(`   Class: ${exam.lesson.class.name}`);
            console.log(`   Teacher: ${exam.lesson.teacher.name} ${exam.lesson.teacher.surname}`);
            console.log(`   Date: ${exam.startTime.toLocaleDateString('en-IN')}`);
            console.log(`   Exam ID: ${exam.id}`);
            console.log('');
        });
    }

    // 3. Show all exams in the database for comparison
    const allExams = await prisma.exam.findMany({
        include: {
            lesson: {
                include: {
                    subject: true,
                    class: true,
                    teacher: true,
                },
            },
        },
    });

    console.log('─────────────────────────────────────────');
    console.log(`📋 Total exams in database: ${allExams.length}`);
    console.log('─────────────────────────────────────────\n');

    allExams.forEach((exam, index) => {
        console.log(`${index + 1}. ${exam.lesson.subject.name} - Class ${exam.lesson.class.name}`);
    });

    await prisma.$disconnect();
    await pool.end();
}

checkStudentExams().catch(console.error);
