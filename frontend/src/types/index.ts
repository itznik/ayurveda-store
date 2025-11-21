export interface User {
  _id: string;
  name: string;
  email: string;
  // Updated to match Backend Schema options
  role: "user" | "admin" | "super_admin"; 
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
