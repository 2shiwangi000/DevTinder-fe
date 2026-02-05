import axios from "axios";
import { BASE_URL } from "../utils/constant";

export async function login(emailId: string, password: string) {
  try {
    const res = await axios.post(
      BASE_URL + "login",
      {
        emailId: emailId,
        password: password,
      },
      {
        withCredentials: true,
      },
    );
    return res?.data;
  } catch (err) {
    console.log(err);
  }
}

export async function logout() {
  try {
    const res = await axios.post(
      BASE_URL + "logout",
      {},
      {
        withCredentials: true,
      },
    );
    return res?.data;
  } catch (err) {
    console.log(err);
  }
}
