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


export type FormValue = File | string | null;
export type FormDataType = Record<string, FormValue>;

