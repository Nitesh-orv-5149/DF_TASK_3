'use client';

import axios from 'axios';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function SignUp() {
  const [form, setForm] = useState({ 
    name: '', 
    email: '', 
    password: '', 
    role: 'user' 
  });
  const [status, setStatus] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setStatus('Creating account...');
  
    const { name, email, password, role } = form;
  
    if (!name || !email || !password) {
      setStatus('All fields are required.');
      setIsLoading(false);
      return;
    }
  
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setStatus('Invalid email format.');
      setIsLoading(false);
      return;
    }
  
    try {
      const res = await axios.post('/api/auth/signup', form);

      if (res.status === 201) {
        const result = await signIn('credentials', {
          redirect: true,
          email,
          password,
          callbackUrl: '/'
        });
        
        if (result?.error) {
          console.error('Auto sign-in failed:', result.error);
        }

      } else {
        console.error('Signup failed:', res.statusText);
      }
    } catch (err: any) {
      setStatus(err.message || 'Signup failed');
    }
    setIsLoading(false);
  };

  return (
    <div className="flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className=" rounded-2xl shadow-lg p-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold  mb-2">Create Account</h1>
            <p className="">Join us today</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium  mb-2">
                Full Name
              </label>
              <input
                name="name"
                type="text"
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg focus:outline-none transition-all"
                placeholder="Enter your full name"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium  mb-2">
                Email Address
              </label>
              <input
                name="email"
                type="email"
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg focus:outline-none transition-all"
                placeholder="Enter your email"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium  mb-2">
                Password
              </label>
              <input
                name="password"
                type="password"
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg focus:outline-none transition-all"
                placeholder="Create a password"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium  mb-3">
                Account Type
              </label>
              <div className="space-y-3">
                {[
                  { value: 'user', label: 'User', desc: 'Regular user account' },
                  { value: 'vendor', label: 'Vendor', desc: 'Business account' },
                  { value: 'admin', label: 'Admin', desc: 'Administrator access' }
                ].map((role) => (
                  <label key={role.value} className="flex items-start space-x-3 cursor-pointer group">
                    <input
                      type="radio"
                      name="role"
                      value={role.value}
                      checked={form.role === role.value}
                      onChange={handleChange}
                      className="mt-1 w-4 h-4"
                    />
                    <div className="flex-1">
                      <div className="text-sm font-medium transition-colors">
                        {role.label}
                      </div>
                      <div className="text-xs">
                        {role.desc}
                      </div>
                    </div>
                  </label>
                ))}
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 px-4 rounded-lg focus:outline-none transition-all disabled:opacity-50 disabled:cursor-not-allowed font-medium"
            >
              {isLoading ? "Creating Account..." : "Create Account"}
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