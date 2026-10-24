import apiClient from "@/lib/apiClient";
import { ApiResponse } from "@/types/api.types";
import { CreateSubmissionPayload, MySubmissionsResponse, ReviewSubmissionPayload, Submission, SubmissionStats, SubmissionStatus } from "@/types/submission.types";


export function createSubmission(payload: CreateSubmissionPayload) {
  return apiClient("/submission", {
    method: "POST",
    body: payload,
  });
}

export function getMySubmissions(page = 1, limit = 10) {
  return apiClient<MySubmissionsResponse>(
    `/submission/my-submissions?page=${page}&limit=${limit}`,
    { method: "GET" },
  );
}

export function getSubmissionStats() {
  return apiClient<ApiResponse<SubmissionStats>>(
    "/submission/stats",
    { method: "GET" },
  );
}

export function getSubmissions({
  page = 1,
  limit = 10,
  status,
}: {
  page?: number;
  limit?: number;
  status?: SubmissionStatus;
}) {
  const params = new URLSearchParams({
    page: String(page),
    limit: String(limit),
  });

  if (status) {
    params.set("status", status);
  }

  return apiClient(
    `/submission?${params.toString()}`,
    { method: "GET" },
  );
}

export function reviewSubmission(
  submissionId: string,
  payload: ReviewSubmissionPayload,
) {
  return apiClient(
    `/submission/${submissionId}/review`,
    {
      method: "PATCH",
      body: payload,
    },
  );
}


