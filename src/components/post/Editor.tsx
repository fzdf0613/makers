import React, { useMemo, useRef, useState } from "react";
import ReactQuill from "react-quill";
import { Quill } from "react-quill";
import EditorToolbar from "./EditorToolBar/EditorToolBar";
import "react-quill/dist/quill.snow.css";
import { titleBars } from "@/constants/titleBar";
import { getCustomImageBlot } from "@/lib/quill/getCustomImageBlot";

// Add sizes to whitelist and register them
const Size = Quill.import("attributors/style/size");
const customImageBlot = getCustomImageBlot(ReactQuill);
Size.whitelist = ["13px", "15px", "20px", "25px"];
Quill.register(Size, true);
Quill.register(customImageBlot);

const formats = [
  //   //   "font",
  "size",
  "bold",
  "italic",
  "underline",
  "align",
  "strike",
  //   "script",
  //   "blockquote",
  "list",
  //   "bullet",
  "indent",
  //   "link",
  "image",
  "color",
];

export const Editor = () => {
  const [value, setValue] = useState("");
  const quillRef = useRef<ReactQuill>(null);

  // 커스텀 툴바에 추가한 타이틀바 핸들러 (타이틀바 이미지를 추가함)
  const handleInsertTitleBars = (value: string) => {
    if (!quillRef || !quillRef.current) {
      return;
    }

    const quill = quillRef.current.getEditor();
    const cursorPosition = quill.getSelection()!.index;
    const titleBar = titleBars.find((item) => item.value === value);
    if (!titleBar) {
      throw new Error(
        `타이틀바 설정이 잘못되었습니다. (지원하지 않는 타이틀 바 value)`
      );
    }
    quill.insertEmbed(cursorPosition, "image", {
      src: titleBar.imgUrl,
      alt: titleBar.name,
    });
  };

  const modules = useMemo(
    () => ({
      toolbar: {
        container: "#toolbar",
        handlers: {
          insertTitleBars: handleInsertTitleBars,
        },
      },
      history: {
        delay: 500,
        maxStack: 100,
        userOnly: true,
      },
    }),
    []
  );

  return (
    <div className="w-full min-h-[400px] m-auto">
      <EditorToolbar />
      <ReactQuill
        ref={quillRef}
        theme="snow"
        value={value}
        onChange={(v) => setValue(v)}
        modules={modules}
        formats={formats}
        style={{ height: "600px" }}
      />
    </div>
  );
};

export default Editor;
