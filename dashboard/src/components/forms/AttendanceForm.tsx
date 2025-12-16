"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import z from "zod";
import InputField from "../InputField";

const schema = z.object({
    studentId: z.string().min(1, { message: "Student ID is required!" }),
    lessonId: z.string().min(1, { message: "Lesson ID is required!" }),
    date: z.string().min(1, { message: "Date is required!" }),
    status: z.enum(["PRESENT", "ABSENT", "LATE"], { message: "Status is required!" }),
});

type AttendanceFormProps = z.infer<typeof schema>;

const AttendanceForm = ({
    type,
    data,
}: {
    type: "create" | "update";
    data?: any;
}) => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<AttendanceFormProps>({
        resolver: zodResolver(schema),
    });

    const onSubmit = handleSubmit((data) => {
        console.log(data);
    });

    return (
        <form className="flex flex-col gap-8" onSubmit={onSubmit}>
            <h1 className="text-xl font-semibold">
                {type === "create" ? "Create a new attendance" : "Update attendance"}
            </h1>

            <div className="flex justify-between flex-wrap gap-4">
                <InputField
                    label="Student ID"
                    type="text"
                    defaultValue={data?.studentId}
                    register={register}
                    name="studentId"
                    error={errors?.studentId}
                />
                <InputField
                    label="Lesson ID"
                    type="text"
                    defaultValue={data?.lessonId}
                    register={register}
                    name="lessonId"
                    error={errors?.lessonId}
                />
                <InputField
                    label="Date"
                    type="date"
                    defaultValue={data?.date}
                    register={register}
                    name="date"
                    error={errors?.date}
                />
                <InputField
                    label="Status"
                    type="enum"
                    enum={["PRESENT", "ABSENT", "LATE"]}
                    defaultValue={data?.status}
                    register={register}
                    name="status"
                    error={errors?.status}
                />
            </div>
            <button className="bg-blue-400 text-white p-2 rounded-md">
                {type === "create" ? "Create" : "Update"}
            </button>
        </form>
    );
};

export default AttendanceForm;
