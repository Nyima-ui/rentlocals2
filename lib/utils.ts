import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs));
};

export const calculateTotalPrice = (
  startDate: string,
  endDate: string,
  pricePerDay: number | undefined,
): number => {
  if (!startDate || !endDate || !pricePerDay) return 0;

  const start = new Date(startDate);
  const end = new Date(endDate);
  const totalDays = Math.ceil(
    (end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24),
  );

  return totalDays * pricePerDay;
};
