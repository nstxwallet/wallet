"use client";

import { useRouter } from "next/navigation";

import { useAuth, useBalances } from "@/core";
import { WalletSuccess } from "@/feautures";

export default function Page() {
  const router = useRouter();
  const handleGoToWallet = () => router.push("/wallet");
  const handleCreateAnotherBalance = () => router.push("/wallet/create");
  const { user } = useAuth();

  const { balance } = useBalances({ userId: user?.id });


  return (
    <WalletSuccess
      balance={balance}
      handleGoToWallet={handleGoToWallet}
      handleCreateAnotherBalance={handleCreateAnotherBalance}
    />
  );
}