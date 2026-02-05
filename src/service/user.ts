import axios from "axios";
import { BASE_URL } from "../utils/constant";

export async function userGetByID() {
  try {
    const res = await axios.get(BASE_URL + "profile/view", {
      withCredentials: true,
    });
    return res?.data;
  } catch (err: any) {
    console.log(err);
    return err?.response?.data;
  }
}
