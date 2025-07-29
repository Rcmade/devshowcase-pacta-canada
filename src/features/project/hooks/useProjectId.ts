import { useParams } from "next/navigation";

const useProjectId = () => {
  const params = useParams();
  return (params?.projectId as string) || null;
};

export default useProjectId;
