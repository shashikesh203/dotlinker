"use client";

import { BookingStatus } from "@/enums/bookingStatus";
import axiosClient from "@/lib/axiosClient";
import { useState } from "react";
import { FaUserMd, FaClock, FaEnvelope } from "react-icons/fa";
import { GoProjectRoadmap } from "react-icons/go";
import { toast } from "react-toastify";
import { AppointmentProps } from "@/types/patient";


export default function PatientAppointmentCard({ appointment }: AppointmentProps) {
  const [loading, setLoading] = useState(false);
  const [bookingStatus, setBookingStatus] = useState(appointment.status);

  const doctor = appointment.doctorDetails;

  const handleBookingCancellation = async () => {
    try {
      setLoading(true);
      await axiosClient.post(`cancel-appointment/${appointment._id}`);
      setBookingStatus(BookingStatus.CANCELLED);
      toast.success("Appointment cancelled successfully");
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-3xl shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 overflow-hidden flex flex-col">
      <div className="h-2 bg-gradient-to-r from-blue-600 to-indigo-600"></div>

      <div className="p-6 flex-1 flex flex-col justify-between">
        <div>
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

              <div className="flex items-center gap-2 mt-2 text-sm bg-blue-50 text-blue-700 px-3 py-1 rounded-full w-fit shadow-sm">
                <GoProjectRoadmap className="text-blue-500" />
                <span>{doctor.specialization || "N/A"} years old</span>
              </div>
            </div>
          </div>

          <p className="mt-4 text-sm text-gray-600 leading-relaxed line-clamp-2 min-h-[2.5rem]">
            {doctor.description || "No description available."}
          </p>

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

          <div className="mt-4">
            <span
              className={`text-xs px-3 py-1 rounded-full font-medium ${
                bookingStatus === "PENDING"
                  ? "bg-blue-300 text-white"
                  : bookingStatus === "CANCELLED" ||
                      bookingStatus === "REJECTED"
                    ? "bg-red-400 text-white"
                    : "bg-green-100 text-green-700"
              }`}
            >
              {bookingStatus}
            </span>
          </div>
        </div>

        <div className="mt-6">
          {bookingStatus === BookingStatus.PENDING ? (
            <button
              onClick={handleBookingCancellation}
              disabled={loading}
              className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-indigo-600 hover:to-blue-600 text-white py-2.5 rounded-xl font-semibold shadow-md transition disabled:opacity-50 cursor-pointer disabled:cursor-not-allowed"
            >
              {loading ? "Cancelling..." : "Cancel Appointment"}
            </button>
          ) : [BookingStatus.CANCELLED, BookingStatus.REJECTED].includes(
              bookingStatus,
            ) ? (
            <button
              disabled
              className="w-full bg-gray-300 text-gray-600 py-2.5 rounded-xl font-semibold shadow-md cursor-not-allowed"
            >
              {bookingStatus === BookingStatus.CANCELLED
                ? "Cancelled"
                : "Rejected"}
            </button>
          ) : (
            <button
              disabled
              className="w-full bg-green-100 text-green-700 py-2.5 rounded-xl font-semibold shadow-md cursor-not-allowed"
            >
              {bookingStatus === BookingStatus.COMPLETED
                ? "Completed"
                : "Approved"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
