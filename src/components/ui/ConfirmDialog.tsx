"use client";

import { useEffect, useRef } from "react";

interface ConfirmDialogProps {
  open: boolean;
  title: string;
  message: string;
  confirmLabel: string;
  onConfirm: () => void;
  onCancel: () => void;
}

// A small on-brand replacement for window.confirm(), built on the native
// <dialog> element so focus trapping and the Escape key work out of the box.
const ConfirmDialog = ({
  open,
  title,
  message,
  confirmLabel,
  onConfirm,
  onCancel,
}: ConfirmDialogProps) => {
  const ref = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = ref.current;
    if (!dialog) return;
    if (open && !dialog.open) dialog.showModal();
    if (!open && dialog.open) dialog.close();
  }, [open]);

  return (
    <dialog
      ref={ref}
      onCancel={(e) => {
        e.preventDefault(); // Escape key: let React state close it
        onCancel();
      }}
      onClick={(e) => e.target === ref.current && onCancel()} // backdrop click
      className="m-auto w-[min(420px,calc(100vw-2rem))] border-t-[3px] border-t-darkblue bg-white p-0 backdrop:bg-darkblue/60"
    >
      <div className="p-6">
        <h2 className="text-lg font-bold text-darkblue">{title}</h2>
        <p className="mt-3 text-gray-700 leading-relaxed">{message}</p>
        <div className="mt-6 flex justify-end gap-3">
          <button
            type="button"
            onClick={onCancel}
            autoFocus
            className="px-5 py-2.5 border border-gray-300 text-sm font-bold uppercase tracking-wider text-darkblue hover:bg-greybg cursor-pointer"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className="px-5 py-2.5 bg-red-600 text-sm font-bold uppercase tracking-wider text-white hover:bg-red-700 cursor-pointer"
          >
            {confirmLabel}
          </button>
        </div>
      </div>
    </dialog>
  );
};

export default ConfirmDialog;
