"use client";

import { useEffect, useState } from "react";
import DoctorBookingCard from "@/component/patient/DoctorBookingCard";
import axiosClient from "@/lib/axiosClient";
import BookingSuccess from "@/component/common/BookingSuccess";
import SingleSelectOptions from "@/component/genericInput/SingleSelectOption";
import { DoctorSpecialization } from "@/enums/doctorSpecialization";
import { Doctor } from "@/types/patient";

export default function DoctorsPage() {
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [loading, setLoading] = useState(true);
  const [showSuccessBooking, setShowSuccessBooking] = useState(false);
  const [specialization, setSpecialization] = useState<string>("");
  const fetchDoctors = async (specialization?: string) => {
    try {
      const query = specialization ? `?specialization=${specialization}` : "";
      const res = await axiosClient.get(`get-doctors${query}`);
      const data = res.data;
      setDoctors(data.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDoctors();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading doctors...
      </div>
    );
  }

  if (showSuccessBooking) {
    return (
      <BookingSuccess />
    );
  }
  return (
    <div className=" bg-slate-100 p-8">
      <div className="justify-end items-center flex">
        <SingleSelectOptions
          label=" Specialization"
          name="specialization"
          value={specialization}
          onChange={(e) => {
            const selected = e.target.value;
            setSpecialization(selected);
            fetchDoctors(selected);
          }}
          options={[
            { label: "All", value: "" },
            ...Object.values(DoctorSpecialization).map((spec) => ({
              label: spec,
              value: spec,
            })),
          ]}
          placeholder="Select specialization"
          required
          className="w-70 mb-10"
        />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {doctors.length ? (
          doctors.map((doctor) => (
            <DoctorBookingCard
              key={doctor._id}
              doctor={doctor}
              handleBookingSuccess={(showSuccessBooking: boolean) =>
                setShowSuccessBooking(showSuccessBooking)
              }
            />
          ))
        ) : (
          <div className="col-span-full text-center text-gray-500 mt-30 sm:mt-40 text-2xl font-semibold">
            No doctors found.
          </div>
        )}
      </div>
    </div>
  );
}
