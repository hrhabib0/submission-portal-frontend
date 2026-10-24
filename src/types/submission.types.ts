import { ApiMeta } from "./api.types";

export interface CreateSubmissionPayload {
  projectName: string;
  repoUrl: string;
  liveUrl: string;
  description: string;
}

export interface SubmissionFeedback {
  id: string;
  comment: string;
  createdAt: string;
  mentor: {
    id: string;
    name: string;
  };
}

export type SubmissionStatus = "PENDING" | "APPROVED" | "REJECTED";

export interface Submission {
  id: string;
  projectName: string;
  repoUrl: string;
  liveUrl: string;
  description: string;
  status: SubmissionStatus;
  createdAt: string;
  updatedAt: string;
  feedback: SubmissionFeedback[];
}

export interface MySubmissionsResponse {
  success: boolean;
  statusCode: number;
  message: string;
  data: Submission[];
  meta?: ApiMeta;
}