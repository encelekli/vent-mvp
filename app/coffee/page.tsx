"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const mockMatches = [
  {
    id: "1",
    alias: "StarGazer",
    status: "waiting",
    topic: "Mental Health",
    joinedAt: "5m ago",
  },
  {
    id: "2",
    alias: "OceanWave",
    status: "available",
    topic: "Work Stress",
    joinedAt: "12m ago",
  },
];

export default function CoffeePage() {
  return (
    <div className="flex flex-col min-h-full pb-24">
      <header className="sticky top-0 z-40 border-b border-border bg-background/80 backdrop-blur-md">
        <div className="mx-auto max-w-md px-4 py-4">
          <h1 className="text-xl font-bold">Coffee Chat</h1>
          <p className="text-sm text-muted">
            1:1 anonymous conversations with someone who gets it
          </p>
        </div>
      </header>

      <main className="mx-auto w-full max-w-md px-4 py-4 space-y-6">
        <Card className="border-primary/30 bg-primary/5">
          <CardContent className="p-6 text-center space-y-4">
            <h2 className="text-lg font-semibold">Find a coffee partner</h2>
            <p className="text-sm text-muted">
              Get matched anonymously with someone who wants to talk about the
              same topic.
            </p>
            <Button size="lg" className="w-full">
              Start Matching
            </Button>
          </CardContent>
        </Card>

        <div>
          <h3 className="text-sm font-semibold text-muted mb-3">
            People waiting to chat
          </h3>
          <div className="space-y-3">
            {mockMatches.map((match) => (
              <Card key={match.id}>
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-sm">{match.alias}</CardTitle>
                    <Badge
                      variant={
                        match.status === "available" ? "default" : "secondary"
                      }
                    >
                      {match.status === "available" ? "Available" : "Waiting"}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-xs text-muted">
                    Topic: {match.topic} · Joined {match.joinedAt}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
