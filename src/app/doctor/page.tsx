"use client";

import { useEffect, useState } from "react";
import DoctorProfileCard from "../../component/doctor/DoctorProfileCard";
import axiosClient from "@/lib/axiosClient";
import { DoctorProfile } from "@/types/doctor";

export default function Page() {
  const [doctor, setDoctor] = useState<DoctorProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDoctorProfile = async () => {
      try {
        setLoading(true);
        const response = await axiosClient.get("get-doctor-details");
        const result = response.data;
        if (result.success) {
          setDoctor(result.data);
        } else {
          setError(result.message || "Something went wrong");
        }
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchDoctorProfile();
  }, []);

  return (
    <div className=" bg-gray-50 flex items-center justify-center p-5">
      {loading && (
        <div className="text-blue-600 font-medium text-lg animate-pulse">
          Loading doctor profile...
        </div>
      )}

      {error && <div className="text-red-500 font-medium text-lg">{error}</div>}

      {doctor && <DoctorProfileCard doctor={doctor} />}
    </div>
  );
}
