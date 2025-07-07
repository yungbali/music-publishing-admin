// Client represents an artist, songwriter, or label managed by the subpublisher
export interface Client {
  id: string;
  name: string;
  email: string;
  phone?: string;
  contactPerson?: string;
  paymentInfo?: string;
  taxInfo?: string;
}

// Song represents a registered song, with Spotify metadata
export interface Song {
  id: string;
  clientId: string; // reference to Client
  spotifyId: string;
  title: string;
  isrc?: string;
  writers: Writer[];
  splits: Split[];
}

// Writer represents a songwriter or contributor
export interface Writer {
  id: string;
  name: string;
  role: string;
  email?: string;
  contactInfo?: string;
}

// Split represents royalty split for a writer
export interface Split {
  writerName: string;
  percentage: number;
}

// User represents a platform user (for permissions/roles)
export interface User {
  id: string;
  name: string;
  email: string;
  role: 'subpublisher' | 'client' | 'manager' | 'admin';
  clientId?: string; // if role is client/manager
  status?: string;
}

// Gig represents a live performance event
export interface Gig {
  id: string;
  clientId: string;
  date: string;
  venue: string;
  setlist?: string[];
}

// Opportunity represents a sync or broadcast opportunity
export interface Opportunity {
  id: string;
  title: string;
  description?: string;
  status?: string;
  songIds?: string[];
}

// Sync represents a sync licensing deal
export interface Sync {
  id: string;
  songId: string;
  clientId: string;
  terms?: string;
  status?: string;
}

// Royalty represents a royalty payment or statement line
export interface Royalty {
  id: string;
  songId: string;
  writerId?: string;
  amount: number;
  source: string;
  date: string;
}

// Statement represents a royalty statement for a period
export interface Statement {
  id: string;
  writerId: string;
  period: { from: string; to: string };
  total: number;
  details?: Royalty[];
}

// Broadcast represents a radio/TV play or log
export interface Broadcast {
  id: string;
  songId: string;
  date: string;
  station: string;
  playCount?: number;
} 