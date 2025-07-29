import { client } from "@/lib/rpc";
import { useQuery } from "@tanstack/react-query";

const api = client.api.main.user.profile.$get;

const useGetProfileInfo = () => {
  return useQuery({
    queryKey: ["user-profile"],
    queryFn: async () => {
      const res = await api();
      if (!res.ok) throw res;
      const data = await res.json();
      return data;
    },
  });
};

export default useGetProfileInfo;
