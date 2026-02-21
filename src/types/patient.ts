import { BookingStatus } from "@/enums/bookingStatus";

export interface PatientFormData {
  name: string;
  email: string;
  age: number;
  gender: string;
  password: string;
  patient_profile: string | File;
}

export interface DoctorDetails {
  name: string;
  specialization: string;
  startTime: string;
  endTime: string;
  doctor_profile?: string;
  email?: string;
  description?: string;
}

export interface Appointment {
  _id: string;
  doctorId: string;
  patientId: string;
  status: BookingStatus;
  createdAt: string;
  doctorDetails: DoctorDetails;
}

export interface Doctor {
  _id: string;
  name: string;
  specialization: string;
  startTime: string;
  endTime: string;
  doctor_profile?: string;
}

export interface PatientProfile {
  _id: string;
  name: string;
  email: string;
  age: number;
  patient_profile?: string;
  createdAt: string;
}


export interface PatientAppointment {
  _id: string;
  doctorId: string;
  doctorDetails: {
    name: string;
    specialization: string;
    startTime: string;
    endTime: string;
    email?: string;
    description?: string;
    doctor_profile?: string;
  };
  status: BookingStatus;
}

export interface AppointmentProps {
  key: string;
  appointment: PatientAppointment;
}

interface DoctorBooking {
  _id: string;
  name: string;
  specialization: string;
  startTime: string;
  endTime: string;
  doctor_profile?: string;
  email?: string;
  description?: string;
}

export interface DoctorBookingProps {
  doctor: DoctorBooking;
  handleBookingSuccess: (showSuccessBooking: boolean) => void;
}

interface PatientProfileCard {
  _id: string;
  name: string;
  email: string;
  age: number;
  gender?: string;
  patient_profile?: string;
  createdAt: string;
}

export interface PatientProfileCardProps {
  patient: PatientProfileCard;
}