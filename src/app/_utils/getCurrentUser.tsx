"use server";
import { headers } from "next/headers";
import { getUserByName } from "../_services/fetchDataAPI";

async function getCurrentUser() {
  const headersList = headers();
  const userId = headersList.get("x-user-id");
  const userName = headersList.get("x-user-name");
  const user = await getUserByName(userName);
  return user;
}

export default getCurrentUser;
