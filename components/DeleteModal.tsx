"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { db, storage } from "@/firebase";
import { useAppStore } from "@/store/store";
import { useUser } from "@clerk/nextjs";
import { deleteDoc, doc } from "firebase/firestore";
import { deleteObject, ref } from "firebase/storage";
import toast from "react-hot-toast";

export function DeleteModal() {
  const { user } = useUser();

  const [
    isDeleteModalOpen,
    setDeleteModal,
    setFileId,
    setFilename,
    setRenameModal,
    fileId,
  ] = useAppStore((state) => [
    state.isDeleteModalOpen,
    state.setDeleteModal,
    state.setFileId,
    state.setFilename,
    state.setRenameModal,
    state.fileId,
  ]);

  const deleteFile = async () => {
    if (!user || !fileId) return;

    const toastId = toast.loading("Deleting...");

    const fileRef = ref(storage, `users/${user.id}/files/${fileId}`);

    try {
      await deleteObject(fileRef);
      await deleteDoc(doc(db, "users", user.id, "files", fileId));

      toast.success("Deleted Successfully", {
        id: toastId,
      });
    } catch (err) {
      toast.error("Oops! Something went wrong", {
        id: toastId,
      });
      console.log(err);
    }

    setDeleteModal(false);
  };
  return (
    <Dialog
      open={isDeleteModalOpen}
      onOpenChange={(isOpen) => {
        setDeleteModal(isOpen);
      }}
    >
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Are you sure you want to delete?</DialogTitle>
          <DialogDescription>
            This action cannot be undone. This will permanently delete your
            file!!
          </DialogDescription>
        </DialogHeader>
        <div className="flex py-2 space-x-3">
          <Button
            size="sm"
            className="px-3 flex-1"
            variant="ghost"
            onClick={() => {
              setDeleteModal(false);
            }}
          >
            <span className="sr-only">Cancel</span>
            <span>Cancel</span>
          </Button>
          <Button
            size="sm"
            type="submit"
            variant="destructive"
            className="px-3 flex-1"
            onClick={() => {
              deleteFile();
            }}
          >
            <span className="sr-only">Delete</span>
            <span>Delete</span>
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
