"use client";
import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { Song, Writer, Split } from "@/lib/types";
import { v4 as uuidv4 } from "uuid";

export default function SongsPage() {
  const { clientId } = useParams();
  const [songs, setSongs] = useState<Song[]>([]);
  const [form, setForm] = useState<Partial<Song>>({ writers: [], splits: [] });
  const [error, setError] = useState<string | null>(null);

  // Spotify search state
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);

  // Debounced search
  useEffect(() => {
    if (!searchTerm) {
      setSearchResults([]);
      setShowDropdown(false);
      return;
    }
    const timeout = setTimeout(async () => {
      setIsSearching(true);
      try {
        const res = await fetch(`/api/spotify-search?q=${encodeURIComponent(searchTerm)}`);
        const data = await res.json();
        setSearchResults(data.tracks || []);
        setShowDropdown(true);
      } catch (e) {
        setSearchResults([]);
        setShowDropdown(false);
      } finally {
        setIsSearching(false);
      }
    }, 400);
    return () => clearTimeout(timeout);
  }, [searchTerm]);

  // Handlers for form fields
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Writers and splits management
  const [writerName, setWriterName] = useState("");
  const [writerRole, setWriterRole] = useState("");
  const [splitPercentage, setSplitPercentage] = useState("");

  const addWriter = () => {
    if (!writerName || !writerRole) return;
    setForm({
      ...form,
      writers: [...(form.writers || []), { name: writerName, role: writerRole }],
    });
    setWriterName("");
    setWriterRole("");
  };

  const addSplit = () => {
    if (!writerName || !splitPercentage) return;
    setForm({
      ...form,
      splits: [...(form.splits || []), { writerName, percentage: Number(splitPercentage) }],
    });
    setWriterName("");
    setSplitPercentage("");
  };

  // Handle Spotify track selection
  const handleSelectTrack = (track: any) => {
    setForm({
      ...form,
      title: track.name,
      spotifyId: track.id,
      isrc: track.isrc || "",
    });
    setSearchTerm(track.name + " " + track.artists);
    setShowDropdown(false);
  };

  useEffect(() => {
    // Load songs from localStorage on mount
    const stored = localStorage.getItem("songs");
    if (stored) {
      const allSongs = JSON.parse(stored);
      setSongs(allSongs.filter((s: any) => s.clientId === clientId));
    }
  }, [clientId]);

  const addActivity = (msg: string) => {
    const activity = JSON.parse(localStorage.getItem("activity") || "[]");
    activity.unshift(msg);
    localStorage.setItem("activity", JSON.stringify(activity.slice(0, 10)));
  };

  const handleAddSong = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.title || !form.spotifyId) {
      setError("Song title and Spotify ID are required.");
      return;
    }
    const newSong = {
      id: uuidv4(),
      clientId: clientId as string,
      title: form.title,
      spotifyId: form.spotifyId,
      isrc: form.isrc,
      writers: form.writers || [],
      splits: form.splits || [],
    };
    const updated = [...songs, newSong];
    setSongs(updated);
    // Save all songs (not just for this client)
    const allSongs = JSON.parse(localStorage.getItem("songs") || "[]");
    localStorage.setItem("songs", JSON.stringify([...allSongs, newSong]));
    addActivity(`Registered song: \"${newSong.title}\"`);
    setForm({ writers: [], splits: [] });
    setSearchTerm("");
    setError(null);
  };

  const handleDelete = (id: string) => {
    const updated = songs.filter((s) => s.id !== id);
    setSongs(updated);
    // Remove from all songs in localStorage
    const allSongs = JSON.parse(localStorage.getItem("songs") || "[]");
    localStorage.setItem(
      "songs",
      JSON.stringify(allSongs.filter((s: any) => s.id !== id))
    );
    addActivity("Deleted a song");
  };

  return (
    <div className="max-w-2xl mx-auto py-8">
      <Link href="/dashboard/clients" className="text-blue-600">&larr; Back to Clients</Link>
      <h1 className="text-2xl font-bold mb-4">Songs for Client</h1>
      <form onSubmit={handleAddSong} className="mb-6 space-y-2" autoComplete="off">
        <div className="relative">
          {/* Spotify Search Input */}
          <input
            name="spotifySearch"
            placeholder="Search for song on Spotify"
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className="border px-2 py-1 rounded w-full"
            autoComplete="off"
            onFocus={() => searchResults.length > 0 && setShowDropdown(true)}
          />
          {showDropdown && searchResults.length > 0 && (
            <ul className="absolute z-10 bg-white border w-full max-h-60 overflow-y-auto shadow-lg">
              {searchResults.map(track => (
                <li
                  key={track.id}
                  className="px-3 py-2 hover:bg-blue-100 cursor-pointer"
                  onClick={() => handleSelectTrack(track)}
                >
                  <div className="font-semibold">{track.name}</div>
                  <div className="text-xs text-gray-600">{track.artists} &mdash; {track.album}</div>
                  {track.isrc && <div className="text-xs text-gray-400">ISRC: {track.isrc}</div>}
                </li>
              ))}
            </ul>
          )}
        </div>
        {/* Autofilled fields from Spotify selection */}
        <div>
          <input
            name="title"
            placeholder="Song Title"
            value={form.title || ""}
            onChange={handleChange}
            className="border px-2 py-1 rounded w-full"
            required
            readOnly
          />
        </div>
        <div>
          <input
            name="spotifyId"
            placeholder="Spotify Track ID"
            value={form.spotifyId || ""}
            onChange={handleChange}
            className="border px-2 py-1 rounded w-full"
            required
            readOnly
          />
        </div>
        <div>
          <input
            name="isrc"
            placeholder="ISRC (optional)"
            value={form.isrc || ""}
            onChange={handleChange}
            className="border px-2 py-1 rounded w-full"
            readOnly
          />
        </div>
        {/* Writers and splits as before */}
        <div className="flex gap-2">
          <input
            placeholder="Writer Name"
            value={writerName}
            onChange={(e) => setWriterName(e.target.value)}
            className="border px-2 py-1 rounded w-full"
          />
          <input
            placeholder="Role"
            value={writerRole}
            onChange={(e) => setWriterRole(e.target.value)}
            className="border px-2 py-1 rounded w-full"
          />
          <button type="button" onClick={addWriter} className="bg-gray-200 px-2 rounded">Add Writer</button>
        </div>
        <div className="flex gap-2">
          <input
            placeholder="Writer Name (for split)"
            value={writerName}
            onChange={(e) => setWriterName(e.target.value)}
            className="border px-2 py-1 rounded w-full"
          />
          <input
            placeholder="Split %"
            type="number"
            value={splitPercentage}
            onChange={(e) => setSplitPercentage(e.target.value)}
            className="border px-2 py-1 rounded w-full"
          />
          <button type="button" onClick={addSplit} className="bg-gray-200 px-2 rounded">Add Split</button>
        </div>
        {error && <div className="text-red-500">{error}</div>}
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
          Add Song
        </button>
      </form>
      <div>
        <h2 className="text-xl font-semibold mb-2">Song List</h2>
        {songs.length === 0 && <div>No songs yet.</div>}
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
              <div className="flex gap-2">
                <button className="text-blue-600" disabled>Edit</button>
                <button className="text-red-600" onClick={() => handleDelete(song.id)}>Delete</button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
} 