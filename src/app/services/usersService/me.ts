import { User } from "../../entities/User";
import { httpClient } from "../httpClients";

type MeResponse = User;

export async function me() {
  const { data } = await httpClient.get<MeResponse>("/users/me");

  return data;
}
