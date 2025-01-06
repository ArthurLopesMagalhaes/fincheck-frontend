import { useQuery } from "@tanstack/react-query";
import { transactionsService } from "../services/transactionsService";
import { TransactionsFilters } from "../services/transactionsService/getAll";
import { queryKeys } from "../config/queryKeys";

export function useTransactions(filters: TransactionsFilters) {
  const { data, isFetching, isLoading, refetch } = useQuery({
    queryKey: [queryKeys.transactions],
    queryFn: () => transactionsService.getAll(filters),
  });

  return {
    transactions: data ?? [],
    isLoading: isFetching,
    isInitialLoading: isFetching && isLoading,
    refetchTransactions: refetch,
  };
}
