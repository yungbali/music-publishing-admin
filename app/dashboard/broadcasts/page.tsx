"use client";
import AnimatedContent from "@/components/ui/AnimatedContent";
import BlurText from "@/components/ui/BlurText";
import Link from "next/link";

export default function BroadcastsPage() {
  return (
    <AnimatedContent className="max-w-2xl mx-auto py-8">
      <Link href="/dashboard" className="text-blue-600">&larr; Back to Dashboard</Link>
      <BlurText as="h1" className="text-2xl font-bold mb-2" style={{ color: "var(--color-foreground)" }}>
        Monitor on-air usage
      </BlurText>
      <div className="mb-4 text-lg" style={{ color: "var(--color-foreground)" }}>
        Track radio, TV, and streaming plays
      </div>
      <div className="mb-2 font-semibold">You can:</div>
      <ul className="list-disc ml-6 text-gray-700 space-y-2">
        <li>Pull airplay logs from reporting services</li>
        <li>Flag high-value broadcast events</li>
        <li>Generate royalty claims for network uses</li>
        <li>Visualize play trends over time</li>
      </ul>
    </AnimatedContent>
  );
} 