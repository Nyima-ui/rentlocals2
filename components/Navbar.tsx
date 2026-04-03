"use client";
import { useAuth } from "@/context/AuthProvider";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";

const Navbar = () => {
  const { user } = useAuth();

  const handleSignOut = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
  };
  return (
    <header>
      <nav className="flex justify-between py-5">
        <p>LOGO</p>
        {user ? (
          <>
            <p>{user?.email}</p>
            <button onClick={handleSignOut}>Logout</button>
          </>
        ) : (
          <Link href="/signup">Sign up</Link>
        )}
      </nav>
    </header>
  );
};

export default Navbar;
