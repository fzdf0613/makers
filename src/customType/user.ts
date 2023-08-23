export type SessionUser = {
  id: string;
  userid: string;
  username: string;
  image: string;
  isAdmin: boolean;
};

export type User = {
  id: string;
  username: string;
  userid: string;
  review: string[];
  like: string[];
  profileImageUrl: string;
  qna: string[];
  ordered: string[];
  password: string;
  seen: string[];
  isAdmin: boolean;
};

export type UserData = Omit<User, "password">;
