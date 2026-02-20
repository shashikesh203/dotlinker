import { FieldError, UseFormRegisterReturn } from "react-hook-form";

interface InputFieldProps {
  label: string;
  placeholder: string;
  type?: string;
  register: UseFormRegisterReturn;
  error?: FieldError;
}

export default function InputField({
  label,
  placeholder,
  type = "text",
  register,
  error,
}: InputFieldProps) {
  return (
    <div>
      <label className="block font-medium text-gray-700">{label}</label>

      <input
        type={type}
        placeholder={placeholder}
        {...register}
        className={`w-full border p-3 rounded-lg mt-1 focus:outline-none focus:ring-2 
            : "border-gray-300 focus:ring-blue-400"`}
      />

      {error && <p className="text-red-500 text-sm mt-1">{error.message}</p>}
    </div>
  );
}
