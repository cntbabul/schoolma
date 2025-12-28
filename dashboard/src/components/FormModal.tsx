"use client";
import Image from "next/image";
import dynamic from "next/dynamic";
import Loading from "./Loading";
import { useRouter } from "next/navigation";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useFormState } from "react-dom";
import { toast } from "react-toastify";
import { FormContainerProps } from "./FormContainer";
import {
    deleteClass,
    deleteExam,
    deleteStudent,
    deleteSubject,
    deleteTeacher,
} from "@/lib/actions";

const deleteActionMap = {
    subject: deleteSubject,
    class: deleteClass,
    teacher: deleteTeacher,
    student: deleteStudent,
    exam: deleteExam,
    // TODO: OTHER DELETE ACTIONS
    parent: deleteSubject,
    lesson: deleteSubject,
    assignment: deleteSubject,
    result: deleteSubject,
    attendance: deleteSubject,
    event: deleteSubject,
    announcement: deleteSubject,
};

const TeacherForm = dynamic(() => import("./forms/TeacherForm"), { loading: () => <Loading /> });
const StudentForm = dynamic(() => import("./forms/StudentForm.tsx"), { loading: () => <Loading /> });
const AnnouncementForm = dynamic(() => import("./forms/AnnouncementForm"), { loading: () => <Loading /> });
const ParentForm = dynamic(() => import("./forms/ParentForm"), { loading: () => <Loading /> });
const ClassForm = dynamic(() => import("./forms/ClassForm"), { loading: () => <Loading /> });
const SubjectForm = dynamic(() => import("./forms/SubjectForm"), { loading: () => <Loading /> });
const LessonForm = dynamic(() => import("./forms/LessonForm"), { loading: () => <Loading /> });
const ExamForm = dynamic(() => import("./forms/ExamForm"), { loading: () => <Loading /> });
const AssignmentForm = dynamic(() => import("./forms/AssignmentForm"), { loading: () => <Loading /> });
const ResultForm = dynamic(() => import("./forms/ResultForm"), { loading: () => <Loading /> });
const AttendanceForm = dynamic(() => import("./forms/AttendanceForm"), { loading: () => <Loading /> });
const EventForm = dynamic(() => import("./forms/EventForm"), { loading: () => <Loading /> });


const forms: {
    [key: string]: (
        type: "create" | "update",
        data?: any,
        setOpen?: Dispatch<SetStateAction<boolean>>,
        relatedData?: any
    ) => JSX.Element
} = {
    subject: (type, data, setOpen, relatedData) => <SubjectForm type={type} data={data} setOpen={setOpen!} relatedData={relatedData} />,
    class: (type, data, setOpen, relatedData) => <ClassForm type={type} data={data} setOpen={setOpen!} relatedData={relatedData} />,
    teacher: (type, data, setOpen, relatedData) => <TeacherForm type={type} data={data} setOpen={setOpen!} relatedData={relatedData} />,
    student: (type, data, setOpen, relatedData) => <StudentForm type={type} data={data} setOpen={setOpen!} relatedData={relatedData} />,
    exam: (type, data, setOpen, relatedData) => <ExamForm type={type} data={data} setOpen={setOpen!} relatedData={relatedData} />,
    announcement: (type, data, setOpen, relatedData) => <AnnouncementForm type={type} data={data} setOpen={setOpen!} relatedData={relatedData} />,
    parent: (type, data, setOpen, relatedData) => <ParentForm type={type} data={data} setOpen={setOpen!} relatedData={relatedData} />,
    lesson: (type, data, setOpen, relatedData) => <LessonForm type={type} data={data} setOpen={setOpen!} relatedData={relatedData} />,
    assignment: (type, data, setOpen, relatedData) => <AssignmentForm type={type} data={data} setOpen={setOpen!} relatedData={relatedData} />,
    result: (type, data, setOpen, relatedData) => <ResultForm type={type} data={data} setOpen={setOpen!} relatedData={relatedData} />,
    attendance: (type, data, setOpen, relatedData) => <AttendanceForm type={type} data={data} setOpen={setOpen!} relatedData={relatedData} />,
    event: (type, data, setOpen, relatedData) => <EventForm type={type} data={data} setOpen={setOpen!} relatedData={relatedData} />,
}

const FormModal = ({
    table,
    type,
    data,
    id,
    relatedData,
}: FormContainerProps & { relatedData?: any }) => {
    const size = type === "create" ? "w-8 h-8" : "w-7 h-7";
    const bgColor =
        type === "create"
            ? "bg-lamaYellow"
            : type === "update"
                ? "bg-lamaSky"
                : "bg-lamaPurple";

    const [open, setOpen] = useState(false);

    const Form = () => {
        const [state, formAction] = useFormState(deleteActionMap[table], { success: false, error: false });
        const router = useRouter();

        useEffect(() => {
            if (state.success) {
                toast(`${table} has been deleted!`);
                setOpen(false);
                router.refresh();
            }
            if (state.error) {
                toast.error((state as any).message || `Failed to delete ${table}!`);
            }
        }, [state, router]);
        return type === "delete" && id ? (
            <form action={formAction} className="p-4 flex flex-col gap-4">
                <input type="hidden" name="id" value={id} />
                <span className="text-center font-medium">
                    All data will be lost. Are you sure you want to delete this {table}?
                </span>
                <button type="submit" className="bg-red-700 text-white py-2 px-4 rounded-md border-none w-max self-center">
                    Delete
                </button>
            </form>
        ) : type === "create" || type === "update" ? (
            forms[table](type, data, setOpen, relatedData)
        ) : ("Forms not Found")
    }




    return (
        <>
            <button
                className={`${size} flex items-center justify-center rounded-full ${bgColor}`}
                onClick={() => setOpen(true)}
            >
                <Image src={`/${type}.png`} alt="" width={16} height={16} />
            </button>
            {open && (
                <div className="w-screen h-screen absolute left-0 top-0 bg-black bg-opacity-60 z-50 flex items-center justify-center">
                    <div className="bg-white p-4 rounded-md relative w-[90%] md:w-[70%] lg:w-[60%] xl:w-[50%] 2xl:w-[40%]">
                        <Form />
                        <div
                            className="absolute top-4 right-4 cursor-pointer"
                            onClick={() => setOpen(false)}
                        >
                            <Image src="/close.png" alt="" width={14} height={14} />
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default FormModal;
