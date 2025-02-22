import { ChevronDownIcon } from "@radix-ui/react-icons";
import { TransactionsIcon } from "../../../../components/icons/TransactionsIcon";
import { DropdownMenu } from "../../../../components/DropdownMenu";
import { IncomeIcon } from "../../../../components/icons/IncomeIcon";
import { ExpensesIcon } from "../../../../components/icons/ExpensesIcon";

interface TransactionTypeDropdownProps {
  onSelect(type: "INCOME" | "EXPENSE" | undefined): void;
  selectedType: "INCOME" | "EXPENSE" | undefined;
}

export function TransactionTypeDropdown({
  onSelect,
  selectedType,
}: TransactionTypeDropdownProps) {
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger>
        <div className="flex items-center gap-2">
          {selectedType === "INCOME" ? (
            <IncomeIcon />
          ) : selectedType === "EXPENSE" ? (
            <ExpensesIcon />
          ) : (
            <TransactionsIcon />
          )}

          <span className="text-sm text-gray-800 tracking-[-0.5px] font-medium">
            {selectedType === "INCOME"
              ? "Receitas"
              : selectedType === "EXPENSE"
              ? "Despesas"
              : "Transações"}
          </span>
          <ChevronDownIcon className="text-gray-900" />
        </div>
      </DropdownMenu.Trigger>
      <DropdownMenu.Content className="z-20 w-[279px]">
        <DropdownMenu.Item
          className="gap-2"
          onSelect={() => onSelect("INCOME")}
        >
          <IncomeIcon />
          Receitas
        </DropdownMenu.Item>
        <DropdownMenu.Item
          className="gap-2"
          onSelect={() => onSelect("EXPENSE")}
        >
          <ExpensesIcon />
          Despesas
        </DropdownMenu.Item>
        <DropdownMenu.Item
          className="gap-2"
          onSelect={() => onSelect(undefined)}
        >
          <TransactionsIcon />
          Transações
        </DropdownMenu.Item>
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  );
}
