"use client";
import Image from "next/image";
import { useState } from "react";
import { CircleUserRound } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { redirect, useRouter } from "next/navigation";

const SignUpForm = () => {
  const supabase = createClient();
  const [mode, setMode] = useState<"sign-up" | "sign-in">("sign-up");
  const [avatar, setAvatar] = useState<File | null>(null);
  const router = useRouter();

  const uploadAvatar = async (userId: string, file: File) => {
    const fileExt = file.name.split(".").pop();
    const filePath = `avatars/${userId}.${fileExt}`;

    const { error: storageError } = await supabase.storage
      .from("avatars")
      .upload(filePath, file);

    if (storageError) throw storageError;

    const { data } = supabase.storage.from("avatars").getPublicUrl(filePath);

    return data.publicUrl;
  };

  const handleSubmit = async (e: React.SubmitEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target);

    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const fullname = formData.get("fullname") as string;
    const location = formData.get("location") as string;
    const avatarFile = formData.get("avatar") as File;

    // SIGN UP
    if (mode === "sign-up") {
      if (!email || !password || !fullname || !location || !avatarFile) {
        alert("Please fill in all credentials");
        return;
      }
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
      });

      if (error) throw error;

      const userId = data.user?.id;

      if (!userId) throw new Error("Sign up failed, no user returned.");

      const avatarUrl = await uploadAvatar(userId, avatarFile);

      const { error: profileError } = await supabase
        .from("profiles")
        .update({ fullname, location, avatar: avatarUrl })
        .eq("id", userId);

      if (profileError) throw profileError;
    }
    //LOG IN
    else {
      if (!email || !password) {
        alert("Please fill in all credentials");
        return;
      }
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;
      router.push("/");
    }
  };

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) setAvatar(file);
  };

  const signInWithGoogle = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/auth/callback?next=/`,
      },
    });

    if (error) throw error;
  };
  return (
    <form className="m-20" onSubmit={handleSubmit}>
      <div>
        <button
          type="button"
          onClick={() => setMode("sign-up")}
          className={`border px-3 py-1 rounded-md cursor-pointer ${mode === "sign-up" ? "bg-gray-500" : ""}`}
        >
          Sign up
        </button>
        <button
          type="button"
          onClick={() => setMode("sign-in")}
          className={`border px-3 py-1 rounded-md cursor-pointer ml-5 ${mode === "sign-in" ? "bg-gray-500" : ""}`}
        >
          Sign in
        </button>
      </div>

      {mode === "sign-up" && (
        <div className="mt-3">
          <label htmlFor="avatar">Avatar</label>
          <div className="border rounded-full size-14 flex  items-center justify-center overflow-hidden">
            {avatar ? (
              <Image
                src={URL.createObjectURL(avatar)}
                alt="avatar preview"
                className="w-full h-full object-cover"
                height={25}
                width={25}
              />
            ) : (
              <CircleUserRound size={50} />
            )}
          </div>
          <input
            type="file"
            id="avatar"
            name="avatar"
            className="focus:outline-none border ml-5 rounded-md mt-3"
            accept="image/png, image/jpeg, image/webp"
            onChange={handleAvatarChange}
          />
        </div>
      )}

      {mode === "sign-up" && (
        <div>
          <label htmlFor="fullname">Fullname</label>
          <input
            type="text"
            id="fullname"
            name="fullname"
            // value={credentials.fullname}
            className="focus:outline-none border ml-5 rounded-md mt-3"
            // onChange={handleChange}
          />
        </div>
      )}
      <div>
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          name="email"
          //   value={credentials.email}
          className="focus:outline-none border ml-5 rounded-md mt-3"
          //   onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="password">Password</label>
        <input
          type="text"
          id="password"
          name="password"
          //   value={credentials.password}
          className="focus:outline-none border ml-5 rounded-md mt-3"
          //   onChange={handleChange}
        />
      </div>

      {mode === "sign-up" && (
        <div>
          <label htmlFor="location">Location</label>
          <input
            type="text"
            id="location"
            name="location"
            // value={credentials.location}
            className="focus:outline-none border ml-5 rounded-md mt-3"
            // onChange={handleChange}
          />
          <button type="button">Use my location</button>
        </div>
      )}

      <button
        type="submit"
        className="cursor-pointer border px-5 py-1.5 rounded-md mt-5"
      >
        Submit
      </button>

      <button
        type="button"
        className="block border p-3 mt-5 cursor-pointer rounded-md"
        onClick={signInWithGoogle}
      >
        Sign up with Google
      </button>
    </form>
  );
};

export default SignUpForm;
