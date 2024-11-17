"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { FormikProps } from "formik";
import {
    Button,
    Container,
    Form,
    Paper,
    Row,
    Select,
    Typography,
} from "@/shared";

interface CreateWalletFormProps {
    formik: FormikProps<{ currency: string; terms: boolean }>;
    currencyOptions: string[];
    handleCancel: () => void;
    onSuccess?: () => void;
    onError?: (error: string) => void;
}

export const CreateWalletForm = ({
                                     formik,
                                     currencyOptions,
                                     handleCancel,
                                     onSuccess,
                                     onError,
                                 }: CreateWalletFormProps) => {
    const router = useRouter();

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        try {
            await formik.submitForm();
            if (formik.isValid && onSuccess) {
                onSuccess();
                router.push("/wallet/success");
            }
        } catch (error) {
            if (onError) {
                onError("Failed to create balance. Please try again.");
            }
        }
    };

    return (
        <Container className="flex items-center flex-col justify-center space-y-6">
            <Paper variant="gradient" className="max-w-lg p-6 text-center space-y-4">
                <Typography center variant="h4">
                    Create New Balance
                </Typography>
                <Typography
                    color="secondary"
                    center
                    variant="body1"
                    className="text-gray-600"
                >
                    Select a currency to create a new balance in your account. This
                    balance will allow you to manage and track your funds with ease.
                </Typography>
            </Paper>

            <Paper className="max-w-lg p-6">
                <Form onSubmit={handleSubmit}>
                    <Select
                        name="currency"
                        id="currency"
                        onChange={formik.handleChange}
                        value={formik.values.currency}
                        className={`w-full ${
                            formik.errors.currency ? "border-red-500" : ""
                        }`}
                        placeholder="Choose currency"
                    >
                        <option value="" disabled>
                            Choose a currency
                        </option>
                        {currencyOptions.map((currency) => (
                            <option key={currency} value={currency}>
                                {currency}
                            </option>
                        ))}
                    </Select>
                    {formik.errors.currency && (
                        <p className="text-red-500 mt-1">{formik.errors.currency}</p>
                    )}

                    <Row justify="start">
                        <input
                            type="checkbox"
                            name="terms"
                            id="terms"
                            onChange={formik.handleChange}
                        />
                        <label htmlFor="terms">I agree to the terms and conditions</label>
                    </Row>
                    {formik.errors.terms && (
                        <p className="text-red-500 mt-1">{formik.errors.terms}</p>
                    )}

                    <Button
                        variant="primary"
                        type="submit"
                        className="w-full py-3 text-lg font-semibold"
                    >
                        {formik.values.currency
                            ? `Create ${formik.values.currency} Balance`
                            : "Create Balance"}
                    </Button>

                    <Button
                        variant="bordered"
                        onClick={handleCancel}
                        className="w-full mt-4"
                    >
                        Cancel
                    </Button>
                </Form>
            </Paper>
        </Container>
    );
};
