# Typesense Setup for Music Publishing Admin

This project uses Typesense as the search and database backend. Follow these steps to set up and troubleshoot Typesense.

## Prerequisites

- Typesense server running on `localhost:8108`
- Default API key: `xyz`

## Quick Start

1. **Start Typesense Server**
   ```bash
   # If using Docker
   docker run -p 8108:8108 -v/tmp/typesense-data:/data typesense/typesense:0.25.2 \
     --data-dir /data --api-key=xyz --enable-cors
   ```

2. **Initialize Collections**
   ```bash
   npm run init-typesense
   ```

3. **Verify Setup**
   ```bash
   curl http://localhost:8108/health
   ```

## Collections

The application creates three main collections:

### Songs Collection
- `id` (string) - Unique identifier
- `clientId` (string) - Reference to client
- `spotifyId` (string) - Spotify track ID
- `title` (string) - Song title
- `isrc` (string, optional) - International Standard Recording Code
- `writerNames` (string[], optional) - Array of writer names
- `splitInfo` (string, optional) - JSON string of split information
- `created_at` (int64, optional) - Timestamp

### Writers Collection
- `id` (string) - Unique identifier
- `name` (string) - Writer name
- `role` (string) - Writer role
- `email` (string, optional) - Contact email
- `contactInfo` (string, optional) - Additional contact info
- `created_at` (int64, optional) - Timestamp

### Clients Collection
- `id` (string) - Unique identifier
- `name` (string) - Client name
- `email` (string) - Contact email
- `phone` (string, optional) - Phone number
- `contactPerson` (string, optional) - Contact person name
- `paymentInfo` (string, optional) - Payment information
- `taxInfo` (string, optional) - Tax information
- `created_at` (int64, optional) - Timestamp

## Troubleshooting

### "Collection not found" Error

If you see an error like:
```
ObjectNotFound: Request failed with HTTP code 404 | Server said: Collection not found
```

**Solution:**
1. Make sure Typesense server is running
2. Run the initialization script: `npm run init-typesense`

### Check if Collections Exist
```bash
curl http://localhost:8108/collections
```

### Delete and Recreate Collections
```bash
# Delete existing collections (if needed)
curl -X DELETE http://localhost:8108/collections/songs -H "X-TYPESENSE-API-KEY: xyz"
curl -X DELETE http://localhost:8108/collections/writers -H "X-TYPESENSE-API-KEY: xyz"
curl -X DELETE http://localhost:8108/collections/clients -H "X-TYPESENSE-API-KEY: xyz"

# Recreate collections
npm run init-typesense
```

## Configuration

Typesense client configuration is in `lib/typesenseClient.ts`:

```typescript
const client = new Typesense.Client({
  nodes: [
    {
      host: 'localhost',
      port: 8108,
      protocol: 'http',
    },
  ],
  apiKey: 'xyz',
  connectionTimeoutSeconds: 2,
});
```

## Development Scripts

- `npm run init-typesense` - Initialize Typesense collections
- `npm run dev` - Start development server with Typesense health check

## Production Considerations

For production deployment:

1. Use a proper API key (not `xyz`)
2. Enable HTTPS
3. Configure proper authentication
4. Set up data persistence
5. Consider Typesense Cloud for managed hosting

## Support

If you continue to experience issues:

1. Check Typesense server logs
2. Verify network connectivity to port 8108
3. Ensure the API key matches between client and server
4. Check that all required collections exist with proper schemas
