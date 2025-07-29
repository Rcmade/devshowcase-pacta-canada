import useProjectId from "@/features/project/hooks/useProjectId";
import { client } from "@/lib/rpc";
import { getReadableErrorMessage } from "@/lib/utils/stringUtils";
import { commentSchema, CommentSchemaT } from "@/zodSchema/commentSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { InferRequestType, InferResponseType } from "hono";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

const api = client.api.main.comments.p[":projectId"].$post;
type RequestT = InferRequestType<typeof api>;
export type UseAddCommentResponseT = InferResponseType<typeof api, 200>;

const useAddCommentForm = ({ onSuccess }: { onSuccess?: () => void }) => {
  const projectId = useProjectId();
  const form = useForm<CommentSchemaT>({
    resolver: zodResolver(commentSchema),
    defaultValues: {
      content: "",
    },
  });

  const queryClient = useQueryClient();

  const { isPending, mutate } = useMutation<
    UseAddCommentResponseT,
    unknown,
    RequestT
  >({
    mutationFn: async ({ json }) => {
      const res = await api({ param: { projectId: projectId! }, json });
      if (!res.ok) throw res;
      const data = await res.json();
      return data;
    },

    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ["project-comments", projectId],
      });
      toast.success(data.message);
      form.reset();
      onSuccess?.();
    },

    onError: (err) => {
      const error = getReadableErrorMessage(err);
      toast.error(error);
    },
  });

  const onSubmit = (data: CommentSchemaT) => {
    mutate({
      json: data,
      param: {
        projectId: projectId!,
      },
    });
  };

  return { form, onSubmit, isLoading: isPending };
};

export default useAddCommentForm;
