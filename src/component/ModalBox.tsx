import { useEffect } from "react";
import { Icon } from "@iconify/react";

interface ModalBoxProps {
  closeModal: () => void;
  children: React.ReactNode;
}

export default function ModalBox({ children, closeModal}: ModalBoxProps) {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center">
      <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto p-8 bg-white rounded-xl shadow-xl">
        <button
          className="absolute top-4 right-4 text-gray-600 hover:text-red-600"
          onClick={closeModal}
        >
          <Icon icon="mdi:close" width="24" height="24" />
        </button>
        {children}
      </div>
    </div>
  );
}


