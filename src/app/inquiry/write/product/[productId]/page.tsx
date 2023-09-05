"use client";
import { useState, useRef, useEffect } from "react";
import Button from "@/components/ui/Button";
import Image from "next/image";
import Portal from "@/components/ui/Portal";
import ConfirmModal from "@/components/ConfirmModal";
import { useRouter } from "next/navigation";
import { useProduct } from "@/hooks/product";

export default function InquriyWritePage({
  params,
  searchParams,
}: {
  params: { productId: string };
  searchParams: { returnUrl: string };
}) {
  const router = useRouter();
  const { product } = useProduct(params.productId);
  const [text, setText] = useState("");
  const [alertMessage, setAlertMessage] = useState<string>();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const textInputRef = useRef<HTMLTextAreaElement>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const handleCancelClick = () => {
    setModalOpen(true);
  };

  useEffect(() => {
    if (alertMessage) {
      setModalOpen(true);
    }
  }, [alertMessage]);

  const handleSubmit = () => {
    if (text.trim().length === 0) {
      return;
    }
    const formData = new FormData();
    const inquiry = {
      createdAt: Date.now(),
      text,
      productId: product?.id,
      productImage: product?.imageUrl,
      productName: product?.name,
    };
    formData.append("inquiry", JSON.stringify(inquiry));
    fetch("/api/inquiry", { method: "POST", body: formData })
      .then((res) => {
        if (res.ok) {
          setAlertMessage("문의 접수가 완료되었습니다.");
          setIsSubmitted(true);
        } else {
          setAlertMessage(
            "문의 등록 중 오류가 발생하였습니다. 잠시 후에 다시 시도해주세요."
          );
        }
      })
      .catch((e) => {
        setAlertMessage(
          "문의 등록 중 오류가 발생하였습니다. 잠시 후에 다시 시도해주세요."
        );
      });
  };

  return (
    <div className="w-full max-w-[640px]">
      <header className=" h-[55px] max-w-[640px] bg-[#db635d] flex justify-between text-white items-center px-4">
        <Button
          className="font-bold border-none bg-[#d2453e] text-[#e09a9a]"
          onClick={handleCancelClick}
        >
          취소
        </Button>
        제품 문의
        <Button
          className={`font-bold border-none bg-[#d2453e] ${
            text.length === 0 && "text-[#e09a9a]"
          }`}
          onClick={handleSubmit}
          disabled={text.length === 0}
        >
          확인
        </Button>
      </header>
      <main>
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
              onChange={() => {
                setText(textInputRef.current?.value || "");
              }}
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
              작성하신 문의 글에 제작사로부터 답변이 등록되면 카카오메이커스
              채널로 안내 드리겠습니다.
            </li>
            <li>
              비방, 광고 등 제품과 관련 없는 문의는 강제 삭제 될 수 있음을
              알려드립니다.
            </li>
          </ul>
        </section>
        {modalOpen && (
          <Portal>
            <ConfirmModal
              closeModal={() => setModalOpen(false)}
              handleConfirm={
                alertMessage
                  ? () => {
                      isSubmitted
                        ? searchParams.returnUrl
                          ? router.replace(searchParams.returnUrl)
                          : router.back()
                        : setModalOpen(false);
                    }
                  : () => {
                      router.back();
                    }
              }
              alertText={alertMessage}
              type={alertMessage ? "alert" : "cancel"}
            />
          </Portal>
        )}
      </main>
    </div>
  );
}
