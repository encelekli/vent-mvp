import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col flex-1">
      <main className="flex flex-1 flex-col items-center justify-center px-6 py-24">
        <div className="max-w-xl text-center space-y-6">
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight leading-tight">
            A safe space to release what weighs on you
          </h1>
          <p className="text-lg text-muted leading-relaxed">
            Vent anonymously. Speak your truth through text or voice, join
            supportive topic chats, and find connection without judgment.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Link
              href="/vent"
              className="inline-flex items-center justify-center rounded-[var(--radius-sm)] px-6 py-3 text-sm font-semibold text-white bg-gradient-to-r from-primary to-accent hover:opacity-90 transition-opacity"
            >
              Start venting
            </Link>
            <Link
              href="/topics"
              className="inline-flex items-center justify-center rounded-[var(--radius-sm)] px-6 py-3 text-sm font-semibold border border-border hover:bg-surface transition-colors"
            >
              Explore topics
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
