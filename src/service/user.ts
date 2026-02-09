import axios from "axios";
import { BASE_URL } from "../utils/constant";

export async function userGetByID() {
  try {
    const res = await axios.get(BASE_URL + "profile/view", {
      withCredentials: true,
    });

    return { authenticated: true, user: res.data };
  } catch (err: any) {
    console.log(err);
    return err?.response?.data;
  }
}

export async function updateProfile(payload: object) {
  try {
    const res = await axios.patch(BASE_URL + "profile/edit", payload, {
      withCredentials: true,
    });

    return res?.data;
  } catch (err: any) {
    console.log(err);
    return err?.response?.data;
  }
}

export async function sendConnectionReq(query: {
  userid: string;
  status: string;
}) {
  try {
    const res = await axios.post(
      BASE_URL + `request/send/${query.status}/${query.userid}`,
      {},
      {
        withCredentials: true,
      },
    );
    return res?.data;
  } catch (err: any) {
    console.log(err);
    return err?.response?.data;
  }
}

export async function getAllConnections() {
  try {
    const res = await axios.get(BASE_URL + "user/connection", {
      withCredentials: true,
    });

    return res?.data;
  } catch (err: any) {
    console.log(err);
    return err?.response?.data;
  }
}

export async function getAllConnectionRequest() {
  try {
    const res = await axios.get(BASE_URL + "user/requests", {
      withCredentials: true,
    });

    return res?.data;
  } catch (err: any) {
    console.log(err);
    return err?.response?.data;
  }
}
