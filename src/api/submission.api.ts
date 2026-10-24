import apiClient from "@/lib/apiClient";
import { CreateSubmissionPayload } from "@/types/submission.types";


export function createSubmission(payload: CreateSubmissionPayload) {
  return apiClient("/submission", {
    method: "POST",
    body: payload,
  });
}
