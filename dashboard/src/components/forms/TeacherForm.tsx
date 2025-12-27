"use client"

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import InputField from "../InputField";
import { teacherSchema, TeacherSchema } from "@/lib/formValidationSchemas";
import { createTeacher, updateTeacher } from "@/lib/actions";
import { useFormState } from "react-dom";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import Image from "next/image";

const TeacherForm = ({
    type,
    data,
    setOpen,
    relatedData
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
        resolver: zodResolver(teacherSchema),
    });

    const [state, formAction] = useFormState(
        type === "create" ? createTeacher : updateTeacher,
        {
            success: false,
            error: false,
        }
    );

    const [img, setImg] = useState<File | null>(null);

    const onSubmit = handleSubmit(async (formData) => {
        console.log(formData);

        let imgUrl = data?.img || null;

        // Upload image to Cloudinary if a new image is selected
        if (img) {
            const formDataImg = new FormData();
            formDataImg.append("file", img);
            formDataImg.append("upload_preset", "school");

            try {
                const response = await fetch(
                    `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
                    {
                        method: "POST",
                        body: formDataImg,
                    }
                );
                const data = await response.json();
                imgUrl = data.secure_url;
            } catch (error) {
                console.error("Image upload failed:", error);
                toast.error("Failed to upload image!");
                return;
            }
        }

        formAction({ ...formData, img: imgUrl } as TeacherSchema);
    });

    const router = useRouter();

    useEffect(() => {
        if (state.success) {
            toast(`Teacher has been ${type === "create" ? "created" : "updated"}!`);
            setOpen?.(false);
            router.refresh();
        }
        if (state.error) {
            toast.error("Something went wrong!");
        }
    }, [state, router, type, setOpen]);

    const { subjects } = relatedData || { subjects: [] };

    return (
        <div className="max-h-[80vh] overflow-y-auto pr-2">
            <form className="flex flex-col gap-8" onSubmit={onSubmit}>
                <h1 className="text-xl font-semibold">
                    {type === "create" ? "Create a new teacher" : "Update teacher"}
                </h1>

                <span className="text-xs text-gray-400 font-medium">Authentication Information</span>
                <div className="flex justify-between flex-wrap gap-4">
                    <InputField
                        label="Username"
                        name="username"
                        defaultValue={data?.username}
                        register={register}
                        error={errors?.username}
                    />
                    <InputField
                        label="Email"
                        name="email"
                        type="email"
                        defaultValue={data?.email}
                        register={register}
                        error={errors?.email}
                    />
                    <InputField
                        label="Password"
                        name="password"
                        type="password"
                        defaultValue={data?.password}
                        register={register}
                        error={errors?.password}
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
                </div>

                <span className="text-xs text-gray-400 font-medium">Personal Information</span>
                <div className="flex justify-between flex-wrap gap-4">
                    <InputField
                        label="First Name"
                        name="name"
                        defaultValue={data?.name}
                        register={register}
                        error={errors?.name}
                    />
                    <InputField
                        label="Last Name"
                        name="surname"
                        defaultValue={data?.surname}
                        register={register}
                        error={errors?.surname}
                    />
                    <InputField
                        label="Phone"
                        name="phone"
                        defaultValue={data?.phone}
                        register={register}
                        error={errors?.phone}
                    />
                    <InputField
                        label="Address"
                        name="address"
                        defaultValue={data?.address}
                        register={register}
                        error={errors?.address}
                    />
                    <div className="flex flex-col gap-2 w-full md:w-1/4">
                        <label className="text-xs text-gray-500">Blood Type</label>
                        <select
                            className="ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm w-full focus:ring-2 focus:ring-blue-400 outline-none"
                            {...register("bloodType")}
                            defaultValue={data?.bloodType}
                        >
                            <option value="">Select blood type</option>
                            <option value="A+">A+</option>
                            <option value="A-">A-</option>
                            <option value="B+">B+</option>
                            <option value="B-">B-</option>
                            <option value="AB+">AB+</option>
                            <option value="AB-">AB-</option>
                            <option value="O+">O+</option>
                            <option value="O-">O-</option>
                        </select>
                        {errors.bloodType?.message && (
                            <p className="text-xs text-red-400">
                                {errors.bloodType.message.toString()}
                            </p>
                        )}
                    </div>
                    <InputField
                        label="Birthday"
                        name="birthday"
                        type="date"
                        defaultValue={data?.birthday?.toISOString().split('T')[0]}
                        register={register}
                        error={errors?.birthday}
                    />
                    <div className="flex flex-col gap-2 w-full md:w-1/4">
                        <label className="text-xs text-gray-500">Sex</label>
                        <select
                            className="ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm w-full focus:ring-2 focus:ring-blue-400 outline-none"
                            {...register("sex")}
                            defaultValue={data?.sex}
                        >
                            <option value="">Select gender</option>
                            <option value="MALE">Male</option>
                            <option value="FEMALE">Female</option>
                        </select>
                        {errors.sex?.message && (
                            <p className="text-xs text-red-400">
                                {errors.sex.message.toString()}
                            </p>
                        )}
                    </div>
                    <div className="flex flex-col gap-2 w-full md:w-1/4">
                        <label
                            className="text-xs text-gray-500 flex items-center gap-2 cursor-pointer"
                            htmlFor="img"
                        >
                            <Image src="/upload.png" alt="upload" width={28} height={28} />
                            <span>Upload a photo</span>
                        </label>
                        <input
                            type="file"
                            id="img"
                            onChange={(e) => setImg(e.target.files?.[0] || null)}
                            className="hidden"
                        />
                        {img && (
                            <p className="text-xs text-green-600">Image selected: {img.name}</p>
                        )}
                    </div>
                    <div className="flex flex-col gap-2 w-full md:w-1/4">
                        <label className="text-xs text-gray-500">Subjects (Optional)</label>
                        <select
                            multiple
                            size={5}
                            className="ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm w-full focus:ring-2 focus:ring-blue-400 outline-none"
                            {...register("subjects")}
                            defaultValue={data?.subjects}
                        >
                            {subjects.map(
                                (subject: { id: number; name: string }) => (
                                    <option
                                        value={subject.id}
                                        key={subject.id}
                                        className="p-2 hover:bg-blue-100 cursor-pointer"
                                    >
                                        {subject.name}
                                    </option>
                                )
                            )}
                        </select>
                        <p className="text-xs text-gray-400 italic">Hold Ctrl/Cmd to select multiple</p>
                        {errors.subjects?.message && (
                            <p className="text-xs text-red-400">
                                {errors.subjects.message.toString()}
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
        </div>
    );
};

export default TeacherForm;
