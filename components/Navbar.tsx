"use client";
import { useAuth } from "@/context/AuthProvider";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import Image from "next/image";
import CTAButton from "./CTAButton";

const Navbar = () => {
  const { user } = useAuth();
  const avatarUrl = user?.user_metadata?.avatar_url;

  const handleSignOut = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
  };
  return (
    <header>
      <nav className="flex justify-between">
        <Link href="/">LOGO</Link>

        <ul className="flex items-center">
          <li>
            <Link href="/dashboard/listings">Listings</Link>
          </li>
          <li>
            <Link href="/dashboard/booking">Booking</Link>
          </li>
          <li>
            <Link href="/dashboard/rentals">Rentals</Link>
          </li>
        </ul>

        <div>
          <button>
            {avatarUrl && (
              <Image
                height={41}
                width={41}
                src={avatarUrl}
                alt={user?.user_metadata.full_name ?? "User avatar"}
              />
            )}
          </button>
          <CTAButton text="List your item" />
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
