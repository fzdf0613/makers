"use client";
import { useState, useRef } from "react";
import Image from "next/image";
import { ChangeEvent } from "react";
import ImageIcon from "../ui/icons/ImageIcon";
import CloseIcon from "../ui/icons/CloseIcon";
import { Order } from "@/customType/order";
import { useRouter, useSearchParams } from "next/navigation";

type Props = {
  userId: string;
  orderId: string;
  order: Order;
};

export default function ReviewForm({ userId, orderId, order }: Props) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [file, setFile] = useState<File>();
  const [text, setText] = useState("");
  const textInputRef = useRef<HTMLTextAreaElement>(null);
  const [isFocused, setIsFocused] = useState(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const files = e.target?.files;
    if (!files) {
      return;
    }
    const fileType = files[0].type;
    if (!fileType.includes("image")) {
      window.alert("이미지 파일이 아닙니다.");
      setFile(undefined);
      return;
    }

    setFile(files[0]);
  };

  const handleSubmit = () => {
    if (text.trim().length === 0) {
      return;
    }
    const formData = new FormData();
    if (file) {
      formData.append("file", file);
    }
    const review = {
      createdAt: Date.now(),
      userId,
      text,
      productId: order.productId,
      productImage: order.productImage,
      productName: order.productName,
    };
    formData.append("orderId", orderId);
    formData.append("review", JSON.stringify(review));
    fetch("/api/review", { method: "POST", body: formData })
      .then((res) => {
        if (res.ok) {
          router.replace(
            decodeURIComponent(searchParams.get("returnUrl") || "/")
          );
        } else {
          window.alert(
            "구매후기 등록 중 오류가 발생하였습니다. 잠시 후에 다시 시도해주세요."
          );
        }
      })
      .catch((e) => {
        window.alert(e.error);
      });
  };

  return (
    <div className="p-4 pt-5 flex flex-col">
      <div className="flex justify-between mb-[9px]">
        <strong className="text-sm">구매후기</strong>
        <div className="text-[11px]">
          <span className="font-bold">{`${text.length} `} </span>
          <span className="text-[#9b9b9b]">/1000</span>
        </div>
      </div>
      <div className="relative">
        <textarea
          ref={textInputRef}
          value={text}
          onChange={() => setText(textInputRef.current?.value || "")}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          name="review"
          id="review"
          maxLength={1000}
          className="text-sm outline-none h-[130px] resize-none overflow-y-scroll w-full p-2.5 border border-[#e1e1e1]"
        />
        {!isFocused && text.length === 0 && (
          <div
            className="flex flex-col absolute top-[13px] left-[13px] w-[calc(100% - 30px)]"
            onClick={() => {
              textInputRef.current?.focus();
            }}
          >
            <span className="text-[13px]">이토록 소중한 한 문장</span>
            <span className="mt-[5px] text-[11px] text-[#9b9b9b]">
              당신이 정성스레 남겨주신 구매후기, 모두 읽고 있습니다. 최대한
              반영해 더 좋은 제품으로 보답할게요.
            </span>
          </div>
        )}
      </div>
      <input
        className="hidden"
        name="input"
        id="input-upload"
        type="file"
        accept="image/*"
        onChange={handleChange}
      />
      <label
        className={`my-4 w-full h-12 flex flex-col items-center justify-center border border-[#c1c1c1]
        `}
        htmlFor="input-upload"
      >
        <div className="flex items-center pointer-events-none font-bold">
          <ImageIcon className="w-6 h-6" />
          <p className="text-sm ml-1">사진 첨부</p>
        </div>
      </label>
      {file && (
        <div className="relative w-[74px] h-[74px] aspect-square border border-[#e1e1e1] mt-4.5">
          <Image
            className="object-cover"
            src={URL.createObjectURL(file)}
            alt="local file"
            fill
            sizes="74px"
          />
          <button className="h-5 w-5 absolute top-0 right-0 bg-[#0000008a]">
            <CloseIcon className="text-white" />
          </button>
        </div>
      )}
      <button
        disabled={text.trim().length === 0}
        onClick={handleSubmit}
        className={`fixed bottom-0 h-14 w-full max-w-[640px] text-white text-[15px] font-semibold ${
          text.trim().length === 0 ? "bg-[#c1c1c1]" : "bg-[#da635d]"
        }`}
      >
        등록하기
      </button>
    </div>
  );
}
