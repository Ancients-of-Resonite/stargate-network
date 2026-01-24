"use client";
import { cn } from "@/lib/utils";
import { stargate } from "database/src/schema";
import { Lock, Server, User } from "lucide-react";
import localFont from "next/font/local";
import { useLocalStorage } from "usehooks-ts";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";

const mw_font = localFont({
  src: "../assets/sg_mw.ttf",
});

const pg_font = localFont({
  src: "../assets/sg_pg.ttf",
});

const un_font = localFont({
  src: "../assets/sg_uni.ttf",
});

export function StargateCard({ gate }: { gate: typeof stargate.$inferInsert }) {
  const [glyphs, _] = useLocalStorage("glyph-display-type", "text", { initializeWithValue: false });
  return (
    <Card className="w-[320px]">
      <CardHeader>
        <CardTitle className="flex items-center gap-1">
          {gate.is_headless ? <Server size={16} /> : <User size={16} />} {!gate.public_gate && <Lock size={16} />}{" "}
          {gate.session_name}
        </CardTitle>
        <CardContent className="mt-2 space-y-2">
          <div className="flex justify-between items-center">
            <p>Gate Address</p>
            <p
              className={cn(
                glyphs === "mw" && `${mw_font.className}`,
                glyphs === "pg" && `${pg_font.className} text-2xl`,
                glyphs === "un" && `${un_font.className} text-3xl`,
                !gate.public_gate && "blur-sm hover:blur-none transition-all",
              )}
            >
              {gate.gate_address}
              <span className="text-primary">{gate.gate_code}</span>
            </p>
          </div>
          <div className="flex justify-between">
            <p>Owner</p>
            <p>
              {gate.owner_name}
            </p>
          </div>
          <div className="flex justify-between">
            <p>User Count</p>
            <p>
              {gate.active_users}/
              <span className="text-primary">{gate.max_users}</span>
            </p>
          </div>
        </CardContent>
      </CardHeader>
    </Card>
  );
}
