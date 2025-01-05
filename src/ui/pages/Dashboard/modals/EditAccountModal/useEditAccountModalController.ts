import { z } from "zod";
import { useDashboard } from "../../DashboardContext/useDashBoard";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { bankAccountsService } from "../../../../../app/services/bankAccountsService";
import { currencyStringToNumber } from "../../../../../app/utils/currencyStringToNumber";
import toast from "react-hot-toast";
import { queryKeys } from "../../../../../app/config/queryKeys";
import { useState } from "react";

const schema = z.object({
  initialBalance: z.union([
    z.string().nonempty("Saldo inicial é obrigatório"),
    z.number().min(0, "Saldo inicial deve ser maior ou igual a zero"),
  ]),
  name: z.string().nonempty("Nome da conta é obrigatório"),
  type: z.enum(["CHECKING", "INVESTMENT", "CASH"], {
    required_error: "Tipo de conta é obrigatório",
  }),
  color: z.string().nonempty("Cor é obrigatória"),
});

type FormType = z.infer<typeof schema>;

export function useEditAccountModalController() {
  const { isEditAccountModalOpen, closeEditAccountModal, accountBeingEdited } =
    useDashboard();

  const {
    register,
    handleSubmit: hookFormHandleSubmit,
    control,
    formState: { errors },
  } = useForm<FormType>({
    resolver: zodResolver(schema),
    defaultValues: {
      color: accountBeingEdited?.color,
      name: accountBeingEdited?.name,
      type: accountBeingEdited?.type,
      initialBalance: accountBeingEdited?.initialBalance,
    },
  });

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const queryClient = useQueryClient();
  const { isPending, mutateAsync: updateAccount } = useMutation({
    mutationFn: bankAccountsService.update,
  });
  const { isPending: isLoadingDelete, mutateAsync: removeAccount } =
    useMutation({
      mutationFn: bankAccountsService.remove,
    });
  const handleSubmit = hookFormHandleSubmit(async (data) => {
    try {
      await updateAccount({
        id: accountBeingEdited!.id,
        ...data,
        initialBalance: currencyStringToNumber(data.initialBalance),
      });

      queryClient.invalidateQueries({ queryKey: [queryKeys.bankAccounts] });
      toast.success("Conta editada com sucesso");
      closeEditAccountModal();
    } catch {
      toast.error("Erro ao salvar alterações");
    }
  });

  const handleDelete = async () => {
    try {
      await removeAccount(accountBeingEdited!.id);

      queryClient.invalidateQueries({ queryKey: [queryKeys.bankAccounts] });
      toast.success("Conta excluída com sucesso");
      closeEditAccountModal();
    } catch {
      toast.error("Erro ao excluir a conta");
    }
  };

  function handleOpenDeleteModal() {
    setIsDeleteModalOpen(true);
  }

  function handleCloseDeleteModal() {
    setIsDeleteModalOpen(false);
  }

  return {
    isEditAccountModalOpen,
    closeEditAccountModal,
    register,
    errors,
    control,
    handleSubmit,
    isPending,
    handleDelete,
    isDeleteModalOpen,
    handleOpenDeleteModal,
    handleCloseDeleteModal,
    isLoadingDelete,
  };
}
