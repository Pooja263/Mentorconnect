import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface ContentItem {
  id: number;
  title: string;
  type: 'reel' | 'blog' | 'video' | 'link' | 'pdf' | 'github' | 'image' | 'podcast';
  status: 'published' | 'draft' | 'throttled';
  category: string;
  subCategory: string;
  customCategory?: string;
  views: number;
  hashtags: string[];
  createdAt: string;
  thumbnail?: string;
  description: string;
  shareLink: string;
  isAnonymous?: boolean;
  isGroup?: boolean;
  filters: string[];
  keywords: string[];
}

interface Category {
  id: string;
  name: string;
  subCategories: string[];
  customCategories: string[];
}

function Content() {
  const [activeView, setActiveView] = useState<'grid' | 'list' | 'upload'>('grid');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedType, setSelectedType] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [uploadType, setUploadType] = useState<string>('');
  const [showScheduleModal, setShowScheduleModal] = useState(false);
  const [scheduleDate, setScheduleDate] = useState('');
  const [scheduleTime, setScheduleTime] = useState('');
  const [scheduleTimezone, setScheduleTimezone] = useState('UTC-5 (EST)');
  const [repeatSchedule, setRepeatSchedule] = useState('none');
  const [reminderTime, setReminderTime] = useState('1hour');
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Sample categories
  const categories: Category[] = [
    {
      id: 'education',
      name: 'Education',
      subCategories: ['Mathematics', 'Physics', 'Chemistry', 'Biology', 'Computer Science'],
      customCategories: ['Advanced Calculus', 'Quantum Physics', 'Organic Chemistry']
    },
    {
      id: 'technology',
      name: 'Technology',
      subCategories: ['Programming', 'AI/ML', 'Web Development', 'Mobile Development'],
      customCategories: ['React Native', 'Machine Learning', 'Blockchain']
    },
    {
      id: 'business',
      name: 'Business',
      subCategories: ['Marketing', 'Finance', 'Management', 'Entrepreneurship'],
      customCategories: ['Digital Marketing', 'Startup Strategy']
    }
  ];

  // Sample content items
  const [contentItems, setContentItems] = useState<ContentItem[]>([
    {
      id: 1,
      title: "Advanced Calculus Tutorial Series",
      type: 'video',
      status: 'published',
      category: 'Education',
      subCategory: 'Mathematics',
      customCategory: 'Advanced Calculus',
      views: 1250,
      hashtags: ['#calculus', '#mathematics', '#tutorial', '#education'],
      createdAt: '2024-01-15',
      thumbnail: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=300&h=200&fit=crop',
      description: 'Comprehensive tutorial series covering advanced calculus concepts',
      shareLink: 'https://mentorconnect.com/content/calculus-tutorial',
      filters: ['beginner-friendly', 'step-by-step'],
      keywords: ['derivatives', 'integrals', 'limits']
    },
    {
      id: 2,
      title: "Physics Problem Solving Techniques",
      type: 'blog',
      status: 'published',
      category: 'Education',
      subCategory: 'Physics',
      views: 890,
      hashtags: ['#physics', '#problemsolving', '#mechanics'],
      createdAt: '2024-01-14',
      description: 'Essential techniques for solving complex physics problems',
      shareLink: 'https://mentorconnect.com/content/physics-techniques',
      filters: ['advanced', 'problem-solving'],
      keywords: ['mechanics', 'thermodynamics', 'waves']
    },
    {
      id: 3,
      title: "React Development Best Practices",
      type: 'github',
      status: 'draft',
      category: 'Technology',
      subCategory: 'Web Development',
      views: 0,
      hashtags: ['#react', '#javascript', '#webdev', '#bestpractices'],
      createdAt: '2024-01-13',
      description: 'Repository containing React development best practices and examples',
      shareLink: 'https://github.com/mentor/react-best-practices',
      filters: ['code-examples', 'best-practices'],
      keywords: ['hooks', 'components', 'state-management']
    },
    {
      id: 4,
      title: "Study Tips Podcast - Episode 12",
      type: 'podcast',
      status: 'published',
      category: 'Education',
      subCategory: 'Study Skills',
      views: 567,
      hashtags: ['#podcast', '#studytips', '#productivity'],
      createdAt: '2024-01-12',
      description: 'Weekly podcast discussing effective study techniques',
      shareLink: 'https://mentorconnect.com/podcast/study-tips-12',
      isAnonymous: false,
      isGroup: true,
      filters: ['audio-content', 'weekly-series'],
      keywords: ['productivity', 'time-management', 'focus']
    },
    {
      id: 5,
      title: "Chemistry Lab Safety Guide",
      type: 'pdf',
      status: 'throttled',
      category: 'Education',
      subCategory: 'Chemistry',
      views: 234,
      hashtags: ['#chemistry', '#safety', '#lab', '#guide'],
      createdAt: '2024-01-11',
      description: 'Comprehensive guide for chemistry laboratory safety procedures',
      shareLink: 'https://mentorconnect.com/content/chem-safety-guide.pdf',
      filters: ['safety', 'reference-material'],
      keywords: ['safety-protocols', 'equipment', 'procedures']
    }
  ]);

  const contentTypes = [
    { id: 'reel', name: 'Reels', icon: '🎬', color: 'bg-pink-500' },
    { id: 'blog', name: 'Blogs', icon: '📝', color: 'bg-blue-500' },
    { id: 'video', name: 'Videos', icon: '🎥', color: 'bg-red-500' },
    { id: 'link', name: 'Links', icon: '🔗', color: 'bg-green-500' },
    { id: 'pdf', name: 'PDF Files', icon: '📄', color: 'bg-orange-500' },
    { id: 'github', name: 'GitHub Repo', icon: '💻', color: 'bg-gray-700' },
    { id: 'image', name: 'Images', icon: '🖼️', color: 'bg-purple-500' },
    { id: 'podcast', name: 'Podcast', icon: '🎙️', color: 'bg-indigo-500' }
  ];

  const handleFileUpload = (type: string) => {
    setUploadType(type);
    setShowUploadModal(true);
  };

  const handleDeleteContent = (id: number) => {
    setContentItems(prev => prev.filter(item => item.id !== id));
  };

  const handleThrottleContent = (id: number) => {
    setContentItems(prev => prev.map(item =>
      item.id === id ? { ...item, status: item.status === 'throttled' ? 'published' : 'throttled' } : item
    ));
  };

  const filteredContent = contentItems.filter(item => {
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    const matchesType = selectedType === 'all' || item.type === selectedType;
    const matchesSearch = searchQuery === '' ||
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.hashtags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase())) ||
      item.keywords.some(keyword => keyword.toLowerCase().includes(searchQuery.toLowerCase()));

    return matchesCategory && matchesType && matchesSearch;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-slate-900 rounded-lg p-6 text-white">
        <h1 className="text-2xl font-bold mb-2">Content Studio</h1>
        <p className="text-slate-300">Create, manage, and share your educational content</p>
      </div>

      {/* Quick Upload Section */}
      <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Upload Content</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4">
          {contentTypes.map((type) => (
            <motion.button
              key={type.id}
              onClick={() => handleFileUpload(type.id)}
              className="flex flex-col items-center p-4 rounded-lg border-2 border-dashed border-gray-300 dark:border-gray-600
                         hover:border-gray-400 dark:hover:border-gray-500 transition-all duration-200 group
                         hover:bg-gray-50 dark:hover:bg-gray-700"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <div className={`w-12 h-12 ${type.color} rounded-lg flex items-center justify-center mb-2 group-hover:scale-110 transition-transform`}>
                <span className="text-2xl">{type.icon}</span>
              </div>
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300 text-center">{type.name}</span>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Filters and Search */}
      <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0 lg:space-x-4">
          {/* Search */}
          <div className="flex-1 max-w-md">
            <div className="relative">
              <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                type="text"
                placeholder="Search content, hashtags, keywords..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg
                         bg-white dark:bg-gray-700 text-gray-900 dark:text-white
                         focus:ring-2 focus:ring-slate-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Category Filter */}
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg
                     bg-white dark:bg-gray-700 text-gray-900 dark:text-white
                     focus:ring-2 focus:ring-slate-500 focus:border-transparent"
          >
            <option value="all">All Categories</option>
            {categories.map((category) => (
              <option key={category.id} value={category.name}>{category.name}</option>
            ))}
          </select>

          {/* Type Filter */}
          <select
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
            className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg
                     bg-white dark:bg-gray-700 text-gray-900 dark:text-white
                     focus:ring-2 focus:ring-slate-500 focus:border-transparent"
          >
            <option value="all">All Types</option>
            {contentTypes.map((type) => (
              <option key={type.id} value={type.id}>{type.name}</option>
            ))}
          </select>

          {/* View Toggle */}
          <div className="flex bg-gray-100 dark:bg-gray-700 rounded-lg p-1">
            <button
              onClick={() => setActiveView('grid')}
              className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
                activeView === 'grid'
                  ? 'bg-white dark:bg-gray-600 text-gray-900 dark:text-white shadow-sm'
                  : 'text-gray-600 dark:text-gray-400'
              }`}
            >
              Grid
            </button>
            <button
              onClick={() => setActiveView('list')}
              className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
                activeView === 'list'
                  ? 'bg-white dark:bg-gray-600 text-gray-900 dark:text-white shadow-sm'
                  : 'text-gray-600 dark:text-gray-400'
              }`}
            >
              List
            </button>
          </div>
        </div>
      </div>

      {/* Content Grid/List */}
      <motion.div
        key={activeView}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        {activeView === 'grid' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredContent.map((item) => (
              <motion.div
                key={item.id}
                className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden shadow-sm hover:shadow-lg transition-shadow"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
                whileHover={{ y: -5 }}
              >
                {/* Content Thumbnail/Icon */}
                <div className="relative h-48 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-800">
                  {item.thumbnail ? (
                    <img src={item.thumbnail} alt={item.title} className="w-full h-full object-cover" />
                  ) : (
                    <div className="flex items-center justify-center h-full">
                      <div className={`w-16 h-16 ${contentTypes.find(t => t.id === item.type)?.color} rounded-lg flex items-center justify-center`}>
                        <span className="text-3xl">{contentTypes.find(t => t.id === item.type)?.icon}</span>
                      </div>
                    </div>
                  )}

                  {/* Status Badge */}
                  <div className="absolute top-3 left-3">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      item.status === 'published' ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400' :
                      item.status === 'draft' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400' :
                      'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400'
                    }`}>
                      {item.status}
                    </span>
                  </div>

                  {/* Views */}
                  <div className="absolute top-3 right-3 bg-black/50 text-white px-2 py-1 rounded-full text-xs">
                    {item.views.toLocaleString()} views
                  </div>

                  {/* Podcast Badges */}
                  {item.type === 'podcast' && (
                    <div className="absolute bottom-3 left-3 flex space-x-1">
                      {item.isAnonymous && (
                        <span className="bg-purple-500 text-white px-2 py-1 rounded-full text-xs">Anonymous</span>
                      )}
                      {item.isGroup && (
                        <span className="bg-blue-500 text-white px-2 py-1 rounded-full text-xs">Group</span>
                      )}
                    </div>
                  )}
                </div>

                {/* Content Info */}
                <div className="p-4">
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-2 line-clamp-2">{item.title}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-3 line-clamp-2">{item.description}</p>

                  {/* Category & Sub-category */}
                  <div className="flex items-center space-x-2 mb-3">
                    <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-md text-xs">
                      {item.category}
                    </span>
                    <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-md text-xs">
                      {item.subCategory}
                    </span>
                    {item.customCategory && (
                      <span className="px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 rounded-md text-xs">
                        {item.customCategory}
                      </span>
                    )}
                  </div>

                  {/* Hashtags */}
                  <div className="flex flex-wrap gap-1 mb-3">
                    {item.hashtags.slice(0, 3).map((tag, index) => (
                      <span key={index} className="text-xs text-blue-600 dark:text-blue-400 hover:underline cursor-pointer">
                        {tag}
                      </span>
                    ))}
                    {item.hashtags.length > 3 && (
                      <span className="text-xs text-gray-500 dark:text-gray-400">+{item.hashtags.length - 3} more</span>
                    )}
                  </div>

                  {/* Keywords & Filters */}
                  <div className="flex flex-wrap gap-1 mb-4">
                    {item.keywords.slice(0, 2).map((keyword, index) => (
                      <span key={index} className="px-2 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-400 rounded-md text-xs">
                        {keyword}
                      </span>
                    ))}
                    {item.filters.slice(0, 1).map((filter, index) => (
                      <span key={index} className="px-2 py-1 bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-400 rounded-md text-xs">
                        {filter}
                      </span>
                    ))}
                  </div>

                  {/* Actions */}
                  <div className="flex items-center justify-between">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => navigator.clipboard.writeText(item.shareLink)}
                        className="p-2 text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                        title="Share Link"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
                        </svg>
                      </button>
                      <button
                        onClick={() => handleThrottleContent(item.id)}
                        className={`p-2 transition-colors ${
                          item.status === 'throttled'
                            ? 'text-red-600 dark:text-red-400'
                            : 'text-gray-500 dark:text-gray-400 hover:text-yellow-600 dark:hover:text-yellow-400'
                        }`}
                        title={item.status === 'throttled' ? 'Unthrottle' : 'Throttle'}
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </button>
                      <button
                        onClick={() => handleDeleteContent(item.id)}
                        className="p-2 text-gray-500 dark:text-gray-400 hover:text-red-600 dark:hover:text-red-400 transition-colors"
                        title="Delete"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </div>
                    <span className="text-xs text-gray-500 dark:text-gray-400">{item.createdAt}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          /* List View */
          <div className="space-y-4">
            {filteredContent.map((item) => (
              <motion.div
                key={item.id}
                className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3 }}
              >
                <div className="flex items-start space-x-4">
                  {/* Content Icon */}
                  <div className={`w-12 h-12 ${contentTypes.find(t => t.id === item.type)?.color} rounded-lg flex items-center justify-center flex-shrink-0`}>
                    <span className="text-xl">{contentTypes.find(t => t.id === item.type)?.icon}</span>
                  </div>

                  {/* Content Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900 dark:text-white mb-1">{item.title}</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">{item.description}</p>

                        {/* Categories and Status */}
                        <div className="flex items-center space-x-2 mb-2">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            item.status === 'published' ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400' :
                            item.status === 'draft' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400' :
                            'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400'
                          }`}>
                            {item.status}
                          </span>
                          <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-md text-xs">
                            {item.category} → {item.subCategory}
                          </span>
                          {item.customCategory && (
                            <span className="px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 rounded-md text-xs">
                              {item.customCategory}
                            </span>
                          )}
                        </div>

                        {/* Hashtags */}
                        <div className="flex flex-wrap gap-1 mb-2">
                          {item.hashtags.map((tag, index) => (
                            <span key={index} className="text-xs text-blue-600 dark:text-blue-400 hover:underline cursor-pointer">
                              {tag}
                            </span>
                          ))}
                        </div>

                        {/* Keywords and Filters */}
                        <div className="flex flex-wrap gap-1">
                          {item.keywords.map((keyword, index) => (
                            <span key={index} className="px-2 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-400 rounded-md text-xs">
                              {keyword}
                            </span>
                          ))}
                          {item.filters.map((filter, index) => (
                            <span key={index} className="px-2 py-1 bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-400 rounded-md text-xs">
                              {filter}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Stats and Actions */}
                      <div className="flex flex-col items-end space-y-2">
                        <div className="text-right">
                          <p className="text-lg font-semibold text-gray-900 dark:text-white">{item.views.toLocaleString()}</p>
                          <p className="text-xs text-gray-500 dark:text-gray-400">views</p>
                        </div>

                        <div className="flex space-x-2">
                          <button
                            onClick={() => navigator.clipboard.writeText(item.shareLink)}
                            className="p-2 text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                            title="Share Link"
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
                            </svg>
                          </button>
                          <button
                            onClick={() => handleThrottleContent(item.id)}
                            className={`p-2 transition-colors ${
                              item.status === 'throttled'
                                ? 'text-red-600 dark:text-red-400'
                                : 'text-gray-500 dark:text-gray-400 hover:text-yellow-600 dark:hover:text-yellow-400'
                            }`}
                            title={item.status === 'throttled' ? 'Unthrottle' : 'Throttle'}
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                          </button>
                          <button
                            onClick={() => handleDeleteContent(item.id)}
                            className="p-2 text-gray-500 dark:text-gray-400 hover:text-red-600 dark:hover:text-red-400 transition-colors"
                            title="Delete"
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                          </button>
                        </div>

                        <span className="text-xs text-gray-500 dark:text-gray-400">{item.createdAt}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </motion.div>

      {/* Upload Modal */}
      <AnimatePresence>
        {showUploadModal && (
          <motion.div
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowUploadModal(false)}
          >
            <motion.div
              className="bg-white dark:bg-gray-800 rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className={`w-10 h-10 ${contentTypes.find(t => t.id === uploadType)?.color} rounded-lg flex items-center justify-center`}>
                      <span className="text-xl">{contentTypes.find(t => t.id === uploadType)?.icon}</span>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                        Upload {contentTypes.find(t => t.id === uploadType)?.name}
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Create and configure your content</p>
                    </div>
                  </div>
                  <button
                    onClick={() => setShowUploadModal(false)}
                    className="p-2 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              </div>

              {/* Modal Content */}
              <div className="p-6 space-y-6">
                {/* File Upload Area */}
                <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-8 text-center">
                  <div className={`w-16 h-16 ${contentTypes.find(t => t.id === uploadType)?.color} rounded-lg flex items-center justify-center mx-auto mb-4`}>
                    <span className="text-3xl">{contentTypes.find(t => t.id === uploadType)?.icon}</span>
                  </div>
                  <h4 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                    Drop your {contentTypes.find(t => t.id === uploadType)?.name.toLowerCase()} here
                  </h4>
                  <p className="text-gray-600 dark:text-gray-400 mb-4">
                    or click to browse files
                  </p>
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    className="px-4 py-2 bg-slate-900 text-white rounded-lg hover:bg-slate-800 transition-colors"
                  >
                    Choose File
                  </button>
                  <input
                    ref={fileInputRef}
                    type="file"
                    className="hidden"
                    accept={
                      uploadType === 'image' ? 'image/*' :
                      uploadType === 'video' || uploadType === 'reel' ? 'video/*' :
                      uploadType === 'pdf' ? '.pdf' :
                      uploadType === 'link' ? '' : '*/*'
                    }
                  />
                </div>

                {/* Content Details Form */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Title */}
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Content Title
                    </label>
                    <input
                      type="text"
                      placeholder="Enter a descriptive title..."
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg
                               bg-white dark:bg-gray-700 text-gray-900 dark:text-white
                               focus:ring-2 focus:ring-slate-500 focus:border-transparent"
                    />
                  </div>

                  {/* Description */}
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Description
                    </label>
                    <textarea
                      rows={3}
                      placeholder="Describe your content..."
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg
                               bg-white dark:bg-gray-700 text-gray-900 dark:text-white
                               focus:ring-2 focus:ring-slate-500 focus:border-transparent"
                    />
                  </div>

                  {/* Category */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Category
                    </label>
                    <select className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg
                                     bg-white dark:bg-gray-700 text-gray-900 dark:text-white
                                     focus:ring-2 focus:ring-slate-500 focus:border-transparent">
                      <option value="">Select Category</option>
                      {categories.map((category) => (
                        <option key={category.id} value={category.name}>{category.name}</option>
                      ))}
                    </select>
                  </div>

                  {/* Sub-Category */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Sub-Category
                    </label>
                    <select className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg
                                     bg-white dark:bg-gray-700 text-gray-900 dark:text-white
                                     focus:ring-2 focus:ring-slate-500 focus:border-transparent">
                      <option value="">Select Sub-Category</option>
                      <option value="Mathematics">Mathematics</option>
                      <option value="Physics">Physics</option>
                      <option value="Chemistry">Chemistry</option>
                    </select>
                  </div>

                  {/* Custom Category */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Custom Category
                    </label>
                    <input
                      type="text"
                      placeholder="Create custom category..."
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg
                               bg-white dark:bg-gray-700 text-gray-900 dark:text-white
                               focus:ring-2 focus:ring-slate-500 focus:border-transparent"
                    />
                  </div>

                  {/* Content Label */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Content Label
                    </label>
                    <select className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg
                                     bg-white dark:bg-gray-700 text-gray-900 dark:text-white
                                     focus:ring-2 focus:ring-slate-500 focus:border-transparent">
                      <option value="beginner">Beginner</option>
                      <option value="intermediate">Intermediate</option>
                      <option value="advanced">Advanced</option>
                      <option value="expert">Expert</option>
                    </select>
                  </div>
                </div>

                {/* Podcast Specific Options */}
                {uploadType === 'podcast' && (
                  <div className="space-y-4">
                    <h4 className="font-medium text-gray-900 dark:text-white">Podcast Settings</h4>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="flex items-center space-x-2">
                        <input type="checkbox" id="anonymous" className="rounded" />
                        <label htmlFor="anonymous" className="text-sm text-gray-700 dark:text-gray-300">Anonymous</label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <input type="checkbox" id="group" className="rounded" />
                        <label htmlFor="group" className="text-sm text-gray-700 dark:text-gray-300">Group Podcast</label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <input type="checkbox" id="public" className="rounded" />
                        <label htmlFor="public" className="text-sm text-gray-700 dark:text-gray-300">Public</label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <input type="checkbox" id="individual" className="rounded" />
                        <label htmlFor="individual" className="text-sm text-gray-700 dark:text-gray-300">Individual</label>
                      </div>
                    </div>
                  </div>
                )}

                {/* Hashtags */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Hashtags
                  </label>
                  <input
                    type="text"
                    placeholder="#education #tutorial #mathematics (separate with spaces)"
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg
                             bg-white dark:bg-gray-700 text-gray-900 dark:text-white
                             focus:ring-2 focus:ring-slate-500 focus:border-transparent"
                  />
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    Add relevant hashtags to help users discover your content
                  </p>
                </div>

                {/* Keywords */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Keywords
                  </label>
                  <input
                    type="text"
                    placeholder="calculus, derivatives, integrals (comma separated)"
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg
                             bg-white dark:bg-gray-700 text-gray-900 dark:text-white
                             focus:ring-2 focus:ring-slate-500 focus:border-transparent"
                  />
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    Keywords must be under the main category for better filtering
                  </p>
                </div>

                {/* Custom Filters */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Custom Filters
                  </label>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                    {['beginner-friendly', 'step-by-step', 'advanced', 'problem-solving', 'interactive', 'visual-learning', 'code-examples', 'best-practices'].map((filter) => (
                      <label key={filter} className="flex items-center space-x-2">
                        <input type="checkbox" className="rounded" />
                        <span className="text-sm text-gray-700 dark:text-gray-300">{filter}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Interaction Settings */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Interaction Settings
                  </label>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                      <div>
                        <p className="font-medium text-gray-900 dark:text-white">Allow Comments</p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Let users comment on your content</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" className="sr-only peer" defaultChecked />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                      </label>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                      <div>
                        <p className="font-medium text-gray-900 dark:text-white">Enable Suggestions</p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Show AI-powered content suggestions</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" className="sr-only peer" defaultChecked />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                      </label>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                      <div>
                        <p className="font-medium text-gray-900 dark:text-white">Auto-Generate Share Link</p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Create shareable link automatically</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" className="sr-only peer" defaultChecked />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                      </label>
                    </div>
                  </div>
                </div>

                {/* Publishing Options */}
                <div className="flex items-center justify-between pt-6 border-t border-gray-200 dark:border-gray-700">
                  <div className="flex space-x-3">
                    <button
                      onClick={() => setShowUploadModal(false)}
                      className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                    >
                      Save as Draft
                    </button>
                    <button
                      onClick={() => setShowScheduleModal(true)}
                      className="px-4 py-2 bg-yellow-500 hover:bg-yellow-600 text-white rounded-lg transition-colors"
                    >
                      Schedule
                    </button>
                  </div>
                  <button
                    onClick={() => setShowUploadModal(false)}
                    className="px-6 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-lg transition-colors"
                  >
                    Publish Now
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Schedule Modal */}
      <AnimatePresence>
        {showScheduleModal && (
          <motion.div
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowScheduleModal(false)}
          >
            <motion.div
              className="bg-white dark:bg-gray-800 rounded-xl max-w-lg w-full max-h-[90vh] overflow-y-auto"
              initial={{ scale: 0.9, opacity: 0, y: 50 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 50 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-yellow-500 rounded-lg flex items-center justify-center">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                        Schedule Content
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Choose when to publish your content</p>
                    </div>
                  </div>
                  <button
                    onClick={() => setShowScheduleModal(false)}
                    className="p-2 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              </div>

              {/* Modal Content */}
              <div className="p-6 space-y-6">
                {/* Quick Schedule Options */}
                <div>
                  <h4 className="font-medium text-gray-900 dark:text-white mb-3">Quick Schedule</h4>
                  <div className="grid grid-cols-2 gap-3">
                    {[
                      { label: 'In 1 Hour', value: new Date(Date.now() + 60 * 60 * 1000) },
                      { label: 'Tomorrow 9 AM', value: new Date(Date.now() + 24 * 60 * 60 * 1000) },
                      { label: 'Next Week', value: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) },
                      { label: 'Next Month', value: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000) }
                    ].map((option, index) => (
                      <motion.button
                        key={index}
                        onClick={() => {
                          const date = option.value.toISOString().split('T')[0];
                          const time = option.value.toTimeString().slice(0, 5);
                          setScheduleDate(date);
                          setScheduleTime(time);
                        }}
                        className="p-3 border border-gray-300 dark:border-gray-600 rounded-lg text-left hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <p className="font-medium text-gray-900 dark:text-white">{option.label}</p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {option.value.toLocaleDateString()} at {option.value.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </p>
                      </motion.button>
                    ))}
                  </div>
                </div>

                {/* Custom Date & Time */}
                <div className="space-y-4">
                  <h4 className="font-medium text-gray-900 dark:text-white">Custom Schedule</h4>

                  {/* Date Picker */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Publication Date
                    </label>
                    <input
                      type="date"
                      value={scheduleDate}
                      onChange={(e) => setScheduleDate(e.target.value)}
                      min={new Date().toISOString().split('T')[0]}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg
                               bg-white dark:bg-gray-700 text-gray-900 dark:text-white
                               focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                    />
                  </div>

                  {/* Time Picker */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Publication Time
                    </label>
                    <input
                      type="time"
                      value={scheduleTime}
                      onChange={(e) => setScheduleTime(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg
                               bg-white dark:bg-gray-700 text-gray-900 dark:text-white
                               focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                    />
                  </div>

                  {/* Timezone */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Timezone
                    </label>
                    <select
                      value={scheduleTimezone}
                      onChange={(e) => setScheduleTimezone(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg
                               bg-white dark:bg-gray-700 text-gray-900 dark:text-white
                               focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                    >
                      <option value="UTC-8 (PST)">UTC-8 (Pacific Standard Time)</option>
                      <option value="UTC-7 (MST)">UTC-7 (Mountain Standard Time)</option>
                      <option value="UTC-6 (CST)">UTC-6 (Central Standard Time)</option>
                      <option value="UTC-5 (EST)">UTC-5 (Eastern Standard Time)</option>
                      <option value="UTC+0 (GMT)">UTC+0 (Greenwich Mean Time)</option>
                      <option value="UTC+1 (CET)">UTC+1 (Central European Time)</option>
                      <option value="UTC+5:30 (IST)">UTC+5:30 (India Standard Time)</option>
                      <option value="UTC+8 (CST)">UTC+8 (China Standard Time)</option>
                      <option value="UTC+9 (JST)">UTC+9 (Japan Standard Time)</option>
                    </select>
                  </div>
                </div>

                {/* Repeat Schedule */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Repeat Schedule
                  </label>
                  <select
                    value={repeatSchedule}
                    onChange={(e) => setRepeatSchedule(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg
                             bg-white dark:bg-gray-700 text-gray-900 dark:text-white
                             focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                  >
                    <option value="none">No Repeat</option>
                    <option value="daily">Daily</option>
                    <option value="weekly">Weekly</option>
                    <option value="monthly">Monthly</option>
                    <option value="custom">Custom Interval</option>
                  </select>
                  {repeatSchedule !== 'none' && (
                    <p className="text-xs text-blue-600 dark:text-blue-400 mt-1">
                      📅 This content will be republished automatically based on your schedule
                    </p>
                  )}
                </div>

                {/* Reminder Settings */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Reminder
                  </label>
                  <select
                    value={reminderTime}
                    onChange={(e) => setReminderTime(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg
                             bg-white dark:bg-gray-700 text-gray-900 dark:text-white
                             focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                  >
                    <option value="none">No Reminder</option>
                    <option value="15min">15 minutes before</option>
                    <option value="30min">30 minutes before</option>
                    <option value="1hour">1 hour before</option>
                    <option value="1day">1 day before</option>
                    <option value="1week">1 week before</option>
                  </select>
                </div>

                {/* Schedule Preview */}
                {scheduleDate && scheduleTime && (
                  <motion.div
                    className="p-4 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    <h5 className="font-medium text-yellow-800 dark:text-yellow-200 mb-2">📅 Schedule Preview</h5>
                    <div className="space-y-1 text-sm text-yellow-700 dark:text-yellow-300">
                      <p><strong>Publication Date:</strong> {new Date(scheduleDate + 'T' + scheduleTime).toLocaleDateString('en-US', {
                        weekday: 'long',
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}</p>
                      <p><strong>Publication Time:</strong> {new Date(scheduleDate + 'T' + scheduleTime).toLocaleTimeString('en-US', {
                        hour: '2-digit',
                        minute: '2-digit',
                        hour12: true
                      })}</p>
                      <p><strong>Timezone:</strong> {scheduleTimezone}</p>
                      {repeatSchedule !== 'none' && (
                        <p><strong>Repeat:</strong> {repeatSchedule.charAt(0).toUpperCase() + repeatSchedule.slice(1)}</p>
                      )}
                      {reminderTime !== 'none' && (
                        <p><strong>Reminder:</strong> {reminderTime.replace('min', ' minutes').replace('hour', ' hour').replace('day', ' day').replace('week', ' week')} before publication</p>
                      )}
                    </div>
                  </motion.div>
                )}

                {/* Advanced Options */}
                <div className="space-y-3">
                  <h5 className="font-medium text-gray-900 dark:text-white">Advanced Options</h5>

                  <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <div>
                      <p className="font-medium text-gray-900 dark:text-white">Auto-promote on Social</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Share on connected social platforms</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-yellow-300 dark:peer-focus:ring-yellow-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-yellow-500"></div>
                    </label>
                  </div>

                  <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <div>
                      <p className="font-medium text-gray-900 dark:text-white">Send Email Notification</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Notify followers when published</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" defaultChecked />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-yellow-300 dark:peer-focus:ring-yellow-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-yellow-500"></div>
                    </label>
                  </div>

                  <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <div>
                      <p className="font-medium text-gray-900 dark:text-white">Auto-Archive After</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Automatically archive after set time</p>
                    </div>
                    <select className="px-3 py-1 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-sm">
                      <option value="never">Never</option>
                      <option value="1month">1 Month</option>
                      <option value="3months">3 Months</option>
                      <option value="6months">6 Months</option>
                      <option value="1year">1 Year</option>
                    </select>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex items-center justify-between pt-6 border-t border-gray-200 dark:border-gray-700">
                  <button
                    onClick={() => setShowScheduleModal(false)}
                    className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                  >
                    Cancel
                  </button>
                  <div className="flex space-x-3">
                    <button
                      onClick={() => {
                        // Save schedule logic here
                        setShowScheduleModal(false);
                        setShowUploadModal(false);
                      }}
                      className="px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg transition-colors"
                    >
                      Save Schedule
                    </button>
                    <motion.button
                      onClick={() => {
                        // Schedule content logic here
                        setShowScheduleModal(false);
                        setShowUploadModal(false);
                      }}
                      className="px-6 py-2 bg-yellow-500 hover:bg-yellow-600 text-white rounded-lg transition-colors font-medium"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      📅 Schedule Content
                    </motion.button>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default Content;
