export type SessionUser = {
  id: string;
  username: string;
  image: string;
  isAdmin: boolean;
};

export type User = {
  username: string;
  userid: string;
  reivew: string[];
  like: string[];
  profileImageUrl: string;
  qna: string[];
  ordered: string[];
  password: string;
  seen: string[];
  isAdmin: boolean;
};
