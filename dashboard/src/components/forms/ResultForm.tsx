"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import z from "zod";
import InputField from "../InputField";
import { Dispatch, SetStateAction } from "react";

const schema = z.object({
    subject: z.string().min(1, { message: "Subject is required!" }),
    student: z.string().min(1, { message: "Student is required!" }),
    score: z.coerce.number().min(0, { message: "Score must be at least 0!" }).max(100, { message: "Score must be at most 100!" }),
    teacher: z.string().min(1, { message: "Teacher is required!" }),
    date: z.string().min(1, { message: "Date is required!" }),
});

type ResultFormProps = z.infer<typeof schema>;

const ResultForm = ({
    type,
    data,
    setOpen,
    relatedData,
}: {
    type: "create" | "update";
    data?: any;
    setOpen?: Dispatch<SetStateAction<boolean>>;
    relatedData?: any;
}) => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(schema),
    });

    const onSubmit = handleSubmit((data) => {
        console.log(data);
    });

    return (
        <form className="flex flex-col gap-8" onSubmit={onSubmit}>
            <h1 className="text-xl font-semibold">
                {type === "create" ? "Create a new result" : "Update result"}
            </h1>

            <div className="flex justify-between flex-wrap gap-4">
                <InputField
                    label="Subject"
                    type="text"
                    defaultValue={data?.subject}
                    register={register}
                    name="subject"
                    error={errors?.subject}
                />
                <InputField
                    label="Student"
                    type="text"
                    defaultValue={data?.student}
                    register={register}
                    name="student"
                    error={errors?.student}
                />
                <InputField
                    label="Score"
                    type="number"
                    defaultValue={data?.score}
                    register={register}
                    name="score"
                    error={errors?.score}
                />
                <InputField
                    label="Teacher"
                    type="text"
                    defaultValue={data?.teacher}
                    register={register}
                    name="teacher"
                    error={errors?.teacher}
                />
                <InputField
                    label="Date"
                    type="date"
                    defaultValue={data?.date}
                    register={register}
                    name="date"
                    error={errors?.date}
                />
            </div>
            <button className="bg-blue-400 text-white p-2 rounded-md">
                {type === "create" ? "Create" : "Update"}
            </button>
        </form>
    );
};

export default ResultForm;
