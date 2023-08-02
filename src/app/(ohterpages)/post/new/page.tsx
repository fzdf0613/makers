"use client";
import CategoryInputs from "@/components/post/CategoryInputs";
import Divider from "@/components/post/Divider";
import HomeInfoInputs from "@/components/post/HomeInfoInputs";
import Input from "@/components/post/Input";
import Button from "@/components/ui/Button";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { FormEvent, useRef } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const Editor = dynamic(() => import("@/components/post/Editor"), {
  ssr: false,
});

// 잘못된 입력시 경고 문구 추가 해야함
const inputLists = [
  {
    name: "상품명",
    type: "text",
    key: "name",
    belongTo: "product",
    isRequired: true,
  },
  {
    name: "가격",
    type: "number",
    key: "price",
    belongTo: "product",
    isRequired: true,
  },
  {
    name: "수량",
    type: "number",
    key: "itemCount",
    belongTo: "product",
    isRequired: true,
  },
  {
    name: "주문 시작일",
    type: "date",
    key: "orderStartDate",
    belongTo: "product",
    isRequired: true,
  },
  {
    name: "주문 종료일",
    type: "date",
    key: "orderEndDate",
    belongTo: "product",
    isRequired: true,
  },
  {
    name: "옵션명(','로 구분)",
    type: "text",
    key: "itemOptions",
    belongTo: "post",
    isRequired: false,
  },
  {
    name: "옵션가격(','로 구분)",
    type: "text",
    key: "optionsPrices",
    belongTo: "post",
    isRequired: false,
  }, // state 저장시엔 분리 후 number값으로 바꿔야함
];

export default function PostUploadPage() {
  const router = useRouter();
  const homeInfoRef = useRef<(HTMLInputElement | HTMLTextAreaElement | null)[]>(
    []
  );
  const categoryInputRef = useRef<(null | HTMLSelectElement)[]>([]);
  const inputListsRef = useRef<(null | HTMLInputElement)[]>([]);
  const quillRef = useRef<ReactQuill>(null);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const file = (homeInfoRef.current[0] as HTMLInputElement).files![0];
    const homeTitle = homeInfoRef.current[1]?.value;
    const description = homeInfoRef.current[2]?.value;

    if (!file) {
      window.alert("상품 이미지를 등록해주세요.");
      return;
    }

    const id = Date.now().toString();
    const formData = new FormData();
    formData.append("file", file);
    let postData: any = { id, htmlText: quillRef.current?.getEditorContents() };
    let productData: any = {
      id,
      homeTitle,
      description,
      category: categoryInputRef.current[0]?.value,
      subcategory: categoryInputRef.current[1]?.value,
    };
    inputLists.map((item, i) => {
      if (item.belongTo === "product") {
        productData[item.key] = inputListsRef.current[i]?.value || null;
      } else {
        postData[item.key] = inputListsRef.current[i]?.value || null;
      }
    });
    formData.append("post", JSON.stringify(postData));
    formData.append("product", JSON.stringify(productData));
    fetch("/api/post", { method: "POST", body: formData })
      .then((res) => {
        if (res.ok) {
          router.push("/");
        } else {
          res.json().then((parsed) => window.alert(parsed.error));
        }
      })
      .catch((e) => {
        window.alert(e.error);
      });
  };

  return (
    <>
      <form className="border-neutral-200 my-2" onSubmit={handleSubmit}>
        <Divider text="홈화면 상품 설명" customStyle="mt-0" />
        <HomeInfoInputs ref={homeInfoRef} />
        <Divider text="상품 정보" />
        <CategoryInputs ref={categoryInputRef} />
        {inputLists.map((item, i) => (
          <Input
            key={item.name}
            name={item.name}
            type={item.type}
            isRequired={item.isRequired}
            ref={(el) => (inputListsRef.current[i] = el)}
          />
        ))}
        <Divider text="상품 상세설명" />
        <div className="w-full max-w-[640px] grow my-4">
          <Editor editorRef={quillRef} />
        </div>
        <Button customStyle="bg-blue-600 text-white font-semibold cursor-pointer mb-10 p-10 mx-auto hover:bg-blue-700">
          <span>등록</span>
        </Button>
      </form>
    </>
  );
}
