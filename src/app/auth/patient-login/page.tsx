"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import InputField from "@/component/genericInput/InputField";
import { LoginFormData } from "@/types/common";
import { loginValidationSchema } from "@/validation/loginSchema";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import axiosClient from "@/lib/axiosClient";
import { useRouter } from "next/navigation";

export default function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: yupResolver(loginValidationSchema),
  });

  const onSubmit = async (data: LoginFormData) => {
    try {
      const response = await axiosClient.post("patient-signin", data);

      const token = response?.data?.data?.token;

      if (token) {
        localStorage.setItem("token", token);
        router.push("/patient");
      }
    } catch (error: any) {
      console.error("Login Failed:", error?.response?.data?.message);
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-16 bg-white shadow-xl rounded-2xl p-8">
      <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center">
        Patient Login
      </h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <InputField
          label="Email Address"
          placeholder="Enter your email"
          type="text"
          register={register("email")}
          error={errors.email}
        />

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

        <button
          disabled={isSubmitting}
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-semibold transition cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? "Logging in..." : "Login"}
        </button>

        <p className="text-center text-sm text-gray-600 mt-4">
          Don’t have an account?{" "}
          <a
            href="/auth/register-patient"
            className="text-blue-600 font-semibold hover:underline"
          >
            Register
          </a>
        </p>
      </form>
    </div>
  );
}
