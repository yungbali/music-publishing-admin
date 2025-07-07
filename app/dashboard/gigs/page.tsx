"use client";
import React, { useEffect, useState } from "react";
import AnimatedContent from "@/components/ui/AnimatedContent";
import BlurText from "@/components/ui/BlurText";
import Link from "next/link";
import {
  getGigs,
  createGig,
  updateGig,
  deleteGig,
  getClients,
  getSongs
} from "@/lib/dashboardServices";
import { Gig, Client, Song } from "@/lib/types";

export default function GigsPage() {
  const [gigs, setGigs] = useState<Gig[]>([]);
  const [clients, setClients] = useState<Client[]>([]);
  const [songs, setSongs] = useState<Song[]>([]);
  const [form, setForm] = useState<Partial<Gig>>({ setlist: [] });
  const [editingId, setEditingId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [setlistSongId, setSetlistSongId] = useState<string>("");

  useEffect(() => {
    setGigs(getGigs());
    setClients(getClients());
    setSongs(getSongs());
  }, []);

  // Handle form field changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Add or update gig
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.date || !form.venue || !form.clientId) {
      setError("Date, venue, and client are required.");
      return;
    }
    if (editingId) {
      updateGig(editingId, form);
      setEditingId(null);
    } else {
      createGig(form);
    }
    setGigs(getGigs());
    setForm({ setlist: [] });
    setError(null);
  };

  // Edit gig
  const handleEdit = (gig: Gig) => {
    setForm(gig);
    setEditingId(gig.id);
  };

  // Delete gig
  const handleDelete = (id: string) => {
    if (window.confirm("Are you sure you want to delete this gig?")) {
      deleteGig(id);
      setGigs(getGigs());
      if (editingId === id) {
        setEditingId(null);
        setForm({ setlist: [] });
      }
    }
  };

  // Cancel editing
  const handleCancel = () => {
    setEditingId(null);
    setForm({ setlist: [] });
    setError(null);
  };

  // Add song to setlist
  const handleAddSetlistSong = () => {
    if (!setlistSongId) return;
    setForm({
      ...form,
      setlist: [...(form.setlist || []), setlistSongId]
    });
    setSetlistSongId("");
  };

  // Remove song from setlist
  const handleRemoveSetlistSong = (songId: string) => {
    setForm({
      ...form,
      setlist: (form.setlist || []).filter((id) => id !== songId)
    });
  };

  return (
    <AnimatedContent className="max-w-2xl mx-auto py-8">
      <Link href="/dashboard" className="text-blue-600">&larr; Back to Dashboard</Link>
      <BlurText as="h1" className="text-2xl font-bold mb-2" style={{ color: "var(--color-foreground)" }}>
        Log live performances
      </BlurText>
      <div className="mb-4 text-lg" style={{ color: "var(--color-foreground)" }}>
        Capture setlists for royalty claims
      </div>
      <form onSubmit={handleSubmit} className="mb-6 space-y-2 bg-white/80 p-4 rounded shadow">
        <div className="flex gap-2">
          <input
            name="date"
            type="date"
            placeholder="Date"
            value={form.date || ""}
            onChange={handleChange}
            className="border px-2 py-1 rounded w-full"
            required
          />
          <input
            name="venue"
            placeholder="Venue"
            value={form.venue || ""}
            onChange={handleChange}
            className="border px-2 py-1 rounded w-full"
            required
          />
        </div>
        <div className="flex gap-2">
          <select
            name="clientId"
            value={form.clientId || ""}
            onChange={handleChange}
            className="border px-2 py-1 rounded w-full"
            required
          >
            <option value="">Select Client</option>
            {clients.map(c => (
              <option key={c.id} value={c.id}>{c.name}</option>
            ))}
          </select>
        </div>
        {/* Setlist assignment */}
        <div className="flex gap-2 items-center">
          <select
            value={setlistSongId}
            onChange={e => setSetlistSongId(e.target.value)}
            className="border px-2 py-1 rounded w-full"
          >
            <option value="">Add Song to Setlist</option>
            {songs.map(s => (
              <option key={s.id} value={s.id}>{s.title}</option>
            ))}
          </select>
          <button type="button" onClick={handleAddSetlistSong} className="bg-gray-200 px-2 rounded">Add</button>
        </div>
        <div className="flex flex-wrap gap-2 mb-2">
          {(form.setlist || []).map(songId => {
            const song = songs.find(s => s.id === songId);
            return song ? (
              <span key={songId} className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs flex items-center">
                {song.title}
                <button type="button" onClick={() => handleRemoveSetlistSong(songId)} className="ml-1 text-red-500">&times;</button>
              </span>
            ) : null;
          })}
        </div>
        {error && <div className="text-red-500 text-sm">{error}</div>}
        <div className="flex gap-2 mt-2">
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded font-semibold"
          >
            {editingId ? "Update Gig" : "Add Gig"}
          </button>
          {editingId && (
            <button
              type="button"
              onClick={handleCancel}
              className="bg-gray-300 text-gray-700 px-4 py-2 rounded font-semibold"
            >
              Cancel
            </button>
          )}
        </div>
      </form>
      <div className="mb-2 font-semibold">Current Gigs:</div>
      <ul className="space-y-2">
        {gigs.length === 0 && <li className="text-gray-500">No gigs yet.</li>}
        {gigs.map(gig => (
          <li key={gig.id} className="flex flex-col bg-gray-50 rounded px-3 py-2 shadow-sm mb-2">
            <div className="flex justify-between items-center">
              <div>
                <span className="font-bold" style={{ color: "var(--color-foreground)" }}>{gig.venue}</span>
                <span className="ml-2 text-xs text-gray-400">{gig.date}</span>
                {gig.clientId && (
                  <span className="ml-2 text-xs text-gray-500">{clients.find(c => c.id === gig.clientId)?.name}</span>
                )}
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => handleEdit(gig)}
                  className="text-blue-600 hover:underline text-sm"
                >Edit</button>
                <button
                  onClick={() => handleDelete(gig.id)}
                  className="text-red-500 hover:underline text-sm"
                >Delete</button>
              </div>
            </div>
            <div className="text-xs text-gray-600 mt-1">
              Setlist: {(gig.setlist || []).map(songId => songs.find(s => s.id === songId)?.title).filter(Boolean).join(", ") || "-"}
            </div>
          </li>
        ))}
      </ul>
      <div className="mt-6 mb-2 font-semibold">You can:</div>
      <ul className="list-disc ml-6 text-gray-700 space-y-2">
        <li>Record gig dates, venues, and attendance</li>
        <li>Attach setlists for performance royalties</li>
        <li>Flag songs for follow-up sync or licensing</li>
        <li>Export gig data for PRO reporting</li>
      </ul>
    </AnimatedContent>
  );
} 