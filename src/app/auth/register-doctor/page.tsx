"use client";

import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { DoctorFormData } from "@/types/doctor";
import { doctorValidationSchema } from "@/validation/doctorSchema";
import InputField from "@/component/genericInput/InputField";
import ImageInput from "@/component/genericInput/ImageInput";
import { FormDataType } from "@/types/common";
import TimeInputField from "@/component/genericInput/TimeInputField";
import axiosClient from "@/lib/axiosClient";
import { useRouter } from "next/navigation";
import SingleSelectOptions from "@/component/genericInput/SingleSelectOption";
import { DoctorSpecialization } from "@/enums/doctorSpecialization";

export default function DoctorForm() {
  const [formData, setFormData] = useState<FormDataType>({
    doctorImage: null,
  });
  const router = useRouter();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm<DoctorFormData>({
    resolver: yupResolver(doctorValidationSchema),
  });

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
  ] as const;

  const onSubmit = async (data: DoctorFormData) => {
    const formDataObj = new FormData();

    Object.entries(data).forEach(([key, value]) => {
      if (key === "doctor_profile" && value instanceof FileList) {
        if (value.length > 0) {
          formDataObj.append("doctor_profile", value[0]);
        }
      } else {
        formDataObj.append(key, value as string);
      }
    });
    console.log("Submitting Doctor Form with data:", formDataObj);
    try {
      const response = await axiosClient.post("doctor-signup", formDataObj, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      const token = response?.data?.data?.token;

      if (token) {
        localStorage.setItem("token", token);
        router.push("/doctor");
      }
    } catch (error) {
      console.error("Error creating doctor:", error);
    }
  };

  return (
    <div className="max-w-3xl mx-auto mt-10 bg-white shadow-xl rounded-2xl p-8">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">
        Create Doctor Profile
      </h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
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
        <div>
          <Controller
            name="specialization"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <SingleSelectOptions
                label="Doctor Specialization"
                name={field.name}
                value={field.value || ""}
                onChange={field.onChange}
                options={Object.values(DoctorSpecialization).map((spec) => ({
                  label: spec,
                  value: spec,
                }))}
                placeholder="Select specialization"
                required
              />
            )}
          />
          <p className="text-red-500 text-xs mt-1">
            {errors.specialization?.message as string}
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <TimeInputField
            label="Start Time"
            name="startTime"
            register={register}
            error={errors.startTime}
          />

          <TimeInputField
            label="End Time"
            name="endTime"
            register={register}
            error={errors.endTime}
          />
        </div>
        <div>
          <label className="block font-medium">Description</label>
          <textarea
            {...register("description")}
            placeholder="Write about doctor..."
            className="w-full border p-3 rounded-lg mt-1"
            rows={4}
          />
          <p className="text-red-500 text-sm">{errors.description?.message}</p>
        </div>

        <div className="justify-center text my-6">
          <Controller
            name="doctor_profile"
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
            {errors.doctor_profile?.message as string}
          </p>
        </div>

        <button
          disabled={isSubmitting}
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 my-3 rounded-xl font-semibold"
        >
          {isSubmitting ? "Saving..." : "Create Doctor"}
        </button>
        <p className="text-center text-sm text-gray-600 mt-4">
          Already have an account?{"  "}
          <a
            href="/auth/doctor-login"
            className="text-blue-600 font-semibold hover:underline cursor-pointer"
          >
            Login
          </a>
        </p>
      </form>
    </div>
  );
}
