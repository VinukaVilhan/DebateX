import React from 'react';
import ProfileCard from '@/components/ProfileCard';
import ScheduleCard from '@/components/ScheduleCard';
import MeetingSection from '@/components/MeetingSection';

const Home: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-black to-gray-900 p-6">
      <header className="text-white text-3xl font-bold mb-8">DebateX</header>
      <main className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <ProfileCard />
          <ScheduleCard />
        </div>
        <MeetingSection />
      </main>
    </div>
  );
};

export default Home;
