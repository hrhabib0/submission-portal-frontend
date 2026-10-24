import { getCurrentUser, loginUser, registerUser } from "@/api"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"


export const useLogin = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: loginUser,

        onSuccess: async () => {
            await queryClient.invalidateQueries({
                queryKey: ["current-user"],
            });
        },
    })
}

export const useRegister = () => {
  return useMutation({
    mutationFn: registerUser,
  });
};

export const useCurrentUser = () => {
  return useQuery({
    queryKey: ["current-user"],
    queryFn: async () => {
      const response = await getCurrentUser();
      return response.data;
    },
    staleTime: 60 * 1000,
    retry: false,
  });
};