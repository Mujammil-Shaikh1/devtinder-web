export interface User {
  address: {
    street: string;
    city: string;
    zipCode: number;
  };
  _id: string;
  fullName: string;
  userName: string;
  email: string;
  phone: number;
  age: number;
  gender: string;
  profilePic: string;
}

export interface Feed {
  _id: string;
  fullName: string;
  userName: string;
  age: number;
  phone?: number;
  gender: string;
  profilePic: string;
}

export interface Connection {
  _id?: string;
  fullName: string;
  userName: string;
  age: number;
  gender: string;
  profilePic: string;
}

export type fromRequstUser = Omit<User, "address" | "email">;

export interface RequestType {
  _id: string;
  fromUserId: fromRequstUser;
  toUserId: string;
  status: string;
}
export interface Store {
  user: User;
  feed: Feed[];
  connection: Connection[];
  request: RequestType[];
}

export type UserSummary = Pick<User, "fullName" | "userName" | "profilePic">;
export interface chatMessage {
  timeStamp: number;
  toUserId: string;
  user: UserSummary;
  userId: string;
  message: string;
}
