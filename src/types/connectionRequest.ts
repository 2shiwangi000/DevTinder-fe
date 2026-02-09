import type { User } from "./user";

export interface ConnectionRequest {
  _id: string;
  fromUserId: User;
  toUserId: string;
  status: "interested";
  length:number;
}