"use client";

import React from "react";
import { useFormik } from "formik";
import { useRouter } from "next/navigation";
import * as Yup from "yup";
import {CreatWalletForm} from "@/feautures";


export default function CreateBalanceForm() {
  const router = useRouter();
  const formik = useFormik({
    initialValues: {
      currency: "",
      terms: false,
    },
    validationSchema: Yup.object({
      currency: Yup.string().required("Currency is required"),
      terms: Yup.boolean().oneOf([true], "You must accept the terms"),
    }),
    onSubmit: (values) => {
      console.log(values);
    },
  });
  const handleCancel = () => router.push("/wallet");
  const currency = ["USDT", "BNB", "DOT", "SOL", "BTC"];
  return (
    <CreatWalletForm
      currencyOptions={currency}
      formik={formik}
      handleCancel={handleCancel}
    />
  );
}
