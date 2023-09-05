"use client";

import { useReviewWatingOrders } from "@/hooks/orders";
import { useUserReviews } from "@/hooks/reviews";
import MyReviewItem from "./MyReviewItem";
import MyReviewWaitingItem from "./MyReviewWaitingItem";
import Button from "@/components/ui/Button";
import RightArrowIcon from "@/components/ui/icons/RightArrowIcon";

type Props = {
  tab: string;
};

export default function MyReviewList({ tab }: Props) {
  const { orders } = useReviewWatingOrders();
  const { reviews } = useUserReviews();

  return (
    <div className="bg-[#ededed] pb-2.5 flex flex-col">
      {tab === "written" &&
        (reviews ? (
          reviews.map((review) => (
            <MyReviewItem key={review.id} review={review} />
          ))
        ) : (
          <div className="bg-[#f1f1f1] h-[326px] flex items-center justify-center">
            <div>
              <p className="text-[#9b9b9b] text-[13px]">
                아직 작성하신 후기가 없습니다.
              </p>
              <Button className="mt-7 text-sm text-white bg-[#1a1a1a] w-[180px] m-auto py-3">
                작성 하러가기
                <RightArrowIcon className="w-5 h-5" />
              </Button>
            </div>
          </div>
        ))}
      {tab === "waiting" &&
        (orders ? (
          orders.map((order) => (
            <MyReviewWaitingItem key={order.id} order={order} />
          ))
        ) : (
          <div className="bg-[#f1f1f1] h-[326px] flex items-center justify-center">
            <div>
              <p className="text-[#9b9b9b] text-[13px]">
                아직 주문하신 상품이 없습니다.
              </p>
            </div>
          </div>
        ))}
    </div>
  );
}
