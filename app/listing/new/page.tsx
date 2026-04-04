"use client";
import React from "react";
import { useAuth } from "@/context/AuthProvider";
import { useRouter } from "next/navigation";
import { createListingAction } from "./action";

// create table public.listings (
//   id uuid not null default gen_random_uuid (),
//   owner_id uuid not null, --
//   category text not null, --
//   title text not null, --
//   description text null, --
//   location text null, --
//   pictures text[] null,
//   status text not null default 'active'::text,
//   price_day numeric(10, 2) null,
//   price_week numeric(10, 2) null,
//   created_at timestamp with time zone not null default now(),
//   updated_at timestamp with time zone not null default now(),
//   constraint listings_pkey primary key (id),
//   constraint listings_owner_id_fkey foreign KEY (owner_id) references profiles (id) on delete CASCADE
// ) TABLESPACE pg_default;

// create trigger listings_updated_at BEFORE
// update on listings for EACH row
// execute FUNCTION update_updated_at ();

const Page = () => {
  //later: PUSH THE FORM FURTHER DOWN THE TREE AND KEEP THE PAGE SERVER COMPONENT
  const { user } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e: React.SubmitEvent) => {
    e.preventDefault();
    if (!user.id) router.push("/signup");
    const formData = new FormData(e.target);
    try {
      await createListingAction(formData, user.id);
    } catch (error) {
      console.error(`Error uploading listings`, error);
    }
  };

  return (
    <div className="px-10 py-20">
      <main>
        <h1>Post your listing</h1>

        <form
          className=" grid grid-cols-2 max-lg:grid-cols-1 gap-5"
          onSubmit={handleSubmit}
        >
          <div className="">
            {/* CATEGORY  */}
            <div className="flex flex-col gap-1">
              <label htmlFor="category">Category</label>
              <input
                type="text"
                id="category"
                name="category"
                className="border focus:outline-none shrink-0 max-w-sm"
              />
            </div>
            {/* TITLE  */}
            <div className="flex flex-col gap-1">
              <label htmlFor="title">Title</label>
              <input
                type="text"
                id="title"
                name="title"
                className="border focus:outline-none shrink-0 max-w-sm"
              />
            </div>
            {/* DESCRIPTION  */}
            <div className="flex flex-col gap-1">
              <label htmlFor="description">Description</label>
              <textarea
                name="description"
                id="description"
                className="border focus:outline-none shrink-0 max-w-sm"
              ></textarea>
            </div>
            {/* LOCATION   */}
            <div className="flex flex-col gap-1">
              <label htmlFor="location">Pickup location</label>
              <input
                type="text"
                id="location"
                name="location"
                className="border focus:outline-none shrink-0 max-w-sm"
              />
              <button
                type="button"
                className="cursor-pointer border px-x py-1 max-w-sm mt-3"
              >
                Use my location
              </button>
            </div>
            <div className="mt-5">
              <p>Prices</p>
              <div className="flex max-w-sm gap-2.5">
                {/* PRICE DAY  */}
                <div className="flex-1 min-w-0">
                  <label htmlFor="price-day">Price for 1 day</label>
                  <input
                    type="number"
                    className="block border focus:outline-none w-full mt-1"
                    name="price-day"
                    id="price-day"
                  />
                </div>
                {/* PRICE WEEK  */}
                <div className="flex-1">
                  <label htmlFor="price-week">Price for 1 week</label>
                  <input
                    type="number"
                    className="block border focus:outline-none mt-1"
                    name="price-week"
                    id="price-week"
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="">
            <label htmlFor="pictures" className="block">
              Pictures
            </label>
            <input
              type="file"
              accept="image/png, image/jpg, image/webp"
              className="focus:outline-none border block mt-5 cursor-pointer"
              name="picture"
            />
            <input
              type="file"
              accept="image/png, image/jpg, image/webp"
              className="focus:outline-none border block mt-5 cursor-pointer"
              name="picture"
            />
            <input
              type="file"
              accept="image/png, image/jpg, image/webp"
              className="focus:outline-none border block mt-5 cursor-pointer"
              name="picture"
            />
          </div>
          <div className="space-x-5 mt-5 max-w-sm flex justify-end">
            <button
              className="px-2 py-1.5 rounded-md cursor-pointer border"
              type="button"
            >
              Reset
            </button>
            <button
              className="px-2 py-1.5 rounded-md cursor-pointer border"
              type="submit"
            >
              Post your listing
            </button>
          </div>
        </form>
      </main>
    </div>
  );
};

export default Page;
