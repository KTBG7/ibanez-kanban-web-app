import React, { useEffect, useState } from "react";
import Button from "./Button";

type ModalProps = {
  isOpen: boolean;
  children: React.ReactNode;
  className?: string;
  submitLabel?: string;
  submitType?: string;
  onSubmit?: () => void;
};

const Modal = ({
  isOpen,
  onSubmit,
  className,
  children,
  submitLabel,
  submitType,
}: ModalProps) => {
  const [modalState, setModalState] = useState(isOpen);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = () => {
    setSubmitted(true);
  };
  useEffect(() => {
    if (submitted && onSubmit) {
      onSubmit();
      setSubmitted(false);
    }
  }, [modalState, submitted, onSubmit]);
  return (
    <div className="fixed flex items-center justify-center w-full h-full top-0 left-0 right-0 bottom-0 z-20 bg-gray-600 bg-opacity-50">
      <div
        className={`${className} fixed w-[343px] md:w-[480px] max-h-[80%] top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 py-6 md:py-8 flex opacity-100 flex-col items-center text-left gap-4 z-30 bg-white dark:bg-dark_grey_primary border border-lines-light dark:border-lines-dark rounded-md`}
      >
        {children}
        {submitType ? (
          <div className="w-full px-6 md:px-8">
            <Button
              buttonType={submitType}
              className="h-10 w-full text-body_L py-2"
              onClick={() => handleSubmit()}
            >
              {submitLabel}
            </Button>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default Modal;
