"use client";

import useStoreModal from "@/hooks/use-store-modal";
import Modal from "../ui/modal";
import StoreForm from "../forms/store-form";

const StoreModal = () => {
  const { isOpen, onClose } = useStoreModal();

  return (
    <Modal
      title="Create new Store"
      description="Kickstart your new journey"
      isOpen={isOpen}
      onClose={onClose}
    >
      <StoreForm />
    </Modal>
  );
};

export default StoreModal;
