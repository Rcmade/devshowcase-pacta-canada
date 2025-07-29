import { client } from "@/lib/rpc";
import { useQuery } from "@tanstack/react-query";
import { InferRequestType, InferResponseType } from "hono";
import { useSearchParams } from "next/navigation";

const api = client.api.main.projects.search.$get;
export type UserGetSearchProjectResponse = InferResponseType<typeof api, 200>;
export type UserGetSearchProjectRequest = InferRequestType<typeof api>;

const useGetSearchProject = () => {
  const searchParams = useSearchParams();
  const search = searchParams.get("search") || "";

  return useQuery({
    queryKey: ["projects", { search }],
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

export default useGetSearchProject;
