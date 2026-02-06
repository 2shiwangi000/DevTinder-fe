import axios from "axios";
import { BASE_URL } from "../utils/constant";

export async function getUsersFeed(params?: object) {
  try {
    const res = await axios.get(BASE_URL + `user/feed`, {
      params,
      withCredentials: true,
    });

    return res.data;
  } catch (err: any) {
    console.log(err);
    return err?.response?.data;
  }
}
