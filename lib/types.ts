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
  name: string;
  role: string;
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
} 