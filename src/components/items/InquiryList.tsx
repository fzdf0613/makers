"use client";
import InquiryComment from "./InquiryComment";
import { usePostInquirys } from "@/hooks/inquirys";

type Props = { postId: string };

export default function InquiryList({ postId }: Props) {
  const { inquirys } = usePostInquirys(postId);
  return (
    <div>
      {inquirys && (
        <ul>
          {inquirys.map((inquiry) => (
            <InquiryComment key={inquiry.id} inquiry={inquiry} />
          ))}
        </ul>
      )}
    </div>
  );
}
