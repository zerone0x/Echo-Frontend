"use server";
import { headers } from "next/headers";
import { getUserByName } from "../_services/fetchDataAPI";

async function getCurrentUser() {
  try {
    const headersList = headers();
    const userName = headersList.get("x-user-name") as string;
    const user = await getUserByName(userName);
    return user;
  } catch (error) {
    console.error("Failed to fetch user data:", error);
    return null;
  }
}

export default getCurrentUser;
