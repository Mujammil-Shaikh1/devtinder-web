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

export interface Store {
  user: User;
}
