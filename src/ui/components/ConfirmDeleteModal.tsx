import { Button } from "./Button";
import { Modal } from "./Modal";
import { TrashIcon } from "./icons/TrashIcon";

interface ConfirmDeleteModalProps {
  onConfirm(): void;
  onClose(): void;
  title: string;
  description?: string;
  isLoading: boolean;
}

export function ConfirmDeleteModal({
  onConfirm,
  onClose,
  title,
  description,
  isLoading,
}: ConfirmDeleteModalProps) {
  return (
    <Modal open title="Excluir" onClose={onClose}>
      <div className="flex flex-col items-center text-center gap-6">
        <div className="w-[52px] h-[52px] rounded-full bg-red-50 flex items-center justify-center">
          <TrashIcon className="w-6 h-6 text-red-900" />
        </div>

        <p className="w-[180px] text-gray-800 tracking-[-0.5px] font-bold">
          {title}
        </p>

        {description && (
          <p className="tracking-[-0.5px] text-gray-800">{description}</p>
        )}
      </div>

      <div className="mt-10 space-y-4">
        <Button
          className="w-full"
          onClick={onConfirm}
          isPending={isLoading}
          variant="danger"
        >
          Sim, desejo excluir
        </Button>

        <Button
          className="w-full"
          onClick={onClose}
          disabled={isLoading}
          variant="ghost"
        >
          Cancelar
        </Button>
      </div>
    </Modal>
  );
}
