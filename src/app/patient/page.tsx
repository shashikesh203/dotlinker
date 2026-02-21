"use client";

import { useEffect, useState } from "react";
import axiosClient from "@/lib/axiosClient";
import PatientProfileCard from "@/component/patient/PatientProfileCard";
import { PatientProfile } from "@/types/patient";

export default function Page() {
  const [patient, setPatient] = useState<PatientProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPatientProfile = async () => {
      try {
        setLoading(true);

        const response = await axiosClient.get("get-patient-details");
        const result = response.data;

        if (result.success) {
          setPatient(result.data);
        } else {
          setError(result.message || "Something went wrong");
        }
      } catch (err: any) {
        setError(err?.response?.data?.message || err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPatientProfile();
  }, []);

  return (
    <div className=" bg-gray-50 flex items-center justify-center p-5">
      {loading && (
        <div className="text-blue-600 font-medium text-lg animate-pulse">
          Loading patient profile...
        </div>
      )}

      {error && <div className="text-red-500 font-medium text-lg">{error}</div>}

      {patient && <PatientProfileCard patient={patient} />}
    </div>
  );
}
