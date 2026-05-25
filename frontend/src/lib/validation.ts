import { z } from "zod";

export const attendanceSchema = z.object({
  employeeCode: z
    .string({ required_error: "Introduce tu código de operario." })
    .trim()
    .min(1, "Introduce tu código de operario.")
    .max(8, "El código de operario no puede superar los 8 dígitos.")
    .regex(/^\d+$/, "El código de operario solo puede contener números."),
  remoteWork: z.boolean().default(false),
});

export type AttendanceSchemaValues = z.infer<typeof attendanceSchema>;
