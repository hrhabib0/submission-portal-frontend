import { getCurrentUser, loginUser, logoutUser, registerUser } from "@/api"
import { getApiErrorMessage } from "@/lib/apiError";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { useRouter } from "next/navigation";
import { toast } from "sonner";


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

export function useLogout() {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: logoutUser,

    onSuccess: async () => {
      // Cancel pending current-user requests.
      await queryClient.cancelQueries({
        queryKey: ["current-user"],
      });

      queryClient.setQueryData(["current-user"], null);

      router.replace("/");
      router.refresh();

      toast.success("Logged out successfully.");
    },

    onError: (error) => {
      toast.error(
        getApiErrorMessage(error, "Unable to log out."),
      );
    },
  });
}