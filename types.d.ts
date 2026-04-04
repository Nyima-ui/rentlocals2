interface AuthContextProps {
  user: User | null;
}

interface HyggloPrice {
  days: number;
  label: string;
}

interface HyggloListing {
  slug: string;
  product: {
    name: string;
    description: string;
    category: { name: string };
    prices: HyggloPrice[];
    images: { fullSizeUrl: string }[];
  };
  location: {
    street?: string;
    label: string;
  };
}
interface ListingPrices {
  day?: number;
  week?: number;
}

interface Listing {
  title: string;
  description: string;
  category: string;
  location: string;
  prices: ListingPrices;
  pictures: string[];
}

interface IncomingListing extends Listing {
  id: string;
  price_day: number;
  price_week: number;
  owner_id: string;
}

interface SearchResults {
  id: string;
  title: string;
  category: string;
  price_day: number;
}

interface BookingPayload {
  renter_id: string;
  owner_id: string;
  listing_id: string;
  start_date: string;
  end_date: string;
  price_day: number;
  total: number;
  status: "pending" | "accepted" | "active" | "completed" | "cancelled";
}
// create table public.booking (
//   id uuid not null default gen_random_uuid (),
//   renter_id uuid not null,
//   owner_id uuid not null,
//   listing_id uuid not null,
//   start_date date not null,
//   end_date date not null,
//   price_day numeric(10, 2) not null,
//   total numeric(10, 2) not null,
//   status text not null default 'pending'::text,
//   payment_status text not null default 'unpaid'::text,
//   created_at timestamp with time zone not null default now(),
//   updated_at timestamp with time zone not null default now(),
//   constraint booking_pkey primary key (id),
//   constraint booking_listing_id_fkey foreign KEY (listing_id) references listings (id) on delete CASCADE,
//   constraint booking_owner_id_fkey foreign KEY (owner_id) references profiles (id) on delete CASCADE,
//   constraint booking_renter_id_fkey foreign KEY (renter_id) references profiles (id) on delete CASCADE
// ) TABLESPACE pg_default;

// create trigger booking_updated_at BEFORE
// update on booking for EACH row
// execute FUNCTION update_updated_at ();

// interface BookingRow{
//    renter_ui
// }
