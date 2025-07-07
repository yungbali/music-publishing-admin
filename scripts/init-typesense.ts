import client from '../lib/typesenseClient';

// Collection schemas
const songsSchema = {
  name: 'songs',
  fields: [
    { name: 'id', type: 'string' },
    { name: 'clientId', type: 'string' },
    { name: 'spotifyId', type: 'string' },
    { name: 'title', type: 'string' },
    { name: 'isrc', type: 'string', optional: true },
    { name: 'writerNames', type: 'string[]', optional: true },
    { name: 'splitInfo', type: 'string', optional: true },
    { name: 'created_at', type: 'int64', optional: true },
  ]
};

const writersSchema = {
  name: 'writers',
  fields: [
    { name: 'id', type: 'string' },
    { name: 'name', type: 'string' },
    { name: 'role', type: 'string' },
    { name: 'email', type: 'string', optional: true },
    { name: 'contactInfo', type: 'string', optional: true },
    { name: 'created_at', type: 'int64', optional: true },
  ]
};

const clientsSchema = {
  name: 'clients',
  fields: [
    { name: 'id', type: 'string' },
    { name: 'name', type: 'string' },
    { name: 'email', type: 'string' },
    { name: 'phone', type: 'string', optional: true },
    { name: 'contactPerson', type: 'string', optional: true },
    { name: 'paymentInfo', type: 'string', optional: true },
    { name: 'taxInfo', type: 'string', optional: true },
    { name: 'created_at', type: 'int64', optional: true },
  ]
};

async function initializeTypesense() {
  try {
    console.log('Initializing Typesense collections...');
    
    // List existing collections
    const collections = await client.collections().retrieve();
    const existingCollections = collections.map((col: any) => col.name);
    
    // Create collections if they don't exist
    for (const schema of [songsSchema, writersSchema, clientsSchema]) {
      if (!existingCollections.includes(schema.name)) {
        console.log(`Creating collection: ${schema.name}`);
        await client.collections().create(schema);
        console.log(`✓ Collection ${schema.name} created successfully`);
      } else {
        console.log(`✓ Collection ${schema.name} already exists`);
      }
    }
    
    console.log('Typesense initialization completed!');
  } catch (error) {
    console.error('Error initializing Typesense:', error);
    process.exit(1);
  }
}

// Run if this file is executed directly
if (require.main === module) {
  initializeTypesense();
}

export default initializeTypesense;
