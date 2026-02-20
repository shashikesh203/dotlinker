"use client";

import { useRouter } from "next/navigation";
import { FaUserMd, FaUserInjured } from "react-icons/fa";

export default function RoleSelection() {
  const router = useRouter();

  return (
    
    <div className="relative flex justify-center items-center min-h-screen px-4 overflow-hidden">

   
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-green-50"></div>

      <div className="absolute top-20 left-20 w-72 h-72 bg-blue-200 rounded-full blur-3xl opacity-40"></div>
      <div className="absolute bottom-20 right-20 w-72 h-72 bg-green-200 rounded-full blur-3xl opacity-40"></div>

      {/* Content */}
      <div className="relative grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl w-full z-10">

        {/* Doctor Card */}
        <div
          onClick={() => router.push("/auth/doctor-login")}
          className="cursor-pointer bg-white/80 backdrop-blur-xl shadow-lg rounded-2xl p-8 flex flex-col items-center text-center 
          hover:shadow-2xl hover:scale-105 transition-all duration-300 border border-gray-200"
        >
          <FaUserMd className="text-5xl text-blue-600 mb-4" />
          <h2 className="text-2xl font-bold text-gray-800">
            Doctor Portal
          </h2>
          <p className="text-gray-500 mt-2">
            Manage appointments, patients, and healthcare services.
          </p>

          <button
            className="mt-6 px-6 py-2 bg-blue-600 text-white rounded-xl font-medium 
            hover:bg-blue-700 transition cursor-pointer"
          >
            Click Here →
          </button>
        </div>

        {/* Patient Card */}
        <div
          onClick={() => router.push("/auth/patient-login")}
          className="cursor-pointer bg-white/80 backdrop-blur-xl shadow-lg rounded-2xl p-8 flex flex-col items-center text-center 
          hover:shadow-2xl hover:scale-105 transition-all duration-300 border border-gray-200"
        >
          <FaUserInjured className="text-5xl text-green-600 mb-4" />
          <h2 className="text-2xl font-bold text-gray-800">
            Patient Portal
          </h2>
          <p className="text-gray-500 mt-2">
            Book appointments and track your healthcare records easily.
          </p>

          <button
            className="mt-6 px-6 py-2 bg-green-600 text-white rounded-xl font-medium 
            hover:bg-green-700 transition cursor-pointer"
          >
            Click Here →
          </button>
        </div>
      </div>
    </div>
  );
}
