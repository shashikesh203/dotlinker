"use client";

import { FaUserMd, FaEnvelope, FaClock, FaStethoscope } from "react-icons/fa";
import { useRouter } from "next/navigation";

interface DoctorProfile {
  _id: string;
  name: string;
  email: string;
  startTime: string;
  endTime: string;
  specialization: string;
  description: string;
  createdAt: string;
  doctor_profile?: string;
}

interface Props {
  doctor: DoctorProfile;
}

export default function DoctorProfileCard({ doctor }: Props) {
  const router = useRouter();
  return (
    <div className="max-w-xl w-full bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 overflow-hidden">
      {/* Gradient Header */}
      <div className="h-24 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 relative">
        {/* Profile Image */}
        <div className="absolute -bottom-10 left-6">
          <div className="w-20 h-20 rounded-full border-4 border-white overflow-hidden bg-gray-100 flex items-center justify-center shadow-md">
            {doctor.doctor_profile ? (
              <img
                src={doctor.doctor_profile}
                alt={doctor.name}
                className="object-cover w-full h-full"
              />
            ) : (
              <FaUserMd className="text-4xl text-blue-600" />
            )}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="pt-14 pb-6 px-6">
        {/* Name */}
        <h2 className="text-xl font-bold text-gray-800">Dr. {doctor.name}</h2>

        {/* Specialization Badge */}
        <div className="mt-2 inline-flex items-center gap-2 bg-blue-100 text-blue-700 text-xs font-semibold px-3 py-1 rounded-full">
          <FaStethoscope />
          {doctor.specialization}
        </div>

        {/* Info Section */}
        <div className="mt-4 space-y-3 text-gray-600">
          <div className="flex items-center gap-2">
            <FaEnvelope className="text-blue-500 text-sm" />
            <span className="text-sm break-all">{doctor.email}</span>
          </div>

          <div className="flex items-center gap-2">
            <FaClock className="text-green-500 text-sm" />
            <span className="text-sm">
              {doctor.startTime} - {doctor.endTime}
            </span>
          </div>
        </div>

        {/* Description */}
        <div className="mt-4">
          <p className="text-gray-700 text-sm leading-relaxed line-clamp-3">
            {doctor.description}
          </p>
        </div>

        {/* Divider */}
        <div className="border-t my-4"></div>

        {/* Footer */}
        <div className="flex justify-between items-center">
          <span className="text-xs text-gray-500">
            Joined {new Date(doctor.createdAt).toLocaleDateString()}
          </span>
          <button
            className="px-6 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-indigo-600 hover:to-blue-600 transition text-white rounded-xl font-semibold shadow-md cursor-pointer"
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
