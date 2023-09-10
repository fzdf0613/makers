export function getRemaingTimeFormat(startDate: Date, endDate: Date) {
  const sec = (endDate.getTime() - startDate.getTime()) / 1000;
  if (sec < 3600) {
    return Math.floor(sec / 60) + "분 전";
  } else if (sec < 86400) {
    return Math.floor(sec / 3600) + "시간 전";
  } else {
    return Math.floor(sec / 86400) + "일 전";
  }
}

export function isNew(startDate: any) {
  const startTime = startDate.getTime();
  const mondayTime = new Date(getMonday()).getTime();
  const nextMondayTime = mondayTime + 7 * 24 * 60 * 60 * 1000;
  return mondayTime <= startTime && startTime < nextMondayTime;
}

export function isAlert(endDate: Date) {
  const today = new Date();
  const endTime = endDate.getTime();
  return (
    endTime - 2 * 24 * 60 * 60 * 1000 <= today.getTime() &&
    today.getTime() < endTime
  );
}

export function getMonday() {
  const today = new Date();
  const dayOfWeek = today.getDay();
  const monday = new Date(today);

  const daysUntilMonday = dayOfWeek === 1 ? 0 : 1 - dayOfWeek;
  monday.setDate(today.getDate() + daysUntilMonday);

  monday.setHours(0, 0, 0, 0);
  return monday;
}

export function getNextMonday() {
  const today = new Date();
  const dayOfWeek = today.getDay();
  const monday = new Date(today);

  const daysUntilMonday = dayOfWeek === 0 ? 6 : dayOfWeek - 1;
  monday.setDate(today.getDate() - daysUntilMonday);
  monday.setHours(0, 0, 0, 0);

  const nextMonday = new Date(monday.getTime() + 7 * 24 * 60 * 60 * 1000);

  return nextMonday;
}

export function getInquiryTimeFormat(time: number) {
  const date = new Date(time);
  const dateFormatter = new Intl.DateTimeFormat("ko-KR", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  });
  const splitted = dateFormatter.format(date).split(". ");
  return `${splitted[0]}-${splitted[1]}-${splitted[2]}  ${splitted[3]}`;
}

export function getCurrentISOString() {
  const offset = new Date().getTimezoneOffset() * 60000;
  const today = new Date(Date.now() - offset);
  return today.toISOString();
}
