"use client"

import SignIn from "@/components/auth/signIn"
import SignUp from "@/components/auth/signUp"
import { useState } from "react"

export default function authForm() {

  const [currentView, setCurrentView] = useState('signin');

  return (
    <div>
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-dark-2/70 to-50%">
        <div className="text-center">
          {currentView === 'signin' ? (
            <div>
              <SignIn />
              <p>
                Don't have an account?{" "}
                <button
                  onClick={() => setCurrentView('signup')}
                  className=" hover:underline"
                >
                  Sign Up
                </button>
              </p>
            </div>
          ) : (
            <div>
              <SignUp />
              <p>
                Already have an account?{" "}
                <button
                  onClick={() => setCurrentView('signin')}
                  className=" hover:underline"
                >
                  Sign In
                </button>
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}