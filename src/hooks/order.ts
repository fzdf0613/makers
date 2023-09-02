import { Order } from "@/customType/order";
import useSWR from "swr";

export default function useOrder(orderId: string) {
  const {
    data: order,
    isLoading,
    error,
  } = useSWR<Order>(`/api/order/${orderId}`);

  return { order, error, isLoading };
}
