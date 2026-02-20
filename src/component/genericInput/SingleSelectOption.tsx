import React from "react";

export type Option = {
  label: string;
  value: string | number;
};

type SingleSelectOptionsProps = {
  label?: string;
  name: string;
  value: any;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  options: Option[];
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  className?: string;
};

export default function SingleSelectOptions({
  label,
  name,
  value,
  onChange,
  options,
  placeholder = "Select an option",
  required,
  disabled,
  className = "",
}: SingleSelectOptionsProps) {
  return (
    <div className={`flex flex-col gap-1.5 ${className}`}>
      {label && (
        <label
          htmlFor={name}
          className="text-sm font-medium text-gray-700 flex items-center gap-1"
        >
          {label}
          {required && <span className="text-red-500">*</span>}
        </label>
      )}

      <div className="relative">
        <select
          id={name}
          name={name}
          value={value}
          onChange={onChange}
          disabled={disabled}
          required={required}
          className={`
            w-full appearance-none rounded-lg border px-4 py-2.5 pr-10 text-sm
            bg-white text-gray-900
            border-gray-300
            focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500
            transition
            disabled:bg-gray-100 cursor-pointer
          `}
        >
          {placeholder && (
            <option value="" disabled>
              {placeholder}
            </option>
          )}

          {options
            .filter((opt) => opt.value !== undefined && opt.value !== null) // ✅ safe filter
            .map((opt, index) => (
              <option
                key={opt.value !== undefined ? String(opt.value) : index} // ✅ fallback key
                value={opt.value || ""}
              >
                {opt.label || ""}
              </option>
            ))}
        </select>

        <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-gray-400">
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </div>
      </div>
    </div>
  );
}
