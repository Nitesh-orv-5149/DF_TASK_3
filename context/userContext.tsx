"use client";

import { useSession } from "next-auth/react";
import { createContext, useContext, useState, useEffect, ReactNode } from "react";

// 1. Define your User type
type User = {
  id: string;         // ✅ string (from JWT token)
  name: string;
  email: string;
  role: string;
};

// 2. Context type
type UserContextType = {
  user: User | null;
  setUser: (user: User | null) => void;
  isLoading: boolean;
};

// 3. Create Context
const UserContext = createContext<UserContextType | undefined>(undefined);

// 4. Provider
export default function UserProvider({ children }: { children: ReactNode }) {
  const { data: session, status } = useSession();
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (status === "loading") {
      setIsLoading(true);
      return;
    }

    if (status === "authenticated" && session?.user?.id) {
      const u = session.user as User;
      setUser(u);
    } else {
      setUser(null);
    }

    setIsLoading(false);
    
  }, [status, session]);

  return (
    <UserContext.Provider value={{ user, setUser, isLoading }}>
      {children}
    </UserContext.Provider>
  );
}

// 5. Hook
export function useUser() {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
}
