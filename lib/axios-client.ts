import { FormSchema } from "@/schemas/schema";
import axios from "axios";
import * as z from "zod";

export async function sendRegistrationInfo(values: z.infer<typeof FormSchema>) {
  try {
    const response = await axios.post("/api/users/signup", values);
    return response.data;
  } catch (err: unknown) {
    console.log(err);
  }
}

export async function sendLoginInfo(values: z.infer<typeof FormSchema>) {
  try {
    const response = await axios.post("/api/users/login", values);
    return response.data;
  } catch (err: unknown) {
    console.log(err);
  }
}
