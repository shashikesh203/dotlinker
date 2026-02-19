"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { DoctorFormData } from "../../types/doctor";
import { doctorValidationSchema } from "../../validation/doctorSchema";

import InputField from "../../helper/FormInput";

export default function DoctorForm() {
  const [preview, setPreview] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<DoctorFormData>({
    resolver: yupResolver(doctorValidationSchema),
  });

  // Input Fields Config Array (Industry Standard)
  const basicFields = [
    {
      name: "name",
      label: "Doctor Name",
      placeholder: "Enter doctor name",
      type: "text",
    },
    {
      name: "email",
      label: "Email",
      placeholder: "Enter doctor email",
      type: "text",
    },
    {
      name: "password",
      label: "Password",
      placeholder: "Enter password",
      type: "password",
    },
    {
      name: "specialization",
      label: "Specialization",
      placeholder: "Cardiologist, Dentist...",
      type: "text",
    },
  ] as const;

  // Preview Handler
  const handleImagePreview = (file: File) => {
    const url = URL.createObjectURL(file);
    setPreview(url);
  };

  // Submit Handler
  const onSubmit = async (data: DoctorFormData) => {
    console.log("Doctor Data:", data);

    const formData = new FormData();

    Object.entries(data).forEach(([key, value]) => {
      if (key === "doctor_profile") {
        formData.append("doctor_profile", value[0]);
      } else {
        formData.append(key, value as string);
      }
    });

    alert("Doctor Created Successfully ✅");
  };

  return (
    <div className="max-w-3xl mx-auto mt-10 bg-white shadow-xl rounded-2xl p-8">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">
        Create Doctor Profile
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

        {/* Start & End Time */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block font-medium">Start Time</label>
            <input
              type="time"
              {...register("startTime")}
              className="w-full border p-3 rounded-lg mt-1"
            />
            <p className="text-red-500 text-sm">
              {errors.startTime?.message}
            </p>
          </div>

          <div>
            <label className="block font-medium">End Time</label>
            <input
              type="time"
              {...register("endTime")}
              className="w-full border p-3 rounded-lg mt-1"
            />
            <p className="text-red-500 text-sm">
              {errors.endTime?.message}
            </p>
          </div>
        </div>

        {/* Description */}
        <div>
          <label className="block font-medium">Description</label>
          <textarea
            {...register("description")}
            placeholder="Write about doctor..."
            className="w-full border p-3 rounded-lg mt-1"
            rows={4}
          />
          <p className="text-red-500 text-sm">
            {errors.description?.message}
          </p>
        </div>

        {/* Image Upload */}
        <div>
          <label className="block font-medium">Doctor Profile Image</label>

          <input
            type="file"
            accept="image/*"
            {...register("doctor_profile")}
            onChange={(e) => {
              if (e.target.files?.[0]) {
                handleImagePreview(e.target.files[0]);
              }
            }}
            className="w-full border p-3 rounded-lg mt-1"
          />

          <p className="text-red-500 text-sm">
            {errors.doctor_profile?.message}
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
          {isSubmitting ? "Saving..." : "Create Doctor"}
        </button>
      </form>
    </div>
  );
}
