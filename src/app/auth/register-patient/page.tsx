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
import { FaEye, FaEyeSlash } from "react-icons/fa";

export default function PatientForm() {
  const [showPassword, setShowPassword] = useState(false);
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

  const genderOptions = [
    { label: "Male", value: "male" },
    { label: "Female", value: "female" },
    { label: "Other", value: "other" },
  ];

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

    try {
      const response = await axiosClient.post("patient-signup", formDataObj, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

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
          <label className="block mb-1 font-medium text-gray-700">
            Password
          </label>

          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              {...register("password")}
              className="w-full border rounded-xl px-4 py-3 pr-12 focus:ring-2 focus:ring-blue-500 outline-none"
            />

            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-800"
            >
              {showPassword ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
            </button>
          </div>

          {errors.password && (
            <p className="text-red-500 text-sm mt-1">
              {errors.password.message}
            </p>
          )}
        </div>
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
