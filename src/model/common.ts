export interface AppError extends Error {
  status?: number;
  code?: string;
  details?: unknown;
  response?: message;
}

interface message {
  data: string;
}
