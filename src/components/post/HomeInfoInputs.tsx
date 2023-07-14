"use client";
import { useState } from "react";
import { ChangeEvent, DragEvent, FormEvent, useRef } from "react";
import Image from "next/image";
import AddImageIcon from "../ui/icons/AddImageIcon";

export default function HomeInfoInputs() {
  const [dragging, setDragging] = useState(false);
  const [file, setFile] = useState<File>();
  const [error, setError] = useState<string>();
  const [loading, setLoading] = useState(false);
  const textRef = useRef<HTMLTextAreaElement>(null);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const files = e.target?.files;
    if (files && files[0]) {
      setFile(files[0]);
    }
  };
  const handleDrag = (e: DragEvent) => {
    if (e.type === "dragenter") {
      setDragging(true);
    } else if (e.type === "dragleave") {
      setDragging(false);
    }
  };
  const handleDragOver = (e: DragEvent) => {
    e.preventDefault();
  };
  const handleDrop = (e: DragEvent) => {
    e.preventDefault();
    setDragging(false);
    const files = e.dataTransfer?.files;
    if (files && files[0]) {
      setFile(files[0]);
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!file) return;
    const formData = new FormData();
    formData.append("file", file);
    formData.append("text", textRef.current?.value ?? "");
  };

  return (
    <section className="w-full max-w-xl flex flex-col items-center mt-6 mx-auto mb-10">
      {loading && (
        <div className="absolute inset-0 z-20 text-center pt-[30%] bg-sky-500/20">
          Loading...
        </div>
      )}
      {error && (
        <p className="w-full bg-red-100 text-red-600 text-center p-4 mb-4 font-bold">
          {error}
        </p>
      )}
      <form className="w-full flex flex-col mt-2" onSubmit={handleSubmit}>
        <input
          className="hidden"
          name="input"
          id="input-upload"
          type="file"
          accept="image/*"
          onChange={handleChange}
        />
        <label
          className={`w-full h-72 flex flex-col items-center justify-center ${
            !file && "border-2 border-gray-300 border-double"
          }`}
          htmlFor="input-upload"
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
        >
          {dragging && (
            <div className="absolute inset-0 z-10 bg-sky-500/20 pointer-events-none" />
          )}
          {!file && (
            <div className="flex flex-col items-center pointer-events-none">
              <AddImageIcon />
              <p className="text-gray-400 mt-1">
                이미지를 드래그 하거나 클릭하여 추가해주세요
              </p>
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
        <textarea
          className="outline-none text-lg border border-neutral-300 resize-none p-1 mt-1"
          name="text"
          id="input-text"
          required
          rows={10}
          placeholder={"  홈 화면에 보일 상품 설명을 적어주세요"}
          ref={textRef}
        />
      </form>
    </section>
  );
}
