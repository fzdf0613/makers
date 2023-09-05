"use client";

import { MouseEvent, useState } from "react";
import Button from "./ui/Button";
import Image from "next/image";
import SettingIcon from "./ui/icons/SettingIcon";
import { SessionUser } from "@/customType/user";
import { signIn, signOut } from "next-auth/react";

type Props = {
  closeModal: () => void;
  user?: SessionUser;
};

const sideModalMenus = [
  ["주문•배송 내역", "후기 내역", "1:1 문의 내역", "제품문의 내역", "쿠폰함"],
  ["공지사항", "도움말 / 문의"],
  ["메이커스 소개", "브랜드 스토리", "브랜드 전체보기", "입점 제안하기"],
];

export default function SideModal({ closeModal, user }: Props) {
  const [openAnimation, setOpenAnimation] = useState(true);
  const handleClick = (e: MouseEvent) => {
    if (e.target === e.currentTarget) {
      setOpenAnimation(false);
      setTimeout(() => {
        closeModal();
      }, 500);
    }
  };

  return (
    <div
      id="modal-bg"
      className={`fixed top-0 left-0 w-full h-full bg-neutral-900/70 z-[100] ${
        openAnimation ? "animate-modalOpen" : "animate-modalClose"
      }`}
      onClick={handleClick}
    >
      <div
        id="modal-slider"
        className={`h-full w-4/5 max-w-[400px] bg-white ${
          openAnimation ? "animate-slideIn" : "animate-slideOut"
        } `}
      >
        <div className="flex p-[20px] pr-0 relative">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <Image
            className="rounded-lg"
            src={user ? user.image : "/images/defaultAvatar.png"}
            alt="avatar"
            width={60}
            height={60}
          />
          <div className="absolute right-4 top-4">
            <SettingIcon />
          </div>
          <div className="pl-4 flex flex-col justify-center">
            {user && (
              <>
                <span className="pb-3">{user?.username}</span>
                <span className="text-[13px] text-neutral-400">포인트: 0</span>
              </>
            )}
            {!user && <button onClick={() => signIn()}>로그인해주세요.</button>}
          </div>
        </div>
        <ul className="pl-[20px]">
          {sideModalMenus.map((item, i) => (
            <li key={i} className="pt-[20px] border-t border-neutral-200">
              <ul className="flex flex-col">
                {item.map((menu) => (
                  <li key={menu} className="pb-[20px] text-sm">
                    {menu}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
        <div className="px-[20px]">
          <Button className="w-full bg-black text-white justify-center h-[45px] mb-2">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="https://t1.daumcdn.net/makers/static/web/shared/makers_app_download.png"
              alt="favicon"
              width={18}
              height={19}
              className="mx-3"
            />
            <span>메이커스 앱 다운로드</span>
          </Button>
          {user && (
            <Button
              className="w-full bg-white justify-center h-[45px] !border-black"
              onClick={() => {
                signOut();
              }}
            >
              로그아웃
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
