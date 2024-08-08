"use client";

import Modal from "../ui/modal";
import DeleteForm from "../forms/delete-form";
import useDeleteModal from "@/hooks/use-delete-modal";

const DeleteModal = () => {
  const { isOpen, onClose } = useDeleteModal();

  return (
    <Modal
      title="Are you sure?"
      description="delete the store."
      isOpen={isOpen}
      onClose={onClose}
    >
      <DeleteForm btnVariant="destructive" />
    </Modal>
  );
};

export default DeleteModal;
