"use server";

import fetchInstance from "@/utils/fetchInstance";
import { UserInput } from "@/types/auth";
import { cookies } from "next/headers";

const postSignIn = async (userInput: UserInput) => {
  try {
    const data = await fetchInstance("auth/signIn", {
      method: "POST",
      body: JSON.stringify(userInput),
    });

    cookies().set("cookie", data.accessToken);

    return data;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message || "login failed");
    } else {
      throw new Error("login failed");
    }
  }
};

export default postSignIn;