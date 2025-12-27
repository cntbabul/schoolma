"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import z from "zod";
import InputField from "../InputField";
import { Dispatch, SetStateAction } from "react";

const schema = z.object({
    title: z.string().min(3, { message: "Title must be at least 3 characters" }).max(50, { message: "Title must be at most 50 characters" }),
    description: z.string().min(10, { message: "Description must be at least 10 characters" }).max(500, { message: "Description must be at most 500 characters" }),
    date: z.string().min(1, { message: "Date is required!" }),
    class: z.string().min(1, { message: "Class is required!" }),
});

type AnnouncementFormProps = z.infer<typeof schema>;

const AnnouncementForm = ({
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
    } = useForm<AnnouncementFormProps>({
        resolver: zodResolver(schema),
    });

    const onSubmit = handleSubmit((data) => {
        //console.log(data);
    });

    return (
        <form className="flex flex-col gap-8" onSubmit={onSubmit}>
            <h1 className="text-xl font-semibold">
                {type === "create" ? "Create a new announcement" : "Update announcement"}
            </h1>

            <div className="flex justify-between flex-wrap gap-4">
                <InputField
                    label="Title"
                    type="text"
                    defaultValue={data?.title}
                    register={register}
                    name="title"
                    error={errors?.title}
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
                    label="Class"
                    type="text"
                    defaultValue={data?.class}
                    register={register}
                    name="class"
                    error={errors?.class}
                />
                <InputField
                    label="Description"
                    type="text"
                    defaultValue={data?.description}
                    register={register}
                    name="description"
                    error={errors?.description}
                />
            </div>
            <button className="bg-blue-400 text-white p-2 rounded-md">
                {type === "create" ? "Create" : "Update"}
            </button>
        </form>
    );
};

export default AnnouncementForm;
