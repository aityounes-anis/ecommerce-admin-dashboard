import { create } from "zustand";
import { StoreModalStore } from "./use-store-modal";

const useDeleteModal = create<StoreModalStore>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));

export default useDeleteModal;
