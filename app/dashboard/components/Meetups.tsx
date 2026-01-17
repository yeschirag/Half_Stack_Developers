'use client';

import { FiCalendar, FiClock, FiMapPin, FiCheckCircle, FiZap, FiUsers, FiCoffee } from 'react-icons/fi';

interface Meetup {
  id: string;
  date: string;
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
    date: 'Jan 18, 2026',
    time: '2:00 PM',
    person: 'Sarah Chen',
    location: 'Library - Room 201',
    projectName: 'AI Chatbot',
    status: 'pending',
  },
  {
    id: '2',
    date: 'Jan 19, 2026',
    time: '3:30 PM',
    person: 'Alex Johnson',
    location: 'Cafe Central',
    projectName: 'Mobile App',
    status: 'pending',
  },
  {
    id: '3',
    date: 'Jan 22, 2026',
    time: '11:00 AM',
    person: 'Priya Nair',
    location: 'Innovation Hub',
    projectName: 'HealthSync',
    status: 'pending',
  },
  {
    id: '4',
    date: 'Jan 28, 2026',
    time: '5:15 PM',
    person: 'Diego Alvarez',
    location: 'Zoom',
    projectName: 'SustainLab',
    status: 'pending',
  },
  {
    id: '5',
    date: 'Feb 03, 2026',
    time: '1:30 PM',
    person: 'Hannah Lee',
    location: 'Studio 3',
    projectName: 'Eventify',
    status: 'pending',
  },
  {
    id: '6',
    date: 'Jan 10, 2026',
    time: '1:00 PM',
    person: 'Emily Zhang',
    location: 'Lab 5',
    projectName: 'Data Pipeline',
    status: 'completed',
  },
  {
    id: '7',
    date: 'Jan 08, 2026',
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
  const isPending = meetup.status === 'pending';
  const avatarBg = isPending ? 'bg-[#B19EEF]/20 text-[#B19EEF]' : 'bg-emerald-500/15 text-emerald-300';

  const getInitials = (name: string) =>
    name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);

  return (
    <div className="group flex-shrink-0 w-[260px] rounded-xl border border-white/10 bg-white/[0.03] p-4 transition-all hover:border-[#B19EEF]/40 hover:bg-white/[0.05]">
      <div className="flex items-start gap-3">
        <div className={`flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full ${avatarBg} font-semibold text-sm`}>
          {getInitials(meetup.person)}
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-white font-medium truncate">{meetup.person}</p>
          <p className="text-xs text-[#B19EEF] truncate">{meetup.projectName}</p>
          <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-gray-400">
            <span className="flex items-center gap-1">
              <FiCalendar size={11} className="text-gray-500" />
              {meetup.date}
            </span>
            <span className="flex items-center gap-1">
              <FiClock size={11} className="text-gray-500" />
              {meetup.time}
            </span>
          </div>
          <div className="mt-1 flex items-center gap-1 text-xs text-gray-500">
            <FiMapPin size={11} />
            <span className="truncate">{meetup.location}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default function Meetups() {
  const pendingMeetups = mockMeetups.filter(m => m.status === 'pending');
  const completedMeetups = mockMeetups.filter(m => m.status === 'completed');

  return (
    <div className="space-y-6">
      {/* Summary Stats */}
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2 rounded-full border border-[#B19EEF]/30 bg-[#B19EEF]/10 px-3 py-1.5 text-sm">
          <FiCalendar size={14} className="text-[#B19EEF]" />
          <span className="text-[#B19EEF] font-medium">{pendingMeetups.length}</span>
          <span className="text-gray-400">upcoming</span>
        </div>
        <div className="flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1.5 text-sm">
          <FiCheckCircle size={14} className="text-emerald-400" />
          <span className="text-emerald-400 font-medium">{completedMeetups.length}</span>
          <span className="text-gray-400">completed</span>
        </div>
      </div>

      {/* Upcoming */}
      <div>
        <div className="mb-3 flex items-center gap-2 text-white">
          <FiCalendar size={16} className="text-[#B19EEF]" />
          <h3 className="font-semibold">Upcoming</h3>
        </div>
        <div className="flex gap-3 overflow-x-auto pb-2">
          {pendingMeetups.length > 0 ? (
            pendingMeetups.map(meetup => (
              <MeetupCard key={meetup.id} meetup={meetup} />
            ))
          ) : (
            <div className="w-full rounded-xl border border-dashed border-white/10 bg-white/[0.02] p-8 text-center">
              <p className="text-sm font-medium text-gray-300">No upcoming meetups yet</p>
              <p className="mt-1 text-xs text-gray-500">Go meet people and build something awesome.</p>
            </div>
          )}
        </div>
      </div>

      {/* Completed */}
      <div>
        <div className="mb-3 flex items-center gap-2 text-white">
          <FiCheckCircle size={16} className="text-emerald-400" />
          <h3 className="font-semibold">Completed</h3>
        </div>
        <div className="flex gap-3 overflow-x-auto pb-2">
          {completedMeetups.length > 0 ? (
            completedMeetups.map(meetup => (
              <MeetupCard key={meetup.id} meetup={meetup} />
            ))
          ) : (
            <div className="w-full rounded-xl border border-dashed border-white/10 bg-white/[0.02] p-8 text-center">
              <p className="text-sm font-medium text-gray-300">No completed meetups yet</p>
              <p className="mt-1 text-xs text-gray-500">Your finished meetups will show here.</p>
            </div>
          )}
        </div>
      </div>

      {/* Quick Tips Section */}
      <div className="rounded-xl border border-white/10 bg-gradient-to-br from-[#B19EEF]/5 to-transparent p-4">
        <h4 className="text-sm font-semibold text-white mb-3 flex items-center gap-2">
          <FiZap size={14} className="text-[#B19EEF]" />
          Meetup Tips
        </h4>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div className="flex items-start gap-2 rounded-lg bg-white/[0.02] p-3">
            <FiCoffee size={16} className="text-amber-400 mt-0.5 flex-shrink-0" />
            <div>
              <p className="text-xs font-medium text-gray-300">Be on time</p>
              <p className="text-[11px] text-gray-500">First impressions matter</p>
            </div>
          </div>
          <div className="flex items-start gap-2 rounded-lg bg-white/[0.02] p-3">
            <FiUsers size={16} className="text-blue-400 mt-0.5 flex-shrink-0" />
            <div>
              <p className="text-xs font-medium text-gray-300">Share ideas openly</p>
              <p className="text-[11px] text-gray-500">Collaboration is key</p>
            </div>
          </div>
          <div className="flex items-start gap-2 rounded-lg bg-white/[0.02] p-3">
            <FiCalendar size={16} className="text-emerald-400 mt-0.5 flex-shrink-0" />
            <div>
              <p className="text-xs font-medium text-gray-300">Follow up</p>
              <p className="text-[11px] text-gray-500">Stay connected after</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
