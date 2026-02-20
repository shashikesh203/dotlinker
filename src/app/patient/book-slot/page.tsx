"use client";

import { useEffect, useState } from "react";
import DoctorBookingCard from "@/component/patient/DoctorBookingCard";
import axiosClient from "@/lib/axiosClient";
import BookingSuccess from "@/component/common/BookingSuccess";

interface Doctor {
  _id: string;
  name: string;
  specialization: string;
  startTime: string;
  endTime: string;
  doctor_profile?: string;
}

export default function DoctorsPage() {
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [loading, setLoading] = useState(true);
  const [showSuccessBooking, setShowSuccessBooking] = useState(false);

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const res = await axiosClient.get("get-doctors");
        const data = res.data;
        setDoctors(data.data); // assuming array
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchDoctors();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading doctors...
      </div>
    );
  }

  if(showSuccessBooking) {
    return (
      <BookingSuccess doctorName={doctors[0].name} slot={`${doctors[0].startTime} - ${doctors[0].endTime}`}  />
    )
  }
  return (
    <div className="min-h-screen bg-slate-100 p-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {doctors.map((doctor) => (
          <DoctorBookingCard key={doctor._id} doctor={doctor} handleBookingSuccess={(showSuccessBooking: boolean) => setShowSuccessBooking(showSuccessBooking)} />
        ))}
      </div>
    </div>
  );
}