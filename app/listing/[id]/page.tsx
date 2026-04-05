"use client";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import Image from "next/image";
import { bookingAction } from "@/lib/action";
import { useAuth } from "@/context/AuthProvider";
import { calculateTotalPrice } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { isRedirectError } from "next/dist/client/components/redirect-error";

const Listing = () => {
  //LATER: TURN BACK THIS COMPONENT IN SERVER SIDE
  const params = useParams();
  const router = useRouter();
  const id = params.id;
  const [listing, setListing] = useState<IncomingListing | null>(null);
  const [rentalPeriod, setRentalPeriod] = useState({
    from: "",
    to: "",
  });
  const supabase = createClient();
  const { user } = useAuth();

  useEffect(() => {
    if (!id) return;
    const fetchListing = async () => {
      const { data, error } = await supabase
        .from("listings")
        .select("*")
        .eq("id", id)
        .single();

      if (error) {
        console.error(`Error fetching listing: `, error);
        return;
      }
      setListing(data);
    };
    fetchListing();
  }, [id, supabase]);

  useEffect(() => {
    console.log(listing);
  }, [listing]);

  const isOwner = user.id === listing?.owner_id;

  const requestBooking = async () => {
    if (!user.id) return router.push("/signup");
    if (!listing) return;

    if (!rentalPeriod.from || !rentalPeriod.to) {
      alert("Please select a rental period");
      return;
    }

    const bookingInfo: BookingPayload = {
      renter_id: user.id,
      owner_id: listing?.owner_id,
      listing_id: listing?.id,
      start_date: rentalPeriod.from,
      end_date: rentalPeriod.to,
      price_day: listing?.price_day,
      total: calculateTotalPrice(
        rentalPeriod.from,
        rentalPeriod.to,
        listing?.price_day,
      ),
      status: "pending",
    };

    try {
      await bookingAction(bookingInfo);
    } catch (err) {
      if (isRedirectError(err)) throw err;
      console.error(`Error requesting booking ${err}`);
      return;
    }
  };

  if (!listing) {
    return <div>No listing</div>;
  }
  return (
    <div className="m-20">
      <h1>{listing.title}</h1>
      <p>Category : {listing.category}</p>
      <p>Description : {listing.description}</p>
      <div>
        {listing.pictures.map((img) => (
          <Image
            height={100}
            width={100}
            src={img}
            alt="Listing image"
            key={img}
          />
        ))}
      </div>

      <div className="mt-5">
        <p>Price for 1 day: {listing.price_day}</p>
        <p>Price for 1 week: {listing.price_week}</p>
      </div>

      <div className="mt-5">
        <input
          type="date"
          name="date"
          className="border focus:outline-none cursor-pointer block mb-3"
          value={rentalPeriod.from}
          min={new Date().toISOString().split("T")[0]}
          onChange={(e) =>
            setRentalPeriod((prev) => ({ ...prev, from: e.target.value }))
          }
        />
        <input
          type="date"
          name="date"
          value={rentalPeriod.to}
          min={rentalPeriod.from || new Date().toISOString().split("T")[0]}
          className="border focus:outline-none cursor-pointer"
          onChange={(e) =>
            setRentalPeriod((prev) => ({ ...prev, to: e.target.value }))
          }
        />
      </div>

      <button
        className={`border px-4 py-2 rounded-md  mt-10 ${isOwner ? "bg-gray-700 cursor-not-allowed" : "cursor-pointer"}`}
        onClick={requestBooking}
        disabled={isOwner}
      >
        Request booking
      </button>
    </div>
  );
};

export default Listing;
