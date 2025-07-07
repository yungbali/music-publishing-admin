// Centralized CRUD and business logic for publishing admin dashboard (in-memory/localStorage prototype)
import { v4 as uuidv4 } from "uuid";
import { Writer, Song, Gig, Opportunity, Sync, Royalty, Statement, Broadcast, User, Client, Split } from "./types";
import client from "./typesenseClient";

// Utility to get/set from localStorage
function getFromStorage<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;
  const stored = localStorage.getItem(key);
  return stored ? JSON.parse(stored) : fallback;
}
function setToStorage<T>(key: string, value: T) {
  if (typeof window === "undefined") return;
  localStorage.setItem(key, JSON.stringify(value));
}

// --- Typesense CRUD for Songs ---
export async function getSongs(query = ""): Promise<Song[]> {
  const result = await client.collections('songs').documents().search({
    q: query || '*',
    query_by: 'title,isrc',
    per_page: 100,
  });
  
  return result.hits?.map((hit: any) => {
    const doc = hit.document;
    // Reconstruct the Song object from flattened Typesense document
    return {
      id: doc.id,
      clientId: doc.clientId,
      spotifyId: doc.spotifyId,
      title: doc.title,
      isrc: doc.isrc,
      writers: doc.writers || [], // Use original if available, otherwise empty array
      splits: doc.splitInfo ? JSON.parse(doc.splitInfo) : (doc.splits || [])
    } as Song;
  }) || [];
}
export async function createSong(data: Partial<Song>): Promise<Song> {
  const song: Song = { ...data, id: uuidv4() } as Song;
  
  // Prepare document for Typesense with flattened structure
  const typesenseDoc = {
    ...song,
    writerNames: song.writers?.map(w => w.name) || [],
    splitInfo: JSON.stringify(song.splits || []),
    created_at: Date.now()
  };
  
  await client.collections('songs').documents().create(typesenseDoc);
  return song;
}
export async function updateSong(id: string, data: Partial<Song>): Promise<Song | null> {
  try {
    // Prepare update data with flattened structure
    const updateDoc: any = { ...data };
    if (data.writers) {
      updateDoc.writerNames = data.writers.map(w => w.name);
    }
    if (data.splits) {
      updateDoc.splitInfo = JSON.stringify(data.splits);
    }
    
    const updated = await client.collections('songs').documents(id).update(updateDoc);
    
    // Reconstruct the Song object
    const updatedDoc = updated as any;
    return {
      id: updatedDoc.id,
      clientId: updatedDoc.clientId,
      spotifyId: updatedDoc.spotifyId,
      title: updatedDoc.title,
      isrc: updatedDoc.isrc,
      writers: updatedDoc.writers || data.writers || [],
      splits: updatedDoc.splitInfo ? JSON.parse(updatedDoc.splitInfo) : (data.splits || [])
    } as Song;
  } catch {
    return null;
  }
}
export async function deleteSong(id: string): Promise<void> {
  await client.collections('songs').documents(id).delete();
}
export async function getSongById(id: string): Promise<Song | null> {
  try {
    const doc = await client.collections('songs').documents(id).retrieve();
    
    // Reconstruct the Song object from flattened Typesense document
    const songDoc = doc as any;
    return {
      id: songDoc.id,
      clientId: songDoc.clientId,
      spotifyId: songDoc.spotifyId,
      title: songDoc.title,
      isrc: songDoc.isrc,
      writers: songDoc.writers || [],
      splits: songDoc.splitInfo ? JSON.parse(songDoc.splitInfo) : (songDoc.splits || [])
    } as Song;
  } catch {
    return null;
  }
}

// --- Typesense CRUD for Writers ---
export async function getWriters(query = ""): Promise<Writer[]> {
  const result = await client.collections('writers').documents().search({
    q: query || '*',
    query_by: 'name',
    per_page: 100,
  });
  return result.hits?.map((hit: any) => {
    const doc = hit.document;
    return {
      id: doc.id,
      name: doc.name,
      role: doc.role,
      email: doc.email,
      contactInfo: doc.contactInfo
    } as Writer;
  }) || [];
}
export async function createWriter(data: Partial<Writer>): Promise<Writer> {
  const writer: Writer = { ...data, id: uuidv4() } as Writer;
  const typesenseDoc = {
    ...writer,
    created_at: Date.now()
  };
  await client.collections('writers').documents().create(typesenseDoc);
  return writer;
}
export async function updateWriter(id: string, data: Partial<Writer>): Promise<Writer | null> {
  try {
    const updated = await client.collections('writers').documents(id).update(data);
    return updated as Writer;
  } catch {
    return null;
  }
}
export async function deleteWriter(id: string): Promise<void> {
  await client.collections('writers').documents(id).delete();
}
export async function getWriterById(id: string): Promise<Writer | null> {
  try {
    const writer = await client.collections('writers').documents(id).retrieve();
    return writer as Writer;
  } catch {
    return null;
  }
}

// --- Typesense CRUD for Clients ---
export async function getClients(query = ""): Promise<Client[]> {
  const result = await client.collections('clients').documents().search({
    q: query || '*',
    query_by: 'name',
    per_page: 100,
  });
  return result.hits?.map((hit: any) => {
    const doc = hit.document;
    return {
      id: doc.id,
      name: doc.name,
      email: doc.email,
      phone: doc.phone,
      contactPerson: doc.contactPerson,
      paymentInfo: doc.paymentInfo,
      taxInfo: doc.taxInfo
    } as Client;
  }) || [];
}
export async function createClient(data: Partial<Client>): Promise<Client> {
  const clientObj: Client = { ...data, id: uuidv4() } as Client;
  const typesenseDoc = {
    ...clientObj,
    created_at: Date.now()
  };
  await client.collections('clients').documents().create(typesenseDoc);
  return clientObj;
}
export async function updateClient(id: string, data: Partial<Client>): Promise<Client | null> {
  try {
    const updated = await client.collections('clients').documents(id).update(data);
    return updated as Client;
  } catch {
    return null;
  }
}
export async function deleteClient(id: string): Promise<void> {
  await client.collections('clients').documents(id).delete();
}
export async function getClientById(id: string): Promise<Client | null> {
  try {
    const clientObj = await client.collections('clients').documents(id).retrieve();
    return clientObj as Client;
  } catch {
    return null;
  }
}

// Gigs
export function getGigs(): Gig[] {
  return getFromStorage<Gig[]>("gigs", []);
}
export function createGig(data: Partial<Gig>): Gig {
  const gigs = getGigs();
  const newGig: Gig = { ...data, id: uuidv4() } as Gig;
  gigs.push(newGig);
  setToStorage("gigs", gigs);
  return newGig;
}
export function updateGig(id: string, data: Partial<Gig>): Gig | null {
  const gigs = getGigs();
  const idx = gigs.findIndex(g => g.id === id);
  if (idx === -1) return null;
  gigs[idx] = { ...gigs[idx], ...data };
  setToStorage("gigs", gigs);
  return gigs[idx];
}
export function deleteGig(id: string): void {
  const gigs = getGigs().filter(g => g.id !== id);
  setToStorage("gigs", gigs);
}
export function getGigById(id: string): Gig | null {
  return getGigs().find(g => g.id === id) || null;
}

// Opportunities
export function getOpportunities(): Opportunity[] {
  return getFromStorage<Opportunity[]>("opportunities", []);
}
export function createOpportunity(data: Partial<Opportunity>): Opportunity {
  const opportunities = getOpportunities();
  const newOpportunity: Opportunity = { ...data, id: uuidv4() } as Opportunity;
  opportunities.push(newOpportunity);
  setToStorage("opportunities", opportunities);
  return newOpportunity;
}
export function updateOpportunity(id: string, data: Partial<Opportunity>): Opportunity | null {
  const opportunities = getOpportunities();
  const idx = opportunities.findIndex(o => o.id === id);
  if (idx === -1) return null;
  opportunities[idx] = { ...opportunities[idx], ...data };
  setToStorage("opportunities", opportunities);
  return opportunities[idx];
}
export function deleteOpportunity(id: string): void {
  const opportunities = getOpportunities().filter(o => o.id !== id);
  setToStorage("opportunities", opportunities);
}
export function getOpportunityById(id: string): Opportunity | null {
  return getOpportunities().find(o => o.id === id) || null;
}

// Syncs
export function getSyncs(): Sync[] {
  return getFromStorage<Sync[]>("syncs", []);
}
export function createSync(data: Partial<Sync>): Sync {
  const syncs = getSyncs();
  const newSync: Sync = { ...data, id: uuidv4() } as Sync;
  syncs.push(newSync);
  setToStorage("syncs", syncs);
  return newSync;
}
export function updateSync(id: string, data: Partial<Sync>): Sync | null {
  const syncs = getSyncs();
  const idx = syncs.findIndex(s => s.id === id);
  if (idx === -1) return null;
  syncs[idx] = { ...syncs[idx], ...data };
  setToStorage("syncs", syncs);
  return syncs[idx];
}
export function deleteSync(id: string): void {
  const syncs = getSyncs().filter(s => s.id !== id);
  setToStorage("syncs", syncs);
}
export function getSyncById(id: string): Sync | null {
  return getSyncs().find(s => s.id === id) || null;
}

// Royalties
export function getRoyalties(): Royalty[] {
  return getFromStorage<Royalty[]>("royalties", []);
}
export function importRoyalties(data: Royalty[]): number {
  const royalties = getRoyalties();
  const updated = [...royalties, ...data];
  setToStorage("royalties", updated);
  return data.length;
}

// Statements
export function getStatements(): Statement[] {
  return getFromStorage<Statement[]>("statements", []);
}
export function createStatement(data: Partial<Statement>): Statement {
  const statements = getStatements();
  const newStatement: Statement = { ...data, id: uuidv4() } as Statement;
  statements.push(newStatement);
  setToStorage("statements", statements);
  return newStatement;
}
export function getStatementById(id: string): Statement | null {
  return getStatements().find(s => s.id === id) || null;
}

// Broadcasts
export function getBroadcasts(): Broadcast[] {
  return getFromStorage<Broadcast[]>("broadcasts", []);
}
export function importBroadcastLog(data: Broadcast[]): number {
  const broadcasts = getBroadcasts();
  const updated = [...broadcasts, ...data];
  setToStorage("broadcasts", updated);
  return data.length;
}

// Users (Account Settings)
export function getUsers(): User[] {
  return getFromStorage<User[]>("users", []);
}
export function updateUserSettings(id: string, settings: Partial<User>): User | null {
  const users = getUsers();
  const idx = users.findIndex(u => u.id === id);
  if (idx === -1) return null;
  users[idx] = { ...users[idx], ...settings };
  setToStorage("users", users);
  return users[idx];
}
export function inviteUser(email: string): User {
  const users = getUsers();
  const newUser: User = { id: uuidv4(), email, name: "", role: "client", status: "invited" } as User;
  users.push(newUser);
  setToStorage("users", users);
  return newUser;
} 