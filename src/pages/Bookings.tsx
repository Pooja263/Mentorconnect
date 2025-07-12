import { useState } from "react";
import { motion } from "framer-motion";

interface BookingRequest {
  id: number;
  studentName: string;
  studentAvatar: string;
  subject: string;
  date: string;
  time: string;
  duration: string;
  status: 'pending' | 'accepted' | 'declined';
  message?: string;
}

interface Session {
  id: number;
  studentName: string;
  studentAvatar: string;
  subject: string;
  date: string;
  time: string;
  duration: string;
  status: 'scheduled' | 'completed' | 'cancelled' | 'rescheduled';
  originalDate?: string;
  rating?: number;
  earnings?: number;
}

function Bookings() {
  const [activeTab, setActiveTab] = useState<'requests' | 'bulk' | 'rescheduled' | 'cancelled' | 'completed'>('requests');

  // Sample data
  const bookingRequests: BookingRequest[] = [
    {
      id: 1,
      studentName: "Emma Wilson",
      studentAvatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=40&h=40&fit=crop&crop=face",
      subject: "Mathematics - Calculus",
      date: "2024-01-15",
      time: "3:00 PM",
      duration: "60 minutes",
      status: 'pending',
      message: "Need help with derivatives and integration"
    },
    {
      id: 2,
      studentName: "Alex Chen",
      studentAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face",
      subject: "Physics - Mechanics",
      date: "2024-01-16",
      time: "10:00 AM",
      duration: "45 minutes",
      status: 'pending',
      message: "Struggling with Newton's laws"
    },
    {
      id: 3,
      studentName: "Sarah Johnson",
      studentAvatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop&crop=face",
      subject: "Chemistry - Organic",
      date: "2024-01-17",
      time: "2:00 PM",
      duration: "90 minutes",
      status: 'pending',
      message: "Preparation for upcoming exam"
    }
  ];

  const bulkSessions: Session[] = [
    {
      id: 1,
      studentName: "Group A - Mathematics",
      studentAvatar: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=40&h=40&fit=crop&crop=face",
      subject: "Advanced Calculus Workshop",
      date: "2024-01-20",
      time: "9:00 AM",
      duration: "2 hours",
      status: 'scheduled',
      earnings: 200
    },
    {
      id: 2,
      studentName: "Group B - Physics",
      studentAvatar: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=40&h=40&fit=crop&crop=face",
      subject: "Quantum Mechanics Seminar",
      date: "2024-01-22",
      time: "1:00 PM",
      duration: "3 hours",
      status: 'scheduled',
      earnings: 300
    }
  ];

  const rescheduledSessions: Session[] = [
    {
      id: 1,
      studentName: "Mike Rodriguez",
      studentAvatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face",
      subject: "Biology - Genetics",
      date: "2024-01-18",
      time: "4:00 PM",
      duration: "60 minutes",
      status: 'rescheduled',
      originalDate: "2024-01-15"
    },
    {
      id: 2,
      studentName: "Lisa Park",
      studentAvatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=40&h=40&fit=crop&crop=face",
      subject: "English Literature",
      date: "2024-01-19",
      time: "11:00 AM",
      duration: "45 minutes",
      status: 'rescheduled',
      originalDate: "2024-01-16"
    }
  ];

  const cancelledSessions: Session[] = [
    {
      id: 1,
      studentName: "David Kim",
      studentAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face",
      subject: "Computer Science",
      date: "2024-01-14",
      time: "2:00 PM",
      duration: "60 minutes",
      status: 'cancelled'
    }
  ];

  const completedSessions: Session[] = [
    {
      id: 1,
      studentName: "Jennifer Lee",
      studentAvatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=40&h=40&fit=crop&crop=face",
      subject: "Mathematics - Algebra",
      date: "2024-01-10",
      time: "3:00 PM",
      duration: "60 minutes",
      status: 'completed',
      rating: 5,
      earnings: 75
    },
    {
      id: 2,
      studentName: "Robert Brown",
      studentAvatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face",
      subject: "Physics - Thermodynamics",
      date: "2024-01-12",
      time: "1:00 PM",
      duration: "90 minutes",
      status: 'completed',
      rating: 4,
      earnings: 110
    },
    {
      id: 3,
      studentName: "Maria Garcia",
      studentAvatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop&crop=face",
      subject: "Spanish Language",
      date: "2024-01-13",
      time: "10:00 AM",
      duration: "45 minutes",
      status: 'completed',
      rating: 5,
      earnings: 60
    }
  ];

  const handleBookingAction = (requestId: number, action: 'accept' | 'decline') => {
    console.log(`${action} booking request ${requestId}`);
    // Handle booking action logic here
  };

  const tabs = [
    { id: 'requests', label: 'Booking Requests', count: bookingRequests.length },
    { id: 'bulk', label: 'Bulk Sessions', count: bulkSessions.length },
    { id: 'rescheduled', label: 'Rescheduled', count: rescheduledSessions.length },
    { id: 'cancelled', label: 'Cancelled', count: cancelledSessions.length },
    { id: 'completed', label: 'Completed Sessions', count: completedSessions.length }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-slate-900 rounded-lg p-6 text-white">
        <h1 className="text-2xl font-bold mb-2">Bookings & Sessions</h1>
        <p className="text-slate-300">Manage your tutoring sessions and booking requests</p>
      </div>

      {/* Tab Navigation */}
      <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-1">
        <div className="flex space-x-1 overflow-x-auto">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 whitespace-nowrap ${
                activeTab === tab.id
                  ? 'bg-slate-900 text-white'
                  : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-700'
              }`}
            >
              <span>{tab.label}</span>
              <span className={`px-2 py-1 rounded-full text-xs ${
                activeTab === tab.id
                  ? 'bg-white/20 text-white'
                  : 'bg-gray-200 dark:bg-gray-600 text-gray-600 dark:text-gray-400'
              }`}>
                {tab.count}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Content based on active tab */}
      <motion.div
        key={activeTab}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="space-y-4"
      >
        {/* Booking Requests */}
        {activeTab === 'requests' && (
          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Pending Booking Requests</h2>
            {bookingRequests.map((request) => (
              <motion.div
                key={request.id}
                className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3 }}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-4">
                    <img
                      src={request.studentAvatar}
                      alt={request.studentName}
                      className="w-12 h-12 rounded-full"
                    />
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900 dark:text-white">{request.studentName}</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">{request.subject}</p>
                      <div className="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-500 mb-3">
                        <span>📅 {request.date}</span>
                        <span>🕐 {request.time}</span>
                        <span>⏱️ {request.duration}</span>
                      </div>
                      {request.message && (
                        <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-3 mb-4">
                          <p className="text-sm text-gray-700 dark:text-gray-300">"{request.message}"</p>
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleBookingAction(request.id, 'accept')}
                      className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white text-sm rounded-lg transition-colors flex items-center space-x-1"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span>Accept</span>
                    </button>
                    <button
                      onClick={() => handleBookingAction(request.id, 'decline')}
                      className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white text-sm rounded-lg transition-colors flex items-center space-x-1"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                      <span>Decline</span>
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* Bulk Sessions */}
        {activeTab === 'bulk' && (
          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Bulk Sessions</h2>
            {bulkSessions.map((session) => (
              <motion.div
                key={session.id}
                className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3 }}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-4">
                    <img
                      src={session.studentAvatar}
                      alt={session.studentName}
                      className="w-12 h-12 rounded-full"
                    />
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900 dark:text-white">{session.studentName}</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">{session.subject}</p>
                      <div className="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-500">
                        <span>📅 {session.date}</span>
                        <span>🕐 {session.time}</span>
                        <span>⏱️ {session.duration}</span>
                        {session.earnings && (
                          <span className="text-green-600 dark:text-green-400 font-medium">💰 ${session.earnings}</span>
                        )}
                      </div>
                    </div>
                  </div>
                  <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-sm rounded-full">
                    Group Session
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* Rescheduled Sessions */}
        {activeTab === 'rescheduled' && (
          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Rescheduled Sessions</h2>
            {rescheduledSessions.map((session) => (
              <motion.div
                key={session.id}
                className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3 }}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-4">
                    <img
                      src={session.studentAvatar}
                      alt={session.studentName}
                      className="w-12 h-12 rounded-full"
                    />
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900 dark:text-white">{session.studentName}</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">{session.subject}</p>
                      <div className="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-500 mb-2">
                        <span>📅 New: {session.date}</span>
                        <span>🕐 {session.time}</span>
                        <span>⏱️ {session.duration}</span>
                      </div>
                      {session.originalDate && (
                        <p className="text-xs text-gray-400 dark:text-gray-500">
                          Originally scheduled for: {session.originalDate}
                        </p>
                      )}
                    </div>
                  </div>
                  <span className="px-3 py-1 bg-yellow-100 dark:bg-yellow-900/30 text-yellow-600 dark:text-yellow-400 text-sm rounded-full">
                    Rescheduled
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* Cancelled Sessions */}
        {activeTab === 'cancelled' && (
          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Cancelled Sessions</h2>
            {cancelledSessions.map((session) => (
              <motion.div
                key={session.id}
                className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3 }}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-4">
                    <img
                      src={session.studentAvatar}
                      alt={session.studentName}
                      className="w-12 h-12 rounded-full grayscale"
                    />
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900 dark:text-white">{session.studentName}</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">{session.subject}</p>
                      <div className="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-500">
                        <span>📅 {session.date}</span>
                        <span>🕐 {session.time}</span>
                        <span>⏱️ {session.duration}</span>
                      </div>
                    </div>
                  </div>
                  <span className="px-3 py-1 bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 text-sm rounded-full">
                    Cancelled
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* Completed Sessions */}
        {activeTab === 'completed' && (
          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Completed Sessions</h2>
            {completedSessions.map((session) => (
              <motion.div
                key={session.id}
                className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3 }}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-4">
                    <img
                      src={session.studentAvatar}
                      alt={session.studentName}
                      className="w-12 h-12 rounded-full"
                    />
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900 dark:text-white">{session.studentName}</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">{session.subject}</p>
                      <div className="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-500 mb-2">
                        <span>📅 {session.date}</span>
                        <span>🕐 {session.time}</span>
                        <span>⏱️ {session.duration}</span>
                        {session.earnings && (
                          <span className="text-green-600 dark:text-green-400 font-medium">💰 ${session.earnings}</span>
                        )}
                      </div>
                      {session.rating && (
                        <div className="flex items-center space-x-1">
                          {[...Array(5)].map((_, i) => (
                            <svg
                              key={i}
                              className={`w-4 h-4 ${
                                i < session.rating! ? 'text-yellow-400' : 'text-gray-300 dark:text-gray-600'
                              }`}
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                          ))}
                          <span className="text-sm text-gray-500 dark:text-gray-400 ml-2">
                            ({session.rating}/5)
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                  <span className="px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 text-sm rounded-full">
                    Completed
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </motion.div>
    </div>
  );
}

export default Bookings;
