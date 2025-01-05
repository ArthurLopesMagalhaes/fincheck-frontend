import { DatePickerInput } from "../../../../components/DatePickerInput";
import { Input } from "../../../../components/Input";
import { InputCurrency } from "../../../../components/inputCurrency";
import { Modal } from "../../../../components/Modal";
import { Select } from "../../../../components/Select";
import { useNewTransactionModalController } from "./useNewTransactionModalController";

const options = [
  { label: "Conta Corrente", value: "CHECKING" },
  { label: "Investimentos", value: "INVESTMENT" },
  { label: "Dinheiro Físico", value: "CASH" },
];

export function NewTransactionModal() {
  const {
    isNewTransactionModalOpen,
    closeNewTransactionModal,
    newTransactionType,
  } = useNewTransactionModalController();

  const isExpense = newTransactionType === "EXPENSE";

  return (
    <Modal
      open={isNewTransactionModalOpen}
      title={isExpense ? "Nova Despesa" : "Nova Receita"}
      onClose={closeNewTransactionModal}
    >
      <form>
        <div>
          <span className="text-gray-600 tracking-[-0.5px] text-xs">{`Valor da ${
            isExpense ? "da despesa" : "da receita"
          }`}</span>
          <div className="flex items-center justify-center gap-2">
            <span className="text-gray-600 tracking-[-0.5px] text-lg">R$</span>
            <InputCurrency />
          </div>
        </div>
        <div className="mt-10 flex flex-col gap-4">
          <Input
            type="text"
            name="name"
            placeholder={isExpense ? "Nome da despesa" : "Nome da receita"}
          />
          <Select placeholder="Tipo" options={options} />
          <Select
            placeholder={isExpense ? "Pagar com" : "Receber com"}
            options={options}
          />
          <DatePickerInput />
        </div>
      </form>
    </Modal>
  );
}
