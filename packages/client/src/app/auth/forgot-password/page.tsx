"use client";

import { ForgotPasswordForm } from "@/feautures";
import { useFormik } from "formik";
import { useState } from "react";
import { useRouter } from "next/navigation";
import * as Yup from "yup";
import { toast } from "react-toastify";

export default function ForgotPassword() {
  const [step, setStep] = useState<"email" | "code">("email");
  const router = useRouter();

  const emailValidationSchema = Yup.object({
    email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
  });

  const codeValidationSchema = Yup.object({
    code: Yup.string()
        .required("Verification code is required")
        .length(6, "Code must be 6 characters"),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      code: "",
    },
    validationSchema: step === "email" ? emailValidationSchema : codeValidationSchema,
    onSubmit: async (values) => {
      try {
        if (step === "email") {
          toast.success("Verification code sent to your email");
          setStep("code");
        } else {
          if (values.code === "123456") {
            toast.success("Code verified! Redirecting to login...");
            router.push("/auth/login");
          } else {
            toast.error("Invalid verification code.");
          }
        }
      } catch (_e) {
        toast.error("An error occurred. Please try again later.");
      }
    },
  });

  return (
      <ForgotPasswordForm
          formik={formik}
          onSubmit={formik.handleSubmit}
          step={step}
      />
  );
}
