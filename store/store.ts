import { create } from "zustand";

interface AppState {
  isDeleteModalOpen: boolean;
  setDeleteModal: (open: boolean) => void;

  isRenameModalOpen: boolean;
  setRenameModal: (open: boolean) => void;

  fileId: string | null;
  setFileId: (fileId: string) => void;

  filename: string | null;
  setFilename: (filename: string) => void;
}

export const useAppStore = create<AppState>((set) => ({
  fileId: null,
  setFileId: (fileId: string) => set((state) => ({ fileId })),

  filename: "",
  setFilename: (filename: string) => set((state) => ({ filename })),

  isDeleteModalOpen: false,
  setDeleteModal: (open: boolean) =>
    set((state) => ({ isDeleteModalOpen: open })),

  isRenameModalOpen: false,
  setRenameModal: (open: boolean) =>
    set((state) => ({ isRenameModalOpen: open })),
}));
