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
    .transform((value, originalValue) =>
      originalValue === "" ? undefined : value,
    )
    .required("Age is required")
    .min(0, "Age cannot be negative")
    .max(120, "Age must be less than 120"),
  gender: yup
    .string()
    .required("Gender is required")
    .oneOf(["male", "female", "other"], "Select a valid gender    option"),   

    
  password: yup
    .string()
    .required("Password is required")
    .min(6, "Password must be at least 6 characters"),

  patient_profile: yup
    .mixed<File | string>()
    .required("Image is required")
    .test("fileType", "Only jpg, jpeg, png allowed", (value) => {
      if (typeof value === "string") return true;

      if (value instanceof File) {
        return ["image/jpeg", "image/png", "image/jpg"].includes(value.type);
      }

      return false;
    }),
});
