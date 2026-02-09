export interface FeedUser {
  _id: string;
  firstName: string;
  lastName: string;
  emailId: string;
  hobbies: string[];
  photo: string;
  createdAt: string;
  updatedAt: string;
  about: string;
  gender: string;
  age: number;
}

export interface FeedResponse {
  data: FeedUser[];
  page: number;
  limit: number;
  total: number;
}

export interface FeedState {
  currentFeed: FeedUser[];
  page: number;
  limit: number;
  total: number;
  hasMore: boolean;
}

export type PropsCard = {
  key: string;
  user: FeedUser;
  onAccept: () => void;
  onIgnore: () => void;
};
