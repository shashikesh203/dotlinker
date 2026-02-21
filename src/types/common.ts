export interface LoginFormData {
  email: string;
  password: string;
}

export interface DoctorDetailsType {
  data?: {
    doctor_profile?: string;
  };
}
export interface PatientDetailsType {
  data?: {
    patient_profile?: string;
  };
}

export type Variant = "doctor_profile" | "patient_signature";

export interface FileInputProps {
  name: string;
  className: string;
  variant?: Variant;
  formData: Record<string, any>;
  setFormData: (data: Record<string, any>) => void;
  value?: File | string | null;
  onChange?: (file: File | null) => void;
}

export type Option = {
  label: string;
  value: string | number;
};

export type SingleSelectOptionsProps = {
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

export type FormValue = File | string | null;
export type FormDataType = Record<string, FormValue>;
