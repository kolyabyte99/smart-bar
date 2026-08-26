export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
}

export interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  image: string;
  description: string;
  taste_notes: string[];
  origin: string;
  in_stock: boolean;
  bestseller: boolean;
  options: {
    weight: string[];
  };
  weight_prices: Record<string, number>;
}

export interface CartItem {
  productId: string;
  name: string;
  image: string;
  weight: string;
  price: number;
  quantity: number;
  category: string;       // для кроку карусельки: "coffee" | "tea"
}

export type DeliveryMethod = "nova-poshta" | "pickup";

export interface OrderForm {
  name: string;
  phone: string;
  email?: string;
  city?: string;          // для nova-poshta
  np_branch?: string;     // для nova-poshta
  pickup_location?: string; // для pickup (Градизьк)
  comment?: string;
  payment: "cod";
  delivery: DeliveryMethod;
}

export type OrderStatus = "new" | "shipped" | "delivered" | "cancelled";

export interface Order extends OrderForm {
  id: string;             // короткий ID: SB-20260824-A1B2C3
  items: CartItem[];
  total: number;
  created_at: string;
  status: OrderStatus;
}
