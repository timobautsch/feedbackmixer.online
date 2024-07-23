export type State =
  | {
      status: "success";
      message: string;
      data?: any;
    }
  | {
      status: "error";
      message: string;
      errors?: Error[];
    }
  | null;

export interface Error {
  path: string;
  message: string;
}

export interface ErrorProps {
  message?: string;
}

export interface SesionsDetails {
  id: number;
  labels: string[];
  header: string[];
  session_name: string;
}
