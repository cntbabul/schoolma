"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import z from "zod";
import InputField from "../InputField";

const schema = z.object({
    subjectId: z.string().min(1, { message: "Subject is required!" }),
    classId: z.string().min(1, { message: "Class is required!" }),
    date: z.string().min(1, { message: "Date is required!" }),
    startTime: z.string().min(1, { message: "Start time is required!" }),
    endTime: z.string().min(1, { message: "End time is required!" }),
});

type ExamFormProps = z.infer<typeof schema>;

const ExamForm = ({
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
    } = useForm<ExamFormProps>({
        resolver: zodResolver(schema),
    });

    const onSubmit = handleSubmit((data) => {
        console.log(data);
    });

    return (
        <form className="flex flex-col gap-8" onSubmit={onSubmit}>
            <h1 className="text-xl font-semibold">
                {type === "create" ? "Create a new exam" : "Update exam"}
            </h1>

            <div className="flex justify-between flex-wrap gap-4">
                <InputField
                    label="Subject"
                    type="text"
                    defaultValue={data?.subjectId}
                    register={register}
                    name="subjectId"
                    error={errors?.subjectId}
                />
                <InputField
                    label="Class"
                    type="text"
                    defaultValue={data?.classId}
                    register={register}
                    name="classId"
                    error={errors?.classId}
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
                    label="Start Time"
                    type="time"
                    defaultValue={data?.startTime}
                    register={register}
                    name="startTime"
                    error={errors?.startTime}
                />
                <InputField
                    label="End Time"
                    type="time"
                    defaultValue={data?.endTime}
                    register={register}
                    name="endTime"
                    error={errors?.endTime}
                />
            </div>
            <button className="bg-blue-400 text-white p-2 rounded-md">
                {type === "create" ? "Create" : "Update"}
            </button>
        </form>
    );
};

export default ExamForm;
