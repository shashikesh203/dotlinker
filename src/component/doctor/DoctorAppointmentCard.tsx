"use client";

import { BookingStatus } from "@/enums/bookingStatus";
import axiosClient from "@/lib/axiosClient";
import { useState } from "react";
import { FaUserMd, FaClock, FaEnvelope } from "react-icons/fa";
import { toast } from "react-toastify";

interface Appointment {
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

interface Props {
  key: string;
  appointment: Appointment;
}

export default function DoctorAppointmentCard({ appointment }: Props) {
  const [loading, setLoading] = useState(false);
  const [bookingStatus, setBookingStatus] = useState(appointment.status);

  const patient = appointment.patientDetails;

  const handleBookingStatusChange = async (bookingStatus: BookingStatus) => {
  try {
    setLoading(true);
    await axiosClient.post(`/update-appointment/${appointment._id}`, { status: bookingStatus });
    setBookingStatus(bookingStatus);
    toast.success(`Appointment ${bookingStatus.toLowerCase()}`);
  } catch (error) {
    toast.error("Something went wrong");
  } finally {
    setLoading(false);
  }
};



  return (
    <div className="bg-white rounded-3xl shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 overflow-hidden flex flex-col">
      {/* Top gradient */}
      <div className="h-2 bg-gradient-to-r from-blue-600 to-indigo-600"></div>

      {/* Card Content */}
      <div className="p-6 flex-1 flex flex-col justify-between">
        <div>
          {/* Doctor Header */}
          <div className="flex items-center gap-4">
             <div className="w-16 h-16 rounded-full overflow-hidden bg-gray-100 flex items-center justify-center border">
            {patient.patient_profile ? (
              <img
                src={patient.patient_profile}
                alt={patient.name}
                className="w-full h-full object-cover"
              />
            ) : (
              <FaUserMd className="text-3xl text-blue-600" />
            )}
          </div>

            <div>
              <h2 className="text-lg font-semibold text-gray-800">
                Dr. {patient.name}
              </h2>

              <span className="inline-block mt-1 text-xs bg-blue-100 text-blue-700 px-3 py-1 rounded-full font-medium">
                {patient.age} years old
              </span>
            </div>
          </div>

          
          <p className="mt-4 text-sm text-gray-600 leading-relaxed line-clamp-2 min-h-[2.5rem]">
            {patient.gender || "Gender not specified"}
          </p>

          <div className="mt-4">
            <span
              className={`text-xs px-3 py-1 rounded-full font-medium ${
                bookingStatus === "PENDING"
                  ? "bg-blue-300 text-white"
                  : (bookingStatus === "CANCELLED" || bookingStatus === "REJECTED")
                  ? "bg-red-400 text-white"
                  : "bg-green-100 text-green-700"
              }`}
            >
              {bookingStatus}
            </span>
          </div>
        </div>

        <div className="mt-6 flex gap-3">
  {bookingStatus === BookingStatus.PENDING && (
    <>
      <button
        onClick={() => handleBookingStatusChange(BookingStatus.APPROVED)}
        disabled={loading}
        className="flex-1 bg-green-600 hover:bg-green-700 text-white py-2.5 rounded-xl font-semibold transition disabled:opacity-50 cursor-pointer"
      >
        Approve
      </button>

      <button
        onClick={() => handleBookingStatusChange(BookingStatus.REJECTED)}
        disabled={loading}
        className="flex-1 bg-red-600 hover:bg-red-700 text-white py-2.5 rounded-xl font-semibold transition disabled:opacity-50 cursor-pointer"
      >
        Reject
      </button>
    </>
  )}

  {bookingStatus === BookingStatus.APPROVED && (
    <button
      onClick={() => handleBookingStatusChange(BookingStatus.COMPLETED)}
      disabled={loading}
      className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2.5 rounded-xl font-semibold transition disabled:opacity-50 cursor-pointer"
    >
      Mark as Completed
    </button>
  )}

  {[BookingStatus.REJECTED, BookingStatus.CANCELLED].includes(
    bookingStatus
  ) && (
    <button
      disabled
      className="w-full bg-gray-300 text-gray-600 py-2.5 rounded-xl font-semibold cursor-not-allowed"
    >
      {bookingStatus}
    </button>
  )}

  {bookingStatus === BookingStatus.COMPLETED && (
    <button
      disabled
      className="w-full bg-green-100 text-green-700 py-2.5 rounded-xl font-semibold cursor-not-allowed"
    >
      Completed
    </button>
  )}
</div>
      </div>
    </div>
  );
}