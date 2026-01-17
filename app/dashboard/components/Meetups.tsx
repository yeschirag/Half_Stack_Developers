'use client';

import { useState } from 'react';

interface Meetup {
  id: string;
  time: string;
  person: string;
  location: string;
  projectName: string;
  status: 'pending' | 'completed';
}

// Mock data
const mockMeetups: Meetup[] = [
  {
    id: '1',
    time: '2:00 PM',
    person: 'Sarah Chen',
    location: 'Library - Room 201',
    projectName: 'AI Chatbot',
    status: 'pending',
  },
  {
    id: '2',
    time: '3:30 PM',
    person: 'Alex Johnson',
    location: 'Cafe Central',
    projectName: 'Mobile App',
    status: 'pending',
  },
  {
    id: '3',
    time: '1:00 PM',
    person: 'Emily Zhang',
    location: 'Lab 5',
    projectName: 'Data Pipeline',
    status: 'completed',
  },
  {
    id: '4',
    time: '10:00 AM',
    person: 'Marcus Williams',
    location: 'Office A',
    projectName: 'Web Platform',
    status: 'completed',
  },
];

interface MeetupCardProps {
  meetup: Meetup;
}

const MeetupCard = ({ meetup }: MeetupCardProps) => {
  const badgeColor = meetup.status === 'pending' ? 'bg-purple-600 text-white' : 'bg-emerald-600 text-white';

  return (
    <div className="p-4 border border-[#333333] rounded-lg hover:border-[#B19EEF] transition-colors bg-[#0f0f14]/40 backdrop-blur-sm">
      <div className="flex items-start justify-between mb-3">
        <div>
          <p className="text-gray-400 text-sm">{meetup.time}</p>
          <p className="text-white font-medium">{meetup.person}</p>
        </div>
        <span className={`text-xs px-2 py-1 rounded-full ${badgeColor}`}>
          {meetup.projectName}
        </span>
      </div>
      <p className="text-gray-400 text-sm">{meetup.location}</p>
    </div>
  );
};

export default function Meetups() {
  const pendingMeetups = mockMeetups.filter(m => m.status === 'pending');
  const completedMeetups = mockMeetups.filter(m => m.status === 'completed');

  return (
    <div className="space-y-6">
      {/* Pending Meetups */}
      <div>
        <h3 className="text-white font-semibold mb-3">Upcoming</h3>
        <div className="space-y-3">
          {pendingMeetups.length > 0 ? (
            pendingMeetups.map(meetup => (
              <MeetupCard key={meetup.id} meetup={meetup} />
            ))
          ) : (
            <p className="text-gray-500 text-sm">No upcoming meetups</p>
          )}
        </div>
      </div>

      {/* Completed Meetups */}
      <div>
        <h3 className="text-white font-semibold mb-3">Completed</h3>
        <div className="space-y-3">
          {completedMeetups.length > 0 ? (
            completedMeetups.map(meetup => (
              <MeetupCard key={meetup.id} meetup={meetup} />
            ))
          ) : (
            <p className="text-gray-500 text-sm">No completed meetups</p>
          )}
        </div>
      </div>
    </div>
  );
}
