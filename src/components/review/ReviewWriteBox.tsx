"use client";
import useOrder from "@/hooks/order";
import ReviewForm from "./ReviewForm";
import ReviewItemInfo from "./ReviewItemInfo";

type Props = {
  userId: string;
  orderId: string;
};

export default function ReviewWriteBox({ userId, orderId }: Props) {
  const { order } = useOrder(orderId);
  return (
    <div>
      {order && (
        <>
          <ReviewItemInfo
            imageUrl={order.productImage}
            name={order.productName}
            price={order.productPrice}
          />
          <ReviewForm userId={userId} orderId={orderId} order={order} />
        </>
      )}
    </div>
  );
}
