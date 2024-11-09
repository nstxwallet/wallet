import {
    Button,
    Form,
    Grid,
    Input,
    Paper,
    Row, Select,
    Typography,
} from "@/shared";
import React from "react";
import { FormikProps } from "formik";

interface CreateWalletFormProps {
  formik: FormikProps<{ currency: string; terms: boolean }>;
  currencyOptions: string[];
  handleCancel: () => void;
}

export const CreatWalletForm = ({
  formik,
  currencyOptions,
  handleCancel,
}: CreateWalletFormProps) => {
  return (
    <Grid align="center">
      <Paper className=" max-w-lg ">
        <Typography center variant="h4">
          Create New Balance
        </Typography>

        <Form onSubmit={formik.handleSubmit}>
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
          <Row className="items-center  ">
            <Input
              type="checkbox"
              name="terms"
              id="terms"
              onChange={formik.handleChange}
              className="rounded text-blue-500"
            />
            <label htmlFor="terms" className="text-white whitespace-nowrap">
              I agree to the terms and conditions
            </label>
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

          <Button variant="bordered" onClick={handleCancel}>
            Cancel
          </Button>
        </Form>
      </Paper>
    </Grid>
  );
};
