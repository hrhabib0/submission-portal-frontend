import apiClient from "@/lib/apiClient";
import { CreateSubmissionPayload, MySubmissionsResponse } from "@/types/submission.types";


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

