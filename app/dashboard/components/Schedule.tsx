'use client';

interface Meetup {
  time: string;
  person: string;
  projectName: string;
}

interface DaySchedule {
  day: string;
  date: string;
  meetups: Meetup[];
}

// Helper function to convert time to minutes for sorting
const convertTimeToMinutes = (timeStr: string): number => {
  const [time, period] = timeStr.split(' ');
  let [hours, minutes] = time.split(':').map(Number);
  if (period === 'PM' && hours !== 12) hours += 12;
  if (period === 'AM' && hours === 12) hours = 0;
  return hours * 60 + minutes;
};

// Mock data
const mockScheduleData: DaySchedule[] = [
  {
    day: 'Monday',
    date: 'Jan 20',
    meetups: [
      { time: '2:00 PM', person: 'Sarah Chen', projectName: 'AI Chatbot' },
    ],
  },
  {
    day: 'Tuesday',
    date: 'Jan 21',
    meetups: [],
  },
  {
    day: 'Wednesday',
    date: 'Jan 22',
    meetups: [
      { time: '3:30 PM', person: 'Alex Johnson', projectName: 'Mobile App' },
    ],
  },
  {
    day: 'Thursday',
    date: 'Jan 23',
    meetups: [],
  },
  {
    day: 'Friday',
    date: 'Jan 24',
    meetups: [],
  },
  {
    day: 'Saturday',
    date: 'Jan 25',
    meetups: [],
  },
  {
    day: 'Sunday',
    date: 'Jan 26',
    meetups: [],
  },
];

const dayOrder = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

export default function Schedule() {
  const upcomingMeetups = mockScheduleData
    .flatMap((day) => day.meetups.map((meetup) => ({ ...meetup, day: day.day, date: day.date })))
    .sort((a, b) => {
      const dayDiff = dayOrder.indexOf(a.day) - dayOrder.indexOf(b.day);
      if (dayDiff !== 0) return dayDiff;
      return convertTimeToMinutes(a.time) - convertTimeToMinutes(b.time);
    });

  const nextMeetup = upcomingMeetups[0];

  return (
    <div className="flex flex-col h-full rounded-2xl border border-white/10 bg-gradient-to-br from-white/[0.05] to-transparent p-4">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-white font-semibold">Weekly Schedule</h3>
          <p className="text-xs text-gray-500">Next 7 days</p>
        </div>
        <div className="rounded-full bg-[#B19EEF]/20 px-2.5 py-1 text-xs font-semibold text-[#B19EEF]">
          {upcomingMeetups.length} scheduled
        </div>
      </div>

      {nextMeetup && (
        <div className="rounded-xl border border-[#B19EEF]/30 bg-[#B19EEF]/10 p-3 mb-4">
          <div className="flex items-center justify-between text-xs text-[#B19EEF]">
            <span>Next meetup</span>
            <span>{nextMeetup.day}, {nextMeetup.date}</span>
          </div>
          <div className="mt-2 flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold text-white">{nextMeetup.projectName}</p>
              <p className="text-xs text-gray-400">{nextMeetup.person} • {nextMeetup.time}</p>
            </div>
            <span className="rounded-full border border-white/10 bg-white/10 px-2 py-0.5 text-[11px] text-gray-300">Soon</span>
          </div>
        </div>
      )}

      <div className="flex-1 min-h-0 space-y-3 overflow-y-auto pr-1">
        {mockScheduleData.map((day) => (
          <div key={day.day} className="rounded-lg border border-white/5 bg-white/[0.02] p-3">
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-200 font-medium text-sm">{day.day}</span>
              <span className="text-gray-500 text-xs">{day.date}</span>
            </div>
            {day.meetups.length > 0 ? (
              <div className="space-y-1.5">
                {day.meetups
                  .sort((a, b) => convertTimeToMinutes(a.time) - convertTimeToMinutes(b.time))
                  .map((meetup, idx) => (
                    <div key={idx} className="flex items-center justify-between rounded-md bg-white/[0.03] px-2.5 py-1.5 text-xs">
                      <span className="text-[#B19EEF] font-medium">{meetup.time}</span>
                      <span className="text-gray-400 truncate ml-2">{meetup.person}</span>
                    </div>
                  ))}
              </div>
            ) : (
              <div className="text-xs text-gray-600">Free day ✨</div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
