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
import { useAppStore } from "@/store/store";
import { useUser } from "@clerk/nextjs";
import { useState } from "react";
import { Input } from "./ui/input";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "@/firebase";
import toast from "react-hot-toast";

const RenameModal = () => {
  const { user } = useUser();
  const [input, setInput] = useState("");

  const [
    isRenameModalOpen,
    filename,
    setFileId,
    setFilename,
    setRenameModal,
    fileId,
  ] = useAppStore((state) => [
    state.isRenameModalOpen,
    state.filename,
    state.setFileId,
    state.setFilename,
    state.setRenameModal,
    state.fileId,
  ]);

  const renameFile = async () => {
    if (!user || !fileId) return;

    const toastId = toast.loading("Renaming...");

    await updateDoc(doc(db, "users", user.id, "files", fileId), {
      filename: input,
    });

    toast.success("Renamed Successfully", {
      id: toastId,
    });

    setInput("");
    setRenameModal(false);
  };
  return (
    <Dialog
      open={isRenameModalOpen}
      onOpenChange={(isOpen) => {
        setRenameModal(isOpen);
      }}
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="pb-2">Rename the file</DialogTitle>
          <Input
            id="link"
            defaultValue={filename || ""}
            onChange={(e) => {
              setInput(e.target.value);
            }}
            onKeyDownCapture={(e) => {
              if (e.key === "Enter") {
                renameFile();
              }
            }}
          />

          <div className="flex justify-end py-3 space-x-2">
            <Button
              size="sm"
              className="px-3"
              variant="ghost"
              onClick={() => {
                setRenameModal(false);
              }}
            >
              <span className="sr-only">Cancel</span>
              <span>Cancel</span>
            </Button>
            <Button
              size="sm"
              type="submit"
              className="px-3"
              onClick={() => {
                renameFile();
              }}
            >
              <span className="sr-only">Rename</span>
              <span>Rename</span>
            </Button>
          </div>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default RenameModal;
