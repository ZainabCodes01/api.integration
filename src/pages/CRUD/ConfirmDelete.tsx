import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Icon } from "@iconify/react";
import ModalBox from "../../component/ModalBox";

interface ConfirmDeleteProps {
  closeModal: () => void;
  onConfirm: () => void;
}

export default function ConfirmDelete({ closeModal, onConfirm }: ConfirmDeleteProps) {
  const [status, setStatus] = useState<"idle" | "deleting" | "done">("idle");

  const handleDelete = async () => {
    setStatus("deleting");

    setTimeout(() => {
      onConfirm();
      setStatus("done");

      setTimeout(() => {
        setStatus("idle");
        closeModal();
      }, 1500);
    }, 1500);
  };

  return (
    <ModalBox closeModal={closeModal}>
      <div className="text-center p-6">
        <AnimatePresence mode="wait">
          {status === "idle" && (
            <motion.div
              key="confirm"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <Icon
                icon="mdi:alert-circle-outline"
                className="text-red-500 mx-auto"
                width="60"
                height="60"
              />
              <h2 className="text-2xl font-bold text-gray-800 mt-4 mb-2">
                Confirm Delete
              </h2>
              <p className="text-gray-600 mb-6">
                Are you sure you want to delete this user? This action cannot be undone.
              </p>

              <div className="flex justify-center gap-4">
                <button
                  onClick={closeModal}
                  className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-2 rounded-lg font-semibold"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDelete}
                  className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-semibold"
                >
                  Delete
                </button>
              </div>
            </motion.div>
          )}

          {status === "deleting" && (
            <motion.div
              key="deleting"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="flex flex-col items-center justify-center"
            >
              <div className="relative w-20 h-20 mb-4">
                <div className="absolute inset-0 border-4 border-gray-300 rounded-full"></div>
                <div className="absolute inset-0 border-4 border-red-600 rounded-full animate-spin border-t-transparent"></div>
              </div>
              <p className="text-lg font-semibold text-gray-700">Deleting...</p>
            </motion.div>
          )}

          {status === "done" && (
            <motion.div
              key="done"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="flex flex-col items-center justify-center"
            >
              <div className="w-16 h-16 rounded-full bg-green-500 flex items-center justify-center mb-4">
                <Icon
                  icon="mdi:check"
                  width="36"
                  height="36"
                  className="text-white"
                />
              </div>
              <p className="text-lg font-semibold text-green-600">User Deleted!</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </ModalBox>
  );
}
