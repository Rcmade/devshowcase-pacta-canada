import type { ZodError, ZodIssue } from "zod/v4";

export const getInitials = (name: string | undefined) => {
  if (!name) return "U"; // Default fallback for missing names
  const [firstName, lastName] = name
    .replaceAll("undefined", "")
    .trim()
    .split(" ");
  return `${firstName?.[0] ?? ""}${lastName?.[0] ?? ""}`.toUpperCase();
};

export async function getReadableErrorMessage(error: unknown): Promise<string> {
  if (error instanceof Response) {
    try {
      const data = await error.json();

      if (typeof data === "object" && data !== null) {
        // Handle generic error message
        if (typeof data.error === "string") {
          return data.error;
        }

        // Handle array of errors
        if (Array.isArray(data.errors) && data.errors.length > 0) {
          return data.errors.join(" ");
        }

        // Handle Zod validation errors
        if (
          typeof data.error === "object" &&
          data.error !== null &&
          data.error.name === "ZodError" &&
          Array.isArray(data.error.issues)
        ) {
          const messages = (data.error as ZodError).issues.map(
            (issue: ZodIssue) => `${issue.path?.join(".")}: ${issue.message}`
          );
          return messages.join(" ");
        }
      }

      // Handle common HTTP status codes
      switch (error.status) {
        case 400:
          return "Bad request. Please check your input.";
        case 401:
          return "Unauthorized. Please log in.";
        case 403:
          return "Forbidden. You don't have permission to access this resource.";
        case 404:
          return "Not found. The requested resource does not exist.";
        case 500:
          return "Server error. Please try again later.";
        default:
          return `Unexpected error (Status: ${error.status}). Please try again.`;
      }
    } catch {
      return `Unexpected response error (Status: ${error.status}).`;
    }
  }

  // Handle Fetch network errors
  if (error instanceof TypeError) {
    return "Network error. Please check your connection.";
  }

  // Handle standard JS and crypto-related errors
  if (error instanceof Error) {
    // Crypto-specific error code
    if ((error as { code?: string }).code === "ERR_CRYPTO_INVALID_IV") {
      return "Data decryption failed. The data may be corrupted or has been tampered with.";
    }

    // Crypto message fallback
    if (error.message.includes("Invalid initialization vector")) {
      return "Data decryption failed. The data may be corrupted or has been tampered with.";
    }

    // Drizzle/PostgreSQL errors
    if (/relation .* does not exist/.test(error.message)) {
      return "Database error: Table not found.";
    }
    if (/violates unique constraint/.test(error.message)) {
      return "Database error: Duplicate entry.";
    }
    if (/violates not-null constraint/.test(error.message)) {
      return "Database error: Missing required field.";
    }

    return error.message;
  }

  // Handle unexpected error formats
  if (
    typeof error === "object" &&
    error !== null &&
    "error" in error &&
    typeof (error as { error?: unknown }).error === "string"
  ) {
    return (error as { error?: string })?.error || "An unknown error occurred.";
  }

  return "An unknown error occurred. Please try again.";
}
