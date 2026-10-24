import { FetchError } from "ofetch";

export function getApiErrorMessage(
  error: unknown,
  fallback = "Something went wrong. Please try again.",
): string {
  if (error instanceof FetchError) {
    const data = error.data as
      | { message?: string }
      | undefined;

    return data?.message ?? error.message ?? fallback;
  }

  if (error instanceof Error) {
    return error.message;
  }

  return fallback;
}