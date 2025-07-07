"use client";
import AnimatedContent from "@/components/ui/AnimatedContent";
import BlurText from "@/components/ui/BlurText";
import Link from "next/link";

export default function OpportunitiesPage() {
  return (
    <AnimatedContent className="max-w-2xl mx-auto py-8">
      <Link href="/dashboard" className="text-blue-600">&larr; Back to Dashboard</Link>
      <BlurText as="h1" className="text-2xl font-bold mb-2" style={{ color: "var(--color-foreground)" }}>
        Track licensing pitches
      </BlurText>
      <div className="mb-4 text-lg" style={{ color: "var(--color-foreground)" }}>
        Manage sync and placement leads
      </div>
      <div className="mb-2 font-semibold">You can:</div>
      <ul className="list-disc ml-6 text-gray-700 space-y-2">
        <li>Create new opportunity records (film, TV, ads)</li>
        <li>Link songs and writers to each pitch</li>
        <li>Set deadlines, status (pending, approved, declined)</li>
        <li>Attach mood-boards, briefs, or sample clips</li>
      </ul>
    </AnimatedContent>
  );
} 