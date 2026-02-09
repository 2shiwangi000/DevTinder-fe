export interface User {
  _id: string;
  firstName: string;
  lastName?: string;
  emailId: string;
  age?: number;
  gender?: "male" | "female" | "lgbtq";
  hobbies?: string[];
  photo?: string;
  about?: string;
  createdAt?: string;
  updatedAt?: string;
  length?:number
}
