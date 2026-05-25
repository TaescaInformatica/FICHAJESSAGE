import type {
  AttendanceActionType,
  AttendanceResult,
  RegisterAttendancePayload,
} from "../types/attendance";

type MockErrorCode = "employee-not-found" | "connection-error";

export class RegisterAttendanceError extends Error {
  constructor(
    message: string,
    public readonly code: MockErrorCode,
  ) {
    super(message);
    this.name = "RegisterAttendanceError";
  }
}

const employees = new Map<string, string>([
  ["1", "Francisco M. Granados Roldán"],
  ["2", "Francisco M. Granados Roldán"],
]);

const lastActionByEmployee = new Map<string, AttendanceActionType>();

function nextAction(employeeCode: string): AttendanceActionType {
  if (employeeCode === "2") {
    return "check-out";
  }

  const previous = lastActionByEmployee.get(employeeCode);
  const next = previous === "check-in" ? "check-out" : "check-in";
  lastActionByEmployee.set(employeeCode, next);
  return next;
}

function buildMessage(action: AttendanceActionType, employeeName: string) {
  return action === "check-in"
    ? `Entrada registrada correctamente. Bienvenido, ${employeeName}.`
    : `Salida registrada correctamente. Que tengas buen día, ${employeeName}.`;
}

export async function registerAttendance(
  payload: RegisterAttendancePayload,
): Promise<AttendanceResult> {
  await new Promise((resolve) => window.setTimeout(resolve, 950));

  if (payload.employeeCode === "404") {
    throw new RegisterAttendanceError(
      "No se ha encontrado ningún empleado con ese código.",
      "employee-not-found",
    );
  }

  if (payload.employeeCode === "500") {
    throw new RegisterAttendanceError(
      "No se pudo registrar el fichaje. Revisa la conexión e inténtalo de nuevo.",
      "connection-error",
    );
  }

  const employeeName = employees.get(payload.employeeCode) ?? "Operario Graferma";
  const action = nextAction(payload.employeeCode);

  return {
    success: true,
    action,
    employeeName,
    message: buildMessage(action, employeeName),
    timestamp: new Date().toISOString(),
    remoteWork: payload.remoteWork,
  };
}
