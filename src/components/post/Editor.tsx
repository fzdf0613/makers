import React, { Ref, useCallback, useMemo } from "react";
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

type Props = {
  editorRef: Ref<ReactQuill>;
};

export default function Editor({ editorRef: quillRef }: Props) {
  // 커스텀 툴바에 추가한 타이틀바 핸들러 (타이틀바 이미지를 추가함)
  const handleInsertTitleBars = useCallback(
    (value: string) => {
      if (!quillRef || typeof quillRef === "function" || !quillRef.current) {
        return;
      }

      const quill = quillRef.current.getEditor();
      const currentSelection = quill.getSelection();
      const cursorPosition = currentSelection?.index;
      const titleBar = titleBars.find((item) => item.value === value);
      if (!titleBar) {
        throw new Error(
          `타이틀바 설정이 잘못되었습니다. (지원하지 않는 타이틀 바 value)`
        );
      }
      quill.insertEmbed(cursorPosition || 0, "image", {
        src: titleBar.imgUrl,
        alt: titleBar.name,
        id: titleBar.value,
        class: "anchor",
      });

      if (cursorPosition) {
        quill.setSelection({ index: cursorPosition + 1, length: 0 });
      } else {
        quill.setSelection({ index: 1, length: 0 });
      }
    },
    [quillRef]
  );

  const imageHandler = useCallback(() => {
    if (!quillRef || typeof quillRef === "function" || !quillRef.current) {
      return;
    }

    const quill = quillRef.current.getEditor();
    const currentSelection = quill.getSelection();
    const cursorPosition = currentSelection?.index;

    const input = document.createElement("input");
    input.setAttribute("type", "file");
    input.setAttribute("accept", "image/*");
    input.setAttribute("name", "image");
    input.click();

    input.onchange = async () => {
      if (!input.files) {
        return;
      }
      const file = input.files[0];

      const formData = new FormData();
      formData.append("file", file);
      try {
        const url = await fetch("/api/image/post", {
          method: "POST",
          body: formData,
        }).then((res) => res.json());

        quill.insertEmbed(cursorPosition || 0, "image", {
          src: url,
          alt: "content-image",
        });

        if (cursorPosition) {
          quill.setSelection({ index: cursorPosition + 1, length: 0 });
        } else {
          quill.setSelection({ index: 1, length: 0 });
        }
      } catch (e) {
        window.alert("이미지 업로드에 실패하였습니다.");
      }
    };
  }, [quillRef]);

  const modules = useMemo(
    () => ({
      toolbar: {
        container: "#toolbar",
        handlers: {
          insertTitleBars: handleInsertTitleBars,
          image: imageHandler,
        },
      },
      history: {
        delay: 500,
        maxStack: 100,
        userOnly: true,
      },
    }),
    [handleInsertTitleBars, imageHandler]
  );

  return (
    <div className="w-full min-h-[400px] m-auto">
      <EditorToolbar />
      <ReactQuill
        ref={quillRef}
        theme="snow"
        modules={modules}
        formats={formats}
        style={{ height: "600px" }}
      />
    </div>
  );
}
