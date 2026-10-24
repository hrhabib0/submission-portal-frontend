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
export interface SubmissionOwner {
    id: string;
    name: string;
    email: string;
}

export interface Submission {
  id: string;
  projectName: string;
  repoUrl: string;
  liveUrl: string;
  description: string;
  status: SubmissionStatus;
  createdAt: string;
  updatedAt: string;
  student: SubmissionOwner;
  feedback: SubmissionFeedback[];
}

export interface MySubmissionsResponse {
  success: boolean;
  statusCode: number;
  message: string;
  data: Submission[];
  meta?: ApiMeta;
}

export interface SubmissionStats {
  total: number;
  pending: number;
  approved: number;
  rejected: number;
}

export interface ReviewSubmissionPayload {
  status: "APPROVED" | "REJECTED";
  comment: string;
}