export interface IEmployee {
  _id?: string;
  hotelId: string;
  name: string;
  email: string;
  password: string;
  telNo: string;
  sex: string;
  country: string;
  policies?: string[];
  firstResult?: number;
  maxResult?: number;
}
