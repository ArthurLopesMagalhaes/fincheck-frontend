import { useState } from "react";
import { useBankAccounts } from "../../../../../../app/hooks/useBankAccounts";

export function useFiltersModalController() {
  const [selectedBankAccountId, setSelectedBankAccountId] = useState<
    undefined | string
  >();
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());

  const { accounts } = useBankAccounts();

  function handleSelectBankAccountId(banAccountId: string) {
    setSelectedBankAccountId((prevState) =>
      prevState === banAccountId ? undefined : banAccountId
    );
  }

  function handleChangeYear(step: number) {
    setSelectedYear((prevState) => prevState + step);
  }

  return {
    selectedBankAccountId,
    handleSelectBankAccountId,
    selectedYear,
    handleChangeYear,
    accounts,
  };
}
