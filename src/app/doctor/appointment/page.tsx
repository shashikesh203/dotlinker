"use client";

import { useEffect, useState } from "react";
import PatientAppointmentCard from "@/component/patient/PatientAppointmentCard";
import axiosClient from "@/lib/axiosClient";
import { BookingStatus } from "@/enums/bookingStatus";
import DoctorAppointmentCard from "@/component/doctor/DoctorAppointmentCard";

interface  PatientDetails {
    name: string;
    age?: number;
    gender?: string;
  };

interface Appointment {
  _id: string;
  doctorId: string;
  patientId: string;
  status: BookingStatus;
  createdAt: string;
  patientDetails: PatientDetails;
}

export default function AppointmentPage() {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const res = await axiosClient.get("get-doctor-appointments");
        const data = res.data;
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
    <div className="bg-slate-100 p-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {appointments.length ?appointments.map((appointment) => (
          <DoctorAppointmentCard
            key={appointment._id}
            appointment={appointment}
          />
        )): (
          <div className="col-span-full text-center text-gray-500 mt-30 sm:mt-40 text-2xl font-semibold">
            No appointments found.
          </div>
        )}
      </div>
    </div>
  );
}