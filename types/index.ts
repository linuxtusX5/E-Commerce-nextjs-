import type {
  Product,
  Category,
  Order,
  User,
  //   Variant,
  //   Review,
} from "@prisma/client";

// ── Product ───────────────────────────────────────────────────────────────────

export type ProductWithCategory = Product & {
  category: Category;
  //   variants: Variant[];
  _count?: { reviews: number };
};

export type ProductWithReviews = Product & {
  category: Category;
  //   variants: Variant[];
  //   reviews: (Review & {
  //     user: { name: string | null; image: string | null };
  //   })[];
  _count: { reviews: number };
};

// ── Cart ──────────────────────────────────────────────────────────────────────

export type CartItem = {
  id: string;
  productId: string;
  variantId?: string;
  variantLabel?: string;
  quantity: number;
  product: ProductWithCategory;
};

// ── Order ─────────────────────────────────────────────────────────────────────

export type OrderWithItems = Order & {
  items: Array<{
    id: string;
    quantity: number;
    price: number;
    product: Product;
  }>;
};

// ── Filters ───────────────────────────────────────────────────────────────────

export type FilterParams = {
  category?: string;
  minPrice?: number;
  maxPrice?: number;
  sort?: "price-asc" | "price-desc" | "newest" | "popular";
  page?: number;
  limit?: number;
  search?: string;
  featured?: boolean;
};
