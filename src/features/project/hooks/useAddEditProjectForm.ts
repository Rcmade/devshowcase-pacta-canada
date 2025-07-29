import { client } from "@/lib/rpc";
import { getReadableErrorMessage } from "@/lib/utils/stringUtils";
import {
  addEditFormSchema,
  AddEditFormSchemaT,
} from "@/zodSchema/projectSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { InferRequestType, InferResponseType } from "hono";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { useAddEditProjectDialog } from "./useAddEditProjectDialog";

const api = client.api.main.projects.$post;
type RequestT = InferRequestType<typeof api>;
export type UseAddEditProjectResponseT = InferResponseType<typeof api, 200>;

const useAddEditProjectForm = ({ onSuccess }: { onSuccess?: () => void }) => {
  const { data: editProjectData, onClose } = useAddEditProjectDialog();
  const { push } = useRouter();
  const getDefaultValues = () => {
    if (editProjectData?.type === "edit") {
      return {
        id: editProjectData?.data?.id,
        title: editProjectData?.data?.title,
        description: editProjectData?.data?.description || undefined,
        liveUrl: editProjectData?.data?.liveUrl || undefined,
        githubUrl: editProjectData?.data?.liveUrl || undefined,
        imageUrl: editProjectData?.data?.imageUrl || undefined,
      } satisfies AddEditFormSchemaT;
    } else {
      return {
        title: "",
        description: "",
        liveUrl: "",
        githubUrl: "",
        imageUrl: "",
      };
    }
  };
  const form = useForm<AddEditFormSchemaT>({
    resolver: zodResolver(addEditFormSchema),
    defaultValues: getDefaultValues(),
  });

  const queryClient = useQueryClient();
  const { isPending, mutate } = useMutation<
    UseAddEditProjectResponseT,
    unknown,
    RequestT
  >({
    mutationFn: async ({ json }) => {
      const res = await api({ json });
      if (!res.ok) throw res;
      const data = await res.json();
      return data;
    },

    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["user-projects"] });
      if (editProjectData?.type === "edit") {
        queryClient.invalidateQueries({
          queryKey: ["project", data?.project?.id],
        });
        onClose();
      }
      toast.success(data.message);
      push("/");

      onSuccess?.();
    },

    onError: (err) => {
      const error = getReadableErrorMessage(err);
      toast.error(error);
    },
  });

  useEffect(() => {
    if (editProjectData?.type === "edit") {
      setTimeout(() => {
        console.log({ editProjectData });
        form.reset(getDefaultValues());
      }, 1000);
    }
    return () => {};
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editProjectData]);

  const onSubmit = (data: AddEditFormSchemaT) => {
    mutate({
      json: data,
    });
  };

  return { form, onSubmit, isLoading: isPending };
};

export default useAddEditProjectForm;
