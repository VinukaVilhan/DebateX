import React from 'react';

export default function ProfileCard2() {
  return (
    <div className="bg-gradient-to-r from-purple-900 to-purple-700 rounded-xl p-6 flex items-center justify-between shadow-lg">
      <div className="flex items-center space-x-4">
        <img
                      src={user?.imageUrl || ""}
                      alt="Profile"
          className="w-16 h-16 rounded-full object-cover"
        />
        <div>
          <h2 className="text-white text-2xl font-semibold">Michelle James</h2>
          <p className="text-purple-200">james95@gmail.com</p>
          <div className="flex space-x-2 mt-2">
            <span className="bg-purple-600 text-white text-xs px-3 py-1 rounded-full">Chat</span>
            <span className="bg-purple-600 text-white text-xs px-3 py-1 rounded-full">Meeting</span>
            <span className="bg-purple-600 text-white text-xs px-3 py-1 rounded-full">Notes</span>
          </div>
        </div>
      </div>
      <div className="flex space-x-2">
        <button className="bg-purple-800 text-white px-4 py-2 rounded-lg">Change Plan</button>
        <button className="bg-purple-500 text-white px-4 py-2 rounded-lg">Personal - Room</button>
      </div>
      <div>
        <button className="text-purple-200 border border-white px-4 py-2 rounded-lg">Free Plan</button>
      </div>
    </div>
  );
}
