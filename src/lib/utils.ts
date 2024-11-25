import { type ClassValue, clsx } from "clsx";
import { intervalToDuration } from "date-fns";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const truncateString = (text: string, limit: number) => {
  if (text?.length > limit) return text.slice(0, limit) + " ...";
  return text;
};
export function getCookie(name: string) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop()?.split(';').shift();
}


export function shortName(item?: string) {
  if (!item) return "UN";
  const shortName = item
    .split(" ")
    .map((n) => n[0])
    .join("");
  return shortName;
}

export function truncateText(text?: string) {
  if (!text) return "";
  const maxLength = 100;
  const truncatedText =
    text.length > maxLength ? text.substring(0, maxLength) + "..." : text;
  return truncatedText;
}

export const dateFormat = (dateString: Date | string) => {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${day}-${month}-${year}`;
};

export const noSpaceString = (text: string) => {
  const noSpaces = text.replace(/\s+/g, '');
  return noSpaces;
}

export const secondToHour = (second: number, type: 'schedule' | 'duration' = 'schedule') => {
  const duration = intervalToDuration({ start: 0, end: second * 1000 });
  const hour = duration.hours ? `${duration.hours}hr` : '';
  const minute = duration.minutes ? `${duration.minutes}min` : '';

  return type == 'schedule' ? `${String(duration.hours || 0).padStart(2, '0')}:${String(duration.minutes || 0).padStart(2, '0')}` : `${hour} ${minute}`
}

export const getDateByDayAndDuration = (startDay: string, duration: number) => {
  const startDayDuration = new Date(startDay);
  startDayDuration.setHours(0, 0, 0, 0)
  const desireTime = startDayDuration.getTime() + (duration * 1000);
  return new Date(desireTime);
}


export const secondFromStartOfDay = (date: Date) => {
  const startOfDay = new Date(date);
  startOfDay.setHours(0, 0, 0, 0);
  const differenceMiliSecond = date.getTime() - startOfDay.getTime()
  return Number((differenceMiliSecond / 1000).toFixed(0))
}


type Data = {
  first: string;
  second: string;
}
export const checkChange = (checkData: Data[]) => {
  console.log(checkData)
  const check = checkData.find((data) => data.first != data.second);
  return check ? true : false
}