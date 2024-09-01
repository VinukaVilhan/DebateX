import React from 'react';

const MeetingSection: React.FC = () => {
  return (
    <div className="bg-gradient-to-r from-purple-900 to-purple-700 rounded-xl p-6 mt-6 shadow-lg">
      <div className="flex justify-between border-b border-purple-600 pb-4">
        <h3 className="text-white text-lg font-semibold">Upcoming</h3>
        <h3 className="text-white text-lg font-semibold">Previous</h3>
      </div>
      <div className="flex flex-col items-center justify-center mt-6">
        <p className="text-white text-lg">No upcoming meetings</p>
        <button className="bg-purple-800 text-white px-6 py-2 rounded-lg mt-4">Schedule a meeting</button>
      </div>
    </div>
  );
};

export default MeetingSection;
