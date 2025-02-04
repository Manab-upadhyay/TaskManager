import { MongoClient, Db } from 'mongodb';

// MongoDB connection URI
const uri =  process.env.MONGODB_URL as string

// Database name
const dbName = process.env.MONGODB_DB_NAME;

// Create a cached connection to avoid reconnecting on every request
let cachedClient: MongoClient | null = null;
let cachedDb: Db | null = null;

export async function connectToDatabase(): Promise<{ client: MongoClient; db: Db }> {
  if (cachedClient && cachedDb) {
    // Return cached connection if it exists
    return { client: cachedClient, db: cachedDb };
  }

  try {
    // Create a new MongoClient
    const client = new MongoClient(uri);

    // Connect to the MongoDB server
    await client.connect();

    // Select the database
    const db = client.db(dbName);

    // Cache the client and database connection
    cachedClient = client;
    cachedDb = db;

    console.log('Connected to MongoDB');

    return { client, db };
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    throw error;
  }
}