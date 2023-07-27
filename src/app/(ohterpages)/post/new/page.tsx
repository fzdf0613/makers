"use client";
import CategoryInputs from "@/components/post/CategoryInputs";
import Divider from "@/components/post/Divider";
import HomeInfoInputs from "@/components/post/HomeInfoInputs";
import Input from "@/components/post/Input";
import Button from "@/components/ui/Button";
import dynamic from "next/dynamic";
import "react-quill/dist/quill.snow.css";

const Editor = dynamic(() => import("@/components/post/Editor"), {
  ssr: false,
});

// 잘못된 입력시 경고 문구 추가 해야함
const inputLists = [
  { name: "상품명", type: "text" },
  { name: "가격", type: "number" },
  { name: "수량", type: "number" },
  { name: "주문 시작일", type: "date" },
  { name: "주문 종료일", type: "date" },
  { name: "옵션명", type: "text" },
  { name: "옵션값(','로 구분)", type: "text" },
  { name: "옵션가격(','로 구분)", type: "text" }, // state 저장시엔 분리 후 number값으로 바꿔야함
];
export default function PostUploadPage() {
  return (
    <>
      <div className="border-neutral-200 my-2">
        <Divider text="홈화면 상품 설명" customStyle="mt-0" />
        <HomeInfoInputs />
        <Divider text="상품 정보" />
        <CategoryInputs />
        {inputLists.map((item) => (
          <Input key={item.name} name={item.name} type={item.type} />
        ))}
        <Divider text="상품 상세설명" />
        <div className="w-full max-w-[640px] grow my-4">
          <Editor />
        </div>
        <Button customStyle="bg-blue-600 text-white font-semibold cursor-pointer mb-10 p-10 mx-auto hover:bg-blue-700">
          <span>등록</span>
        </Button>
      </div>
    </>
  );
}
