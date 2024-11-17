import {Button, Form, Grid, Input, Paper, Typography} from "@/shared";
import {FormikProps} from "formik";

interface ForgotPasswordFormProps {
  formik: FormikProps<{ email: string; code: string }>;
  onSubmit: () => void;
  step: "email" | "code";
}

export const ForgotPasswordForm = ({
                                     formik,
                                     onSubmit,
                                     step,
                                   }: ForgotPasswordFormProps) => {
  return (
      <Grid container justify="center" align="center" className="min-h-screen">
        <Paper
            type="square"
            border={false}
            className="w-full text-center p-8 absolute top-0 left-0 bg-gradient-to-b from-pink-400
             to-purple-500"
        >
          <Typography variant="h1">Reset Your Password</Typography>
          <Typography variant="h6">
            {step === "email"
                ? "Enter your email to receive a verification code."
                : "Enter the verification code sent to your email."}
          </Typography>
        </Paper>
        <div className="mt-40 flex justify-center">
          <Paper className="max-w-md">
            <Form onSubmit={onSubmit}>
              <Typography variant="h3" center>
                {step === "email" ? "Reset Password" : "Verify Code"}
              </Typography>
              {step === "email" ? (
                  <Input
                      fullWidth
                      type="email"
                      name="email"
                      placeholder="Email Address"
                      onChange={formik.handleChange}
                      value={formik.values.email}
                      error={
                        formik.touched.email ? formik.errors.email : undefined
                      }
                  />
              ) : (
                  <Input
                      fullWidth
                      type="text"
                      name="code"
                      placeholder="Verification Code"
                      onChange={formik.handleChange}
                      value={formik.values.code}
                      error={formik.touched.code ? formik.errors.code : undefined}
                  />
              )}
              <Button fullWidth type="submit">
                {formik.isSubmitting
                    ? "Loading..."
                    : step === "email"
                        ? "Send Code"
                        : "Verify Code"}
              </Button>
            </Form>
          </Paper>
        </div>
      </Grid>
  );
};
