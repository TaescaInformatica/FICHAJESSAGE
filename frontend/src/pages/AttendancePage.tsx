import { AttendanceCard } from "../components/attendance/AttendanceCard";

export function AttendancePage() {
  return (
    <main className="attendance-background relative flex min-h-screen items-center justify-center overflow-hidden px-4 py-8 sm:px-6">
      <div className="pointer-events-none absolute -left-24 top-10 h-72 w-72 rounded-full bg-graferma-green/12 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 -right-24 h-80 w-80 rounded-full bg-graferma-wood/20 blur-3xl" />
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[520px] w-[520px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/30 blur-3xl" />

      <section className="relative z-10 w-full max-w-[560px]" aria-label="Registro de jornada">
        <AttendanceCard />
      </section>
    </main>
  );
}
