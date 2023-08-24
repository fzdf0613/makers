import MyLikeItem from "@/components/my/like/MyLikeItem";

export default function MyLikePage() {
  return (
    <div className="grid grid-cols-2 p-4 gap-2">
      <MyLikeItem />
      <MyLikeItem />
      <MyLikeItem />
    </div>
  );
}
