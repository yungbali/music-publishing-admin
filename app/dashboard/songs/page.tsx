"use client";
import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus } from 'lucide-react';
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
    <div className="p-8" style={{ backgroundColor: "var(--color-background)", fontFamily: "var(--font-sans)" }}>
      {/* Header with Breadcrumbs */}
      <header className="mb-8">
        <nav className="mb-4">
          <span style={{ fontSize: "var(--font-size-caption)", color: "var(--icon-color)" }}>
            Dashboard / Songs
          </span>
        </nav>
        <div className="flex justify-between items-center">
          <div>
            <h1 style={{ 
              fontSize: "var(--font-size-title)", 
              fontWeight: "var(--font-weight-bold)", 
              color: "var(--color-foreground)",
              lineHeight: "var(--line-height-tight)"
            }}>
              Organize your catalog
            </h1>
            <p style={{ 
              fontSize: "var(--font-size-body)", 
              color: "var(--icon-color)",
              lineHeight: "var(--line-height-normal)"
            }}>
              Register and track every composition
            </p>
          </div>
          <Button 
            style={{ 
              borderRadius: "var(--radius-medium)",
              backgroundColor: "var(--color-accent)",
              color: "var(--color-foreground)"
            }}
            onClick={() => { setForm({ writers: [], splits: [] }); setEditingId(null); }}
          >
            <Plus className="h-4 w-4 mr-2" />
            New Song
          </Button>
        </div>
      </header>

      {/* Song Form */}
      <form onSubmit={handleSubmit} className="mb-6">
        <Card style={{ backgroundColor: "var(--color-card)", borderRadius: "var(--radius-large)", boxShadow: "var(--shadow-card)", border: `1px solid var(--color-border)` }}>
          <CardContent className="p-6 space-y-4">
            {/* Spotify Search */}
            <div className="relative">
              <input
                type="text"
                placeholder="Search Spotify for a song..."
                value={searchTerm}
                onChange={e => {
                  setSearchTerm(e.target.value);
                  setShowDropdown(true);
                }}
                style={{ borderColor: "var(--color-border)", borderRadius: "var(--radius-medium)" }}
                className="border px-3 py-2 w-full"
                autoComplete="off"
                onFocus={() => searchResults.length > 0 && setShowDropdown(true)}
              />
              {showDropdown && searchResults.length > 0 && (
                <div 
                  className="absolute z-10 border w-full max-h-60 overflow-y-auto mt-1"
                  style={{ backgroundColor: "var(--color-card)", borderColor: "var(--color-border)", borderRadius: "var(--radius-medium)", boxShadow: "var(--shadow-lg)" }}
                >
                  {searchResults.map(track => (
                    <div
                      key={track.id}
                      className="px-3 py-2 hover:bg-accent cursor-pointer"
                      style={{ borderRadius: "var(--radius-sm)" }}
                      onClick={() => handleSelectTrack(track)}
                    >
                      <div style={{ fontWeight: "var(--font-weight-medium)" }}>{track.name}</div>
                      <div style={{ fontSize: "var(--font-size-caption)", color: "var(--icon-color)" }}>{track.artists} — {track.album}</div>
                      {track.isrc && <div style={{ fontSize: "var(--font-size-caption)", color: "var(--icon-color)" }}>ISRC: {track.isrc}</div>}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Song Details */}
            <div className="flex gap-2">
              <input
                name="title"
                placeholder="Song Title"
                value={form.title || ""}
                onChange={handleChange}
                style={{ borderColor: "var(--color-border)", borderRadius: "var(--radius-medium)" }}
                className="border px-3 py-2 w-full"
                required
              />
              <input
                name="isrc"
                placeholder="ISRC (optional)"
                value={form.isrc || ""}
                onChange={handleChange}
                style={{ borderColor: "var(--color-border)", borderRadius: "var(--radius-medium)" }}
                className="border px-3 py-2 w-full"
              />
            </div>

            {error && <div style={{ color: "var(--destructive-foreground)" }}>{error}</div>}
            
            <div className="flex gap-2">
              <Button type="submit" style={{ backgroundColor: "var(--color-primary)", color: "var(--color-primary-foreground)" }} disabled={loading}>
                {editingId ? "Update Song" : "Add Song"}
              </Button>
              {editingId && (
                <Button type="button" variant="outline" onClick={handleCancel} disabled={loading}>
                  Cancel
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      </form>

      {/* Current Songs */}
      <section>
        <h2 style={{ fontSize: "var(--font-size-heading)", fontWeight: "var(--font-weight-bold)", color: "var(--color-foreground)", marginBottom: "16px" }}>
          Current Songs
        </h2>
        {loading ? (
          <div style={{ color: "var(--icon-color)" }}>Loading...</div>
        ) : (
          <div className="space-y-4">
            {songs.length === 0 && <div style={{ color: "var(--icon-color)" }}>No songs yet.</div>}
            {songs.map(song => (
              <Card key={song.id} style={{ backgroundColor: "var(--color-card)", borderRadius: "var(--radius-medium)", boxShadow: "var(--shadow-sm)", border: `1px solid var(--color-border)` }}>
                <CardContent className="p-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 style={{ fontSize: "var(--font-size-heading)", fontWeight: "var(--font-weight-bold)", color: "var(--color-foreground)" }}>{song.title}</h3>
                      {song.isrc && <span style={{ fontSize: "var(--font-size-caption)", color: "var(--icon-color)" }}>ISRC: {song.isrc}</span>}
                      <div style={{ fontSize: "var(--font-size-caption)", color: "var(--icon-color)", marginTop: "4px" }}>
                        Writers: {(song.writers || []).map(w => w.name).join(", ") || "-"}
                      </div>
                      <div style={{ fontSize: "var(--font-size-caption)", color: "var(--icon-color)" }}>
                        Splits: {(song.splits || []).map(s => `${s.writerName}: ${s.percentage}%`).join(", ") || "-"}
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" onClick={() => handleEdit(song)}>Edit</Button>
                      <Button variant="destructive" size="sm" onClick={() => handleDelete(song.id)}>Delete</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
