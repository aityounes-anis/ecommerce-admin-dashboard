"use client";

import useStoreModal from "@/hooks/use-store-modal";
import { Button } from "./button";

interface OpenModalProps {
  btnLabel: string;
  logo: React.ReactNode;
  btnVariant:
    | "destructive"
    | "link"
    | "default"
    | "outline"
    | "secondary"
    | "ghost"
    | null
    | undefined;
}

const OpenModal = ({ btnLabel, logo, btnVariant }: OpenModalProps) => {
  const { onOpen } = useStoreModal();

  return (
    <div className="mt-8">
      <Button size="lg" variant={btnVariant} onClick={onOpen}>
        <div className="flex items-center">
          {logo}
          {btnLabel}
        </div>
      </Button>
    </div>
  );
};

export default OpenModal;
