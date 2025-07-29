import { client } from "@/lib/rpc";
import { getReadableErrorMessage } from "@/lib/utils/stringUtils";
import {
  profileUpdateSchema,
  ProfileUpdateSchemaT,
} from "@/zodSchema/userSchema";

import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { InferRequestType, InferResponseType } from "hono";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import useGetProfileInfo from "./useGetProfileInfo";

const api = client.api.main.user.$put;
type RequestT = InferRequestType<typeof api>;
type ResponseT = InferResponseType<typeof api, 200>;

const useUpdateProfileForm = ({ onSuccess }: { onSuccess?: () => void }) => {
  const queryClient = useQueryClient();

  const { data, isLoading } = useGetProfileInfo();

  const getDefaultValues = () => {
    return {
      fullName: data?.user?.name || "",
      bio: data?.user?.bio || "",
      website: data?.user?.website || "",
      githubUrl: data?.user?.githubUrl || "",
      linkedinUrl: data?.user?.linkedinUrl || "",
      avatarUrl: data?.user?.avatarUrl || "",
    };
  };

  const form = useForm<ProfileUpdateSchemaT>({
    resolver: zodResolver(profileUpdateSchema),
    defaultValues: getDefaultValues(),
  });

  const { isPending, mutate } = useMutation<ResponseT, unknown, RequestT>({
    mutationFn: async ({ json }) => {
      const res = await api({ json });
      if (!res.ok) throw res;
      return await res.json();
    },
    onSuccess: (data) => {
      toast.success(data.success);
      queryClient.invalidateQueries({ queryKey: ["user-profile"] });
      onSuccess?.();
    },
    onError: (err) => {
      const error = getReadableErrorMessage(err);
      toast.error(error);
    },
  });

  useEffect(() => {
    if (data) {
      form.reset(getDefaultValues());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  const onSubmit = (data: ProfileUpdateSchemaT) => {
    mutate({ json: data });
  };

  return { form, onSubmit, isLoading: isPending || isLoading };
};

export default useUpdateProfileForm;
