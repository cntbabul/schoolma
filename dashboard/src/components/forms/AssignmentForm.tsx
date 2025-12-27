"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import z from "zod";
import InputField from "../InputField";
import { Dispatch, SetStateAction } from "react";

const schema = z.object({
    subject: z.string().min(1, { message: "Subject is required!" }),
    class: z.string().min(1, { message: "Class is required!" }),
    teacher: z.string().min(1, { message: "Teacher is required!" }),
    dueDate: z.string().min(1, { message: "Due Date is required!" }),
});

type AssignmentFormProps = z.infer<typeof schema>;

const AssignmentForm = ({
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
    } = useForm<AssignmentFormProps>({
        resolver: zodResolver(schema),
    });

    const onSubmit = handleSubmit((data) => {
        //console.log(data);
    });

    return (
        <form className="flex flex-col gap-8" onSubmit={onSubmit}>
            <h1 className="text-xl font-semibold">
                {type === "create" ? "Create a new assignment" : "Update assignment"}
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
                    label="Class"
                    type="text"
                    defaultValue={data?.class}
                    register={register}
                    name="class"
                    error={errors?.class}
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
                    label="Due Date"
                    type="date"
                    defaultValue={data?.dueDate}
                    register={register}
                    name="dueDate"
                    error={errors?.dueDate}
                />
            </div>
            <button className="bg-blue-400 text-white p-2 rounded-md">
                {type === "create" ? "Create" : "Update"}
            </button>
        </form>
    );
};

export default AssignmentForm;
