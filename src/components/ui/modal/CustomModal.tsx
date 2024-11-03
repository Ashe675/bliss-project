import { Dialog, DialogBackdrop, DialogPanel } from "@headlessui/react";
import { ReactNode, SetStateAction } from "react";

interface Props {
  isOpen: boolean;
  setIsOpen: React.Dispatch<SetStateAction<boolean>>;
  children: ReactNode;
}

export default function CustomModal({ isOpen, setIsOpen, children }: Props) {
  function close() {
    setIsOpen(false);
  }

  return (
    <>
      <Dialog
        open={isOpen}
        as="div"
        className="relative z-50 focus:outline-none"
        onClose={close}
      >
        <DialogBackdrop transition
          className="fixed inset-0 bg-black/50 duration-300 ease-out data-[closed]:opacity-0"  />
        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <DialogPanel
              transition
              className="w-full max-w-md rounded-xl bg-primary/50 p-6 backdrop-blur-2xl duration-300 ease-out data-[closed]:transform-[scale(95%)] data-[closed]:opacity-0"
            >
              {children}
            </DialogPanel>
          </div>
        </div>
      </Dialog>
    </>
  );
}
