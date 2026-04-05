"use server";
import { redirect } from "next/navigation";
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

  const { data: myBooking, error: myBookingError } = await supabase
    .from("booking")
    .select("id")
    .eq("listing_id", payload.listing_id)
    .eq("renter_id", payload.renter_id)
    .maybeSingle();

  if (myBookingError) throw myBookingError;

  if (myBooking) redirect(`/booking/${myBooking.id}`);

  const { data: conflictingBooking, error: conflictingBookingError } =
    await supabase
      .from("booking")
      .select("id")
      .eq("listing_id", payload.listing_id)
      .in("status", ["accepted", "active"])
      .lt("start_date", payload.end_date)
      .gt("end_date", payload.start_date)
      .maybeSingle();

  if (conflictingBookingError) throw conflictingBookingError;

  if (conflictingBooking) throw new Error("These dates are already booked");

  const { data, error } = await supabase
    .from("booking")
    .insert(payload)
    .select("id")
    .single();

  if (error) throw error;

  redirect(`/booking/${data.id}`);
};
