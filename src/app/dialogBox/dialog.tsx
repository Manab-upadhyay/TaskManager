import { ReactNode } from "react";

interface DialogBoxProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title?: string;
  children: ReactNode;
}

export default function DialogBox({ isOpen, onClose, onConfirm, title = "Confirm", children }: DialogBoxProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg p-6 w-96 shadow-lg">
        <h2 className="text-xl font-semibold mb-4">{title}</h2>
        <p className="text-gray-600">{children}</p>

        <div className="flex justify-end space-x-3 mt-4">
          <button className="px-4 py-2 bg-gray-300 rounded" onClick={onClose}>
            Cancel
          </button>
          <button className="px-4 py-2 bg-red-500 text-white rounded" onClick={onConfirm}>
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
