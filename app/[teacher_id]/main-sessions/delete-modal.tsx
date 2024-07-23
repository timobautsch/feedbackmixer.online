"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface DeleteModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

const DeleteModal = ({ isOpen, onClose, onConfirm }: DeleteModalProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            Are you sure you want to delete this session?
          </DialogTitle>
        </DialogHeader>
        <DialogFooter>
          <DialogClose asChild>
            <Button
              type="button"
              variant="ghost"
              className="w-32 border border-gray-400 hover:bg-white hover:text-black"
              onClick={onClose}
            >
              No
            </Button>
          </DialogClose>
          <Button
            variant={"default"}
            backgroundColors={"blue"}
            className="w-32 border border-blue-700 hover:bg-white hover:text-black"
            onClick={onConfirm}
          >
            Yes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteModal;
