"use client";
import { getUserByName } from "../_services/fetchDataAPI";

async function getCurrentUser(userName: string) {
  try {
    const user = await getUserByName(userName);
    return user;
  } catch (error) {
    console.error("Failed to fetch user data:", error);
    return null;
  }
}

export default getCurrentUser;
