import { betterAuth } from "better-auth";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { username } from "better-auth/plugins";
import { MongoClient } from "mongodb";

const client = new MongoClient(process.env.AUTH_DB_URI);
const db = client.db(process.env.AUTH_DB_NAME);

const auth = betterAuth({
  emailAndPassword: {
    enabled: true,
  },
  plugins: [
    username() //for username based Sign-in
  ],
  socialProviders: {
    google: {},
  },
  database: mongodbAdapter(db, {
    // Optional: if you don't provide a client, database transactions won't be enabled.
    client,
  }),
});

export default auth;