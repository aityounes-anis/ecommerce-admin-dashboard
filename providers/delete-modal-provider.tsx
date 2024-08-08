"use client";

import DeleteModal from "@/components/modals/delete-modal";
import { useEffect, useState } from "react";

const DeleteModalProvider = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => setIsMounted(true), []);

  if (!isMounted) return null;

  return <DeleteModal />;
};

export default DeleteModalProvider;
