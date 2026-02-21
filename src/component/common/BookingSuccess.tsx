"use client";

import { FaCheckCircle } from "react-icons/fa";
import { useRouter } from "next/navigation";
import { BookingSuccessProps } from "@/types/patient";

export default function BookingSuccess({
  doctorName,
  slot,
}: BookingSuccessProps) {
  const router = useRouter();
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 pointer-events-none">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-sm p-6 text-center relative pointer-events-auto">
        <div className="flex justify-center mb-4">
          <FaCheckCircle className="text-green-500 text-6xl" />
        </div>
        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          Booking Confirmed!
        </h2>
        <p className="text-gray-600 mb-4">
          Your appointment with{" "}
          <span className="font-semibold">{doctorName}</span> at{" "}
          <span className="font-semibold">{slot}</span> has been successfully
          booked.
        </p>

        <button
          onClick={() => {
            router.push("/patient/appointment");
          }}
          className="mt-4 w-full py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-indigo-600 hover:to-blue-600 text-white font-semibold rounded-xl shadow-md transition cursor-pointer"
        >
          Go to My Appointments
        </button>
      </div>
    </div>
  );
}
