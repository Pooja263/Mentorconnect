import { useState } from "react";
import { motion } from "framer-motion";

interface CalendarDay {
  date: number;
  isToday: boolean;
  isSelected: boolean;
  hasEvent: boolean;
}

interface Reminder {
  id: number;
  title: string;
  date: string;
  time: string;
  type: 'test' | 'essay' | 'class' | 'assignment';
}

interface Meeting {
  id: number;
  title: string;
  type: string;
  time: string;
  participants: {
    id: number;
    name: string;
    avatar: string;
  }[];
}

function ProfileCalendar() {
  const [currentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date().getDate());

  const meetings: Meeting[] = [
    {
      id: 1,
      title: "Project Manager",
      type: "Job Interview",
      time: "Today 09:00-10:00",
      participants: [
        {
          id: 1,
          name: "Sarah Johnson",
          avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=32&h=32&fit=crop&crop=face"
        },
        {
          id: 2,
          name: "Mike Chen",
          avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=32&h=32&fit=crop&crop=face"
        },
        {
          id: 3,
          name: "Emma Wilson",
          avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=32&h=32&fit=crop&crop=face"
        }
      ]
    },
    {
      id: 2,
      title: "Project Manager",
      type: "Job Interview",
      time: "Today 14:00-15:00",
      participants: [
        {
          id: 4,
          name: "John Doe",
          avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face"
        },
        {
          id: 5,
          name: "Lisa Wang",
          avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=32&h=32&fit=crop&crop=face"
        }
      ]
    },
    {
      id: 3,
      title: "Project Manager",
      type: "Job Interview",
      time: "Today 16:00-17:00",
      participants: [
        {
          id: 6,
          name: "Alex Rodriguez",
          avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=32&h=32&fit=crop&crop=face"
        },
        {
          id: 7,
          name: "Maria Garcia",
          avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=32&h=32&fit=crop&crop=face"
        },
        {
          id: 8,
          name: "David Kim",
          avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=32&h=32&fit=crop&crop=face"
        },
        {
          id: 9,
          name: "Sophie Turner",
          avatar: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=32&h=32&fit=crop&crop=face"
        }
      ]
    }
  ];

  const reminders: Reminder[] = [
    {
      id: 1,
      title: "Vocabulary test",
      date: "12 Dec 2022",
      time: "Friday",
      type: "test"
    },
    {
      id: 2,
      title: "Essay",
      date: "12 Dec 2022", 
      time: "Friday",
      type: "essay"
    },
    {
      id: 3,
      title: "Speaking Class",
      date: "12 Dec 2022",
      time: "Friday", 
      type: "class"
    },
    {
      id: 4,
      title: "Assignment Due",
      date: "15 Dec 2022",
      time: "Monday",
      type: "assignment"
    }
  ];

  // Generate calendar days for December 2022
  const generateCalendarDays = (): CalendarDay[] => {
    const daysInMonth = 31;
    const today = new Date().getDate();
    const days: CalendarDay[] = [];
    
    for (let i = 1; i <= daysInMonth; i++) {
      days.push({
        date: i,
        isToday: i === today,
        isSelected: i === selectedDate,
        hasEvent: [12, 15, 18, 22].includes(i) // Sample event dates
      });
    }
    
    return days;
  };

  const calendarDays = generateCalendarDays();
  const weekDays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

  const getReminderIcon = (type: string) => {
    switch (type) {
      case 'test':
        return (
          <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center">
            <svg className="w-4 h-4 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
        );
      case 'essay':
        return (
          <div className="w-8 h-8 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
            <svg className="w-4 h-4 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
            </svg>
          </div>
        );
      case 'class':
        return (
          <div className="w-8 h-8 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center">
            <svg className="w-4 h-4 text-purple-600 dark:text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            </svg>
          </div>
        );
      default:
        return (
          <div className="w-8 h-8 bg-yellow-100 dark:bg-yellow-900/30 rounded-full flex items-center justify-center">
            <svg className="w-4 h-4 text-yellow-600 dark:text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
          </div>
        );
    }
  };

  return (
    <div className="space-y-6">
      {/* Upcoming Meeting Card */}
      <motion.div
        className="bg-white/90 dark:bg-gray-800/95 backdrop-blur-xl rounded-2xl p-6 border border-gray-200/50 dark:border-gray-700/50 shadow-xl"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Upcoming Meeting Section */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Upcoming Meeting</h3>
          <div className="space-y-3">
            {meetings.map((meeting, index) => (
              <motion.div
                key={meeting.id}
                className="relative p-3 rounded-lg bg-gray-100/50 dark:bg-gray-700/50 hover:bg-gray-200/70 dark:hover:bg-gray-700/70 transition-all duration-200 cursor-pointer border border-gray-300/30 dark:border-gray-600/30"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.02 }}
              >
                {/* Status dot */}
                <div className="flex items-center mb-2">
                  <div className="w-2 h-2 rounded-full bg-blue-500 mr-2"></div>
                </div>

                {/* Meeting info */}
                <div className="mb-3">
                  <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-1">
                    {meeting.title} - {meeting.type}
                  </h4>
                  <p className="text-xs text-gray-600 dark:text-gray-300">
                    {meeting.time}
                  </p>
                </div>

                {/* Participants */}
                <div className="flex items-center">
                  <div className="flex -space-x-1">
                    {meeting.participants.slice(0, 4).map((participant, idx) => (
                      <motion.img
                        key={participant.id}
                        src={participant.avatar}
                        alt={participant.name}
                        className="w-6 h-6 rounded-full border-2 border-white dark:border-gray-800 hover:border-blue-500 transition-colors"
                        style={{ zIndex: meeting.participants.length - idx }}
                        whileHover={{ scale: 1.1, zIndex: 10 }}
                        title={participant.name}
                      />
                    ))}
                    {meeting.participants.length > 4 && (
                      <div className="w-6 h-6 rounded-full bg-gray-400 dark:bg-gray-600 border-2 border-white dark:border-gray-800 flex items-center justify-center">
                        <span className="text-xs text-white font-medium">
                          +{meeting.participants.length - 4}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Calendar and Reminders Card */}
      <motion.div
        className="bg-white/80 dark:bg-gray-800/95 backdrop-blur-xl rounded-2xl p-6 border border-white/20 dark:border-gray-700/50 shadow-xl"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >


      {/* Calendar Section */}
      <div className="mb-6">
        <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 text-center">
          December 2022
        </h4>
        
        {/* Week days header */}
        <div className="grid grid-cols-7 gap-1 mb-2">
          {weekDays.map((day) => (
            <div key={day} className="text-xs text-gray-500 dark:text-gray-400 text-center py-1">
              {day}
            </div>
          ))}
        </div>
        
        {/* Calendar grid */}
        <div className="grid grid-cols-7 gap-1">
          {/* Empty cells for days before month starts */}
          {[...Array(3)].map((_, i) => (
            <div key={`empty-${i}`} className="h-8"></div>
          ))}
          
          {calendarDays.map((day) => (
            <motion.button
              key={day.date}
              onClick={() => setSelectedDate(day.date)}
              className={`h-8 w-8 text-xs rounded-full transition-all duration-200 ${
                day.isToday
                  ? 'bg-blue-500 text-white'
                  : day.isSelected
                  ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400'
                  : day.hasEvent
                  ? 'bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400'
                  : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
              }`}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              {day.date}
            </motion.button>
          ))}
        </div>
      </div>

      {/* Reminders Section */}
      <div>
        <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Reminders</h4>
        <div className="space-y-3">
          {reminders.map((reminder, index) => (
            <motion.div
              key={reminder.id}
              className="flex items-center space-x-3 p-3 rounded-lg bg-gray-50/50 dark:bg-gray-700/30 hover:bg-gray-100/50 dark:hover:bg-gray-700/50 transition-colors cursor-pointer"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              {getReminderIcon(reminder.type)}
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-900 dark:text-white">
                  {reminder.title}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  {reminder.date}, {reminder.time}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
      </motion.div>
    </div>
  );
}

export default ProfileCalendar;
