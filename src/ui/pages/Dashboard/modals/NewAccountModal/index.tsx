import { Controller } from "react-hook-form";
import { Button } from "../../../../components/Button";
import { ColorsDropdownInput } from "../../../../components/ColorsDropdownInput";
import { Input } from "../../../../components/Input";
import { InputCurrency } from "../../../../components/inputCurrency";
import { Modal } from "../../../../components/Modal";
import { Select } from "../../../../components/Select";
import { useNewAccountModalController } from "./useNewAccountModalController";

const options = [
  { label: "Conta Corrente", value: "CHECKING" },
  { label: "Investimentos", value: "INVESTMENT" },
  { label: "Dinheiro Físico", value: "CASH" },
];

export function NewAccountModal() {
  const {
    isNewAccountModalOpen,
    closeNewAccountModal,
    errors,
    handleSubmit,
    register,
    control,
    isPending,
  } = useNewAccountModalController();

  return (
    <Modal
      open={isNewAccountModalOpen}
      title="Nova Conta"
      onClose={closeNewAccountModal}
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
          Criar
        </Button>
      </form>
    </Modal>
  );
}
