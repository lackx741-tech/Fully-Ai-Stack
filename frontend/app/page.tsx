import Link from "next/link";

export default function Home() {
  return (
    <main className="landing">
      <h1>Fully AI Stack</h1>
      <p>AI-native Ethereum engineering platform scaffold.</p>
      <Link href="/dashboard">Open dashboard</Link>
    </main>
  );
}
