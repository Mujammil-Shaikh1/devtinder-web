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
  _id?: string;
  fullName: string;
  userName: string;
  age: number;
  phone?: number;
  gender: string;
  profilePic: string;
}

export interface Store {
  user: User;
  feed: Feed[];
}
