"use client";
import { useRef, useState } from "react";
import Button from "../ui/Button";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";

const beforeStyle =
  'before:h-[1px] before:content-[""] before:w-full before:bg-neutral-200 before:grow before:inline-block before:my-2';
const afterStyle =
  'after:h-[1px] after:content-[""] after:w-full after:bg-neutral-200 after:grow after:inline-block after:my-2';

type Props = {
  callbackUrl: string;
};

export default function LogInForm({ callbackUrl }: Props) {
  const router = useRouter();
  const idRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const [alert, setAlert] = useState<string>();

  const handleLogin = () => {
    if (!idRef.current || !passwordRef.current) {
      console.log("hi");
      return;
    }
    const id = idRef.current.value;
    const password = passwordRef.current.value;

    signIn("credentials", {
      callbackUrl,
      userid: id,
      password,
      redirect: false,
    }).then((res) => {
      if (res!.error) {
        setAlert(
          "계정 혹은 비밀번호가 일치하지 않습니다. 입력한 내용을 다시 확인해 주세요."
        );
      } else {
        router.push(callbackUrl);
      }
    });
  };
  return (
    <div className="md:w-[580px] md:border w-full md:justify-center border-neutral-200  flex flex-col py-[55px] mx-auto">
      <div className="md:w-[440px] w-full flex flex-col mx-auto">
        <input
          type="email"
          name="userId"
          ref={idRef}
          className="border-neutral-300 border-b pb-2 mb-5 outline-none focus:border-black"
          placeholder="아이디 (이메일 형식으로 입력해주세요.)"
          required
        />
        <input
          type="password"
          name="password"
          ref={passwordRef}
          className="border-neutral-300 border-b pb-2 outline-none focus:border-black"
          placeholder="비밀번호"
          required
        />
        {alert && (
          <span className="bg-[#fafafa] text-[#e65f3e] text-[13px] font-semibold w-full p-5">
            {alert}
          </span>
        )}
        <Button
          className="bg-[#fee500] h-[50px] border-0 text-md rounded mt-[50px] hover:brightness-95"
          onClick={handleLogin}
        >
          로그인
        </Button>
        <span
          className={`${beforeStyle} ${afterStyle} text-xs flex w-full my-2`}
        >
          <span className="mx-2 whitespace-nowrap">또는</span>
        </span>
        <Button className="bg-[#f0f0f0] h-[50px] border-0 text-md rounded hover:brightness-95 w-full">
          <Link href="/login/create_account">회원가입</Link>
        </Button>
      </div>
    </div>
  );
}
