import axios from "axios";

export function formatDate(dateString: string | number | Date): string {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(date);
}

export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return `${text.slice(0, maxLength)}...`;
}

export function getErrorMessage(
  error: unknown,
  fallbackMessage: string
): string {
  if (axios.isAxiosError(error)) {
    const status = error.response?.status;
    const serverMessage = error.response?.data?.message;

    if (status === 400 && typeof serverMessage === "string") {
      if (serverMessage.toLowerCase().includes("invalid credentials")) {
        return "Invalid username or password.";
      }
    }

    if (status === 404) {
      const lower = fallbackMessage.toLowerCase();
      if (lower.includes("load") && lower.includes("post")) {
        return "Unable to load this post.";
      }
      if (lower.includes("load") && lower.includes("comment")) {
        return "Unable to load comments.";
      }
    }

    if (!error.response && error.request) {
      return fallbackMessage;
    }
  }

  return fallbackMessage;
}

