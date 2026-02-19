"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { PatientFormData } from "../../types/patient";
import { patientValidationSchema } from "../../validation/patientSchema";

import InputField from "../../helper/FormInput";

export default function PatientForm() {
  const [preview, setPreview] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<PatientFormData>({
    resolver: yupResolver(patientValidationSchema),
  });

  // Input Fields Config Array (Industry Standard)
  const basicFields = [
    {
      name: "name",
      label: "Patient Name",
      placeholder: "Enter patient name",
      type: "text",
    },
    {
      name: "email",
      label: "Email",
      placeholder: "Enter patient email",
      type: "text",
    },
     {
      name: "age",
      label: "Age",
      placeholder: "Enter age",
      type: "number",
    },
    {
      name: "password",
      label: "Password",
      placeholder: "Enter password",
      type: "password",
    },
  ] as const;

  // Preview Handler
  const handleImagePreview = (file: File) => {
    const url = URL.createObjectURL(file);
    setPreview(url);
  };

  // Submit Handler
  const onSubmit = async (data: PatientFormData) => {
    console.log("Patient Data:", data);

    const formData = new FormData();

    Object.entries(data).forEach(([key, value]) => {
      if (key === "patient_profile") {
        formData.append("patient_profile", value[0]);
      } else {
        formData.append(key, value as string);
      }
    });

    alert("Patient Created Successfully ✅");
  };

  return (
    <div className="max-w-3xl mx-auto mt-10 bg-white shadow-xl rounded-2xl p-8">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">
        Create Patient Profile
      </h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        {/* First 4 Fields Using Map */}
        {basicFields.map((field) => (
          <InputField
            key={field.name}
            label={field.label}
            placeholder={field.placeholder}
            type={field.type}
            register={register(field.name)}
            error={errors[field.name]}
          />
        ))}

      

        {/* Image Upload */}
        <div>
          <label className="block font-medium">Patient Profile Image</label>

          <input
            type="file"
            accept="image/*"
            {...register("patient_profile")}
            onChange={(e) => {
              if (e.target.files?.[0]) {
                handleImagePreview(e.target.files[0]);
              }
            }}
            className="w-full border p-3 rounded-lg mt-1"
          />

          <p className="text-red-500 text-sm">
            {errors.patient_profile?.message}
          </p>

          {/* Preview */}
          {preview && (
            <img
              src={preview}
              alt="Preview"
              className="mt-4 w-32 h-32 rounded-full object-cover border"
            />
          )}
        </div>

        {/* Submit */}
        <button
          disabled={isSubmitting}
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 my-3 rounded-xl font-semibold"
        >
          {isSubmitting ? "Saving..." : "Create Patient"}
        </button>
      </form>
    </div>
  );
}
