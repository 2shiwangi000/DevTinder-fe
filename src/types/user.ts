export interface User {
  _id: string;
  firstName: string;
  lastName: string;
  emailId: string;
  photo?: string;
  bio?: string;
  skills?: string[];
}
