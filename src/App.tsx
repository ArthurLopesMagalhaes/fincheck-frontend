import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Router } from "./Router";
import { Toaster } from "react-hot-toast";

const queryClient = new QueryClient();

export function App() {
  return (
    <div className="max-w-[1440px] m-auto bg-gray-50">
      <QueryClientProvider client={queryClient}>
        <Router />
        <Toaster />
      </QueryClientProvider>
    </div>
  );
}
