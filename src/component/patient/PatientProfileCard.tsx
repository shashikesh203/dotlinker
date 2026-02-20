"use client";

import {
  FaEnvelope,
  FaUserCircle,
  FaBirthdayCake,
  FaVenusMars,
} from "react-icons/fa";
import { useRouter } from "next/navigation";

interface PatientProfile {
  _id: string;
  name: string;
  email: string;
  age: number;
  gender?: string;
  patient_profile?: string;
  createdAt: string;
}

interface Props {
  patient: PatientProfile;
}

export default function PatientProfileCard({ patient }: Props) {
  const router = useRouter();

  return (
    <div className="max-w-xl w-full bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 overflow-hidden">
      
      {/* Gradient Banner */}
      <div className="h-28 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 relative">
        <div className="absolute -bottom-12 left-6">
          <div className="w-28 h-28 rounded-full border-4 border-white overflow-hidden bg-gray-100 flex items-center justify-center shadow-lg">
            {patient.patient_profile ? (
              <img
                src={patient.patient_profile}
                alt={patient.name}
                width={112}
                height={112}
                className="object-cover w-full h-full"
              />
            ) : (
              <FaUserCircle className="text-6xl text-gray-400" />
            )}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="pt-16 pb-8 px-6">
        
        {/* Name */}
        <h2 className="text-2xl font-bold text-gray-800 tracking-wide">
          {patient.name}
        </h2>

        {/* Age + Gender */}
        <div className="flex flex-wrap items-center gap-3 mt-3">
          <div className="flex items-center gap-2 bg-pink-100 text-pink-700 text-sm font-semibold px-3 py-1 rounded-full">
            <FaBirthdayCake />
            {patient.age} Years
          </div>

          {patient.gender && (
            <div className="flex items-center gap-2 bg-blue-100 text-blue-700 text-sm font-semibold px-3 py-1 rounded-full capitalize">
              <FaVenusMars />
              {patient.gender}
            </div>
          )}
        </div>

        {/* Email */}
        <div className="flex items-center gap-2 text-gray-600 mt-5">
          <FaEnvelope className="text-blue-500" />
          <span className="text-sm break-all">{patient.email}</span>
        </div>

        {/* Divider */}
        <div className="border-t my-6"></div>

        {/* Footer (Doctor Style Layout) */}
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-500">
            Joined{" "}
            <span className="font-medium text-gray-700">
              {new Date(patient.createdAt).toLocaleDateString()}
            </span>
          </span>

          <button
            className="px-5 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-indigo-600 hover:to-blue-600 transition text-white rounded-xl font-semibold shadow-md text-sm cursor-pointer"
            onClick={() => {
              localStorage.removeItem("token");
              router.push("/");
            }}
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}