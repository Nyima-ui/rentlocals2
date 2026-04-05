import Navbar from "@/components/Navbar";
import { createClient } from "@/lib/supabase/server";
import Search from "@/components/Search";
import Link from "next/link";

export default async function Home() {
  const supabase = await createClient();
  const { data: listings, error } = await supabase.from("listings").select("*");
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <div className="max-w-7xl mx-auto px-10">
      <Navbar />

      <main>
        <h1 className="text-4xl">Home page</h1>
        <p className="mt-4">
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Cum commodi
          eos, eveniet hic repellendus et accusantium doloribus eum consequatur
          asperiores, at ullam voluptatibus quaerat dolorum porro, cupiditate
          vel iste quis. Repudiandae ducimus animi mollitia numquam?
        </p>
      </main>

      <Search />

      <section className="mt-10">
        {listings?.map((item) => (
          <div key={item.id} className="space-y-3 border">
            <p>{item.title}</p>
            <Link
              href={`/listing/${item.id}`}
              className="border px-1 py-2 rounded-md inline-block"
            >
              View item
            </Link>
            <p>₹{item.price_day}</p>
          </div>
        ))}
      </section>
    </div>
  );
}
