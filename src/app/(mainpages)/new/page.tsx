"use client";
import NewItemList from "@/components/home/new/NewItemList";
import { getMonday, getNextMonday } from "@/util/date";

export default function NewPage() {
  return (
    <>
      <div className="mt-10 mb-4">
        <span className="font-bold text-xl">발견, 이번 주 신제품</span>
        <div className="mt-1 text-sm text-[#6c6c6c]">
          {getThisWeekDateText()}
        </div>
      </div>
      <NewItemList />
    </>
  );
}

function getThisWeekDateText() {
  const monday = getMonday();
  const sunday = getNextMonday();
  sunday.setDate(sunday.getDate() - 1);
  const dateFormatter = new Intl.DateTimeFormat("ko-KR", {
    month: "2-digit",
    day: "2-digit",
    weekday: "short",
  });
  return `${dateFormatter.format(monday)} - ${dateFormatter.format(sunday)}`;
}
