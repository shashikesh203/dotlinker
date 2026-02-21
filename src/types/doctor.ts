import { BookingStatus } from "@/enums/bookingStatus";

export interface DoctorFormData {
  name: string;
  email: string;
  password: string;
  specialization: string;
  startTime: string;
  endTime: string;
  description: string;
  doctor_profile: File | string;
}

export interface PatientDetails {
  name: string;
  age?: number;
  gender?: string;
  patient_profile?: string;
}

export interface Appointment {
  _id: string;
  doctorId: string;
  patientId: string;
  status: BookingStatus;
  createdAt: string;
  patientDetails: PatientDetails;
}

export interface DoctorProfile {
  _id: string;
  name: string;
  email: string;
  startTime: string;
  endTime: string;
  specialization: string;
  description: string;
  createdAt: string;
}


export interface Appointment {
  _id: string;
  patientId: string;
  doctorId: string;
  status: BookingStatus;
  createdAt: string;
  patientDetails: {
    name: string;
    age?: number;
    gender?: string;
    patient_profile?: string;
  };
}

export interface Props {
  key: string;
  appointment: Appointment;
}