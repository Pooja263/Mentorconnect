import { useState, useEffect } from "react";
import { motion } from "framer-motion";

interface DataPoint {
  date: string;
  value: number;
}

function EarningsChart() {
  const [timeframe, setTimeframe] = useState<'7d' | '14d' | '30d'>('14d');
  const [isAnimating, setIsAnimating] = useState(true);

  // Sample earnings data
  const earningsData: Record<string, DataPoint[]> = {
    '7d': [
      { date: '01/01', value: 1200 },
      { date: '01/02', value: 1350 },
      { date: '01/03', value: 1100 },
      { date: '01/04', value: 1450 },
      { date: '01/05', value: 1600 },
      { date: '01/06', value: 1400 },
      { date: '01/07', value: 1750 },
    ],
    '14d': [
      { date: '12/25', value: 800 },
      { date: '12/26', value: 950 },
      { date: '12/27', value: 1100 },
      { date: '12/28', value: 1250 },
      { date: '12/29', value: 1400 },
      { date: '12/30', value: 1200 },
      { date: '12/31', value: 1600 },
      { date: '01/01', value: 1200 },
      { date: '01/02', value: 1350 },
      { date: '01/03', value: 1100 },
      { date: '01/04', value: 1450 },
      { date: '01/05', value: 1600 },
      { date: '01/06', value: 1400 },
      { date: '01/07', value: 1750 },
    ],
    '30d': [
      { date: '12/08', value: 600 },
      { date: '12/10', value: 750 },
      { date: '12/12', value: 850 },
      { date: '12/14', value: 900 },
      { date: '12/16', value: 1050 },
      { date: '12/18', value: 950 },
      { date: '12/20', value: 1150 },
      { date: '12/22', value: 1000 },
      { date: '12/24', value: 1200 },
      { date: '12/26', value: 950 },
      { date: '12/28', value: 1250 },
      { date: '12/30', value: 1200 },
      { date: '01/01', value: 1200 },
      { date: '01/03', value: 1100 },
      { date: '01/05', value: 1600 },
      { date: '01/07', value: 1750 },
    ]
  };

  const currentData = earningsData[timeframe];
  const currentValue = currentData[currentData.length - 1].value;
  const previousValue = currentData[currentData.length - 2].value;
  const changePercent = ((currentValue - previousValue) / previousValue * 100).toFixed(1);
  const isPositive = currentValue > previousValue;

  // Calculate SVG path for the line chart
  const createPath = (data: DataPoint[]) => {
    const width = 450;
    const height = 160;
    const padding = 40;
    
    const maxValue = Math.max(...data.map(d => d.value));
    const minValue = Math.min(...data.map(d => d.value));
    const valueRange = maxValue - minValue;
    
    const points = data.map((point, index) => {
      const x = padding + (index / (data.length - 1)) * (width - 2 * padding);
      const y = height - padding - ((point.value - minValue) / valueRange) * (height - 2 * padding);
      return `${x},${y}`;
    });
    
    return `M ${points.join(' L ')}`;
  };

  // Create area path for gradient fill
  const createAreaPath = (data: DataPoint[]) => {
    const width = 450;
    const height = 160;
    const padding = 40;
    
    const maxValue = Math.max(...data.map(d => d.value));
    const minValue = Math.min(...data.map(d => d.value));
    const valueRange = maxValue - minValue;
    
    const points = data.map((point, index) => {
      const x = padding + (index / (data.length - 1)) * (width - 2 * padding);
      const y = height - padding - ((point.value - minValue) / valueRange) * (height - 2 * padding);
      return `${x},${y}`;
    });
    
    const firstPoint = points[0].split(',');
    const lastPoint = points[points.length - 1].split(',');
    
    return `M ${firstPoint[0]},${height - padding} L ${points.join(' L ')} L ${lastPoint[0]},${height - padding} Z`;
  };

  const linePath = createPath(currentData);
  const areaPath = createAreaPath(currentData);

  useEffect(() => {
    setIsAnimating(true);
    const timer = setTimeout(() => setIsAnimating(false), 1500);
    return () => clearTimeout(timer);
  }, [timeframe]);

  return (
    <motion.div
      className="relative bg-white/90 dark:bg-gray-900/95 backdrop-blur-xl rounded-2xl p-6 text-gray-900 dark:text-white overflow-hidden border border-gray-200/50 dark:border-gray-700/50 shadow-2xl"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      {/* Glass effect overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-100/20 via-transparent to-gray-100/20 dark:from-emerald-500/5 dark:via-transparent dark:to-cyan-500/5 rounded-2xl"></div>
      {/* Neon glow background effects - only in dark mode */}
      <div className="absolute -inset-1 bg-gradient-to-r from-transparent via-transparent to-transparent dark:from-emerald-500/20 dark:via-cyan-500/20 dark:to-emerald-500/20 rounded-2xl blur-sm opacity-0 dark:opacity-30"></div>

      <div className="relative z-10">
        {/* Header */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">Earnings</h3>
          <p className="text-gray-600 dark:text-gray-400 text-sm">Chart of your earnings in last {timeframe === '7d' ? '7 days' : timeframe === '14d' ? '14 days' : '30 days'}</p>
        </div>

        {/* Current Value and Change */}
        <div className="mb-6">
          <div className="flex items-baseline space-x-3">
            <span className="text-3xl font-bold text-gray-900 dark:text-white">${currentValue.toLocaleString()}</span>
            <div className="flex items-center space-x-1">
              <span className={`text-sm font-medium ${isPositive ? 'text-emerald-600 dark:text-emerald-400' : 'text-red-600 dark:text-red-400'}`}>
                {isPositive ? '↗' : '↘'} {isPositive ? '+' : ''}{changePercent}%
              </span>
            </div>
          </div>
          <div className="flex items-center justify-between mt-2">
            <span className="text-gray-600 dark:text-gray-400 text-sm">AVG</span>
            <span className="text-gray-700 dark:text-gray-300 text-sm">
              {currentData[0].date} - {currentData[currentData.length - 1].date}
            </span>
          </div>
        </div>

        {/* Chart */}
        <div className="relative mb-6">
          <svg
            width="100%"
            height="160"
            viewBox="0 0 450 160"
            className="overflow-visible"
          >
            {/* Gradient definitions */}
            <defs>
              <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#10b981" stopOpacity="1" />
                <stop offset="50%" stopColor="#06d6a0" stopOpacity="1" />
                <stop offset="100%" stopColor="#00f5ff" stopOpacity="1" />
              </linearGradient>
              <linearGradient id="areaGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#10b981" stopOpacity="0.3" />
                <stop offset="50%" stopColor="#06d6a0" stopOpacity="0.2" />
                <stop offset="100%" stopColor="#00f5ff" stopOpacity="0.1" />
              </linearGradient>
              <filter id="glow">
                <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
                <feMerge> 
                  <feMergeNode in="coloredBlur"/>
                  <feMergeNode in="SourceGraphic"/>
                </feMerge>
              </filter>
            </defs>

            {/* Grid lines and axes */}
            {(() => {
              const width = 450;
              const height = 160;
              const padding = 40;
              const maxValue = Math.max(...currentData.map(d => d.value));
              const minValue = Math.min(...currentData.map(d => d.value));
              const valueRange = maxValue - minValue;

              // Y-axis grid lines and labels
              const yGridLines = [];
              const yLabels = [];
              for (let i = 0; i <= 4; i++) {
                const value = minValue + (valueRange * i / 4);
                const y = height - padding - (i / 4) * (height - 2 * padding);

                yGridLines.push(
                  <line
                    key={`y-grid-${i}`}
                    x1={padding}
                    y1={y}
                    x2={width - padding}
                    y2={y}
                    stroke="#374151"
                    strokeWidth="0.5"
                    opacity="0.3"
                  />
                );

                yLabels.push(
                  <text
                    key={`y-label-${i}`}
                    x={padding - 15}
                    y={y + 5}
                    fill="#9CA3AF"
                    fontSize="14"
                    textAnchor="end"
                  >
                    ${Math.round(value)}
                  </text>
                );
              }

              // X-axis labels
              const xLabels = currentData.map((point, index) => {
                if (index % Math.ceil(currentData.length / 6) === 0 || index === currentData.length - 1) {
                  const x = padding + (index / (currentData.length - 1)) * (width - 2 * padding);
                  return (
                    <text
                      key={`x-label-${index}`}
                      x={x}
                      y={height - padding + 20}
                      fill="#9CA3AF"
                      fontSize="14"
                      textAnchor="middle"
                    >
                      {point.date}
                    </text>
                  );
                }
                return null;
              }).filter(Boolean);

              return (
                <g>
                  {/* Y-axis line */}
                  <line
                    x1={padding}
                    y1={padding}
                    x2={padding}
                    y2={height - padding}
                    stroke="#4B5563"
                    strokeWidth="1"
                  />

                  {/* X-axis line */}
                  <line
                    x1={padding}
                    y1={height - padding}
                    x2={width - padding}
                    y2={height - padding}
                    stroke="#4B5563"
                    strokeWidth="1"
                  />

                  {yGridLines}
                  {yLabels}
                  {xLabels}
                </g>
              );
            })()}

            {/* Area fill */}
            <motion.path
              d={areaPath}
              fill="url(#areaGradient)"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.3 }}
            />

            {/* Main line */}
            <motion.path
              d={linePath}
              fill="none"
              stroke="url(#lineGradient)"
              strokeWidth="2"
              filter="url(#glow)"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1.5, ease: "easeInOut" }}
            />

            {/* Data points */}
            {currentData.map((point, index) => {
              const width = 450;
              const height = 160;
              const padding = 40;
              const maxValue = Math.max(...currentData.map(d => d.value));
              const minValue = Math.min(...currentData.map(d => d.value));
              const valueRange = maxValue - minValue;
              
              const x = padding + (index / (currentData.length - 1)) * (width - 2 * padding);
              const y = height - padding - ((point.value - minValue) / valueRange) * (height - 2 * padding);
              
              return (
                <motion.circle
                  key={index}
                  cx={x}
                  cy={y}
                  r="3"
                  fill="#00f5ff"
                  filter="url(#glow)"
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.3, delay: 0.1 * index }}
                  className="cursor-pointer"
                />
              );
            })}
          </svg>
        </div>

        {/* Time frame selector */}
        <div className="flex space-x-1 bg-gray-200/50 dark:bg-gray-800/50 rounded-lg p-1">
          {(['7d', '14d', '30d'] as const).map((period) => (
            <motion.button
              key={period}
              onClick={() => setTimeframe(period)}
              className={`px-3 py-1 text-xs font-medium rounded-md transition-all duration-200 ${
                timeframe === period
                  ? 'bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30'
                  : 'text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-300 hover:bg-gray-300/50 dark:hover:bg-gray-700/50'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {period}
            </motion.button>
          ))}
        </div>
      </div>

      {/* Animated background particles - more subtle in light mode */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-gray-400/20 dark:bg-emerald-400/30 rounded-full"
            style={{
              left: `${20 + i * 15}%`,
              top: `${30 + (i % 3) * 20}%`,
            }}
            animate={{
              y: [-10, 10, -10],
              opacity: [0.1, 0.3, 0.1],
            }}
            transition={{
              duration: 3 + i * 0.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>
    </motion.div>
  );
}

export default EarningsChart;
