"use client";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import * as Yup from "yup";
import {useAuth} from "@/core";
import {SignUpForm} from "@/feautures";

export default function SignUp() {
    const { signup } = useAuth();
  const navigate = useRouter();

  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
    firstName: Yup.string().required("First Name is required"),
    lastName: Yup.string().required("Last Name is required"),
  });

  return (
    <SignUpForm
      onSubmit={async (values) => {
        try {
          await signup(values);
          navigate.push("/wallet");
        } catch (_e) {
          toast.error("An error occurred. Please try again later.");
        }
      }}
      validationSchema={validationSchema}
    />
  );
}
