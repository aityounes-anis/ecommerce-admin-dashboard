"use client";

import useStoreModal from "@/hooks/use-store-modal";
import { Button } from "./button";

interface OpenModalProps {
  btnLabel: string;
  logo: React.ReactNode;
}

const OpenModal = ({ btnLabel, logo }: OpenModalProps) => {
  const { onOpen } = useStoreModal();

  return (
    <div className="mt-8">
      <Button onClick={onOpen} size="lg">
        <div className="flex items-center">
          {logo}
          {btnLabel}
        </div>
      </Button>
    </div>
  );
};

export default OpenModal;
