export interface Product {
  id: string;
  slug: string;
  name: string;
  shortName: string;
  category: "headphones" | "speakers" | "earphones";
  price: number;
  description: string;
  features: string;
  includes: { quantity: number; item: string }[];
  image: string;
  categoryImage: string;
  gallery: { mobile: string; tablet: string; desktop: string }[];
  new: boolean;
  others: { slug: string; name: string; image: string }[];
}

export interface CartItem {
  product: Product;
  quantity: number;
}
