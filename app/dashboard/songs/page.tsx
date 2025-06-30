"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Song } from "@/lib/types";

export default function SongsPage() {
  const [songs, setSongs] = useState<Song[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem("songs");
    if (stored) setSongs(JSON.parse(stored));
  }, []);

  const handleDelete = (id: string) => {
    const updated = songs.filter((s) => s.id !== id);
    setSongs(updated);
    localStorage.setItem("songs", JSON.stringify(updated));
  };

  return (
    <div className="max-w-2xl mx-auto py-8">
      <Link href="/dashboard" className="text-blue-600">&larr; Back to Dashboard</Link>
      <h1 className="text-2xl font-bold mb-4">All Songs</h1>
      {songs.length === 0 ? (
        <div>No songs registered yet.</div>
      ) : (
        <ul className="space-y-2">
          {songs.map((song) => (
            <li key={song.id} className="border rounded p-3 flex justify-between items-center">
              <div>
                <div className="font-bold">{song.title}</div>
                <div className="text-sm text-gray-600">Spotify ID: {song.spotifyId}</div>
                {song.isrc && <div className="text-sm">ISRC: {song.isrc}</div>}
                <div className="text-sm">Writers: {song.writers.map(w => w.name + (w.role ? ` (${w.role})` : "")).join(", ")}</div>
                <div className="text-sm">Splits: {song.splits.map(s => `${s.writerName}: ${s.percentage}%`).join(", ")}</div>
              </div>
              <button className="text-red-600" onClick={() => handleDelete(song.id)}>Delete</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
} 