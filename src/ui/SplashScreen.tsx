import { Spinner } from "./components/Components";
import { Logo } from "./components/Logo";

export function SplashScreen() {
  return (
    <div className="bg-teal-900 fixed inset-0 flex justify-center items-center">
      <div className="flex flex-col justify-center items-center gap-4">
        <Logo className="h-10 text-white" />
        <Spinner className="text-transparent fill-white" />
      </div>
    </div>
  );
}
