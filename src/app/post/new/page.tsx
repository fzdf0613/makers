"use client";
import dynamic from "next/dynamic";
import "react-quill/dist/quill.snow.css";

const Editor = dynamic(() => import("@/components/post/Editor"), {
  ssr: false,
});

export default function PostUploadPage() {
  return (
    <>
      <h1 className="text-2xl font-bold">상품 등록 페이지</h1>
      <div className="w-full max-w-[640px] grow">
        <Editor />
      </div>
    </>
  );
}
