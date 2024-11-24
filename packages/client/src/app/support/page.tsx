"use client";
import React from "react";

import * as Yup from "yup";
import { SupportPage } from "@/feautures";
import { useFormik } from "formik";

export default function Support() {
  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    name: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
    subject: Yup.string().min(6, ""),
    message: Yup.string().min(3),
  });

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      console.log(values);
    },
  });

  return (
    <SupportPage formik={formik} />
  );
}
