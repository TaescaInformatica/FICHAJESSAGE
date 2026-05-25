export function SystemStatus() {
  return (
    <div className="flex items-center justify-center gap-2 text-xs font-bold text-graferma-muted dark:text-[#b8c5bd]">
      <span className="relative flex h-2 w-2" aria-hidden="true">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-graferma-success opacity-30" />
        <span className="relative inline-flex h-2 w-2 rounded-full bg-graferma-success" />
      </span>
      <span>Sistema operativo</span>
    </div>
  );
}
