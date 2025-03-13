export interface User {
  id?: number;
  username: string;
  email: string;
  phone_number: string;
  password: string;
  role: 'USER' | 'ADMIN' | 'OFFICER';
}
