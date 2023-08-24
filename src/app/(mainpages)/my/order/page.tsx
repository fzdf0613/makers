import MyOrderItem from "@/components/my/order/MyOrderItem";

export default function MyOrderPage() {
  return (
    <div className="bg-[#ededed]">
      <div className="grid">
        <MyOrderItem />
        <MyOrderItem />
        <MyOrderItem />
      </div>
    </div>
  );
}
