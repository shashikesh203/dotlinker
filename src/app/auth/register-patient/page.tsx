"use client";

import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { PatientFormData } from "@/types/patient";
import { patientValidationSchema } from "@/validation/patientSchema";
import InputField from "@/component/genericInput/FormInput";
import { FormDataType } from "@/types/common";
import ImageInput from "@/component/genericInput/ImageInput";

export default function PatientForm() {
  const [formData, setFormData] = useState<FormDataType>({
    patientImage: null,
  });

  const {
    register,
    handleSubmit,
    control,
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
        <div className="justify-center text my-6">
          <Controller
            name="patient_profile"
            control={control}
            render={({ field }) => (
              <ImageInput
                name={field.name}
                className="w-40 h-40"
                formData={formData}
                setFormData={setFormData}
                value={field.value}
                onChange={field.onChange}
              />
            )}
          />

          <p className="text-red-500 text-xs text-center mt-1">
            {errors.patient_profile?.message as string}
          </p>
        </div>

        {/* Submit */}
        <button
          disabled={isSubmitting}
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 my-3 rounded-xl font-semibold"
        >
          {isSubmitting ? "Saving..." : "Create Patient"}
        </button>
        <p className="text-center text-sm text-gray-600 mt-4">
          Already have an account?{" "}
          <a
            href="/auth/patient-login"
            className="text-blue-600 font-semibold hover:underline"
          >
            Login
          </a>
        </p>
      </form>
    </div>
  );
}
