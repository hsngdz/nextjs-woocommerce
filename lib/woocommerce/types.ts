export type Maybe<T> = T | null;

export type Connection<T> = {
  edges: Array<Edge<T>>;
};

export type Edge<T> = {
  node: T;
};

export type Cart = Omit<WooCommerceCart, 'lines'> & {
  lines: CartItem[];
};

export type CartItem = {
  id: string;
  quantity: number;
  cost: {
    totalAmount: Money;
  };
  merchandise: {
    id: string;
    title: string;
    selectedOptions: {
      name: string;
      value: string;
    }[];
    product: Product;
  };
};

export type Collection = WooCommerceCollection & {
  path: string;
};

export type Image = {
  url: string;
  altText: string;
  width: number;
  height: number;
};

export type Menu = {
  title: string;
  path: string;
};

export type Money = {
  amount: string;
  currencyCode: string;
};

export type Page = {
  id: string;
  title: string;
  handle: string;
  body: string;
  bodySummary: string;
  seo?: SEO;
  createdAt: string;
  updatedAt: string;
};

export type Product = Omit<WooCommerceProduct, 'variants' | 'images'> & {
  variants: ProductVariant[];
  images: Image[];
};

export type ProductOption = {
  id: string;
  name: string;
  values: string[];
};

export type ProductVariant = {
  id: string;
  title: string;
  availableForSale: boolean;
  selectedOptions: {
    name: string;
    value: string;
  }[];
  price: Money;
};

export type SEO = {
  title: string;
  description: string;
};

export type WooCommerceCart = {
  id: string;
  checkoutUrl: string;
  cost: {
    subtotalAmount: Money;
    totalAmount: Money;
    totalTaxAmount: Money;
  };
  lines: Connection<CartItem>;
  totalQuantity: number;
};

export type WooCommerceCollection = {
  handle: string;
  title: string;
  description: string;
  seo: SEO;
  updatedAt: string;
};

export type WooCommerceProduct = {
  id: string;
  handle: string;
  availableForSale: boolean;
  title: string;
  description: string;
  descriptionHtml: string;
  options: ProductOption[];
  priceRange: {
    maxVariantPrice: Money;
    minVariantPrice: Money;
  };
  variants: Connection<ProductVariant>;
  featuredImage: Image;
  images: Connection<Image>;
  seo: SEO;
  tags: string[];
  updatedAt: string;
};

export type WooCommerceCartOperation = {
  data: {
    cart: WooCommerceCart;
  };
  variables: {
    cartId: string;
  };
};

export type WooCommerceCreateCartOperation = {
  data: { cartCreate: { cart: WooCommerceCart } };
};

export type WooCommerceAddToCartOperation = {
  data: {
    cartLinesAdd: {
      cart: WooCommerceCart;
    };
  };
  variables: {
    cartId: string;
    lines: {
      merchandiseId: string;
      quantity: number;
    }[];
  };
};

export type WooCommerceRemoveFromCartOperation = {
  data: {
    cartLinesRemove: {
      cart: WooCommerceCart;
    };
  };
  variables: {
    cartId: string;
    lineIds: string[];
  };
};

export type WooCommerceUpdateCartOperation = {
  data: {
    cartLinesUpdate: {
      cart: WooCommerceCart;
    };
  };
  variables: {
    cartId: string;
    lines: {
      id: string;
      merchandiseId: string;
      quantity: number;
    }[];
  };
};

export type WooCommerceCollectionOperation = {
  data: {
    collection: WooCommerceCollection;
  };
  variables: {
    handle: string;
  };
};

export type WooCommerceCollectionProductsOperation = {
  data: {
    products: Connection<WooCommerceProduct>;
  };
  variables: {
    where: {
      tag: string;
    };
    reverse?: boolean;
    sortKey?: string;
  };
};

export type WooCommerceCollectionsOperation = {
  data: {
    collections: Connection<WooCommerceCollection>;
  };
};

export type WooCommerceMenuOperation = {
  data: {
    menu?: {
      items: {
        title: string;
        url: string;
      }[];
    };
  };
  variables: {
    id: string;
  };
};

export type WooCommercePageOperation = {
  data: { pageByHandle: Page };
  variables: { handle: string };
};

export type WooCommercePagesOperation = {
  data: {
    pages: Connection<Page>;
  };
};

export type WooCommerceProductOperation = {
  data: { product: WooCommerceProduct };
  variables: {
    handle: string;
  };
};

export type WooCommerceProductRecommendationsOperation = {
  data: {
    productRecommendations: WooCommerceProduct[];
  };
  variables: {
    productId: string;
  };
};

export type WooCommerceProductsOperation = {
  data: {
    products: Connection<WooCommerceProduct>;
  };
  variables: {
    query?: string;
    reverse?: boolean;
    sortKey?: string;
  };
};
