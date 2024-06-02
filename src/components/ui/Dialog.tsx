import { XIcon } from "lucide-react";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
};

export default function Dialog({ isOpen, onClose, children }: Props) {
  // Open 이 아닐 경우, null 을 뱉는다
  if (!isOpen) return null;

  return (
    <div className="fixed z-10 inset-0 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen">
        <div className="fixed inset-0 bg-black opacity-50"></div>
        <div className="relative bg-white w-1/3 p-8 rounded-lg shadow-lg">
          <button
            className="absolute top-0 right-0 p-2"
            onClick={onClose}
            aria-label="Close dialog"
          >
            <XIcon />
          </button>
          {children}
        </div>
      </div>
    </div>
  );
}
