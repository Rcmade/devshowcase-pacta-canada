import useProjectId from "@/features/project/hooks/useProjectId";
import { client } from "@/lib/rpc";
import { useQuery } from "@tanstack/react-query";
import { InferResponseType } from "hono";

const api = client.api.main.comments.p[":projectId"].$get;
export type GetCommentsByProjectResponse = InferResponseType<typeof api, 200>;

const useGetCommentsByProjectId = () => {
  const projectId = useProjectId();

  return useQuery({
    queryKey: ["project-comments", projectId],
    enabled: !!projectId,
    queryFn: async () => {
      const res = await api({ param: { projectId: projectId! } });
      if (!res.ok) throw res;
      return res.json();
    },
  });
};

export default useGetCommentsByProjectId;
