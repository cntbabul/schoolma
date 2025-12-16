"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import z from "zod";
import InputField from "../InputField";

const schema = z.object({
    name: z.string().min(1, { message: "Subject name is required!" }),
    teachers: z.string().min(1, { message: "Teachers are required!" }),
});

type SubjectFormProps = z.infer<typeof schema>;

const SubjectForm = ({
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
    } = useForm<SubjectFormProps>({
        resolver: zodResolver(schema),
    });

    const onSubmit = handleSubmit((data) => {
        console.log(data);
    });

    return (
        <form className="flex flex-col gap-8" onSubmit={onSubmit}>
            <h1 className="text-xl font-semibold">
                {type === "create" ? "Create a new subject" : "Update subject"}
            </h1>

            <div className="flex justify-between flex-wrap gap-4">
                <InputField
                    label="Subject Name"
                    type="text"
                    defaultValue={data?.name}
                    register={register}
                    name="name"
                    error={errors?.name}
                />
                <InputField
                    label="Teachers"
                    type="text"
                    defaultValue={data?.teachers}
                    register={register}
                    name="teachers"
                    error={errors?.teachers}
                />
            </div>
            <button className="bg-blue-400 text-white p-2 rounded-md">
                {type === "create" ? "Create" : "Update"}
            </button>
        </form>
    );
};

export default SubjectForm;
