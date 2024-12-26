import { httpClient } from "../httpClients";

interface MeResponse {
  name: string;
  email: string;
}

export async function me() {
  const { data } = await httpClient.get<MeResponse>("/users/me");

  return data;
}
