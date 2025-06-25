"use client";

import React, { useContext, useState } from 'react';
import { User, Mail, MapPin, Shield, Calendar, Edit } from 'lucide-react';
import { admins } from '@/constants/exampleObjects/admins';
import { useSession } from 'next-auth/react';

export default function AdminProfile() {
  const [isEditing, setIsEditing] = useState(false);

  const { data: session } = useSession();
  const admin = admins.find((a) => a.email === session?.user?.email) 

  return (
    <div className="min-h-screen bg-gradient-to-b from-light-1/30 to-45%">
      {/* Header */}
      <header className=" px-6 py-6 border-b bg-light-2">
        <div className="max-w-4xl mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold ">Admin Profile</h1>
          <button
            onClick={() => setIsEditing(!isEditing)}
            className=" px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
          >
            <Edit size={16} />
            {isEditing ? 'Save' : 'Edit Profile'}
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto p-8">
        {/* Profile Header */}
        <div className=" rounded-xl p-8 mb-8 border">
          <div className="flex items-center gap-8">
            {/* Profile Picture */}
            <div className="w-32 h-32  rounded-full flex items-center justify-center border-4 ">
              <User size={56} className="" />
            </div>

            {/* Basic Info */}
            <div className="flex-1">
              <h2 className="text-4xl font-bold  mb-2">
                {admin?.fullName}
              </h2>
              <p className=" text-xl mb-3">
                @{admin?.username}
              </p>
              <div className="  px-3 py-1 rounded-full text-sm inline-flex items-center">
                <Shield size={14} className="mr-2" />
                {admin?.role.toUpperCase()}
              </div>
            </div>
          </div>
        </div>

        {/* Profile Details Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Contact Information */}
          <div className=" rounded-xl p-6 border">
            <h3 className="text-xl font-bold  mb-6 flex items-center gap-2">
              <Mail size={20} />
              Contact Information
            </h3>
            
            <div className="space-y-4">
              <div>
                <label className=" text-sm block mb-2">
                  Email Address
                </label>
                {isEditing ? (
                  <input
                    type="email"
                    defaultValue={admin?.email}
                    className="  border rounded-lg px-3 py-2 w-full focus:outline-none"
                  />
                ) : (
                  <p className="">{admin?.email}</p>
                )}
              </div>

              <div>
                <label className=" text-sm block mb-2">
                  User ID
                </label>
                <p className=" font-mono">{admin?.userId}</p>
              </div>
            </div>
          </div>

          {/* Location Information */}
          <div className=" rounded-xl p-6 border">
            <h3 className="text-xl font-bold  mb-6 flex items-center gap-2">
              <MapPin size={20} />
              Location
            </h3>
            
            <div className="space-y-4">
              <div>
                <label className=" text-sm block mb-2">
                  City
                </label>
                {isEditing ? (
                  <input
                    type="text"
                    defaultValue={admin?.city}
                    className="  border rounded-lg px-3 py-2 w-full focus:outline-none"
                  />
                ) : (
                  <p className="">{admin?.city}</p>
                )}
              </div>

              <div>
                <label className=" text-sm block mb-2">
                  State & Country
                </label>
                <p className="">{admin?.state}, {admin?.country}</p>
              </div>
            </div>
          </div>

          {/* Permissions */}
          <div className=" rounded-xl p-6 border">
            <h3 className="text-xl font-bold  mb-6 flex items-center gap-2">
              <Shield size={20} />
              Permissions
            </h3>
            
            <div className="flex flex-wrap gap-2">
              {admin?.permissions.map((permission) => (
                <span
                  key={permission}
                  className="  px-4 py-2 rounded-lg text-sm border"
                >
                  {permission.replace('_', ' ').toUpperCase()}
                </span>
              ))}
            </div>
          </div>

          {/* Account Info */}
          <div className=" rounded-xl p-6 border">
            <h3 className="text-xl font-bold  mb-6 flex items-center gap-2">
              <Calendar size={20} />
              Account Information
            </h3>
            
            <div>
              <label className=" text-sm block mb-2">
                Account Created
              </label>
              {/* <p className="">
                {new Date(admin?.createdAt).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </p> */}
            </div>
          </div>
        </div>

        {/* Security Section */}
        <div className=" rounded-xl p-6 mt-8 border">
          <h3 className="text-xl font-bold  mb-6">Security Settings</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className=" text-sm block mb-2">
                Last Login
              </label>
              <p className="">Today, 10:30 AM</p>
            </div>
            
            <div>
              <label className=" text-sm block mb-2">
                Password
              </label>
              <p className="">••••••••</p>
            </div>
          </div>
          
          <div className="flex gap-4 mt-6">
            <button className=" px-4 py-2 rounded-lg transition-colors">
              Change Password
            </button>
            <button className=" px-4 py-2 rounded-lg transition-colors">
              Two-Factor Auth
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}