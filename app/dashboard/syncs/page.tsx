"use client";
import AnimatedContent from "@/components/ui/AnimatedContent";
import BlurText from "@/components/ui/BlurText";
import Link from "next/link";

export default function SyncsPage() {
  return (
    <AnimatedContent className="max-w-2xl mx-auto py-8">
      <Link href="/dashboard" className="text-blue-600">&larr; Back to Dashboard</Link>
      <BlurText as="h1" className="text-2xl font-bold mb-2" style={{ color: "var(--color-foreground)" }}>
        Oversee sync agreements
      </BlurText>
      <div className="mb-4 text-lg" style={{ color: "var(--color-foreground)" }}>
        Execute and monitor licenses
      </div>
      <div className="mb-2 font-semibold">You can:</div>
      <ul className="list-disc ml-6 text-gray-700 space-y-2">
        <li>Draft and send sync contracts</li>
        <li>Capture usage terms and fees</li>
        <li>Track delivery of masters and cue sheets</li>
        <li>Automate invoice generation upon approval (<a href="https://www.songtrust.com/why-songtrust?utm_source=chatgpt.com" target="_blank" rel="noopener noreferrer" className="underline text-blue-600">learn more</a>)</li>
      </ul>
    </AnimatedContent>
  );
} 