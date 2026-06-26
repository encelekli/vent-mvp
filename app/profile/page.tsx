"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

export default function ProfilePage() {
  return (
    <div className="flex flex-col min-h-full pb-24">
      <header className="sticky top-0 z-40 border-b border-border bg-background/80 backdrop-blur-md">
        <div className="mx-auto max-w-md px-4 py-4">
          <h1 className="text-xl font-bold">Profile</h1>
          <p className="text-sm text-muted">Your anonymous identity</p>
        </div>
      </header>

      <main className="mx-auto w-full max-w-md px-4 py-6 space-y-6">
        <div className="flex flex-col items-center gap-4">
          <Avatar className="h-20 w-20">
            <AvatarFallback className="text-xl">V</AvatarFallback>
          </Avatar>
          <div className="text-center">
            <h2 className="text-lg font-semibold">VentUser-42</h2>
            <p className="text-sm text-muted">Joined June 2026</p>
          </div>
          <Badge variant="outline">Anonymous</Badge>
        </div>

        <div className="grid grid-cols-3 gap-3">
          <Card className="text-center">
            <CardContent className="p-4">
              <p className="text-2xl font-bold">12</p>
              <p className="text-xs text-muted">Vents</p>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardContent className="p-4">
              <p className="text-2xl font-bold">48</p>
              <p className="text-xs text-muted">Reactions</p>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardContent className="p-4">
              <p className="text-2xl font-bold">3</p>
              <p className="text-xs text-muted">Chats</p>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm">Settings</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <Button variant="outline" className="w-full justify-start">
              Edit Alias
            </Button>
            <Button variant="outline" className="w-full justify-start">
              Notification Preferences
            </Button>
            <Button variant="outline" className="w-full justify-start">
              Privacy & Visibility
            </Button>
            <Button variant="destructive" className="w-full justify-start">
              Sign Out
            </Button>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
