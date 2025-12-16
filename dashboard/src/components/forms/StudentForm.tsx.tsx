"use client"

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import z from "zod";
import InputField from "../InputField";
import Image from "next/image";

const schema = z.object({
    username: z.string().min(3, { message: "Username must be at least 3 characters" }).max(20, { message: "Username must be at most 20 characters" }),
    email: z.string().email({ message: "Invalid email" }),
    password: z.string().min(8, { message: "Password must be at least 8 characters" }),
    firstName: z.string().min(3, { message: "First name must be at least 3 characters" }).max(20, { message: "First name must be at most 20 characters" }),
    lastName: z.string().min(3, { message: "Last name must be at least 3 characters" }).max(20, { message: "Last name must be at most 20 characters" }),
    phone: z.string().min(10, { message: "Phone number must be at least 10 characters" }).max(10, { message: "Phone number must be at most 10 characters" }),
    address: z.string().min(3, { message: "Address must be at least 3 characters" }).max(100, { message: "Address must be at most 100 characters" }),
    bloodType: z.enum(["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"], { message: "Blood type is required!" }),
    birthday: z.date({ message: "Invalid date" }),
    sex: z.enum(["male", "female", "other"], { message: "Gender is required!" }),
    img: z.instanceof(File, { message: "Image is required!" }),
})
type StudentFormProps = z.infer<typeof schema>

const StudentForm = ({ type, data }: { type: "create" | "update"; data?: any; }) => {

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<StudentFormProps>({ resolver: zodResolver(schema) })
    const onSubmit = handleSubmit(data => console.log(data))
    return (
        <form className="flex flex-col gap-8" onSubmit={onSubmit}>
            <h1 className="text-xl font-semibold">Create a new student</h1>
            <span className="text-xs text-gray-400 font-medium">Authentication Information</span>
            <div className="flex justify-between flex-wrap gap-4">
                <InputField
                    label="Username"
                    type="text"
                    defaultValue={data?.username}
                    register={register}
                    name="username"
                    error={errors?.username}
                /> <InputField
                    label="Email"
                    type="email"
                    defaultValue={data?.email}
                    register={register}
                    name="email"
                    error={errors?.email}
                /> <InputField
                    label="Password"
                    type="password"
                    defaultValue={data?.password}
                    register={register}
                    name="password"
                    error={errors?.password}
                />
            </div>
            <span className="text-xs text-gray-400 font-medium">Personal Information</span>
            <div className="flex justify-between flex-wrap gap-4">
                <InputField
                    label="First Name"
                    type="text"
                    defaultValue={data?.firstName}
                    register={register}
                    name="firstName"
                    error={errors?.firstName}
                /> <InputField
                    label="Last Name"
                    type="text"
                    defaultValue={data?.lastName}
                    register={register}
                    name="lastName"
                    error={errors?.lastName}
                /> <InputField
                    label="Phone"
                    type="phone"
                    defaultValue={data?.phone}
                    register={register}
                    name="phone"
                    error={errors?.phone}
                /> <InputField
                    label="Address"
                    type="text"
                    defaultValue={data?.address}
                    register={register}
                    name="address"
                    error={errors?.address}
                /><InputField
                    label="Blood Type"
                    type="enum"
                    enum={["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"]}
                    defaultValue={data?.bloodType}
                    register={register}
                    name="bloodType"
                    error={errors?.bloodType}
                />
                <InputField
                    label="Birthday"
                    type="date"
                    defaultValue={data?.birthday}
                    register={register}
                    name="birthday"
                    error={errors?.birthday}
                />

                <InputField
                    label="Sex"
                    type="enum"
                    enum={["Male", "Female", "Other"]}
                    defaultValue={data?.sex}
                    register={register}
                    name="sex"
                    error={errors?.sex}
                />
                <div className="flex flex-col gap-2 w-full md:w-1/4">
                    <label className="text-xs text-gray-500 flex items-center gap-2 cursor-pointer" htmlFor="img">
                        <Image src="/upload.png" alt="upload" width={28} height={28} />
                        <span>Upload a Image</span>
                    </label>
                    <input type="file" {...register("img")} className="hidden" id="img" />
                    {errors.img?.message && <p className="text-red-400 text-xs">{errors.img?.message.toString()}</p>}
                </div>


            </div>
            <button className="bg-blue-400 text-white p-2 rounded-md">{type === "create" ? "Create" : "Update"}</button>
        </form >
    );
};

export default StudentForm;