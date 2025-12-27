"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import InputField from "../InputField";
import { classSchema, ClassSchema } from "@/lib/formValidationSchemas";
import { createClass, updateClass } from "@/lib/actions";
import { useFormState } from "react-dom";
import { Dispatch, SetStateAction, useEffect } from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

const ClassForm = ({
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
        resolver: zodResolver(classSchema),
    });

    const [state, formAction] = useFormState(
        type === "create" ? createClass : updateClass,
        {
            success: false,
            error: false,
        }
    );

    const onSubmit = handleSubmit(async (formData) => {
        console.log(formData);
        formAction(formData as ClassSchema);
    });

    const router = useRouter();

    useEffect(() => {
        if (state.success) {
            toast(`Class has been ${type === "create" ? "created" : "updated"}!`);
            setOpen?.(false);
            router.refresh();
        }
        if (state.error) {
            toast.error("Something went wrong!");
        }
    }, [state, router, type, setOpen]);

    const { teachers, grades } = relatedData || { teachers: [], grades: [] };

    return (
        <form className="flex flex-col gap-8" onSubmit={onSubmit}>
            <h1 className="text-xl font-semibold">
                {type === "create" ? "Create a new class" : "Update class"}
            </h1>

            <div className="flex justify-between flex-wrap gap-4">
                <InputField
                    label="Class Name"
                    name="name"
                    defaultValue={data?.name}
                    register={register}
                    error={errors?.name}
                />
                {data && (
                    <InputField
                        label="Id"
                        name="id"
                        defaultValue={data?.id}
                        register={register}
                        error={errors?.id}
                        inputProps={{ hidden: true }}
                    />
                )}
                <InputField
                    label="Capacity"
                    name="capacity"
                    type="number"
                    defaultValue={data?.capacity}
                    register={register}
                    error={errors?.capacity}
                />
                <div className="flex flex-col gap-2 w-full md:w-1/4">
                    <label className="text-xs text-gray-500">Grade</label>
                    <select
                        className="ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm w-full focus:ring-2 focus:ring-blue-400 outline-none"
                        {...register("gradeId")}
                        defaultValue={data?.gradeId}
                    >
                        <option value="">Select a grade</option>
                        {grades.map(
                            (grade: { id: number; level: number }) => (
                                <option value={grade.id} key={grade.id}>
                                    Grade {grade.level}
                                </option>
                            )
                        )}
                    </select>
                    {errors.gradeId?.message && (
                        <p className="text-xs text-red-400">
                            {errors.gradeId.message.toString()}
                        </p>
                    )}
                </div>
                <div className="flex flex-col gap-2 w-full md:w-1/4">
                    <label className="text-xs text-gray-500">Supervisor (Optional)</label>
                    <select
                        className="ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm w-full focus:ring-2 focus:ring-blue-400 outline-none"
                        {...register("supervisorId")}
                        defaultValue={data?.supervisorId || ""}
                    >
                        <option value="">None</option>
                        {teachers.map(
                            (teacher: { id: string; name: string; surname: string }) => (
                                <option value={teacher.id} key={teacher.id}>
                                    {teacher.name} {teacher.surname}
                                </option>
                            )
                        )}
                    </select>
                    {errors.supervisorId?.message && (
                        <p className="text-xs text-red-400">
                            {errors.supervisorId.message.toString()}
                        </p>
                    )}
                </div>
            </div>
            {state.error && (
                <span className="text-red-500">Something went wrong!</span>
            )}
            <button type="submit" className="bg-blue-400 text-white p-2 rounded-md">
                {type === "create" ? "Create" : "Update"}
            </button>
        </form>
    );
};

export default ClassForm;
