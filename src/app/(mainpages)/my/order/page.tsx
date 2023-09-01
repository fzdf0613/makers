"use client";
import MyOrderItem from "@/components/my/order/MyOrderItem";
import { useOrders } from "@/hooks/orders";

export default function MyOrderPage() {
  const { orders } = useOrders();
  return (
    <div className="bg-[#ededed]">
      <div className="grid">
        {orders &&
          orders.map((order) => (
            <MyOrderItem
              key={`${order.userId}_${order.orderedAt}`}
              order={order}
            />
          ))}
      </div>
    </div>
  );
}
