import { useQuery } from "@tanstack/react-query";
import { getSubmissionStats } from "@/api/submission.api";

export function useMentorDashboard() {
  return useQuery({
    queryKey: ["mentor-dashboard"],
    queryFn: async () => {
      const response = await getSubmissionStats();
      return response.data;
    },
    staleTime: 60 * 1000,
    retry: false,
  });
}