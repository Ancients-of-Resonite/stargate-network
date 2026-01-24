"use client";

export default function Time({ date }: { date: Date }) {
  return (
    <time dateTime={date.toISOString()}>
      {date.toLocaleDateString("en-US", {
        weekday: "long",
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      })}
    </time>
  );
}
