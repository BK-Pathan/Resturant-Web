import Configure from "../Conf/configure";
import { Client, Account } from "appwrite";
import { ID } from "appwrite";

export class AuthService {
  client = new Client();
  account;

  constructor() {
    this.client
      .setEndpoint(Configure.appwriteurl)
      .setProject(Configure.appwritePROJECTID);

    this.account = new Account(this.client);
  }
// ✅ Create Account (Signup)
async createAccount({ email, password, name }) {
  try {
    return await this.account.create(
      ID.unique(),  // unique ID for new user
      email,
      password,
      name
    );
  } catch (error) {
    console.error("AuthService :: createAccount :: error", error);
    throw error;
  }
}

  // ✅ Login
  async login({ email, password }) {
    try {
      return await this.account.createEmailPasswordSession(email, password);
    } catch (error) {
      console.error("AuthService :: login :: error", error);
      throw error;
    }
  }

  // ✅ Get Current Logged-in User
  async getUser() {
    try {
      return await this.account.get();
    } catch (error) {
      console.error("AuthService :: getUser :: error", error);
      return null;  // 👈 fix kiya
    }
  }

  // ✅ Logout
  async logout() {
    try {
      await this.account.deleteSessions();
    } catch (error) {
      console.error("AuthService :: logout :: error", error);
    }
  }
}

const authService = new AuthService();
export default authService;
