import {
  FieldError,
  FieldValues,
  Path,
  UseFormRegister,
} from "react-hook-form";

interface TimeInputFieldProps<TFormValues extends FieldValues> {
  label: string;
  name: Path<TFormValues>;
  register: UseFormRegister<TFormValues>;
  error?: FieldError;
}

export default function TimeInputField<TFormValues extends FieldValues>({
  label,
  name,
  register,
  error,
}: TimeInputFieldProps<TFormValues>) {
  return (
    <div>
      <label className="block font-medium">{label}</label>

      <input
        type="time"
        {...register(name)}
        className={`w-full border p-3 rounded-lg mt-1 focus:outline-none focus:ring-2 
            : "border-gray-300 focus:ring-blue-400"`}
      />

      {error && <p className="text-red-500 text-sm mt-1">{error.message}</p>}
    </div>
  );
}
