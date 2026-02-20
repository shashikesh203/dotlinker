"use client";

import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { PatientFormData } from "@/types/patient";
import { patientValidationSchema } from "@/validation/patientSchema";
import InputField from "@/component/genericInput/InputField";
import { FormDataType } from "@/types/common";
import ImageInput from "@/component/genericInput/ImageInput";
import { useRouter } from "next/navigation";
import axiosClient from "@/lib/axiosClient";
import SingleSelectOptions from "@/component/genericInput/SingleSelectOption";

export default function PatientForm() {
  const [formData, setFormData] = useState<FormDataType>({
    patientImage: null,
  });

  const router = useRouter();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm<PatientFormData>({
    resolver: yupResolver(patientValidationSchema),
  });

  // Gender Options
  const genderOptions = [
    { label: "Male", value: "male" },
    { label: "Female", value: "female" },
    { label: "Other", value: "other" },
  ];

  // Input Fields Config Array
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
      name: "password",
      label: "Password",
      placeholder: "Enter password",
      type: "password",
    },
    {
      name: "age",
      label: "Age",
      placeholder: "Enter age",
      type: "number",
    },
  ] as const;

  // Submit Handler
  const onSubmit = async (data: PatientFormData) => {
    const formDataObj = new FormData();

    Object.entries(data).forEach(([key, value]) => {
      if (key === "patient_profile" && value instanceof FileList) {
        if (value.length > 0) {
          formDataObj.append("patient_profile", value[0]);
        }
      } else {
        formDataObj.append(key, value as string);
      }
    });
    console.log("Submitting Patient Form with data:", formDataObj);

    try {
      const response = await axiosClient.post(
        "patient-signup",
        formDataObj,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      const token = response?.data?.data?.token;

      if (token) {
        localStorage.setItem("token", token);
        router.push("/patient");
      }
    } catch (error) {
      console.error("Error creating patient:", error);
    }
  };

  return (
    <div className="max-w-3xl mx-auto mt-10 bg-white shadow-xl rounded-2xl p-8">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">
        Create Patient Profile
      </h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        {/* First Fields Using Map */}
        {basicFields.map((field) => (
          <div key={field.name}>
            <InputField
              label={field.label}
              placeholder={field.placeholder}
              type={field.type}
              register={register(field.name)}
              error={errors[field.name]}
            />

           
          </div>
        ))}
        <div>
                <Controller
                  name="gender"
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                    <SingleSelectOptions
                      label="Gender"
                      name={field.name}
                      value={field.value || ""}
                      onChange={field.onChange}
                      options={genderOptions}
                      placeholder="Select gender"
                      required
                    />
                  )}
                />
                <p className="text-red-500 text-xs mt-1">
                  {errors.gender?.message as string}
                </p>
              </div>

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
            className="text-blue-600 font-semibold hover:underline cursor-pointer"
          >
            Login
          </a>
        </p>
      </form>
    </div>
  );
}