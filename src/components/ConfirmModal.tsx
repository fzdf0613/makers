"use client";
import { MouseEvent, useState } from "react";
import Button from "./ui/Button";

type Props = {
  closeModal: () => void;
  handleConfirm?: () => void;
  type?: "cancel" | "alert";
  alertText?: string;
};

export default function ConfirmModal({
  closeModal,
  type = "cancel",
  handleConfirm,
  alertText,
}: Props) {
  const [openAnimation, setOpenAnimation] = useState(true);

  const handleClick = (e: MouseEvent) => {
    if (
      e.target === e.currentTarget ||
      (e.target as HTMLDivElement).id === "modal-dialog"
    ) {
      setOpenAnimation(false);
      setTimeout(() => {
        closeModal();
      }, 500);
    }
  };

  const handleCancelClick = (e: MouseEvent) => {
    setOpenAnimation(false);
    setTimeout(() => {
      closeModal();
    }, 500);
  };

  return (
    <div
      id="modal-bg"
      className={`text-center fixed top-0 left-0 w-full h-full bg-neutral-900/70 z-[100] ${
        openAnimation ? "animate-modalOpen" : "animate-modalClose"
      }`}
      onClick={handleClick}
    >
      <div
        id="modal-dialog"
        className="flex items-center justify-center h-full mx-4"
      >
        <div className="w-full max-w-[500px] rounded-md bg-white py-6 px-4 m-auto">
          <div className="text-center text-sm mb-4">
            {type === "cancel" && (
              <p>
                취소하시면 작성하신 내용이 사라집니다.
                <br />
                이전 페이지로 돌아가시겠습니까?
              </p>
            )}
            {type === "alert" && <p className="pre-wrap">{alertText}</p>}
          </div>
          <div className="flex justify-between gap-2">
            {type === "cancel" && (
              <Button
                className="rounded-md font-bold grow outline-none"
                onClick={handleCancelClick}
              >
                취소
              </Button>
            )}
            <Button
              className="rounded-md font-bold bg-black text-white grow outline-none"
              onClick={handleConfirm}
            >
              확인
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
