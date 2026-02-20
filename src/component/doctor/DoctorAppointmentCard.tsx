"use client";

import { BookingStatus } from "@/enums/bookingStatus";
import axiosClient from "@/lib/axiosClient";
import { useState } from "react";
import { LiaBirthdayCakeSolid } from "react-icons/lia";
import { FaUserMd, FaMale, FaEnvelope } from "react-icons/fa";
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
      await axiosClient.post(`/update-appointment/${appointment._id}`, {
        status: bookingStatus,
      });
      setBookingStatus(bookingStatus);
      toast.success(`Appointment ${bookingStatus.toLowerCase()}`);
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="group bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100 overflow-hidden flex flex-col transform hover:-translate-y-1">
      {/* Top gradient */}
      <div className="h-2 bg-gradient-to-r from-blue-600 via-indigo-500 to-purple-600"></div>

      {/* Card Content */}
      <div className="p-6 flex-1 flex flex-col justify-between">
        <div>
          {/* Patient Header */}
          <div className="flex items-center gap-4">
            <div className="w-20 h-20 rounded-full overflow-hidden bg-gradient-to-br from-blue-100 to-indigo-100 flex items-center justify-center border-2 border-blue-200 shadow-md">
              {patient.patient_profile ? (
                <img
                  src={patient.patient_profile}
                  alt={patient.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <FaUserMd className="text-4xl text-blue-600" />
              )}
            </div>

            <div>
              <h2 className="text-xl font-bold text-gray-800 group-hover:text-blue-600 transition">
                {patient.name}
              </h2>

              {/* Age with Icon */}
              <div className="flex items-center gap-2 mt-2 text-sm bg-blue-50 text-blue-700 px-3 py-1 rounded-full w-fit shadow-sm">
                <LiaBirthdayCakeSolid className="text-blue-500" />
                <span>{patient.age || "N/A"} years old</span>
              </div>
            </div>
          </div>

          {/* Gender / Specialization Section */}
          <div className="mt-4 flex items-center gap-2 text-gray-600">
            <FaMale className="text-indigo-500" />
            <span className="text-sm font-medium">
              {patient.gender || "Gender not specified"}
            </span>
          </div>

          {/* Status Badge */}
          <div className="mt-5">
            <span
              className={`text-xs px-4 py-1.5 rounded-full font-semibold tracking-wide shadow-sm ${
                bookingStatus === "PENDING"
                  ? "bg-yellow-100 text-yellow-700"
                  : bookingStatus === "CANCELLED" ||
                      bookingStatus === "REJECTED"
                    ? "bg-red-100 text-red-600"
                    : bookingStatus === "APPROVED"
                      ? "bg-blue-100 text-blue-700"
                      : "bg-green-100 text-green-700"
              }`}
            >
              {bookingStatus}
            </span>
          </div>
        </div>

        {/* Buttons */}
        <div className="mt-6 flex gap-3">
          {bookingStatus === BookingStatus.PENDING && (
            <>
              <button
                onClick={() =>
                  handleBookingStatusChange(BookingStatus.APPROVED)
                }
                disabled={loading}
                className="flex-1 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white py-2.5 rounded-xl font-semibold transition-all duration-300 disabled:opacity-50 shadow-md hover:shadow-lg"
              >
                Approve
              </button>

              <button
                onClick={() =>
                  handleBookingStatusChange(BookingStatus.REJECTED)
                }
                disabled={loading}
                className="flex-1 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white py-2.5 rounded-xl font-semibold transition-all duration-300 disabled:opacity-50 shadow-md hover:shadow-lg"
              >
                Reject
              </button>
            </>
          )}

          {bookingStatus === BookingStatus.APPROVED && (
            <button
              onClick={() => handleBookingStatusChange(BookingStatus.COMPLETED)}
              disabled={loading}
              className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white py-2.5 rounded-xl font-semibold transition-all duration-300 disabled:opacity-50 shadow-md hover:shadow-lg"
            >
              Mark as Completed
            </button>
          )}

          {[BookingStatus.REJECTED, BookingStatus.CANCELLED].includes(
            bookingStatus,
          ) && (
            <button
              disabled
              className="w-full bg-gray-200 text-gray-600 py-2.5 rounded-xl font-semibold cursor-not-allowed"
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
