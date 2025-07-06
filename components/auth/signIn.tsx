"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setStatus("Signing in...");
  
    const res = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });
  
    if (res?.ok) {
      setStatus("Success! Redirecting...");
      window.location.href = "/profile"; 
    } else {
      setStatus("Invalid credentials or server error");
    }
    setIsLoading(false);
  };

  return (
    <div className=" flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className=" rounded-2xl shadow-lg p-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold  mb-2">Welcome Back</h1>
            <p className="">Sign in to your account</p>
          </div>

          <form onSubmit={handleSignIn} className="space-y-6">
            <div>
              <label className="block text-sm font-medium mb-2">
                Email Address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 border  rounded-full focus:outline-none transition-all"
                placeholder="Enter your email"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 border  rounded-full focus:outline-none transition-all"
                placeholder="Enter your password"
                required
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 px-4 bg-light-2 rounded-full text-dark-2 font-bold hover:bg-light-1/60 focus:outline-none transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? "Signing In..." : "Sign In"}
            </button>

            {status && (
              <div className="text-center text-sm p-3 rounded-lg">
                {status}
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}