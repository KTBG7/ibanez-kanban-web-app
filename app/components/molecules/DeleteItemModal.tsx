import React from "react";
import Modal from "../atoms/Modal";
import Image from "next/image";
import cross_icon from "@/public/assets/icon-cross.svg";

type DeleteItemModalProps = {
  isOpen: boolean;
  onClose: () => void;
  itemName: string;
  onSubmit: () => void;
  itemType: string;
};

const DeleteItemModal = ({
  isOpen,
  onClose,
  itemName,
  onSubmit,
  itemType,
}: DeleteItemModalProps) => {
  return (
    <Modal
      isOpen={isOpen}
      onSubmit={onSubmit}
      submitLabel="Delete Board"
      submitType="delete"
    >
      <div className="flex w-full items-center justify-between">
        <h2 className="text-typography-destructive text-heading_L">{`Delete this ${itemType}?`}</h2>
        <button
          className="text-typography-grey text-heading_XL"
          onClick={() => onClose()}
        >
          <Image src={cross_icon} alt="Cross Icon" height={20} width={20} />
        </button>
      </div>
      <p className="text-typography-grey text-body_L">
        {`Are you sure you want to delete the '${itemName}' ${itemType}? This action cannot be reversed.`}
      </p>
    </Modal>
  );
};

export default DeleteItemModal;
