export interface Person {
  id: string;
  name: string;
  phone: string;
  address: {
    street: string;
    city: string;
  };
}
