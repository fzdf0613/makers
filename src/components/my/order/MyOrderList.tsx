"use client";
import MyOrderItem from "@/components/my/order/MyOrderItem";
import { useOrders } from "@/hooks/orders";
import { MoonLoader } from "react-spinners";

export default function MyOrderList() {
  const { orders, isValidating } = useOrders();
  return (
    <div className={isValidating ? "bg-white" : "bg-[#ededed]"}>
      <div className="grid">
        {!isValidating &&
          orders?.map((order) => (
            <MyOrderItem
              key={`${order.userId}_${order.orderedAt}`}
              order={order}
            />
          ))}
        {!isValidating && orders?.length === 0 && (
          <div className="py-15 font-bold text-center text-base">
            좋아요 누른 제품이 없습니다
          </div>
        )}
        {isValidating && (
          <div className="h-[375px] flex justify-center items-center">
            <MoonLoader color="#9b9b9b" speedMultiplier={0.7} />
          </div>
        )}
      </div>
    </div>
  );
}
