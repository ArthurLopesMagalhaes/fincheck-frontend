import { zodResolver } from "@hookform/resolvers/zod";
import { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useBankAccounts } from "../../../../../app/hooks/useBankAccounts";
import { useCategories } from "../../../../../app/hooks/useCategories";
import { Transaction } from "../../../../../app/entities/Transaction";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { transactionsService } from "../../../../../app/services/transactionsService";
import { currencyStringToNumber } from "../../../../../app/utils/currencyStringToNumber";
import toast from "react-hot-toast";
import { queryKeys } from "../../../../../app/config/queryKeys";

const schema = z.object({
  value: z.union([z.string().nonempty("Informe o valor"), z.number()]),
  name: z.string().nonempty("Informe o nome"),
  categoryId: z.string().nonempty("Informe a categoria"),
  bankAccountId: z.string().nonempty("Informe o banco"),
  date: z.date(),
});

type FormData = z.infer<typeof schema>;

export function useEditTransactionModalController(
  transaction: Transaction | null,
  onClose: () => void
) {
  const {
    register,
    handleSubmit: hookFormHandleSubmit,
    formState: { errors },
    control,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      bankAccountId: transaction?.bankAccountId,
      categoryId: transaction?.categoryId,
      date: transaction ? new Date(transaction?.date) : new Date(),
      name: transaction?.name,
      value: transaction?.value,
    },
  });

  const queryClient = useQueryClient();

  const { accounts } = useBankAccounts();
  const { categories: categoriesList } = useCategories();
  const { isPending, mutateAsync: updateTransaction } = useMutation({
    mutationFn: transactionsService.update,
  });

  const { isPending: isLoadingDelete, mutateAsync: removeTransaction } =
    useMutation({
      mutationFn: transactionsService.remove,
    });

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const handleSubmit = hookFormHandleSubmit(async (data) => {
    try {
      await updateTransaction({
        ...data,
        id: transaction!.id,
        type: transaction!.type,
        value: currencyStringToNumber(data!.value),
        date: data.date.toISOString(),
      });

      queryClient.invalidateQueries({ queryKey: [queryKeys.transactions] });
      toast.success(
        transaction?.type === "EXPENSE"
          ? "Despesa salva com sucesso"
          : "Receita salva com sucesso"
      );

      onClose();
    } catch {
      toast.error(
        transaction?.type === "EXPENSE"
          ? "Erro ao salvar despesa"
          : "Erro ao salvar receita"
      );
    }
  });

  const handleDeleteTransaction = async () => {
    console.log("delete");
    try {
      await removeTransaction(transaction!.id);

      queryClient.invalidateQueries({ queryKey: [queryKeys.transactions] });
      toast.success("Transação excluída com sucesso");
      onClose();
    } catch {
      toast.error("Erro ao excluir a transação");
    }
  };

  const categories = useMemo(() => {
    return categoriesList.filter(
      (category) => category.type === transaction?.type
    );
  }, [categoriesList, transaction]);

  function handleOpenDeleteModal() {
    setIsDeleteModalOpen(true);
  }
  function handleCloseDeleteModal() {
    setIsDeleteModalOpen(false);
  }

  return {
    register,
    errors,
    control,
    handleSubmit,
    accounts,
    categories,
    isPending,
    isDeleteModalOpen,
    isLoadingDelete,
    handleOpenDeleteModal,
    handleDeleteTransaction,
    handleCloseDeleteModal,
  };
}
