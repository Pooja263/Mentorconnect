import { useState } from "react";
import ProfileCalendar from "../components/UI/ProfileCalendar";
import EarningsChart from "../components/UI/EarningsChart";

function Dashboard() {
  const [sessionRequests, setSessionRequests] = useState([
    {
      id: 1,
      title: "Mathematics Tutoring",
      student: "Emma Wilson",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=40&h=40&fit=crop&crop=face",
      time: "Today, 3:00 PM",
      duration: "60 minutes",
      status: "pending" // pending, accepted, denied
    },
    {
      id: 2,
      title: "Physics Help",
      student: "Alex Chen",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face",
      time: "Tomorrow, 10:00 AM",
      duration: "45 minutes",
      status: "pending"
    }
  ]);

  const handleSessionAction = (sessionId: number, action: 'accept' | 'deny') => {
    setSessionRequests(prev =>
      prev.map(session =>
        session.id === sessionId
          ? { ...session, status: action === 'accept' ? 'accepted' : 'denied' }
          : session
      )
    );
  };

  return (
    <div className="flex gap-6">
      {/* Main Content */}
      <div className="flex-1 space-y-6">
      {/* Welcome section */}
      <div className="bg-slate-900 rounded-lg p-6 text-white">
        <h1 className="text-2xl font-bold mb-2">Welcome back, John!</h1>
        <p className="text-slate-300">Here's what's happening with your mentoring today.</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Total Earnings Card */}
        <div className="relative bg-white/90 dark:bg-gray-900/80 backdrop-blur-xl rounded-2xl p-6 text-gray-900 dark:text-white overflow-hidden border border-gray-200/50 dark:border-white/10 shadow-2xl">
          {/* Glass effect overlay - light mode has gradient on edges, dark mode has subtle overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-gray-100/20 via-transparent to-gray-100/20 dark:from-white/5 dark:to-transparent rounded-2xl"></div>
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-4">
              <div className="p-2 bg-gray-100/80 dark:bg-white/10 rounded-lg backdrop-blur-sm border border-gray-200/50 dark:border-white/20">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"/>
                </svg>
              </div>
              <div className="text-right">
                <p className="text-gray-600 dark:text-gray-300 text-sm font-medium">Balance</p>
              </div>
            </div>
            <div className="mb-2">
              <p className="text-gray-500 dark:text-gray-400 text-sm">Total Earnings</p>
              <p className="text-3xl font-bold">$6,000</p>
            </div>
            <div className="flex items-center">
              <span className="text-green-600 dark:text-green-400 text-sm">↗ +12%</span>
            </div>
          </div>
          {/* Glass decorative elements */}
          <div className="absolute -right-4 -bottom-4 w-24 h-24 bg-gray-100/30 dark:bg-white/5 rounded-full backdrop-blur-sm"></div>
          <div className="absolute -right-8 -bottom-8 w-32 h-32 bg-gray-100/20 dark:bg-white/3 rounded-full backdrop-blur-sm"></div>
        </div>

        {/* Total Sessions Card */}
        <div className="relative bg-white/90 dark:bg-gray-900/80 backdrop-blur-xl rounded-2xl p-6 text-gray-900 dark:text-white overflow-hidden border border-gray-200/50 dark:border-white/10 shadow-2xl">
          {/* Glass effect overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-gray-100/20 via-transparent to-gray-100/20 dark:from-white/5 dark:to-transparent rounded-2xl"></div>
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-4">
              <div className="p-2 bg-gray-100/80 dark:bg-white/10 rounded-lg backdrop-blur-sm border border-gray-200/50 dark:border-white/20">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>
                </svg>
              </div>
              <div className="text-right">
                <p className="text-gray-600 dark:text-gray-300 text-sm font-medium">Sessions</p>
              </div>
            </div>
            <div className="mb-2">
              <p className="text-gray-500 dark:text-gray-400 text-sm">Total Sessions</p>
              <p className="text-3xl font-bold">2034</p>
            </div>
            <div className="flex items-center">
              <span className="text-green-600 dark:text-green-400 text-sm">↗ +8%</span>
            </div>
          </div>
          {/* Glass decorative elements */}
          <div className="absolute -right-4 -bottom-4 w-24 h-24 bg-gray-100/30 dark:bg-white/5 rounded-full backdrop-blur-sm"></div>
          <div className="absolute -right-8 -bottom-8 w-32 h-32 bg-gray-100/20 dark:bg-white/3 rounded-full backdrop-blur-sm"></div>
        </div>

        {/* Ratings Card */}
        <div className="relative bg-white/90 dark:bg-gray-900/80 backdrop-blur-xl rounded-2xl p-6 text-gray-900 dark:text-white overflow-hidden border border-gray-200/50 dark:border-white/10 shadow-2xl">
          {/* Glass effect overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-gray-100/20 via-transparent to-gray-100/20 dark:from-white/5 dark:to-transparent rounded-2xl"></div>
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-4">
              <div className="p-2 bg-gray-100/80 dark:bg-white/10 rounded-lg backdrop-blur-sm border border-gray-200/50 dark:border-white/20">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 17.27L18.18 21L16.54 13.97L22 9.24L14.81 8.63L12 2L9.19 8.63L2 9.24L7.46 13.97L5.82 21L12 17.27Z"/>
                </svg>
              </div>
              <div className="text-right">
                <p className="text-gray-600 dark:text-gray-300 text-sm font-medium">Rating</p>
              </div>
            </div>
            <div className="mb-2">
              <p className="text-gray-500 dark:text-gray-400 text-sm">Ratings</p>
              <p className="text-3xl font-bold">4.9/5</p>
            </div>
            <div className="flex items-center">
              <span className="text-gray-600 dark:text-gray-300 text-sm">156 reviews</span>
            </div>
          </div>
          {/* Glass decorative elements */}
          <div className="absolute -right-4 -bottom-4 w-24 h-24 bg-gray-100/30 dark:bg-white/5 rounded-full backdrop-blur-sm"></div>
          <div className="absolute -right-8 -bottom-8 w-32 h-32 bg-gray-100/20 dark:bg-white/3 rounded-full backdrop-blur-sm"></div>
        </div>
      </div>

      {/* Earnings Chart and Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Earnings Chart */}
        <EarningsChart />

        {/* Recent Activity */}
        <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Recent Activity</h2>
          <div className="space-y-4">
            <div className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
              <div>
                <p className="text-sm text-gray-900 dark:text-white">Completed session with Sarah</p>
                <p className="text-xs text-gray-500 dark:text-gray-500">2 hours ago</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
              <div>
                <p className="text-sm text-gray-900 dark:text-white">New content published: "Advanced Calculus"</p>
                <p className="text-xs text-gray-500 dark:text-gray-500">5 hours ago</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2"></div>
              <div>
                <p className="text-sm text-gray-900 dark:text-white">Payment received: $75</p>
                <p className="text-xs text-gray-500 dark:text-gray-500">1 day ago</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-purple-500 rounded-full mt-2"></div>
              <div>
                <p className="text-sm text-gray-900 dark:text-white">New follower: Mike Johnson</p>
                <p className="text-xs text-gray-500 dark:text-gray-500">2 days ago</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Upcoming sessions */}
      <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Session Requests</h2>
        <div className="space-y-4">
          {sessionRequests.map((session) => (
            <div key={session.id} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <div className="flex items-center space-x-4">
                <img
                  src={session.avatar}
                  alt="Student"
                  className="w-10 h-10 rounded-full"
                />
                <div>
                  <p className="font-medium text-gray-900 dark:text-white">{session.title}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">with {session.student}</p>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <div className="text-right">
                  <p className="text-sm font-medium text-gray-900 dark:text-white">{session.time}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-500">{session.duration}</p>
                </div>

                {/* Action buttons */}
                {session.status === 'pending' && (
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleSessionAction(session.id, 'accept')}
                      className="px-3 py-1 bg-green-500 hover:bg-green-600 text-white text-sm rounded-lg transition-colors flex items-center space-x-1"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span>Accept</span>
                    </button>
                    <button
                      onClick={() => handleSessionAction(session.id, 'deny')}
                      className="px-3 py-1 bg-red-500 hover:bg-red-600 text-white text-sm rounded-lg transition-colors flex items-center space-x-1"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                      <span>Deny</span>
                    </button>
                  </div>
                )}

                {/* Status indicators */}
                {session.status === 'accepted' && (
                  <div className="flex items-center space-x-1 text-green-600 dark:text-green-400">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-sm font-medium">Accepted</span>
                  </div>
                )}

                {session.status === 'denied' && (
                  <div className="flex items-center space-x-1 text-red-600 dark:text-red-400">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                    <span className="text-sm font-medium">Denied</span>
                  </div>
                )}
              </div>
            </div>
          ))}

          {sessionRequests.length === 0 && (
            <div className="text-center py-8">
              <p className="text-gray-500 dark:text-gray-400">No session requests at the moment</p>
            </div>
          )}
        </div>
      </div>
      </div>

      {/* Right Sidebar */}
      <div className="w-80 flex-shrink-0">
        <ProfileCalendar />
      </div>
    </div>
  );
}

export default Dashboard;