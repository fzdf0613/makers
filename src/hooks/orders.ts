import { Order } from "@/customType/order";
import useSWR from "swr";

export function useOrders() {
  const { data: orders, isLoading, error } = useSWR<Order[]>("/api/orders");

  return { orders, error, isLoading };
}
