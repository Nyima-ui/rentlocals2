import Link from "next/link";

export default function Home() {
  return (
    <div className="max-w-7xl mx-auto px-10">
      <header>
        <nav className="flex justify-between py-5">
          <p>LOGO</p>

          <Link href="/signup">Sign up</Link>
        </nav>
      </header>

      <main>
        <h1 className="text-4xl">Home page</h1>
        <p className="mt-4">
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Cum commodi
          eos, eveniet hic repellendus et accusantium doloribus eum consequatur
          asperiores, at ullam voluptatibus quaerat dolorum porro, cupiditate
          vel iste quis. Repudiandae ducimus animi mollitia numquam?
        </p>
      </main>
    </div>
  );
}
