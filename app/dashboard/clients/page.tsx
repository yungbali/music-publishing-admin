"use client";
import React, { useState } from "react";
import { Client } from "@/lib/types";
import { v4 as uuidv4 } from "uuid";
import Link from "next/link";

const initialClients: Client[] = [];

export default function ClientsPage() {
  const [clients, setClients] = useState<Client[]>(initialClients);
  const [form, setForm] = useState<Partial<Client>>({});
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleAddClient = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email) {
      setError("Name and email are required.");
      return;
    }
    setClients([
      ...clients,
      {
        id: uuidv4(),
        name: form.name!,
        email: form.email!,
        phone: form.phone,
        contactPerson: form.contactPerson,
        paymentInfo: form.paymentInfo,
        taxInfo: form.taxInfo,
      },
    ]);
    setForm({});
    setError(null);
  };

  const handleDelete = (id: string) => {
    setClients(clients.filter((c) => c.id !== id));
  };

  return (
    <div className="max-w-2xl mx-auto py-8">
      <h1 className="text-2xl font-bold mb-4">Clients</h1>
      <form onSubmit={handleAddClient} className="mb-6 space-y-2">
        <div>
          <input
            name="name"
            placeholder="Name"
            value={form.name || ""}
            onChange={handleChange}
            className="border px-2 py-1 rounded w-full"
            required
          />
        </div>
        <div>
          <input
            name="email"
            placeholder="Email"
            value={form.email || ""}
            onChange={handleChange}
            className="border px-2 py-1 rounded w-full"
            required
          />
        </div>
        <div>
          <input
            name="phone"
            placeholder="Phone (optional)"
            value={form.phone || ""}
            onChange={handleChange}
            className="border px-2 py-1 rounded w-full"
          />
        </div>
        <div>
          <input
            name="contactPerson"
            placeholder="Contact Person (optional)"
            value={form.contactPerson || ""}
            onChange={handleChange}
            className="border px-2 py-1 rounded w-full"
          />
        </div>
        <div>
          <input
            name="paymentInfo"
            placeholder="Payment Info (optional)"
            value={form.paymentInfo || ""}
            onChange={handleChange}
            className="border px-2 py-1 rounded w-full"
          />
        </div>
        <div>
          <input
            name="taxInfo"
            placeholder="Tax Info (optional)"
            value={form.taxInfo || ""}
            onChange={handleChange}
            className="border px-2 py-1 rounded w-full"
          />
        </div>
        {error && <div className="text-red-500">{error}</div>}
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
          Add Client
        </button>
      </form>
      <div>
        <h2 className="text-xl font-semibold mb-2">Client List</h2>
        {clients.length === 0 && <div>No clients yet.</div>}
        <ul className="space-y-2">
          {clients.map((client) => (
            <li key={client.id} className="border rounded p-3 flex justify-between items-center">
              <div>
                <div className="font-bold">{client.name}</div>
                <div className="text-sm text-gray-600">{client.email}</div>
                {client.phone && <div className="text-sm">Phone: {client.phone}</div>}
                {client.contactPerson && <div className="text-sm">Contact: {client.contactPerson}</div>}
              </div>
              <div className="flex gap-2">
                <Link href={`/dashboard/clients/${client.id}/songs`}>
                  <button className="text-green-600" type="button">Manage Songs</button>
                </Link>
                <button className="text-blue-600" disabled>Edit</button>
                <button className="text-red-600" onClick={() => handleDelete(client.id)}>Delete</button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
} 