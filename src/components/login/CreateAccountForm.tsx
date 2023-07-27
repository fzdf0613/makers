"use client";
import { ChangeEvent, FormEvent, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Button from "../ui/Button";
import AddImageIcon from "../ui/icons/AddImageIcon";

export default function CreateAccountForm() {
  const router = useRouter();
  const [alert, setAlert] = useState<string>();
  const [file, setFile] = useState<File>();
  const idRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const nameRef = useRef<HTMLInputElement>(null);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const files = e.target?.files;
    if (files && files[0]) {
      setFile(files[0]);
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    console.log("submit !");
    if (!idRef.current || !passwordRef.current || !nameRef.current) {
      console.log("if");
      return;
    }
    const id = idRef.current.value;
    const password = passwordRef.current.value;
    const name = nameRef.current.value;

    const formData = new FormData();
    file && formData.append("file", file);
    formData.append("userid", id);
    formData.append("password", password);
    formData.append("username", name);

    // 로딩 처리 필요
    fetch("/api/create_account", { method: "POST", body: formData }) //
      .then((res) => {
        if (!res.ok) {
          // 에러 메세지를 띄움
          return res.json().then((json) => {
            setAlert(json.error);
          });
        }
        router.push("/");
      })
      .catch((err) => window.alert(err.toString()));
  };
  return (
    <div className="md:w-[580px] md:border w-full md:justify-center border-neutral-200  flex flex-col py-[55px] mx-auto">
      <form
        className="md:w-[440px] w-full flex flex-col mx-auto gap-3"
        onSubmit={handleSubmit}
      >
        <input
          className="hidden"
          name="input"
          id="input-upload"
          type="file"
          accept="image/*"
          onChange={handleChange}
        />
        <label
          className={`w-[60px] h-[60px] mx-auto flex flex-col items-center justify-center ${
            !file && "border border-neutral-200"
          }`}
          htmlFor="input-upload"
        >
          {!file && (
            <div className="w-full flex flex-col cursor-pointer">
              <AddImageIcon customStyle="w-[30px] h-[30px] mx-auto" />
            </div>
          )}
          {file && (
            <div className="relative w-full aspect-square">
              <Image
                className="object-cover"
                src={URL.createObjectURL(file)}
                alt="local file"
                fill
                sizes="650px"
              />
            </div>
          )}
        </label>
        <input
          type="email"
          name="userid"
          placeholder="아이디 (이메일 형식으로 입력해주세요.)"
          title="올바른 이메일 형식이 아닙니다."
          ref={idRef}
          className="border-neutral-300 border-b pb-2 mb-5 outline-none focus:border-black"
          required
        />
        <input
          type="password"
          name="password"
          placeholder="비밀번호 (4글자 이상, 30자 미만)"
          title="4자 이상, 30자 이하로 입력해주세요."
          minLength={4}
          maxLength={30}
          ref={passwordRef}
          className="border-neutral-300 border-b pb-2 mb-5 outline-none focus:border-black"
          required
        />
        <input
          type="text"
          name="username"
          placeholder="이름 (12자 이하)"
          title="12자 이하로 입력해주세요."
          maxLength={12}
          ref={nameRef}
          className="border-neutral-300 border-b pb-2 mb-5 outline-none focus:border-black"
          required
        />
        {alert && (
          <span className="bg-[#fafafa] text-[#e65f3e] text-[13px] font-semibold w-full p-5">
            {alert}
          </span>
        )}
        <Button customStyle="bg-blue-200 h-[50px] border-0 text-md rounded hover:brightness-95 mt-[30px]">
          회원가입
        </Button>
      </form>
    </div>
  );
}