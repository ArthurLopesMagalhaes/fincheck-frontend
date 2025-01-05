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
  const { isNewAccountModalOpen, closeNewAccountModal } =
    useNewAccountModalController();

  return (
    <Modal
      open={isNewAccountModalOpen}
      title="Nova Conta"
      onClose={closeNewAccountModal}
    >
      <form>
        <div>
          <span className="text-gray-600 tracking-[-0.5px] text-xs">Saldo</span>
          <div className="flex items-center justify-center gap-2">
            <span className="text-gray-600 tracking-[-0.5px] text-lg">R$</span>
            <InputCurrency />
          </div>
        </div>
        <div className="mt-10 flex flex-col gap-4">
          <Input type="text" name="name" placeholder="Nome da Conta" />
          <Select placeholder="Tipo" options={options} />
        </div>
      </form>
    </Modal>
  );
}
