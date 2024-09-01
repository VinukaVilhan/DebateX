import React from 'react';

export default function ScheduleCard2() {
  return (
    <div className="bg-gradient-to-r from-purple-900 to-purple-700 rounded-xl p-6 text-white shadow-lg">
      <div className="flex justify-between items-center">
        <div className="flex space-x-6">
          <div className="text-center">
            <span className="block text-2xl">📅</span>
            <p>Schedule</p>
          </div>
          <div className="text-center">
            <span className="block text-2xl">➕</span>
            <p>Join</p>
          </div>
          <div className="text-center">
            <span className="block text-2xl">👥</span>
            <p>Host</p>
          </div>
        </div>
        <div>
          <p className="text-sm text-purple-200">Personal Meeting ID</p>
          <p className="text-lg font-bold">305 208 1729-H</p>
        </div>
      </div>
    </div>
  );
}
