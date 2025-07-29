import { create } from "zustand";
import { GetProjectByIdResponse } from "./useGetProjectById";

export type AddEditProjectDialogT =
  | {
      type: "create";
    }
  | {
      type: "edit";
      data: GetProjectByIdResponse;
    };

type UseAddEditProjectDialogT = {
  onOpen: (data: AddEditProjectDialogT) => void;
  onClose: () => void;
  data?: AddEditProjectDialogT;
  isOpen: boolean;
};

export const useAddEditProjectDialog = create<UseAddEditProjectDialogT>((set) => ({
  isOpen: false,
  onClose: () => set({ isOpen: false, data: undefined }),
  onOpen: (data) => {
    set({ isOpen: true, data });
  },
}));
