"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useAddEditProjectDialog } from "../../hooks/useAddEditProjectDialog";
import AddEditProjectForm from "../form/AddEditProjectForm";

const AddEditProjectDialog = () => {
  const { isOpen, onClose, data } = useAddEditProjectDialog();
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent onInteractOutside={(e) => e.preventDefault()}>
        <DialogHeader>
          <DialogTitle>
            {data?.type === "edit" ? "Edit Project" : "Add Project"}
          </DialogTitle>
          <DialogDescription>
            {data?.type === "edit"
              ? "Are you sure you want to edit this project?"
              : "Fill in the details to add a new project."}
          </DialogDescription>
        </DialogHeader>
        {data && <AddEditProjectForm />}
      </DialogContent>
    </Dialog>
  );
};

export default AddEditProjectDialog;
