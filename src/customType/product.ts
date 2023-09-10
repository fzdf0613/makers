export type Product = {
  id: string;
  imageUrl: string;
  name: string;
  price: number;
  category: string;
  subcategory: string;
  orderStartTime: string;
  orderEndTime: string;
  homeTitle: string;
  description: string;
  currentOrderCount: number;
  likeCount: number;
  itemCount: number;
  orderUserCount: number;
};

export type SearchedProduct = {
  id: string;
  imageUrl: string;
  name: string;
  price: number;
  orderStartTime: string;
  orderEndTime: string;
  currentOrderCount: number;
  itemCount: number;
  orderUserCount: number;
};
