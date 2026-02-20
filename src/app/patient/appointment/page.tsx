"use client";

import { useEffect, useState } from "react";
import PatientAppointmentCard from "@/component/patient/appointmentCard";
import axiosClient from "@/lib/axiosClient";

/* ------------------ TYPES ------------------ */

interface DoctorDetails {
  name: string;
  specialization: string;
  startTime: string;
  endTime: string;
  doctor_profile?: string;
  email?: string;
  description?: string;
}

interface Appointment {
  _id: string;
  doctorId: string;
  patientId: string;
  status: "PENDING" | "CONFIRMED";
  createdAt: string;
  doctorDetails: DoctorDetails;
}

/* ------------------ COMPONENT ------------------ */

export default function DoctorsPage() {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const res = await axiosClient.get("get-patient-appointments");
        const data = res.data;

        // assuming backend sends: { success: true, data: [...] }
        setAppointments(data.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchAppointments();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading doctors...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-100 p-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {appointments.map((appointment) => (
          <PatientAppointmentCard
            key={appointment._id}
            appointment={appointment}
          />
        ))}
      </div>
    </div>
  );
}