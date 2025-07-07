"use client";
import React, { useEffect, useState } from "react";
import AnimatedContent from "@/components/ui/AnimatedContent";
import BlurText from "@/components/ui/BlurText";
import Link from "next/link";
import {
  getSongs,
  createSong,
  updateSong,
  deleteSong,
  getWriters
} from "@/lib/dashboardServices";
import { Song, Writer, Split } from "@/lib/types";

export default function SongsPage() {
  const [songs, setSongs] = useState<Song[]>([]);
  const [writers, setWriters] = useState<Writer[]>([]);
  const [form, setForm] = useState<Partial<Song>>({ writers: [], splits: [] });
  const [editingId, setEditingId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [writerId, setWriterId] = useState<string>("");
  const [splitPercentage, setSplitPercentage] = useState<string>("");
  const [loading, setLoading] = useState(false);

  // Spotify search state
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);

  useEffect(() => {
    (async () => {
      setLoading(true);
      setSongs(await getSongs());
      setWriters(await getWriters());
      setLoading(false);
    })();
  }, []);

  // Debounced Spotify search
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

  // Handle form field changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Add or update song
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.title) {
      setError("Song title is required.");
      return;
    }
    if ((form.splits || []).reduce((sum, s) => sum + (s.percentage || 0), 0) > 100) {
      setError("Total splits cannot exceed 100%.");
      return;
    }
    setLoading(true);
    if (editingId) {
      await updateSong(editingId, form);
      setEditingId(null);
    } else {
      await createSong(form);
    }
    setSongs(await getSongs());
    setForm({ writers: [], splits: [] });
    setError(null);
    setLoading(false);
  };

  // Edit song
  const handleEdit = (song: Song) => {
    setForm(song);
    setEditingId(song.id);
  };

  // Delete song
  const handleDelete = async (id: string) => {
    if (window.confirm("Are you sure you want to delete this song?")) {
      setLoading(true);
      await deleteSong(id);
      setSongs(await getSongs());
      if (editingId === id) {
        setEditingId(null);
        setForm({ writers: [], splits: [] });
      }
      setLoading(false);
    }
  };

  // Cancel editing
  const handleCancel = () => {
    setEditingId(null);
    setForm({ writers: [], splits: [] });
    setError(null);
  };

  // Add writer to song
  const handleAddWriter = () => {
    if (!writerId) return;
    const writer = writers.find(w => w.id === writerId);
    if (!writer) return;
    setForm({
      ...form,
      writers: [...(form.writers || []), writer]
    });
    setWriterId("");
  };

  // Add split to song
  const handleAddSplit = () => {
    if (!writerId || !splitPercentage) return;
    const writer = writers.find(w => w.id === writerId);
    if (!writer) return;
    setForm({
      ...form,
      splits: [...(form.splits || []), { writerName: writer.name, percentage: Number(splitPercentage) }]
    });
    setWriterId("");
    setSplitPercentage("");
  };

  // Remove writer from song
  const handleRemoveWriter = (id: string) => {
    setForm({
      ...form,
      writers: (form.writers || []).filter(w => w.id !== id)
    });
  };

  // Remove split from song
  const handleRemoveSplit = (writerName: string) => {
    setForm({
      ...form,
      splits: (form.splits || []).filter(s => s.writerName !== writerName)
    });
  };

  return (
    <AnimatedContent className="max-w-2xl mx-auto py-8">
      <Link href="/dashboard" className="text-blue-600">&larr; Back to Dashboard</Link>
      <BlurText as="h1" className="text-2xl font-bold mb-2" style={{ color: "var(--color-foreground)" }}>
        Organize your catalog
      </BlurText>
      <div className="mb-4 text-lg" style={{ color: "var(--color-foreground)" }}>
        Register and track every composition
      </div>
      <form onSubmit={handleSubmit} className="mb-6 space-y-2 bg-white/80 p-4 rounded shadow">
        {/* Spotify Search */}
        <div className="mb-2 relative">
          <input
            type="text"
            placeholder="Search Spotify for a song..."
            value={searchTerm}
            onChange={e => {
              setSearchTerm(e.target.value);
              setShowDropdown(true);
            }}
            className="border px-2 py-1 rounded w-full"
            autoComplete="off"
            onFocus={() => searchResults.length > 0 && setShowDropdown(true)}
          />
          {showDropdown && searchResults.length > 0 && (
            <div className="absolute z-10 bg-white border rounded shadow w-full max-h-60 overflow-y-auto mt-1">
              {searchResults.map(track => (
                <div
                  key={track.id}
                  className="px-3 py-2 hover:bg-gray-100 cursor-pointer"
                  onClick={() => handleSelectTrack(track)}
                >
                  <div className="font-semibold">{track.name}</div>
                  <div className="text-xs text-gray-500">{track.artists} &mdash; {track.album}</div>
                  {track.isrc && <div className="text-xs text-gray-400">ISRC: {track.isrc}</div>}
                </div>
              ))}
            </div>
          )}
        </div>
        {/* Show selected Spotify track */}
        {form.spotifyId && (
          <div className="mb-2 flex items-center gap-2 text-xs text-gray-600">
            <span className="bg-green-100 text-green-800 px-2 py-1 rounded">Spotify Track Linked</span>
            <span>{form.title}</span>
            {form.isrc && <span className="ml-2">ISRC: {form.isrc}</span>}
            <button type="button" className="ml-2 text-red-500" onClick={() => {
              setForm({ ...form, spotifyId: undefined });
              setSearchTerm("");
            }}>
              Clear
            </button>
          </div>
        )}
        <div className="flex gap-2">
          <input
            name="title"
            placeholder="Song Title"
            value={form.title || ""}
            onChange={handleChange}
            className="border px-2 py-1 rounded w-full"
            required
          />
          <input
            name="isrc"
            placeholder="ISRC (optional)"
            value={form.isrc || ""}
            onChange={handleChange}
            className="border px-2 py-1 rounded w-full"
          />
        </div>
        {/* Writers assignment */}
        <div className="flex gap-2 items-center">
          <select
            value={writerId}
            onChange={e => setWriterId(e.target.value)}
            className="border px-2 py-1 rounded w-full"
          >
            <option value="">Select Writer</option>
            {writers.map(w => (
              <option key={w.id} value={w.id}>{w.name} ({w.role})</option>
            ))}
          </select>
          <button type="button" onClick={handleAddWriter} className="bg-gray-200 px-2 rounded">Add Writer</button>
        </div>
        <div className="flex flex-wrap gap-2 mb-2">
          {(form.writers || []).map(w => (
            <span key={w.id} className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs flex items-center">
              {w.name}
              <button type="button" onClick={() => handleRemoveWriter(w.id)} className="ml-1 text-red-500">&times;</button>
            </span>
          ))}
        </div>
        {/* Splits assignment */}
        <div className="flex gap-2 items-center">
          <select
            value={writerId}
            onChange={e => setWriterId(e.target.value)}
            className="border px-2 py-1 rounded w-full"
          >
            <option value="">Select Writer for Split</option>
            {writers.map(w => (
              <option key={w.id} value={w.id}>{w.name}</option>
            ))}
          </select>
          <input
            type="number"
            placeholder="Split %"
            value={splitPercentage}
            onChange={e => setSplitPercentage(e.target.value)}
            className="border px-2 py-1 rounded w-24"
            min={0}
            max={100}
          />
          <button type="button" onClick={handleAddSplit} className="bg-gray-200 px-2 rounded">Add Split</button>
        </div>
        <div className="flex flex-wrap gap-2 mb-2">
          {(form.splits || []).map(s => (
            <span key={s.writerName} className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs flex items-center">
              {s.writerName}: {s.percentage}%
              <button type="button" onClick={() => handleRemoveSplit(s.writerName)} className="ml-1 text-red-500">&times;</button>
            </span>
          ))}
        </div>
        {error && <div className="text-red-500 text-sm">{error}</div>}
        <div className="flex gap-2 mt-2">
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded font-semibold"
            disabled={loading}
          >
            {editingId ? "Update Song" : "Add Song"}
          </button>
          {editingId && (
            <button
              type="button"
              onClick={handleCancel}
              className="bg-gray-300 text-gray-700 px-4 py-2 rounded font-semibold"
              disabled={loading}
            >
              Cancel
            </button>
          )}
        </div>
      </form>
      <div className="mb-2 font-semibold">Current Songs:</div>
      <ul className="space-y-2">
        {songs.length === 0 && <li className="text-gray-500">No songs yet.</li>}
        {songs.map(song => (
          <li key={song.id} className="flex flex-col bg-gray-50 rounded px-3 py-2 shadow-sm mb-2">
            <div className="flex justify-between items-center">
              <div>
                <span className="font-bold" style={{ color: "var(--color-foreground)" }}>{song.title}</span>
                {song.isrc && <span className="ml-2 text-xs text-gray-400">ISRC: {song.isrc}</span>}
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => handleEdit(song)}
                  className="text-blue-600 hover:underline text-sm"
                >Edit</button>
                <button
                  onClick={() => handleDelete(song.id)}
                  className="text-red-500 hover:underline text-sm"
                >Delete</button>
              </div>
            </div>
            <div className="text-xs text-gray-600 mt-1">
              Writers: {(song.writers || []).map(w => w.name).join(", ") || "-"}
            </div>
            <div className="text-xs text-gray-600">
              Splits: {(song.splits || []).map(s => `${s.writerName}: ${s.percentage}%`).join(", ") || "-"}
            </div>
          </li>
        ))}
      </ul>
      <div className="mt-6 mb-2 font-semibold">You can:</div>
      <ul className="list-disc ml-6 text-gray-700 space-y-2">
        <li>Upload or edit song metadata (title, ISWC, PRO codes)</li>
        <li>Assign writer shares and publisher shares (<a href="https://www.tunecore.com/guides/music-publishing-101?utm_source=chatgpt.com" target="_blank" rel="noopener noreferrer" className="underline text-blue-600">learn more</a>)</li>
        <li>Register works with collection societies automatically</li>
        <li>Search, filter, and bulk-update song records</li>
      </ul>
    </AnimatedContent>
  );
} 