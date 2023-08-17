export function getRemaingTimeFormat(startDate: string, endDate: string) {
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

export function isNew(startDate: string, endDate: string) {
  const startTime = new Date(startDate).getTime();
  const mondayTime = new Date(getMonday()).getTime();
  const nextMondayTime = mondayTime + 7 * 24 * 60 * 60 * 1000;
  return mondayTime <= startTime && startTime < nextMondayTime;
}

export function isAlert(endDate: string) {
  const today = new Date();
  const endTime = new Date(endDate).getTime();
  return (
    endTime - 2 * 24 * 60 * 60 * 1000 <= today.getTime() &&
    today.getTime() < endTime
  );
}

function getMonday() {
  const today = new Date();
  const dayOfWeek = today.getDay();
  const monday = new Date(today);

  const daysUntilMonday = dayOfWeek === 0 ? 6 : dayOfWeek - 1;
  monday.setDate(today.getDate() - daysUntilMonday);

  monday.setHours(0, 0, 0, 0);

  return monday;
}
