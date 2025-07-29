import { useAlertDialog } from "@/hooks/useAlertDialog";
import { client } from "@/lib/rpc";
import { getReadableErrorMessage } from "@/lib/utils/stringUtils";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { InferRequestType, InferResponseType } from "hono";
import { toast } from "sonner";

const api = client.api.main.projects[":projectId"].$delete;
type RequestType = InferRequestType<typeof api>;
type ResponseType = InferResponseType<typeof api, 200>;

const useDeleteProject = () => {
  const queryClient = useQueryClient();

  const { showAlertDialog, setAlertDialogLoading, closeAlertDialog } =
    useAlertDialog();

  const mutation = useMutation<ResponseType, unknown, RequestType>({
    mutationFn: async (requestData) => {
      const res = await api(requestData);
      if (!res.ok) throw res;
      return await res.json();
    },
    onError: async (err) => {
      const error = await getReadableErrorMessage(err);
      toast.error(error);
    },
    onSuccess: (data) => {
      toast.success(data.message);
      queryClient.invalidateQueries({ queryKey: ["user-projects"] });
    },
  });

  const handleDelete = async (project: { id: string; title: string }) => {
    const confirmed = await showAlertDialog({
      title: "Are you sure?",
      description: (
        <span>
          This will permanently delete the project{" "}
          <strong className="mx-2 text-lg font-bold capitalize">
            {project.title}
          </strong>
          and all related data.
        </span>
      ),
      confirmLabel: "Delete",
      cancelLabel: "Cancel",
    });

    if (confirmed) {
      setAlertDialogLoading(true);
      await mutation.mutateAsync({
        param: { projectId: project.id },
      });
      setAlertDialogLoading(false);
      setTimeout(() => {
        closeAlertDialog();
      }, 0);
    }
  };

  return { mutation, handleDelete };
};

export default useDeleteProject;
