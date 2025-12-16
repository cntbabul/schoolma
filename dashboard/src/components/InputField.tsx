import { FieldError } from "react-hook-form";

type InputFieldProps = {
    label: string;
    type?: string;
    register: any;
    name: string;
    defaultValue?: string;
    error?: any;
    inputProps?: React.InputHTMLAttributes<HTMLInputElement>;
    enum?: string[];
};

const InputField = ({
    label,
    type = "text",
    register,
    name,
    defaultValue,
    error,
    inputProps,
    enum: options,
}: InputFieldProps) => {
    return (
        <div className="flex flex-col gap-2 w-full md:w-1/4">
            <span className="text-xs font-medium text-gray-400">{label}</span>
            {type === "enum" && options ? (
                <select
                    {...register(name)}
                    className="ring-[1.5px] ring-gray-300 p-2 rounded-md text-xs w-full"
                    defaultValue={defaultValue}
                    {...inputProps}
                >
                    {options.map((option) => (
                        <option key={option} value={option}>
                            {option}
                        </option>
                    ))}
                </select>
            ) : (
                <input
                    type={type}
                    {...register(name)}
                    {...inputProps}
                    defaultValue={defaultValue}
                    className="ring-[1.5px] ring-gray-300 p-2 rounded-md text-xs w-full"
                />
            )}
            {error?.message && (
                <p className="text-red-500 text-xs">{error?.message.toString()}</p>
            )}
        </div>
    );
};

export default InputField;