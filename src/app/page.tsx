import Link from "next/link";

export default function Home() {
  return (

      <main className="container flex items-center justify-center min-h-screen">
        <Link href={"/login"}>Go to login</Link>
      </main>
  );
}
