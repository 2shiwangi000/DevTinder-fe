import axios from "axios";
import { BASE_URL } from "../utils/constant";

export async function getChats(params: { id: string | undefined }) {
  try {
    const res = await axios.get(BASE_URL + `chat/${params?.id}`, {
      withCredentials: true,
    });

    return res.data;
  } catch (err: any) {
    console.log(err);
    return err?.response?.data;
  }
}
