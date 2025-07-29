import { client } from "@/lib/rpc";
import { useQuery } from "@tanstack/react-query";
import { InferRequestType, InferResponseType } from "hono";
import useProjectId from "./useProjectId";

const api = client.api.main.projects.p[":projectId"].$get;
export type GetProjectByIdResponse = InferResponseType<typeof api, 200>;
export type GetProjectByIdRequest = InferRequestType<typeof api>;

const useGetProjectById = () => {
  const projectId = useProjectId();

  return useQuery({
    queryKey: ["project", projectId],
    enabled: !!projectId,
    queryFn: async () => {
      const res = await api({ param: { projectId: projectId! } });
      if (!res.ok) throw res;
      return res.json();
    },
  });
};

export default useGetProjectById;
