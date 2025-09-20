import { Client, Databases } from "appwrite";
import Configure from "../Conf/configure";

const client = new Client();

client
   .setEndpoint(Configure.appwriteurl)
      .setProject(Configure.appwritePROJECTID);

export const databases = new Databases(client);
// Order banane ka function
export async function createOrder(orderData) {
  try {
    return await databases.createDocument(
      Configure.appwriteDATABASEID,   // DB ID from config
      Configure.appwriteORDER,        // Orders collection ID from config
      ID.unique(),
      {
        ...orderData,
        subtotal: orderData.subtotal || 0,     // required hai
        Total: orderData.total || 0,           // "Total" with capital T
  
      }
    );
  } catch (error) {
    console.error("Appwrite createOrder error:", error.message);
    throw error;
  }
}
export async function getLastOrder(userEmail) {
  try {
    const response = await databases.listDocuments(
      Configure.appwriteDATABASEID,
      Configure.appwriteORDER,
      [
        Query.equal("email", [userEmail]),   // filter by email
        Query.orderDesc("$createdAt"),       // newest first
        Query.limit(1)                       // sirf last ek
      ]
    );
    return response.documents[0] || null;
  } catch (err) {
    console.error("Error fetching last order:", err);
    return null;
  }
}
