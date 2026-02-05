import axios from "axios";

export async function login(emailId:string, password:string) {
  try {
    const res = await axios.post("http://localhost:4000/login",{
      emailId: emailId,
      password: password,
    },{
      withCredentials:true
    });
    return res?.data;
  } catch (err) {
    console.log(err);
  }
}
