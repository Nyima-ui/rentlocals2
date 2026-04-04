'use server'
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
