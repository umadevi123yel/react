// export interface User {
//   id: number;
//   name: string;
//   email: string;
//   companyName: string;
// }
export interface User {
  _id?: string;
  name: string;
  email: string;
  age: number;
}
// export interface UserApi {
//   id: number;
//   name: string;
//   email: string;
//   company: {
//     name: string;
//   };
// }
export interface UserApi {
  _id: string;
  name: string;
  email: string;
  age: number;
}
