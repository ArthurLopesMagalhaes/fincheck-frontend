import { useState } from "react";

export function useFiltersModal() {
  const [selectedBankAccountId, setSelectedBankAccountId] = useState<
    null | string
  >();
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());

  function handleSelectBankAccountId(banAccountId: string) {
    setSelectedBankAccountId((prevState) =>
      prevState === banAccountId ? null : banAccountId
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
  };
}
