import { useAuth } from "../../../app/hooks/useAuth";
import { Button } from "../../components/Button";
import { SplashScreen } from "../../SplashScreen";

export function Dashboard() {
  const { signout, isFetching } = useAuth();

  if (isFetching) {
    return <SplashScreen />;
  }

  return <Button onClick={signout}>signout</Button>;
}
