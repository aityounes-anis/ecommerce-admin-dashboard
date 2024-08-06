"use client";

import useStoreModal from "@/hooks/use-store-modal";
import Modal from "../ui/modal";

const StoreModal = () => {
  const { isOpen, onClose } = useStoreModal();

  return (
    <Modal
      title="Create new Store"
      description="Kickstart your new journey"
      isOpen={isOpen}
      onClose={onClose}
    />
  );
};

export default StoreModal;
