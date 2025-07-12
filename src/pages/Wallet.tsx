import { useState } from "react";
import { motion } from "framer-motion";

interface Transaction {
  id: number;
  type: 'earning' | 'transfer' | 'refund';
  amount: number;
  description: string;
  date: string;
  status: 'completed' | 'pending' | 'failed';
  student?: string;
  subject?: string;
}

interface SessionEarning {
  id: number;
  studentName: string;
  studentAvatar: string;
  subject: string;
  date: string;
  time: string;
  duration: string;
  amount: number;
  rating?: number;
}

function Wallet() {
  const [activeTab, setActiveTab] = useState<'overview' | 'sessions' | 'history' | 'transfer' | 'autopay'>('overview');
  const [weeklyAutoPay, setWeeklyAutoPay] = useState(true);
  const [monthlyAutoPay, setMonthlyAutoPay] = useState(false);
  const [transferAmount, setTransferAmount] = useState('');

  // Sample wallet data
  const walletData = {
    totalBalance: 2450.75,
    pendingEarnings: 320.50,
    thisWeekEarnings: 485.25,
    thisMonthEarnings: 1890.00,
    lastMonthEarnings: 2150.00,
    totalEarnings: 15750.00,
    availableForTransfer: 2130.25
  };

  const sessionEarnings: SessionEarning[] = [
    {
      id: 1,
      studentName: "Emma Wilson",
      studentAvatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=40&h=40&fit=crop&crop=face",
      subject: "Mathematics - Calculus",
      date: "2024-01-15",
      time: "3:00 PM",
      duration: "60 minutes",
      amount: 75.00,
      rating: 5
    },
    {
      id: 2,
      studentName: "Alex Chen",
      studentAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face",
      subject: "Physics - Mechanics",
      date: "2024-01-14",
      time: "10:00 AM",
      duration: "45 minutes",
      amount: 60.00,
      rating: 4
    },
    {
      id: 3,
      studentName: "Sarah Johnson",
      studentAvatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop&crop=face",
      subject: "Chemistry - Organic",
      date: "2024-01-13",
      time: "2:00 PM",
      duration: "90 minutes",
      amount: 110.00,
      rating: 5
    },
    {
      id: 4,
      studentName: "Mike Rodriguez",
      studentAvatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face",
      subject: "Biology - Genetics",
      date: "2024-01-12",
      time: "4:00 PM",
      duration: "60 minutes",
      amount: 75.00,
      rating: 4
    },
    {
      id: 5,
      studentName: "Lisa Park",
      studentAvatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=40&h=40&fit=crop&crop=face",
      subject: "English Literature",
      date: "2024-01-11",
      time: "11:00 AM",
      duration: "45 minutes",
      amount: 55.00,
      rating: 5
    }
  ];

  const transactionHistory: Transaction[] = [
    {
      id: 1,
      type: 'earning',
      amount: 75.00,
      description: 'Session with Emma Wilson - Mathematics',
      date: '2024-01-15',
      status: 'completed',
      student: 'Emma Wilson',
      subject: 'Mathematics'
    },
    {
      id: 2,
      type: 'transfer',
      amount: 500.00,
      description: 'Bank transfer to ****1234',
      date: '2024-01-14',
      status: 'completed'
    },
    {
      id: 3,
      type: 'earning',
      amount: 60.00,
      description: 'Session with Alex Chen - Physics',
      date: '2024-01-14',
      status: 'completed',
      student: 'Alex Chen',
      subject: 'Physics'
    },
    {
      id: 4,
      type: 'transfer',
      amount: 300.00,
      description: 'Bank transfer to ****1234',
      date: '2024-01-12',
      status: 'pending'
    },
    {
      id: 5,
      type: 'earning',
      amount: 110.00,
      description: 'Session with Sarah Johnson - Chemistry',
      date: '2024-01-13',
      status: 'completed',
      student: 'Sarah Johnson',
      subject: 'Chemistry'
    },
    {
      id: 6,
      type: 'refund',
      amount: 25.00,
      description: 'Refund for cancelled session',
      date: '2024-01-10',
      status: 'completed'
    }
  ];

  const handleTransfer = () => {
    if (transferAmount && parseFloat(transferAmount) > 0) {
      console.log(`Transferring $${transferAmount} to bank account`);
      // Handle transfer logic here
      setTransferAmount('');
    }
  };

  const tabs = [
    { id: 'overview', label: 'Amount Overview' },
    { id: 'sessions', label: 'Session Earnings' },
    { id: 'history', label: 'History' },
    { id: 'transfer', label: 'Transfer to Bank' },
    { id: 'autopay', label: 'Auto Payments' }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-slate-900 rounded-lg p-6 text-white">
        <h1 className="text-2xl font-bold mb-2">Wallet</h1>
        <p className="text-slate-300">Manage your earnings and payments</p>
      </div>

      {/* Balance Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Total Balance */}
        <div className="relative bg-white/90 dark:bg-gray-900/80 backdrop-blur-xl rounded-2xl p-6 text-gray-900 dark:text-white overflow-hidden border border-gray-200/50 dark:border-white/10 shadow-2xl">
          <div className="absolute inset-0 bg-gradient-to-br from-gray-100/20 via-transparent to-gray-100/20 dark:from-white/5 dark:to-transparent rounded-2xl"></div>
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-4">
              <div className="p-2 bg-gray-100/80 dark:bg-white/10 rounded-lg backdrop-blur-sm border border-gray-200/50 dark:border-white/20">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"/>
                </svg>
              </div>
            </div>
            <div className="mb-2">
              <p className="text-gray-500 dark:text-gray-400 text-sm">Total Balance</p>
              <p className="text-3xl font-bold">${walletData.totalBalance.toLocaleString()}</p>
            </div>
            <div className="flex items-center">
              <span className="text-green-600 dark:text-green-400 text-sm">+${walletData.pendingEarnings} pending</span>
            </div>
          </div>
        </div>

        {/* This Week */}
        <div className="relative bg-white/90 dark:bg-gray-900/80 backdrop-blur-xl rounded-2xl p-6 text-gray-900 dark:text-white overflow-hidden border border-gray-200/50 dark:border-white/10 shadow-2xl">
          <div className="absolute inset-0 bg-gradient-to-br from-gray-100/20 via-transparent to-gray-100/20 dark:from-white/5 dark:to-transparent rounded-2xl"></div>
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-4">
              <div className="p-2 bg-gray-100/80 dark:bg-white/10 rounded-lg backdrop-blur-sm border border-gray-200/50 dark:border-white/20">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>
                </svg>
              </div>
            </div>
            <div className="mb-2">
              <p className="text-gray-500 dark:text-gray-400 text-sm">This Week</p>
              <p className="text-3xl font-bold">${walletData.thisWeekEarnings.toLocaleString()}</p>
            </div>
          </div>
        </div>

        {/* This Month */}
        <div className="relative bg-white/90 dark:bg-gray-900/80 backdrop-blur-xl rounded-2xl p-6 text-gray-900 dark:text-white overflow-hidden border border-gray-200/50 dark:border-white/10 shadow-2xl">
          <div className="absolute inset-0 bg-gradient-to-br from-gray-100/20 via-transparent to-gray-100/20 dark:from-white/5 dark:to-transparent rounded-2xl"></div>
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-4">
              <div className="p-2 bg-gray-100/80 dark:bg-white/10 rounded-lg backdrop-blur-sm border border-gray-200/50 dark:border-white/20">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/>
                </svg>
              </div>
            </div>
            <div className="mb-2">
              <p className="text-gray-500 dark:text-gray-400 text-sm">This Month</p>
              <p className="text-3xl font-bold">${walletData.thisMonthEarnings.toLocaleString()}</p>
            </div>
          </div>
        </div>

        {/* Total Earnings */}
        <div className="relative bg-white/90 dark:bg-gray-900/80 backdrop-blur-xl rounded-2xl p-6 text-gray-900 dark:text-white overflow-hidden border border-gray-200/50 dark:border-white/10 shadow-2xl">
          <div className="absolute inset-0 bg-gradient-to-br from-gray-100/20 via-transparent to-gray-100/20 dark:from-white/5 dark:to-transparent rounded-2xl"></div>
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-4">
              <div className="p-2 bg-gray-100/80 dark:bg-white/10 rounded-lg backdrop-blur-sm border border-gray-200/50 dark:border-white/20">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"/>
                </svg>
              </div>
            </div>
            <div className="mb-2">
              <p className="text-gray-500 dark:text-gray-400 text-sm">Total Earnings</p>
              <p className="text-3xl font-bold">${walletData.totalEarnings.toLocaleString()}</p>
            </div>
          </div>
        </div>
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
        className="space-y-6"
      >
        {/* Amount Overview */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Amount Overview</h2>

            {/* Detailed Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Earnings Breakdown</h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600 dark:text-gray-400">This Week</span>
                    <span className="font-semibold text-gray-900 dark:text-white">${walletData.thisWeekEarnings}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600 dark:text-gray-400">This Month</span>
                    <span className="font-semibold text-gray-900 dark:text-white">${walletData.thisMonthEarnings}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600 dark:text-gray-400">Last Month</span>
                    <span className="font-semibold text-gray-900 dark:text-white">${walletData.lastMonthEarnings}</span>
                  </div>
                  <hr className="border-gray-200 dark:border-gray-700" />
                  <div className="flex justify-between items-center">
                    <span className="text-gray-900 dark:text-white font-semibold">Total Lifetime</span>
                    <span className="font-bold text-green-600 dark:text-green-400">${walletData.totalEarnings}</span>
                  </div>
                </div>
              </div>

              <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Account Status</h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600 dark:text-gray-400">Available Balance</span>
                    <span className="font-semibold text-gray-900 dark:text-white">${walletData.totalBalance}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600 dark:text-gray-400">Pending Earnings</span>
                    <span className="font-semibold text-yellow-600 dark:text-yellow-400">${walletData.pendingEarnings}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600 dark:text-gray-400">Available for Transfer</span>
                    <span className="font-semibold text-green-600 dark:text-green-400">${walletData.availableForTransfer}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Session-wise Earnings */}
        {activeTab === 'sessions' && (
          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Session-wise Earnings</h2>
            {sessionEarnings.map((session) => (
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
                  <div className="text-right">
                    <span className="text-2xl font-bold text-green-600 dark:text-green-400">
                      +${session.amount}
                    </span>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Earned</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* Transaction History */}
        {activeTab === 'history' && (
          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Transaction History</h2>
            {transactionHistory.map((transaction) => (
              <motion.div
                key={transaction.id}
                className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3 }}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                      transaction.type === 'earning' ? 'bg-green-100 dark:bg-green-900/30' :
                      transaction.type === 'transfer' ? 'bg-blue-100 dark:bg-blue-900/30' :
                      'bg-yellow-100 dark:bg-yellow-900/30'
                    }`}>
                      {transaction.type === 'earning' ? (
                        <svg className="w-6 h-6 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"/>
                        </svg>
                      ) : transaction.type === 'transfer' ? (
                        <svg className="w-6 h-6 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"/>
                        </svg>
                      ) : (
                        <svg className="w-6 h-6 text-yellow-600 dark:text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6"/>
                        </svg>
                      )}
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 dark:text-white">{transaction.description}</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{transaction.date}</p>
                      <div className="flex items-center space-x-2 mt-1">
                        <span className={`px-2 py-1 rounded-full text-xs ${
                          transaction.status === 'completed' ? 'bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400' :
                          transaction.status === 'pending' ? 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-600 dark:text-yellow-400' :
                          'bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400'
                        }`}>
                          {transaction.status}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className={`text-xl font-bold ${
                      transaction.type === 'earning' || transaction.type === 'refund'
                        ? 'text-green-600 dark:text-green-400'
                        : 'text-red-600 dark:text-red-400'
                    }`}>
                      {transaction.type === 'earning' || transaction.type === 'refund' ? '+' : '-'}${transaction.amount}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* Transfer to Bank Account */}
        {activeTab === 'transfer' && (
          <div className="space-y-6">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Transfer to Bank Account</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Transfer Form */}
              <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Make a Transfer</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Available Balance
                    </label>
                    <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                      ${walletData.availableForTransfer.toLocaleString()}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Transfer Amount
                    </label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-400">$</span>
                      <input
                        type="number"
                        value={transferAmount}
                        onChange={(e) => setTransferAmount(e.target.value)}
                        placeholder="0.00"
                        className="w-full pl-8 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg
                                 bg-white dark:bg-gray-700 text-gray-900 dark:text-white
                                 focus:ring-2 focus:ring-slate-500 focus:border-transparent"
                        max={walletData.availableForTransfer}
                      />
                    </div>
                  </div>

                  <div className="flex space-x-2">
                    <button
                      onClick={() => setTransferAmount((walletData.availableForTransfer * 0.25).toString())}
                      className="px-3 py-1 text-xs bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-md hover:bg-gray-200 dark:hover:bg-gray-600"
                    >
                      25%
                    </button>
                    <button
                      onClick={() => setTransferAmount((walletData.availableForTransfer * 0.5).toString())}
                      className="px-3 py-1 text-xs bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-md hover:bg-gray-200 dark:hover:bg-gray-600"
                    >
                      50%
                    </button>
                    <button
                      onClick={() => setTransferAmount((walletData.availableForTransfer * 0.75).toString())}
                      className="px-3 py-1 text-xs bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-md hover:bg-gray-200 dark:hover:bg-gray-600"
                    >
                      75%
                    </button>
                    <button
                      onClick={() => setTransferAmount(walletData.availableForTransfer.toString())}
                      className="px-3 py-1 text-xs bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-md hover:bg-gray-200 dark:hover:bg-gray-600"
                    >
                      Max
                    </button>
                  </div>

                  <button
                    onClick={handleTransfer}
                    disabled={!transferAmount || parseFloat(transferAmount) <= 0}
                    className="w-full bg-slate-900 hover:bg-slate-800 disabled:bg-gray-400 disabled:cursor-not-allowed
                             text-white font-medium py-3 px-4 rounded-lg transition-colors"
                  >
                    Transfer ${transferAmount || '0.00'}
                  </button>
                </div>
              </div>

              {/* Bank Account Info */}
              <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Bank Account</h3>
                <div className="space-y-4">
                  <div className="flex items-center space-x-3 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center">
                      <svg className="w-6 h-6 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"/>
                      </svg>
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900 dark:text-white">Chase Bank</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">****1234</p>
                      <p className="text-xs text-green-600 dark:text-green-400">✓ Verified</p>
                    </div>
                  </div>

                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    <p className="mb-2"><strong>Transfer Time:</strong> 1-3 business days</p>
                    <p className="mb-2"><strong>Transfer Fee:</strong> Free</p>
                    <p><strong>Minimum Transfer:</strong> $10.00</p>
                  </div>

                  <button className="w-full border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300
                                   hover:bg-gray-50 dark:hover:bg-gray-700 font-medium py-2 px-4 rounded-lg transition-colors">
                    Change Bank Account
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Auto Payments */}
        {activeTab === 'autopay' && (
          <div className="space-y-6">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Monthly/Weekly Auto Payments</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Auto Payment Settings */}
              <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Auto Transfer Settings</h3>
                <div className="space-y-6">
                  {/* Weekly Auto Transfer */}
                  <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <div>
                      <h4 className="font-semibold text-gray-900 dark:text-white">Weekly Auto Transfer</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Every Friday at 5:00 PM</p>
                      <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">
                        Automatically transfer earnings weekly
                      </p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        className="sr-only peer"
                        checked={weeklyAutoPay}
                        onChange={(e) => setWeeklyAutoPay(e.target.checked)}
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                    </label>
                  </div>

                  {/* Monthly Auto Transfer */}
                  <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <div>
                      <h4 className="font-semibold text-gray-900 dark:text-white">Monthly Auto Transfer</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Last day of each month at 11:59 PM</p>
                      <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">
                        Automatically transfer all earnings monthly
                      </p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        className="sr-only peer"
                        checked={monthlyAutoPay}
                        onChange={(e) => setMonthlyAutoPay(e.target.checked)}
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                    </label>
                  </div>

                  {/* Auto Payment Rules */}
                  <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
                    <h4 className="font-semibold text-blue-900 dark:text-blue-300 mb-2">Auto Payment Rules</h4>
                    <ul className="text-sm text-blue-800 dark:text-blue-400 space-y-1">
                      <li>• Minimum transfer amount: $10.00</li>
                      <li>• Only available balance will be transferred</li>
                      <li>• Pending earnings are not included</li>
                      <li>• You can disable auto payments anytime</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Auto Payment History */}
              <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Recent Auto Transfers</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <div>
                      <p className="font-medium text-gray-900 dark:text-white">Weekly Auto Transfer</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Jan 12, 2024 • 5:00 PM</p>
                    </div>
                    <span className="font-semibold text-green-600 dark:text-green-400">$485.25</span>
                  </div>

                  <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <div>
                      <p className="font-medium text-gray-900 dark:text-white">Weekly Auto Transfer</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Jan 5, 2024 • 5:00 PM</p>
                    </div>
                    <span className="font-semibold text-green-600 dark:text-green-400">$320.50</span>
                  </div>

                  <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <div>
                      <p className="font-medium text-gray-900 dark:text-white">Monthly Auto Transfer</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Dec 31, 2023 • 11:59 PM</p>
                    </div>
                    <span className="font-semibold text-green-600 dark:text-green-400">$2,150.00</span>
                  </div>
                </div>

                <div className="mt-4 p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg border border-yellow-200 dark:border-yellow-800">
                  <p className="text-sm text-yellow-800 dark:text-yellow-400">
                    <strong>Next Auto Transfer:</strong> {weeklyAutoPay ? 'Friday, Jan 19, 2024 at 5:00 PM' : monthlyAutoPay ? 'Jan 31, 2024 at 11:59 PM' : 'No auto transfers scheduled'}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
}

export default Wallet;
