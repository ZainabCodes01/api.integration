import { useRef } from "react";

export default function MultiDialogDemo() {
  const noneDialog = useRef<HTMLDialogElement>(null);
  const closeReqDialog = useRef<HTMLDialogElement>(null);
  const anyDialog = useRef<HTMLDialogElement>(null);

  const openDialog = (type: "none" | "closerequest" | "any") => {
    const map = {
      none: noneDialog,
      closerequest: closeReqDialog,
      any: anyDialog,
    };
    map[type].current?.showModal();
  };

  const closeDialog = (dialog: HTMLDialogElement | null) => {
    dialog?.close();
  };

  return (
    <div className="flex flex-col items-center gap-6 py-10">
      <p className="text-lg font-semibold">
        Choose a <code>&lt;dialog&gt;</code> type to show:
      </p>

      <div className="flex gap-4">
        <button
          onClick={() => openDialog("none")}
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md"
        >
          <code>closedby="none"</code>
        </button>

        <button
          onClick={() => openDialog("closerequest")}
          className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md"
        >
          <code>closedby="closerequest"</code>
        </button>

        <button
          onClick={() => openDialog("any")}
          className="bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded-md"
        >
          <code>closedby="any"</code>
        </button>
      </div>

      {/* closedby="none" */}
      <dialog
        ref={noneDialog}
        className="rounded-2xl p-6 shadow-xl max-w-md w-[90%] backdrop:bg-black/40"
      >
        <h2 className="text-xl font-bold mb-2">
          <code>closedby="none"</code>
        </h2>
        <p className="text-gray-600 mb-4">
          Only closable using the "Close" button below.
        </p>
        <button
          onClick={() => closeDialog(noneDialog.current)}
          className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-2 rounded-md font-medium"
        >
          Close
        </button>
      </dialog>

      {/* closedby="closerequest" */}
      <dialog
        ref={closeReqDialog}
        className="rounded-2xl p-6 shadow-xl max-w-md w-[90%] backdrop:bg-black/40"
        onCancel={() => closeDialog(closeReqDialog.current)} // allows Esc key
      >
        <h2 className="text-xl font-bold mb-2">
          <code>closedby="closerequest"</code>
        </h2>
        <p className="text-gray-600 mb-4">
          Closable using the "Close" button or the Esc key.
        </p>
        <button
          onClick={() => closeDialog(closeReqDialog.current)}
          className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-2 rounded-md font-medium"
        >
          Close
        </button>
      </dialog>

      {/* closedby="any" */}
      <dialog
        ref={anyDialog}
        className="rounded-2xl p-6 shadow-xl max-w-md w-[90%] backdrop:bg-black/40"
        onClick={(e) => {
          const dialog = anyDialog.current;
          if (e.target === dialog) closeDialog(dialog); // click outside
        }}
        onCancel={() => closeDialog(anyDialog.current)} // Esc key
      >
        <h2 className="text-xl font-bold mb-2">
          <code>closedby="any"</code>
        </h2>
        <p className="text-gray-600 mb-4">
          Closable using the "Close" button, Esc key, or by clicking outside.
        </p>
        <button
          onClick={() => closeDialog(anyDialog.current)}
          className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-2 rounded-md font-medium"
        >
          Close
        </button>
      </dialog>
    </div>
  );
}
