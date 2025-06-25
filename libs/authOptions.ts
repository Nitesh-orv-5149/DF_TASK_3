import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { connectToDatabase } from "./database";
import User from "./database/models/user.model";
import bcrypt from "bcryptjs";

export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },

  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },

      async authorize(credentials) {
        await connectToDatabase();

        // Step 1: Check if user exists
        const user = await User.findOne({ email: credentials?.email });
        if (!user) throw new Error("No user found with this email");

        // Step 2: Validate password securely
        const isValid = credentials!.password == user.password;
        if (!isValid) throw new Error("Invalid password");

        return {
          id: user._id.toString(),
          name: user.name,
          email: user.email,
          role: user.role || "user",
        } as { id: string; name: string; email: string; role: string };
        
      },
    }),
  ],

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.sub = user.id; 
        token.id = user.id;
        token.role = user.role;
      }
      if (!token.id) {
        token.id = token.sub;
      }
      return token;
    },

    // Add id + role to session
    async session({ session, token }) {
      session.user = {
        ...session.user,
        id: token.id,
        role: token.role,
      };
      return session;
    },
  },

  pages: {
    signIn: "/auth", // Custom sign-in page
  },

  secret: process.env.NEXTAUTH_SECRET,
};
