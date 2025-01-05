import { Controller } from "react-hook-form";
import { Button } from "../../../../components/Button";
import { ColorsDropdownInput } from "../../../../components/ColorsDropdownInput";
import { Input } from "../../../../components/Input";
import { InputCurrency } from "../../../../components/inputCurrency";
import { Modal } from "../../../../components/Modal";
import { Select } from "../../../../components/Select";
import { useEditAccountModalController } from "./useEditAccountModalController";
import { TrashIcon } from "../../../../components/icons/Trash";
import { ConfirmDeleteModal } from "../../../../components/ConfirmDeleteModal";

const options = [
  { label: "Conta Corrente", value: "CHECKING" },
  { label: "Investimentos", value: "INVESTMENT" },
  { label: "Dinheiro Físico", value: "CASH" },
];

export function EditAccountModal() {
  const {
    isEditAccountModalOpen,
    closeEditAccountModal,
    errors,
    handleSubmit,
    handleDelete,
    register,
    control,
    isPending,
    isDeleteModalOpen,
    isLoadingDelete,
    handleOpenDeleteModal,
    handleCloseDeleteModal,
  } = useEditAccountModalController();

  if (isDeleteModalOpen) {
    return (
      <ConfirmDeleteModal
        title="Tem certeza que deseja excluir esta conta? Essa ação não poderá ser desfeita."
        description="Ao excluir a conta, todas as transações relacionadas a ela também serão excluídas."
        isLoading={isLoadingDelete}
        onClose={handleCloseDeleteModal}
        onConfirm={handleDelete}
      />
    );
  }

  return (
    <Modal
      open={isEditAccountModalOpen}
      title="Editar Conta"
      onClose={closeEditAccountModal}
      rightAction={
        <button onClick={handleOpenDeleteModal}>
          <TrashIcon />
        </button>
      }
    >
      <form onSubmit={handleSubmit}>
        <div>
          <span className="text-gray-600 tracking-[-0.5px] text-xs">
            Saldo inicial
          </span>
          <div className="flex items-center justify-center gap-2">
            <span className="text-gray-600 tracking-[-0.5px] text-lg">R$</span>
            <Controller
              name="initialBalance"
              control={control}
              defaultValue="0"
              render={({ field: { onChange, value } }) => (
                <InputCurrency
                  error={errors.initialBalance?.message}
                  onChange={onChange}
                  value={value}
                />
              )}
            />
          </div>
        </div>
        <div className="mt-10 flex flex-col gap-4">
          <Input
            type="text"
            placeholder="Nome da Conta"
            error={errors.name?.message}
            {...register("name")}
          />
          <Controller
            name="type"
            control={control}
            render={({ field: { onChange, value } }) => (
              <Select
                placeholder="Tipo"
                options={options}
                error={errors.type?.message}
                onChange={onChange}
                value={value}
              />
            )}
          />
          <Controller
            name="color"
            control={control}
            defaultValue=""
            render={({ field: { onChange, value } }) => (
              <ColorsDropdownInput
                error={errors.color?.message}
                onChange={onChange}
                value={value}
              />
            )}
          />
        </div>

        <Button isPending={isPending} className="w-full mt-6">
          Salvar
        </Button>
      </form>
    </Modal>
  );
}
