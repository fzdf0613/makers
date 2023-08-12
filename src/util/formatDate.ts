export function getRemaingTime(startDate: string, endDate: string) {
  const sec =
    (new Date(endDate).getTime() - new Date(startDate).getTime()) / 1000;
  if (sec < 3600) {
    return Math.floor(sec / 60) + "분 전";
  } else if (sec < 86400) {
    return Math.floor(sec / 3600) + "시간 전";
  } else {
    return Math.floor(sec / 86400) + "일 전";
  }
}
