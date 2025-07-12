import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ThemeToggle from "../UI/ThemeToggle";
import NotificationBell from "../UI/NotificationBell";

function Header() {
  const [profileDropdown, setProfileDropdown] = useState(false);
  const [walletDropdown, setWalletDropdown] = useState(false);
  const walletDropdownRef = useRef<HTMLDivElement>(null);

  // Close wallet dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (walletDropdownRef.current && !walletDropdownRef.current.contains(event.target as Node)) {
        setWalletDropdown(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Sample wallet data - in real app, this would come from context/API
  const walletData = {
    totalBalance: 2450.75,
    pendingEarnings: 320.50,
    thisWeekEarnings: 485.25,
    availableForTransfer: 2130.25
  };

  return (
    <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-6 py-4">
      <div className="flex items-center justify-between">
        {/* Search bar */}
        <div className="flex-1 max-w-lg">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <input
              type="text"
              placeholder="Search..."
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>

        {/* Right side actions */}
        <div className="flex items-center space-x-4">
          <ThemeToggle />
          <NotificationBell />

          {/* Wallet Icon */}
          <div className="relative" ref={walletDropdownRef}>
            <motion.button
              onClick={() => setWalletDropdown(!walletDropdown)}
              className="relative p-2 rounded-lg text-gray-600 dark:text-gray-300 transition-all duration-200 hover:scale-105
                         bg-gray-100/80 dark:bg-gray-700/90
                         hover:bg-white/60 dark:hover:bg-gray-600/90
                         backdrop-blur-sm border border-white/20 dark:border-gray-600/50
                         hover:border-white/40 dark:hover:border-gray-500/50
                         hover:shadow-lg hover:shadow-gray-200/50 dark:hover:shadow-gray-900/50"
              whileTap={{ scale: 0.95 }}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
              </svg>
              {/* Balance indicator */}
              <div className="absolute -top-1 -right-1 bg-green-500 text-white text-xs rounded-full px-1.5 py-0.5 font-medium min-w-[2rem] text-center">
                ${Math.round(walletData.totalBalance / 1000)}k
              </div>
            </motion.button>

            {/* Wallet Balance Dropdown */}
            <AnimatePresence>
              {walletDropdown && (
                <motion.div
                  className="absolute right-0 mt-2 w-80 rounded-xl shadow-2xl z-50 overflow-hidden
                             bg-white dark:bg-gray-800
                             border border-gray-200 dark:border-gray-700"
                  initial={{ opacity: 0, y: -10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -10, scale: 0.95 }}
                  transition={{ duration: 0.2, ease: "easeOut" }}
                >
                  {/* Header */}
                  <div className="p-4 bg-slate-900">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-lg font-semibold text-white">Wallet Balance</h3>
                        <p className="text-xs text-slate-300">Your current earnings</p>
                      </div>
                      <div className="text-right">
                        <p className="text-2xl font-bold text-white">${walletData.totalBalance.toLocaleString()}</p>
                        <p className="text-xs text-green-400">+${walletData.pendingEarnings} pending</p>
                      </div>
                    </div>
                  </div>

                  {/* Balance Breakdown */}
                  <div className="p-4 space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600 dark:text-gray-400">Available Balance</span>
                      <span className="font-semibold text-gray-900 dark:text-white">${walletData.totalBalance.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600 dark:text-gray-400">Pending Earnings</span>
                      <span className="font-semibold text-yellow-600 dark:text-yellow-400">${walletData.pendingEarnings.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600 dark:text-gray-400">This Week</span>
                      <span className="font-semibold text-green-600 dark:text-green-400">${walletData.thisWeekEarnings.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600 dark:text-gray-400">Available for Transfer</span>
                      <span className="font-semibold text-blue-600 dark:text-blue-400">${walletData.availableForTransfer.toLocaleString()}</span>
                    </div>
                  </div>

                  {/* Quick Actions */}
                  <div className="p-4 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-700/50">
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        onClick={() => {
                          setWalletDropdown(false);
                          // Navigate to wallet page - you can add navigation logic here
                          window.location.href = '/wallet';
                        }}
                        className="px-3 py-2 bg-slate-900 hover:bg-slate-800 text-white text-sm font-medium rounded-lg transition-colors"
                      >
                        View Wallet
                      </button>
                      <button
                        onClick={() => {
                          setWalletDropdown(false);
                          // Navigate to transfer section - you can add navigation logic here
                          window.location.href = '/wallet#transfer';
                        }}
                        className="px-3 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600 text-sm font-medium rounded-lg transition-colors"
                      >
                        Transfer
                      </button>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          
          {/* Profile dropdown */}
          <div className="relative">
            <button
              onClick={() => setProfileDropdown(!profileDropdown)}
              className="flex items-center space-x-2 text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
            >
              <img
                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face"
                alt="Profile"
                className="w-8 h-8 rounded-full"
              />
              <span className="text-sm font-medium">John Doe</span>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {profileDropdown && (
              <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 py-1 z-50">
                <a href="/profile" className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700">
                  Profile
                </a>
                <a href="/settings" className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700">
                  Settings
                </a>
                <hr className="my-1 border-gray-200 dark:border-gray-700" />
                <button className="block w-full text-left px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-gray-100 dark:hover:bg-gray-700">
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;