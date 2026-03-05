import axios from "axios";
import { BASE_URL } from "../utils/constant";

export async function purchaseMembership(type: string) {
  try {
    const res = await axios.post(
      BASE_URL + `payment/create`,
      { membershipType: type },
      {
        //   params,
        withCredentials: true,
      },
    );

    return res.data;
  } catch (err: any) {
    console.log(err);
    return err?.response?.data;
  }
}
