import { zodResolver } from "@hookform/resolvers/zod";
import { Fingerprint, UserRound } from "lucide-react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import { registerAttendance, RegisterAttendanceError } from "../../lib/mockAttendance";
import { attendanceSchema, type AttendanceSchemaValues } from "../../lib/validation";
import type { AttendanceStatusMessage } from "../../types/attendance";
import { Button } from "../ui/Button";
import { Input } from "../ui/Input";
import { WorkModeSelector } from "./WorkModeSelector";

interface AttendanceFormProps {
  onStatusChange: (status: AttendanceStatusMessage) => void;
}

export function AttendanceForm({ onStatusChange }: AttendanceFormProps) {
  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<AttendanceSchemaValues>({
    resolver: zodResolver(attendanceSchema),
    defaultValues: {
      employeeCode: "",
      remoteWork: false,
    },
    mode: "onSubmit",
  });

  async function onSubmit(values: AttendanceSchemaValues) {
    onStatusChange({
      type: "loading",
      title: "Registrando fichaje",
      message: "Estamos guardando el movimiento. No cierres esta pantalla.",
    });

    try {
      const result = await registerAttendance(values);
      const title =
        result.action === "check-in"
          ? "Entrada registrada correctamente"
          : "Salida registrada correctamente";

      onStatusChange({
        type: "success",
        title,
        message: result.message,
        employeeName: result.employeeName,
      });

      toast.success(title, {
        description: result.message,
      });

      reset({
        employeeCode: "",
        remoteWork: false,
      });
    } catch (error) {
      const message =
        error instanceof RegisterAttendanceError
          ? error.message
          : "No se pudo registrar el fichaje. Revisa la conexión e inténtalo de nuevo.";

      onStatusChange({
        type: "error",
        title: "No se pudo registrar el fichaje",
        message,
      });

      toast.error("No se pudo registrar el fichaje", {
        description: message,
      });
    }
  }

  return (
    <form className="space-y-4" onSubmit={handleSubmit(onSubmit)} noValidate>
      <Input
        label="Código de operario"
        placeholder="Ej. 1024"
        inputMode="numeric"
        autoComplete="off"
        className="text-center"
        disabled={isSubmitting}
        error={errors.employeeCode?.message}
        leftIcon={<UserRound className="h-5 w-5" aria-hidden="true" />}
        {...register("employeeCode")}
      />

      <Controller
        control={control}
        name="remoteWork"
        render={({ field }) => (
          <WorkModeSelector
            checked={field.value}
            onCheckedChange={field.onChange}
            disabled={isSubmitting}
          />
        )}
      />

      <Button
        type="submit"
        size="lg"
        className="h-[60px] w-full text-base"
        isLoading={isSubmitting}
        leftIcon={<Fingerprint className="h-5 w-5" aria-hidden="true" />}
      >
        {isSubmitting ? "Registrando fichaje..." : "Registrar fichaje"}
      </Button>
    </form>
  );
}
