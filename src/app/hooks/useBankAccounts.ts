import { useQuery } from "@tanstack/react-query";
import { bankAccountsService } from "../services/bankAccountsService";
import { queryKeys } from "../config/queryKeys";

export function useBankAccounts() {
  const { data, isFetching } = useQuery({
    queryKey: [queryKeys.bankAccounts],
    queryFn: bankAccountsService.getAll,
    staleTime: Infinity,
  });

  return { accounts: data ?? [], isFetching };
}
