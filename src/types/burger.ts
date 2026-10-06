export interface BurgerItem {
  id: string;
  name: string;
  tagline?: string;
  description: string;
  price: number;
  ingredients: string[];
  image?: string;
  isPopular?: boolean;
  isSpicy?: boolean;
  badge?: string;
  pattiesCount: number;
  cheeseSlices: number;
}

export interface CartItem {
  burger: BurgerItem;
  quantity: number;
  notes?: string;
}
