import { string, z } from "zod";

export const RegisterValidation = z
  .object({
    fullname: z
      .string()
      .trim()
      .min(3, "Full name must be at least 3 characters"),

    email: z
      .string()
      .trim()
      .toLowerCase()
      .email("Please enter a valid email address"),

    Password: z
      .string()
      .trim()
      .min(4, "Password must be at least 8 characters"),
    //   .regex(/[A-Z]/, "Password must contain at least one uppercase letter"),

    confirmpassword: z.string(),

    checkbox: z.literal(true, {
      errorMap: () => ({
        message: "You must accept the Terms & Conditions",
      }),
    }),
  })
  .refine((data) => data.Password === data.confirmpassword, {
    path: ["confirmpassword"],
    message: "Passwords do not match",
  });




export const ShippingformValidation = z.object({
  firstName: z
    .string()
    .trim()
    .min(1, "First name is required"),

  lastName: z
    .string()
    .trim()
    .min(1, "Last name is required"),

  street: z
    .string()
    .trim()
    .min(5, "Street address is required"),

  city: z
    .string()
    .trim()
    .min(2, "City is required"),

  postalCode: z
    .string()
    .regex(/^[0-9]{6}$/, "Pincode must contain exactly 6 digits"),
});