"use client";
import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus } from 'lucide-react';
import {
  getWriters,
  createWriter,
  updateWriter,
  deleteWriter
} from "@/lib/dashboardServices";
import { Writer } from "@/lib/types";

export default function WritersPage() {
  const [writers, setWriters] = useState<Writer[]>([]);
  const [form, setForm] = useState<Partial<Writer>>({});
  const [editingId, setEditingId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // Load writers on mount
  useEffect(() => {
    (async () => {
      setLoading(true);
      setWriters(await getWriters());
      setLoading(false);
    })();
  }, []);

  // Handle form field changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Add or update writer
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.role) {
      setError("Name and role are required.");
      return;
    }
    setLoading(true);
    if (editingId) {
      await updateWriter(editingId, form);
      setEditingId(null);
    } else {
      await createWriter(form);
    }
    setWriters(await getWriters());
    setForm({});
    setError(null);
    setLoading(false);
  };

  // Edit writer
  const handleEdit = (writer: Writer) => {
    setForm(writer);
    setEditingId(writer.id);
  };

  // Delete writer
  const handleDelete = async (id: string) => {
    if (window.confirm("Are you sure you want to delete this writer?")) {
      setLoading(true);
      await deleteWriter(id);
      setWriters(await getWriters());
      if (editingId === id) {
        setEditingId(null);
        setForm({});
      }
      setLoading(false);
    }
  };

  // Cancel editing
  const handleCancel = () => {
    setEditingId(null);
    setForm({});
    setError(null);
  };

  return (
    <div className="p-8" style={{ backgroundColor: 'var(--color-background)', fontFamily: 'var(--font-sans)' }}>
      <header className="mb-8">
        <nav className="mb-4">
          <span style={{ fontSize: "var(--font-size-caption)", color: "var(--icon-color)" }}>
            Dashboard / Writers
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
              Manage your songwriter roster
            </h1>
            <p style={{ 
              fontSize: "var(--font-size-body)", 
              color: "var(--icon-color)",
              lineHeight: "var(--line-height-normal)"
            }}>
              Add, update, or archive writer profiles
            </p>
          </div>
          <Button 
            style={{ 
              borderRadius: "var(--radius-medium)",
              backgroundColor: "var(--color-accent)",
              color: "var(--color-foreground)"
            }}
            onClick={() => { setForm({}); setEditingId(null); }}
          >
            <Plus className="h-4 w-4 mr-2" />
            New Writer
          </Button>
        </div>
      </header>

      <form onSubmit={handleSubmit} className="mb-6">
        <Card style={{ 
          backgroundColor: 'var(--color-card)', 
          borderRadius: 'var(--radius-large)', 
          boxShadow: 'var(--shadow-card)',
          border: `1px solid var(--color-border)`
        }}>
          <CardContent className="p-6">
            <h3 style={{ 
              fontSize: "var(--font-size-heading)", 
              fontWeight: "var(--font-weight-bold)", 
              color: "var(--color-foreground)",
              marginBottom: "16px"
            }}>
              {editingId ? "Edit Writer" : "Add New Writer"}
            </h3>
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label style={{ 
                    fontSize: "var(--font-size-caption)", 
                    fontWeight: "var(--font-weight-medium)", 
                    color: "var(--color-foreground)",
                    marginBottom: "4px",
                    display: "block"
                  }}>
                    Writer Name
                  </label>
                  <input
                    name="name"
                    placeholder="Enter writer name..."
                    value={form.name || ""}
                    onChange={handleChange}
                    style={{ 
                      width: "100%",
                      padding: "8px 12px",
                      borderRadius: "var(--radius-medium)",
                      border: `1px solid var(--color-border)`,
                      fontSize: "var(--font-size-body)"
                    }}
                    required
                  />
                </div>
                <div>
                  <label style={{ 
                    fontSize: "var(--font-size-caption)", 
                    fontWeight: "var(--font-weight-medium)", 
                    color: "var(--color-foreground)",
                    marginBottom: "4px",
                    display: "block"
                  }}>
                    Role
                  </label>
                  <input
                    name="role"
                    placeholder="e.g. Composer, Lyricist"
                    value={form.role || ""}
                    onChange={handleChange}
                    style={{ 
                      width: "100%",
                      padding: "8px 12px",
                      borderRadius: "var(--radius-medium)",
                      border: `1px solid var(--color-border)`,
                      fontSize: "var(--font-size-body)"
                    }}
                    required
                  />
                </div>
              </div>
              
              {error && (
                <div style={{ 
                  color: "var(--destructive-foreground)",
                  fontSize: "var(--font-size-caption)",
                  marginTop: "8px"
                }}>
                  {error}
                </div>
              )}
              
              <div className="flex gap-2 pt-2">
                <Button 
                  type="submit" 
                  style={{ 
                    backgroundColor: "var(--color-primary)", 
                    color: "var(--color-primary-foreground)",
                    borderRadius: "var(--radius-medium)"
                  }} 
                  disabled={loading}
                >
                  {editingId ? "Update Writer" : "Add Writer"}
                </Button>
                {editingId && (
                  <Button 
                    type="button" 
                    variant="outline" 
                    onClick={handleCancel} 
                    disabled={loading}
                    style={{ borderRadius: "var(--radius-medium)" }}
                  >
                    Cancel
                  </Button>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      </form>

      <section>
        <h2 style={{ 
          fontSize: "var(--font-size-heading)", 
          fontWeight: "var(--font-weight-bold)", 
          color: "var(--color-foreground)",
          marginBottom: "16px"
        }}>
          Current Writers
        </h2>
        {loading ? (
          <div style={{ color: "var(--icon-color)" }}>Loading...</div>
        ) : (
          <div className="space-y-4">
            {writers.length === 0 && (
              <Card style={{ 
                backgroundColor: 'var(--color-muted)', 
                borderRadius: 'var(--radius-medium)', 
                border: `1px solid var(--color-border)`
              }}>
                <CardContent className="p-6 text-center">
                  <p style={{ color: "var(--icon-color)" }}>No writers yet. Add your first writer above.</p>
                </CardContent>
              </Card>
            )}
            {writers.map(writer => (
              <Card key={writer.id} style={{ 
                backgroundColor: 'var(--color-card)', 
                borderRadius: 'var(--radius-medium)', 
                boxShadow: 'var(--shadow-sm)',
                border: `1px solid var(--color-border)`
              }}>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 style={{ 
                        color: "var(--color-foreground)", 
                        fontWeight: "var(--font-weight-bold)",
                        fontSize: "var(--font-size-body)",
                        marginBottom: "4px"
                      }}>
                        {writer.name}
                      </h3>
                      <p style={{ 
                        color: "var(--icon-color)", 
                        fontSize: "var(--font-size-caption)"
                      }}>
                        {writer.role}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <Button 
                        variant="outline" 
                        size="sm" 
                        onClick={() => handleEdit(writer)} 
                        disabled={loading}
                        style={{ borderRadius: "var(--radius-medium)" }}
                      >
                        Edit
                      </Button>
                      <Button 
                        variant="destructive" 
                        size="sm" 
                        onClick={() => handleDelete(writer.id)} 
                        disabled={loading}
                        style={{ borderRadius: "var(--radius-medium)" }}
                      >
                        Delete
                      </Button>
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
