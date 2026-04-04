"use server";
import { createClient } from "./supabase/server";

export const searchListings = async (query: string) => {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("listings")
    .select("id, title, category, price_day")
    .or(
      `title.ilike.%${query}%,category.ilike.%${query}%,description.ilike.%${query}%`,
    )
    .limit(6);

  if (error) throw error;
  return data;
};

export const bookingAction = async (payload: BookingPayload) => {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) throw new Error("Unauthorized");

  const { error } = await supabase.from("booking").insert(payload);

  if (error) throw error;
};
