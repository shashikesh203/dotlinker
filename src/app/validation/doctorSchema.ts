import * as yup from "yup";

export const doctorValidationSchema = yup.object({
  name: yup
    .string()
    .required("Doctor name is required")
    .min(3, "Name must be at least 3 characters"),

  email: yup
    .string()
    .required("Email is required")
    .email("Enter a valid email"),

  password: yup
    .string()
    .required("Password is required")
    .min(6, "Password must be at least 6 characters"),

  specialization: yup
    .string()
    .required("Specialization is required"),

  startTime: yup
    .string()
    .required("Start time is required"),

  endTime: yup
    .string()
    .required("End time is required"),

  description: yup
    .string()
    .required("Description is required")
    .min(10, "Description must be at least 10 characters"),

  doctor_profile: yup
    .string()
    .required("Profile image URL is required"),
});
