import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const truncateString = (text: string, limit: number) => {
  if (text?.length > limit) return text.slice(0, limit) + " ...";
  return text;
};


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