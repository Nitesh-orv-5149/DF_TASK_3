"use client"

import React, { useEffect, useState } from 'react';
import { Edit2, Save, X, User, Upload, Eye, EyeOff } from 'lucide-react';
import { signOut, useSession } from 'next-auth/react';
import axios from 'axios';
import { useUser } from '@/context/userContext';
import { Island_Moments } from 'next/font/google';

interface EditingState {
  username: boolean;
  email: boolean;
  phone: boolean;
  password: boolean;
}

interface FormData {
  username: string;
  email: string;
  phone: string;
  password: string;
}

export default function ProfileComponent() {

  const { user, isLoading } = useUser();
  const [amount, setAmount] = useState<any>(null);
  const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);
  const [originalPassword, setOriginalPassword] = useState<string>('');

  const [isEditing, setIsEditing] = useState<EditingState>({
    username: false,
    email: false,
    phone: false,
    password: false
  });

  const [formData, setFormData] = useState<FormData>({
    username: '',
    email: '',
    phone: '',
    password: ''
  });

  const [tempData, setTempData] = useState<Partial<FormData>>({});

  const fetchUserData = async () => {
    if (!user || isLoading) return;
    console.log("Fetching user data for:", user.id);
    try {
      const response = await axios.get(`/api/user/${user.id}`)
      console.log("User data fetched successfully:", response.data);
      const userData = response.data.user;
      
      // Store the original password
      setOriginalPassword(userData.password || '');
      
      setFormData({
        username: userData.name || '',
        email: userData.email || '',
        phone: userData.phone || '',
        password: userData.password || ''
      })
      setAmount(userData.amount || 0);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  }

  useEffect(() => {
    fetchUserData();
  },[user, isLoading])

  const handleEdit = (field: keyof FormData) => {
    setIsEditing(prev => ({ ...prev, [field]: true }));
    setTempData(prev => ({ ...prev, [field]: formData[field] }));
  };

  const handleSave = (field: keyof FormData) => {
    setFormData(prev => ({ ...prev, [field]: tempData[field] || prev[field] }));
    setIsEditing(prev => ({ ...prev, [field]: false }));
  };

  const handleCancel = (field: keyof FormData) => {
    setIsEditing(prev => ({ ...prev, [field]: false }));
    setTempData(prev => {
      const newTemp = { ...prev };
      delete newTemp[field];
      return newTemp;
    });
  };

  const handleInputChange = (field: keyof FormData, value: string) => {
    setTempData(prev => ({ ...prev, [field]: value }));
  };

  const getPasswordDisplay = () => {
    if (isEditing.password) {
      return tempData.password || '';
    }
    return isPasswordVisible ? originalPassword : '●●●●●●●●';
  };

  const EditableField = ({ label, field, type = "text" }: { label: string; field: keyof FormData; type?: string }) => (
    <div className="w-full max-w-md space-y-2">
      <label className="block text-sm font-medium text-light-2 capitalize">
        {label}
      </label>
      <div className="flex items-center gap-2">
        {isEditing[field] ? (
          <>
            <input
              type={field === 'password' ? 'password' : type}
              value={tempData[field] || ''}
              onChange={(e) => handleInputChange(field, e.target.value)}
              className="flex-1 px-3 py-2 border rounded-md focus:outline-none focus:ring-2"
              autoFocus
            />
            <button
              onClick={() => handleSave(field)}
              className="p-2 hover:opacity-75 rounded-md transition-colors"
            >
              <Save size={16} />
            </button>
            <button
              onClick={() => handleCancel(field)}
              className="p-2 hover:opacity-75 rounded-md transition-colors"
            >
              <X size={16} />
            </button>
          </>
        ) : (
          <>
            <span className="flex-1 px-3 py-2">
              {field === 'phone' && (formData[field] === '' || !formData[field]) ? (
                <span className="text-xs ml-1 text-gray-400">click to add</span>
              ) : field === 'password' ? (
                getPasswordDisplay()
              ) : (
                formData[field]
              )}
            </span>
            
            {field === 'password' && (
              <button
                onClick={() => setIsPasswordVisible(prev => !prev)}
                className="p-2 hover:opacity-75 rounded-md transition-colors"
                title={isPasswordVisible ? 'Hide password' : 'Show password'}
              >
                {isPasswordVisible ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            )}
            
            <button
              onClick={() => handleEdit(field)}
              className="p-2 hover:opacity-75 rounded-md transition-colors"
              title={`Edit ${label}`}
            >
              <Edit2 size={16} />
            </button>
          </>
        )}
      </div>
    </div>
  );

  return (
    <main className="bg-gradient-to-b from-dark-1/50 flex md:flex-row flex-col h-screen">
      {/* Left Panel - Profile Summary */}
      <div className="flex flex-col justify-between p-8 md:w-1/3 md:border-r border-b md:border-b-0 h-full">
        <div className="text-center space-y-4">
          <h1 className="text-2xl font-extrabold text-light-2">Profile</h1>

          {/* Profile Picture */}
          <div className="relative flex justify-center items-center group">
            <div className="bg-dark-2/60 w-32 h-32 rounded-full text-light-1 flex items-center justify-center overflow-hidden">
              <User size={48} />
            </div>
            <button className="absolute bottom-0 right-0 inset-0 w-32 h-32 rounded-full opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
              <Upload size={24} />
            </button>
          </div>

          <div className="space-y-2">
            <p className="text-sm">Click to upload photo</p>
            <div className="pt-4 border-t">
              <h2 className="text-lg font-bold text-light-1">Account Balance :</h2>
              <p className="text-2xl font-semibold">₹{amount}</p>
            </div>
          </div>
        </div>

        {/* Signout Button at Bottom */}
        <button onClick={() => signOut({callbackUrl: '/'})} className="bg-light-2 text-dark-2 font-bold hover:bg-red-500 hover:text-light-2 duration-150 transition-all p-2 rounded-full mt-8">
          Sign Out
        </button>
      </div>

      {/* Right Panel - Profile Details */}
      <div className="flex flex-col gap-8 md:w-2/3 p-8 ">
        <div className="max-w-2xl">
          <h2 className="text-2xl font-bold mb-6 text-light-1">Account Information</h2>
          
          <div className="space-y-6">
            <EditableField label="Username" field="username" />
            <EditableField label="Email Address" field="email" type="email" />
            <EditableField label="Phone Number" field="phone" type="tel" />
            <EditableField label="Password" field="password" type="password" />
          </div>
        </div>

        {/* Current Bookings Section */}
        <div className="max-w-2xl">
          <h2 className="text-2xl font-bold mb-6 text-light-1">Current Bookings</h2>
          <div className="rounded-lg border">
            <div className="p-6">
              <div className="text-center py-8">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center">
                  <User size={32} />
                </div>
                <p className='text-light-2'>No current bookings</p>
                <p className="text-sm mt-1">Your upcoming reservations will appear here</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}