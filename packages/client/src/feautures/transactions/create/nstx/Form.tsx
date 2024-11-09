import {
  Button,
  Form,
  Input,
  Paper,
  Row,
  Select,
  Typography,
} from "@/shared/components";
import { FormikProps } from "formik";

import { Balance, User } from "@/core";
import { ConfirmTransaction } from "@/feautures";

interface NstxPaymentProps {
  showConfirmation: boolean;
  formik: FormikProps<{
    receiverId: string;
    currency: string;
    amount: string;
    message: string;
  }>;
  balances?: Balance[];
  user?: User;
}

export const NstxPayment = ({
  showConfirmation,
  formik,
  balances,
  user,
}: NstxPaymentProps) => {
  return (
    <>
      {!showConfirmation ? (
        <Row>
          <Paper color="secondary" elevation={3} space={3}>
            <Typography center variant="h3">
              Send crypto to NSTX wallet
            </Typography>
            <Form onSubmit={formik.handleSubmit}>
              <Input
                id="receiverId"
                fullWidth
                name="receiverId"
                type="text"
                value={formik.values.receiverId}
                onChange={formik.handleChange}
              />

              <Select
                id="currency"
                name="currency"
                value={formik.values.currency}
                onChange={formik.handleChange}
              >
                <option value="" disabled>
                  Select currency
                </option>
                {balances?.map((balance) => (
                  <option key={balance.currency} value={balance.currency}>
                    {balance.currency}
                  </option>
                ))}
              </Select>

              <Input
                id="amount"
                fullWidth
                name="amount"
                type="number"
                value={formik.values.amount}
                onChange={formik.handleChange}
              />

              <Input
                fullWidth
                id="message"
                name="message"
                type="text"
                value={formik.values.message}
                onChange={formik.handleChange}
              />

              <Button fullWidth type="submit">
                Send
              </Button>
            </Form>
          </Paper>

          <Paper variant="gradient" elevation={3} space={3}>
            <Typography variant="h4">Payment Information</Typography>
            <Typography variant="body1">
              Sending payments from one NSTX wallet to another is quick and
              secure. Ensure that you have the correct receiver ID and select
              the appropriate currency. You can add a message to your
              transaction for reference.
            </Typography>
            <Typography variant="body1">
              Transactions are processed instantly, providing an efficient way
              to transfer funds without the delays typically associated with
              traditional banking.
            </Typography>
            <Typography variant="body1">
              Always double-check the receiver details before confirming your
              payment to avoid any mistakes. Your transactions are encrypted and
              secure, ensuring your funds are safe.
            </Typography>
          </Paper>
        </Row>
      ) : (
        <ConfirmTransaction
          senderId={user?.id as string}
          balances={balances}
          user={user}
          receiverId={formik.values.receiverId}
          amount={formik.values.amount}
          currency={formik.values.currency}
        />
      )}
    </>
  );
};
