"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const mockTopics = [
  {
    id: "1",
    name: "Work Stress",
    slug: "work-stress",
    description: "Vent about deadlines, bosses, burnout, and career anxiety.",
    members: 124,
    active: true,
  },
  {
    id: "2",
    name: "Mental Health",
    slug: "mental-health",
    description: "A safe space to talk about anxiety, depression, and healing.",
    members: 342,
    active: true,
  },
  {
    id: "3",
    name: "Relationships",
    slug: "relationships",
    description: "Love, heartbreak, boundaries, and everything in between.",
    members: 198,
    active: true,
  },
  {
    id: "4",
    name: "Family",
    slug: "family",
    description: "Navigating family dynamics, expectations, and conflict.",
    members: 87,
    active: false,
  },
];

export default function ChatPage() {
  return (
    <div className="flex flex-col min-h-full pb-24">
      <header className="sticky top-0 z-40 border-b border-border bg-background/80 backdrop-blur-md">
        <div className="mx-auto max-w-md px-4 py-4">
          <h1 className="text-xl font-bold">Topic Chats</h1>
          <p className="text-sm text-muted">
            Join supportive group conversations
          </p>
        </div>
      </header>

      <main className="mx-auto w-full max-w-md px-4 py-4 space-y-4">
        {mockTopics.map((topic) => (
          <Card key={topic.id} className="cursor-pointer hover:border-primary/50 transition-colors">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-base">{topic.name}</CardTitle>
                {topic.active && <Badge variant="default">Live</Badge>}
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted">{topic.description}</p>
              <p className="mt-2 text-xs text-muted">
                {topic.members} members
              </p>
            </CardContent>
          </Card>
        ))}
      </main>
    </div>
  );
}
