import { Client, Databases, Storage, Account } from "appwrite";
import Configure from "../Conf/configure";

const client = new Client();

client
  .setEndpoint(Configure.appwriteurl)       // ✅ Appwrite API endpoint
  .setProject(Configure.appwritePROJECTID); // ✅ Project ID

export const databases = new Databases(client);
export const storage = new Storage(client);
export const account = new Account(client);

// IDs ko bhi export kar do easy access ke liye
export const DATABASE_ID = Configure.appwriteDATABASEID;
export const PROFILE_COLLECTION_ID = Configure.appwritePROFILE;
export const BUCKET_ID = Configure.appwriteBUCKETID;