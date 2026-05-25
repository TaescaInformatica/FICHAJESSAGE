import { Toaster } from "sonner";
import { AttendancePage } from "./pages/AttendancePage";

export default function App() {
  return (
    <>
      <AttendancePage />
      <Toaster richColors position="top-center" closeButton />
    </>
  );
}
