export interface User {
  _id: string;
  name: string;
  email: string;
  role: "user" | "admin";
  token: string;
}

export interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  countInStock: number;
  rating: number;
  numReviews: number;
}

export interface CartItem extends Product {
  qty: number;
}
