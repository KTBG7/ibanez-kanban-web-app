import React, { useEffect, useRef, useState } from 'react';
import Button from './Button';

type ModalProps = {
  isOpen: boolean;
  button?: { buttonType: string; text: string; onClick: () => void };
  onSubmit?: () => void;
  onClose: () => void;
  children: React.ReactNode;
};

const Modal = ({ isOpen, button, onSubmit, onClose, children }: ModalProps) => {
  const [isModalOpen, setIsModalOpen] = useState(isOpen);
  const modalRef = useRef<HTMLDialogElement | null>(null);

  const handleKeyboardClose = (
    event: React.KeyboardEvent<HTMLDialogElement>,
  ) => {
    if (event.key === 'Escape') {
      setIsModalOpen(false);
      onClose();
    }
  };

  const handleOutsideClickClose = () => {
    setIsModalOpen(false);
    onClose();
  };

  useEffect(() => {
    setIsModalOpen(isOpen);
  }, [isOpen]);

  useEffect(() => {
    const modalElement = modalRef.current;
    if (modalElement) {
      if (isModalOpen) {
        modalElement.showModal();
      } else {
        modalElement.close();
      }
    }
  }, [isModalOpen]);
  return (
    <dialog
      ref={modalRef}
      onClick={handleOutsideClickClose}
      onMouseOut={() => setIsModalOpen(false)}
      onKeyDown={(e) => handleKeyboardClose(e)}
    >
      {children}
      {button && onSubmit ? (
        <Button
          buttonType={button.buttonType}
          text={button.text}
          onClick={onSubmit}
        />
      ) : null}
    </dialog>
  );
};

export default Modal;
