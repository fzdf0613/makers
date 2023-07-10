import ReactQuill from "react-quill";

type CustomImageBlotProps = {
  alt: string;
  src: string;
  dataSrc?: string;
};

export function getCustomImageBlot(QuillComponent: typeof ReactQuill) {
  const ImageBlot = QuillComponent.Quill.import("formats/image");
  class CustomImageBlot extends ImageBlot {
    static create(value: CustomImageBlotProps) {
      const node: HTMLElement = super.create(value);
      node.setAttribute("alt", value.alt);
      node.setAttribute("src", value.src);
      node.dataset.src = value.dataSrc;
      return node;
    }

    static value(domNode: HTMLElement): CustomImageBlotProps {
      return {
        alt: domNode.getAttribute("alt") || "",
        src: domNode.getAttribute("src") || "",
        dataSrc: domNode.dataset.src || "",
      };
    }
  }
  return CustomImageBlot;
}
