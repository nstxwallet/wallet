"use client"
import { useState } from "react";
import * as Yup from "yup";
import { useFormik } from "formik";

import {useAuth, useBalances} from "@/core";
import {NstxPayment} from "@/feautures";

export default function NSTXPaymentPage() {
  const { user } = useAuth();
  const { balances } = useBalances({ userId: user?.id });

  const [showConfirmation, setShowConfirmation] = useState(false);

  const validationSchema = Yup.object({
    receiverId: Yup.string().required("Recipient is required"),
    currency: Yup.string().required("Choose the currency"),
    amount: Yup.number()
      .required("Amount is required")
      .min(0, "Amount must be greater than 0"),
  });

  const formik = useFormik({
    initialValues: {
      receiverId: "",
      currency: "USDT",
      amount: "",
      message: "",
    },
    validationSchema,
    onSubmit: (_values) => {
      setShowConfirmation(true);

    },
  });

  return (
    <NstxPayment user={user}
                 onSubmit={formik.handleSubmit}
      formik={formik}
      balances={balances}
      showConfirmation={showConfirmation}
    />
  );
}
