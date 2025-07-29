import { client } from "@/lib/rpc";
import { useQuery } from "@tanstack/react-query";
import { InferRequestType, InferResponseType } from "hono";
import { useSearchParams } from "next/navigation";

const api = client.api.main.projects.me.$get;
export type UserGetPersonalProjectResponse = InferResponseType<typeof api, 200>;
export type UserGetPersonalProjectRequest = InferRequestType<typeof api>;

const useGetPersonalProjects = () => {
  const searchParams = useSearchParams();
  const search = searchParams.get("search") || "";

  return useQuery({
    queryKey: ["user-projects", { search }],
    queryFn: async () => {
      const res = await api({
        query: {
          search,
        },
      });
      if (!res.ok) throw res;
      const data = await res.json();
      return data;
    },
  });
};

export default useGetPersonalProjects;
