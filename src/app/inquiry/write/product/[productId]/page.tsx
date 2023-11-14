"use client";
import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useProduct } from "@/hooks/product";
import InquiryWriteHeader from "@/components/inquiry/InquiryWriteHeader";
import InquiryWriteForm from "@/components/inquiry/InquiryWriteForm";
import InquiryWriteModal from "@/components/inquiry/InquiryWriteModal";

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
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [alertMessage, setAlertMessage] = useState<string>();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const textInputRef = useRef<HTMLTextAreaElement>(null);
  const [modalOpen, setModalOpen] = useState(false);

  const handleCancelClick = () => {
    setModalOpen(true);
  };

  const handleChange = () => {
    setText(textInputRef.current?.value || "");
  };

  const handleConfirm = alertMessage
    ? () => {
        isSubmitted
          ? searchParams.returnUrl
            ? router.replace(searchParams.returnUrl)
            : router.back()
          : setModalOpen(false);
      }
    : () => {
        router.back();
      };

  const closeModal = () => setModalOpen(false);

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
    setIsSubmitting(true);
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
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  };

  return (
    <div className="w-full max-w-[640px]">
      <InquiryWriteHeader
        handleCancelClick={handleCancelClick}
        handleSubmit={handleSubmit}
        isSubmitting={isSubmitting}
        text={text}
      />
      <main>
        {product && (
          <InquiryWriteForm
            textInputRef={textInputRef}
            handleChange={handleChange}
            product={product}
            text={text}
          />
        )}
        {modalOpen && (
          <InquiryWriteModal
            closeModal={closeModal}
            handleConfirm={handleConfirm}
            alertMessage={alertMessage}
          />
        )}
      </main>
    </div>
  );
}
