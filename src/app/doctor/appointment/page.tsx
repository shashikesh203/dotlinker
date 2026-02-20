"use client";

import { useEffect, useState } from "react";
import PatientAppointmentCard from "@/component/patient/PatientAppointmentCard";
import axiosClient from "@/lib/axiosClient";
import { BookingStatus } from "@/enums/bookingStatus";
import DoctorAppointmentCard from "@/component/doctor/DoctorAppointmentCard";
import SingleSelectOptions from "@/component/genericInput/SingleSelectOption";
import { Controller } from "react-hook-form";

interface PatientDetails {
  name: string;
  age?: number;
  gender?: string;
  patient_profile?: string;
}

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
  const [status, setStatus] = useState<string>("");
  const [loading, setLoading] = useState(true);

  const fetchAppointments = async (status?: string) => {
    try {
      const query = status ? `?status=${status}` : "";
      const res = await axiosClient.get(`get-doctor-appointments${query}`);
      const data = res.data;
      setAppointments(data.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
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
      <div className="justify-end items-center flex">
        <SingleSelectOptions
          label="Appointment Status"
          name="status"
          value={status}
          onChange={(e) => {
            const selected = e.target.value;
            setStatus(selected);
            fetchAppointments(selected);
          }}
          options={[
            { label: "All", value: "" },
            ...Object.values(BookingStatus).map((status) => ({
              label: status.charAt(0) + status.slice(1).toLowerCase(),
              value: status,
            })),
          ]}
          placeholder="Select status"
          required
          className="w-70 mb-10"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {appointments.length ? (
          appointments.map((appointment) => (
            <DoctorAppointmentCard
              key={appointment._id}
              appointment={appointment}
            />
          ))
        ) : (
          <div className="col-span-full text-center text-gray-500 mt-30 sm:mt-40 text-2xl font-semibold">
            No appointments found.
          </div>
        )}
      </div>
    </div>
  );
}
