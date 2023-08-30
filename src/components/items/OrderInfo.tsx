import { Product } from "@/customType/product";
import { getRemaingTimeFormat } from "@/util/date";
import ProgressBar from "./ProgressBar";

type Props = {
  product: Product;
};

export default function OrderInfo({ product }: Props) {
  return (
    <>
      <section className="pt-[30px] px-4">
        <div className="flex justify-between">
          <span className="text-md font-bold">
            {product.orderUserCount}명 주문중
          </span>
          <span className="text-[13px] font-semibold">
            수량 {product.itemCount}
          </span>
        </div>
        {/* 프로그레스 바 */}
        <ProgressBar
          progress={getProgress(product.currentOrderCount, product.itemCount)}
        />
        <div className="flex justify-between text-[13px] text-neutral-400">
          <span className="">최소 수량 1</span>
          <span>누적주문 {product.currentOrderCount}</span>
        </div>
      </section>
      <section className="py-6 px-4  flex flex-col gap-4">
        <div className="text-[13px]">
          <p className="w-[78px] inline-block">주문 기간</p>
          <strong className="font-bold">
            주문 마감{" "}
            {getRemaingTimeFormat(product.orderStartDate, product.orderEndDate)}
          </strong>
        </div>
        <div className="text-[13px]">
          <p className="w-[78px] inline-block">배송비</p>
          <strong className="font-bold">배송비 3,000원</strong>
        </div>
      </section>
    </>
  );
}

function getProgress(current: number, total: number): number {
  return Math.round((current / total) * 100);
}
