import { BankAccount } from "../../entities/BankAccount";
import { httpClient } from "../httpClients";

type BankAccountsResponse = Array<BankAccount>;

export async function getAll() {
  const { data } = await httpClient.get<BankAccountsResponse>("/bank-accounts");

  return data;
}
