import { useAuth } from "../../../app/hooks/useAuth";

import { Logo } from "../../components/Logo";
import { UserMenu } from "../../components/UserMenu";
import { SplashScreen } from "../../SplashScreen";
import { Accounts } from "./components/Accounts";
import { Transactions } from "./components/Transactions";

export function Dashboard() {
  const { isFetching } = useAuth();

  if (isFetching) {
    return <SplashScreen />;
  }

  return (
    <div className="h-screen w-full p-4 md:p-8 md:pt-6 flex flex-col gap-4">
      <header className="flex justify-between items-center h-12">
        <Logo className="h-6 text-teal-900" />
        <UserMenu />
      </header>
      <main className="flex-1 flex gap-4 flex-col md:flex-row">
        <Accounts />
        <Transactions />
      </main>
    </div>
  );
}
