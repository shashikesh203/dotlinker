import * as yup from "yup";

export const patientValidationSchema = yup.object({
  name: yup
    .string()
    .required("Patient name is required")
    .min(3, "Name must be at least 3 characters"),

  email: yup
    .string()
    .required("Email is required")
    .email("Enter a valid email"),
  age: yup
    .number()
    .required("Age is required")
    .min(0, "Age cannot be negative")
    .max(120, "Age must be less than 120"),

  password: yup
    .string()
    .required("Password is required")
    .min(6, "Password must be at least 6 characters"),

 patient_profile: yup
     .string()
     .required("Profile image URL is required"),
});
