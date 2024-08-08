"use client";

import useStoreModal from "@/hooks/use-store-modal";
import Modal from "../ui/modal";
import DeleteForm from "../forms/delete-form";

const DeleteModal = () => {
  const { isOpen, onClose } = useStoreModal();

  return (
    <Modal
      title="Are you sure?"
      description="delete the store."
      isOpen={isOpen}
      onClose={onClose}
    >
      <DeleteForm btnLabel="destructive" />
    </Modal>
  );
};

export default DeleteModal;
