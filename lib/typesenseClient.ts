import Typesense from 'typesense';

const client = new Typesense.Client({
  nodes: [
    {
      host: 'localhost',
      port: 8108,
      protocol: 'http',
    },
  ],
  apiKey: 'xyz', // Default for local install
  connectionTimeoutSeconds: 2,
});

export default client; 