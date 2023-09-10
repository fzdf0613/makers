export type SessionUser = {
  id: string;
  userid: string;
  username: string;
  image: string;
  isAdmin: boolean;
};

export type User = {
  username: string;
  userid: string;
  review: string[];
  like: string[];
  profileImageUrl: string;
  inquiry: string[];
  ordered: string[];
  password: string;
  seen: string[];
  search: string[];
  isAdmin: boolean;
};

export type UserData = Omit<User, "password">;
