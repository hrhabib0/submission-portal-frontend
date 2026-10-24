
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createSubmission, getMySubmissions, getSubmissionById, getSubmissions, reviewSubmission } from "@/api/submission.api";
import { ReviewSubmissionPayload, SubmissionStatus } from "@/types/submission.types";

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

interface GetSubmissionsParams {
  page: number;
  limit: number;
  status?: SubmissionStatus;
}

export function useGetSubmissions({
  page,
  limit,
  status,
}: GetSubmissionsParams) {
  return useQuery({
    queryKey: ["submissions", "mentor-list", page, limit, status],
    queryFn: () => getSubmissions({ page, limit, status }),
    staleTime: 30_000,
    retry: false,
  });
}

export function useGetSubmissionById(submissionId: string) {
  return useQuery({
    queryKey: ["submissions", "detail", submissionId],
    queryFn: async () => {
      const response = await getSubmissionById(submissionId);
      return response.data.submission;
    },
    enabled: Boolean(submissionId),
    staleTime: 30_000,
    retry: false,
  });
}

interface ReviewVariables {
  submissionId: string;
  payload: ReviewSubmissionPayload;
}

export function useReviewSubmission() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ submissionId, payload }: ReviewVariables) =>
      reviewSubmission(submissionId, payload),

    onSuccess: async () => {
      await Promise.all([
        queryClient.invalidateQueries({
          queryKey: ["submissions"],
        }),
        queryClient.invalidateQueries({
          queryKey: ["mentor-dashboard"],
        }),
      ]);
    },
  });
}

