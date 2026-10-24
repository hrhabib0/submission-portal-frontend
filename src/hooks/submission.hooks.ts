
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createSubmission } from "@/api/submission.api";

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
