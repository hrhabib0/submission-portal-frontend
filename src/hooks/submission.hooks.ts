
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createSubmission, getMySubmissions } from "@/api/submission.api";

export const useCreateSubmission = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createSubmission,

    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["submissions"],
      });
    },
  });
};

export function useMySubmissions(page: number, limit = 10) {
  return useQuery({
    queryKey: ["my-submissions"],
    queryFn: () => getMySubmissions(page, limit),
    staleTime: 60 * 1000,
    retry: false,
  });
}

