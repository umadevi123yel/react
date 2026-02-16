export interface User {
  id: number;
  name: string;
  email: string;
  companyName: string;
}
export interface UserApi {
  id: number;
  name: string;
  email: string;
  company: {
    name: string;
  };
}
