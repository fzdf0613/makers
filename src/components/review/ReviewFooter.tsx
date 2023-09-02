export default function ReviewFooter() {
  return (
    <div className="px-4 py-6 flex flex-col bg-[#f6f6f6] mb-10">
      <strong className="text-[13px]">작성 전 확인해주세요</strong>
      <ul className="list-disc text-xs pl-[11px] mt-2.5">
        <li>
          해당 제품과 무관한 내용이나 동일 문자의 반복 및 비방·욕설·광고 등
          부적합한 구매후기는 통보 없이 삭제될 수 있습니다.
        </li>
        <li>
          전기통신사업법 및 시행령에 따라 동영상은 불법촬영물등 여부를 확인 후
          게재됩니다. 동영상을 게시까지 일정 시간이 소요될 수 있으며
          불법촬영물등으로 확인될 경우 게재가 제한됩니다.
        </li>
      </ul>
    </div>
  );
}
