"use client";

import { useState } from "react";
import { FaUserMd, FaClock, FaEnvelope } from "react-icons/fa";

interface Doctor {
  _id: string;
  name: string;
  specialization: string;
  startTime: string;
  endTime: string;
  doctor_profile?: string;
  email?: string;
  description?: string;
}

interface Props {
  doctor: Doctor;
}

export default function DoctorBookingCard({ doctor }: Props) {
  const [loading, setLoading] = useState(false);

  const handleBooking = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      alert("Please login first");
      return;
    }

    // try {
    //   setLoading(true);

    //   if (data.success) {
    //     alert("Appointment booked ");
    //   } else {
    //     alert(data.message);
    //   }
    // } catch (error) {
    //   console.error(error);
    //   alert("Something went wrong");
    // } finally {
    //   setLoading(false);
    // }
  };

  return (
    <div className="bg-white rounded-3xl shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 overflow-hidden">
      {/* Top Gradient Strip */}
      <div className="h-2 bg-gradient-to-r from-blue-600 to-indigo-600"></div>

      <div className="p-6">
        {/* Doctor Header */}
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-full overflow-hidden bg-gray-100 flex items-center justify-center border">
            {doctor.doctor_profile ? (
              <img
                src={doctor.doctor_profile}
                alt={doctor.name}
                className="w-full h-full object-cover"
              />
            ) : (
              <FaUserMd className="text-3xl text-blue-600" />
            )}
          </div>

          <div>
            <h2 className="text-lg font-semibold text-gray-800">
              Dr. {doctor.name}
            </h2>

            <span className="inline-block mt-1 text-xs bg-blue-100 text-blue-700 px-3 py-1 rounded-full font-medium">
              {doctor.specialization}
            </span>
          </div>
        </div>

        {/* Description */}
        {doctor.description && (
          <p className="mt-4 text-sm text-gray-600 leading-relaxed line-clamp-2">
            {doctor.description}
          </p>
        )}

        {/* Availability */}
        <div className="mt-4 space-y-2 text-sm text-gray-600">
          <div className="flex items-center gap-2">
            <FaClock className="text-green-500" />
            <span>
              {doctor.startTime} - {doctor.endTime}
            </span>
          </div>

          {doctor.email && (
            <div className="flex items-center gap-2">
              <FaEnvelope className="text-blue-500" />
              <span className="break-all">{doctor.email}</span>
            </div>
          )}
        </div>

        {/* CTA */}
        <button
          onClick={handleBooking}
          disabled={loading}
          className="mt-6 w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-indigo-600 hover:to-blue-600 text-white py-2.5 rounded-xl font-semibold shadow-md transition"
        >
          {loading ? "Booking..." : "Book Appointment"}
        </button>
      </div>
    </div>
  );
}
