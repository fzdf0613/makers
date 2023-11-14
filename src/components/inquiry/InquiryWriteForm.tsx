import { Product } from "@/customType/product";
import { ForwardedRef } from "react";
import Image from "next/image";

type Props = {
  textInputRef: ForwardedRef<HTMLTextAreaElement>;
  handleChange: () => void;
  product: Product;
  text: string;
};

export default function InquiryWriteForm({
  textInputRef,
  handleChange,
  product,
  text,
}: Props) {
  return (
    <section className="px-3.5 mb-[30px]">
      {product && (
        <div className="flex my-3">
          <div className="w-14 h-14 relative">
            <Image src={product.imageUrl} alt="product-thumbnail" fill />
          </div>
          <p className="text-xs ml-2">{product.name}</p>
        </div>
      )}
      <p className="font-bold text-[15px] my-3">문의내용</p>
      <div className="p-3 border border-[#f1f1f1] relative">
        <textarea
          ref={textInputRef}
          className="resize-none w-full mb-[25px] outline-none focus:outline-blue-200 focus:outline-4 ease-in duration-200"
          placeholder="문의 내용을 상세하게 입력해주세요."
          rows={5}
          max-rows={5}
          maxLength={1000}
          value={text}
          onChange={handleChange}
        ></textarea>
        <span className="text-[#bdbdbd] text-[13px] absolute bottom-[10px] right-[10px]">
          {text.length} / 최대 1,000자
        </span>
      </div>
      <ul className="text-xs mt-4 list-disc flex flex-col gap-3 mx-3.5">
        <li className="">
          결제/배송/주문취소/교환/환불 등의 관련 문의는 1:1문의하기에서 작성
          가능합니다.
        </li>
        <li>
          작성하신 문의 글에 제작사로부터 답변이 등록되면 카카오메이커스 채널로
          안내 드리겠습니다.
        </li>
        <li>
          비방, 광고 등 제품과 관련 없는 문의는 강제 삭제 될 수 있음을
          알려드립니다.
        </li>
      </ul>
    </section>
  );
}
