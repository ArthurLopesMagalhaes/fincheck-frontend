import { Outlet } from "react-router-dom";
import illustration from "../../assets/illustration.png";
import { Logo } from "../components/Logo";

export function AuthLayout() {
  return (
    <div className="flex w-full h-screen p-8">
      <div className="w-full max-h-screen flex flex-col justify-center items-center gap-16 lg:w-1/2">
        <Logo className="text-gray-500 h-6" />

        <div className="w-full max-w-md">
          <Outlet />
        </div>
      </div>

      <div className="w-1/2 max-h-screen relative overflow-hidden rounded-b-[32px] flex-col justify-center items-center hidden lg:flex">
        <img src={illustration} className="object-fit select-none" />

        <div className="p-10 rounded-b-[32px] absolute bottom-0 bg-white">
          <Logo className="text-teal-900 h-8" />
          <p className="text-gray-700 font-medium text-xl mt-6">
            Gerencie suas finanças pessoais de uma forma simples com o fincheck,
            e o melhor, totalmente de graça!
          </p>
        </div>
      </div>
    </div>
  );
}
