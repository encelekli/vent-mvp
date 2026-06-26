"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

const mockVents = [
  {
    id: "1",
    alias: "BlueJay",
    content:
      "Just needed to get this off my chest — work has been overwhelming lately and I feel like I am running on empty.",
    topic: "Work Stress",
    visibility: "public",
    reactions: 12,
    time: "2h ago",
  },
  {
    id: "2",
    alias: "MoonWalker",
    content:
      "Does anyone else feel like they are pretending to have it all together? I am exhausted from the performance.",
    topic: "Mental Health",
    visibility: "public",
    reactions: 34,
    time: "4h ago",
  },
  {
    id: "3",
    alias: "RiverFlow",
    content:
      "I finally set a boundary with a toxic friend today. It is scary but I am proud of myself.",
    topic: "Relationships",
    visibility: "public",
    reactions: 28,
    time: "6h ago",
  },
];

export default function FeedPage() {
  return (
    <div className="flex flex-col min-h-full pb-24">
      <header className="sticky top-0 z-40 border-b border-border bg-background/80 backdrop-blur-md">
        <div className="mx-auto max-w-md px-4 py-4">
          <h1 className="text-xl font-bold">Feed</h1>
          <p className="text-sm text-muted">Recent vents from the community</p>
        </div>
      </header>

      <main className="mx-auto w-full max-w-md px-4 py-4 space-y-4">
        {mockVents.map((vent) => (
          <Card key={vent.id}>
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Avatar className="h-8 w-8">
                    <AvatarFallback>{vent.alias[0]}</AvatarFallback>
                  </Avatar>
                  <div>
                    <CardTitle className="text-sm">{vent.alias}</CardTitle>
                    <p className="text-xs text-muted">{vent.time}</p>
                  </div>
                </div>
                <Badge variant="secondary">{vent.topic}</Badge>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm leading-relaxed">{vent.content}</p>
              <div className="mt-3 flex items-center gap-4 text-xs text-muted">
                <span>{vent.reactions} reactions</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </main>
    </div>
  );
}
