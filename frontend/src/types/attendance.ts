export type AttendanceActionType = "check-in" | "check-out";

export type AttendanceStatusType =
  | "idle"
  | "loading"
  | "success"
  | "error"
  | "warning"
  | "info";

export interface AttendanceFormValues {
  employeeCode: string;
  remoteWork: boolean;
}

export interface RegisterAttendancePayload {
  employeeCode: string;
  remoteWork: boolean;
}

export interface AttendanceResult {
  success: boolean;
  action: AttendanceActionType;
  employeeName: string;
  message: string;
  timestamp: string;
  remoteWork: boolean;
}

export interface AttendanceStatusMessage {
  type: Exclude<AttendanceStatusType, "idle">;
  title?: string;
  message: string;
  employeeName?: string;
}
