import React, { useState } from 'react';
import { TimePeriod, ChartDataPoint } from '../../types';
import { MOCK_PERFORMANCE_CHART } from '../../data/mockInvestments';

interface PerformanceChartProps {
  initialPeriod?: TimePeriod;
}

export const PerformanceChart: React.FC<PerformanceChartProps> = ({ initialPeriod = '1M' }) => {
  const [period, setPeriod] = useState<TimePeriod>(initialPeriod);
  const [activeMetric, setActiveMetric] = useState<'both' | 'portfolio' | 'earnings'>('both');
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const data: ChartDataPoint[] = MOCK_PERFORMANCE_CHART[period];
  const periods: TimePeriod[] = ['7D', '1M', '3M', '6M', '1Y'];

  const maxPortfolio = Math.max(...data.map((d) => d.portfolioValue), 1);
  const minPortfolio = Math.min(...data.map((d) => d.portfolioValue), 0) * 0.92;
  const maxEarnings = Math.max(...data.map((d) => d.weeklyEarnings), 1) * 1.25;

  const width = 760;
  const height = 240;
  const padLeft = 16;
  const padRight = 16;
  const padTop = 20;
  const padBottom = 32;
  const plotW = width - padLeft - padRight;
  const plotH = height - padTop - padBottom;

  const getX = (index: number) => {
    if (data.length <= 1) return padLeft + plotW / 2;
    return padLeft + (index / (data.length - 1)) * plotW;
  };

  const getPortfolioY = (val: number) => {
    const ratio = (val - minPortfolio) / Math.max(maxPortfolio - minPortfolio, 1);
    return padTop + plotH - ratio * plotH;
  };

  const getEarningsY = (val: number) => {
    const ratio = val / Math.max(maxEarnings, 1);
    return padTop + plotH - ratio * (plotH * 0.55);
  };

  const portfolioPoints = data.map((d, i) => `${getX(i)},${getPortfolioY(d.portfolioValue)}`).join(' ');
  const portfolioArea = `${getX(0)},${padTop + plotH} ${portfolioPoints} ${getX(data.length - 1)},${padTop + plotH}`;

  const activePoint = hoveredIndex !== null ? data[hoveredIndex] : data[data.length - 1];

  return (
    <div className="bg-white border border-slate-200 rounded-xl p-6">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-5 border-b border-slate-100">
        <div>
          <div className="flex items-center gap-2 text-xs text-slate-500 mb-1">
            <span>Portfolio Analytics</span>
            <span aria-hidden="true">·</span>
            <span className="font-medium text-amber-800">Demo Data</span>
          </div>
          <h2 className="text-lg font-semibold text-slate-900">
            Portfolio Value & Weekly Earnings
          </h2>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          {/* Metric Selector */}
          <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-lg">
            <button
              type="button"
              onClick={() => setActiveMetric('both')}
              className={`px-2.5 py-1 text-xs font-medium rounded-md transition-colors whitespace-nowrap ${
                activeMetric === 'both'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Combined View
            </button>
            <button
              type="button"
              onClick={() => setActiveMetric('portfolio')}
              className={`px-2.5 py-1 text-xs font-medium rounded-md transition-colors whitespace-nowrap ${
                activeMetric === 'portfolio'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Portfolio Value
            </button>
            <button
              type="button"
              onClick={() => setActiveMetric('earnings')}
              className={`px-2.5 py-1 text-xs font-medium rounded-md transition-colors whitespace-nowrap ${
                activeMetric === 'earnings'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Weekly Earnings
            </button>
          </div>

          {/* Time Period Selector: 7D, 1M, 3M, 6M, 1Y */}
          <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-lg" role="group" aria-label="Timeframe">
            {periods.map((p) => (
              <button
                key={p}
                type="button"
                onClick={() => {
                  setPeriod(p);
                  setHoveredIndex(null);
                }}
                className={`px-2.5 py-1 text-xs font-mono font-semibold rounded-md transition-colors whitespace-nowrap ${
                  period === p
                    ? 'bg-slate-900 text-white'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {p}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Active Point Summary Row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 py-4 border-b border-slate-100">
        <div>
          <div className="text-xs text-slate-500">Selected Period Point</div>
          <div className="text-sm font-mono font-semibold text-slate-900 mt-0.5 tabular-nums">
            {activePoint.label} ({period} Window)
          </div>
        </div>
        <div>
          <div className="flex items-center gap-2 text-xs text-slate-500">
            <span className="w-2.5 h-0.5 bg-blue-700 inline-block" />
            <span>Portfolio Value</span>
          </div>
          <div className="text-base font-mono font-semibold text-slate-900 mt-0.5 tabular-nums">
            {activePoint.portfolioValue.toLocaleString('en-US', { minimumFractionDigits: 2 })} USDT
          </div>
        </div>
        <div>
          <div className="flex items-center gap-2 text-xs text-slate-500">
            <span className="w-2.5 h-2 bg-emerald-600/80 inline-block rounded-xs" />
            <span>Weekly Earnings</span>
          </div>
          <div className="text-base font-mono font-semibold text-emerald-700 mt-0.5 tabular-nums">
            +{activePoint.weeklyEarnings.toLocaleString('en-US', { minimumFractionDigits: 2 })} USDT
          </div>
        </div>
      </div>

      {/* SVG Financial Chart */}
      <div className="pt-4">
        <svg
          viewBox={`0 0 ${width} ${height}`}
          className="w-full h-60 overflow-visible select-none"
          role="img"
          aria-label={`Financial performance chart for ${period} timeframe`}
        >
          <defs>
            <linearGradient id="portfolioAreaGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#1D4ED8" stopOpacity="0.14" />
              <stop offset="100%" stopColor="#1D4ED8" stopOpacity="0.0" />
            </linearGradient>
          </defs>

          {/* Horizontal Grid Lines */}
          {[0, 0.25, 0.5, 0.75, 1].map((step, idx) => {
            const y = padTop + step * plotH;
            return (
              <line
                key={idx}
                x1={padLeft}
                y1={y}
                x2={width - padRight}
                y2={y}
                stroke="#F1F5F9"
                strokeWidth="1"
              />
            );
          })}

          {/* Weekly Earnings Bars */}
          {(activeMetric === 'both' || activeMetric === 'earnings') &&
            data.map((d, i) => {
              const x = getX(i);
              const barY = getEarningsY(d.weeklyEarnings);
              const barH = padTop + plotH - barY;
              const barWidth = Math.min(36, plotW / (data.length * 2.2));
              return (
                <rect
                  key={`bar-${i}`}
                  x={x - barWidth / 2}
                  y={barY}
                  width={barWidth}
                  height={Math.max(4, barH)}
                  rx={3}
                  fill={hoveredIndex === i ? '#047857' : '#10B981'}
                  fillOpacity={activeMetric === 'earnings' ? 0.85 : 0.35}
                />
              );
            })}

          {/* Portfolio Value Area & Line */}
          {(activeMetric === 'both' || activeMetric === 'portfolio') && (
            <>
              <polygon points={portfolioArea} fill="url(#portfolioAreaGrad)" />
              <polyline
                fill="none"
                stroke="#1D4ED8"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                points={portfolioPoints}
              />
            </>
          )}

          {/* Data Nodes & Interactive Hover Columns */}
          {data.map((d, i) => {
            const x = getX(i);
            const py = getPortfolioY(d.portfolioValue);
            const ey = getEarningsY(d.weeklyEarnings);
            const isHovered = hoveredIndex === i;

            return (
              <g
                key={`node-${i}`}
                className="cursor-pointer"
                onMouseEnter={() => setHoveredIndex(i)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                {isHovered && (
                  <line
                    x1={x}
                    y1={padTop}
                    x2={x}
                    y2={padTop + plotH}
                    stroke="#94A3B8"
                    strokeDasharray="3 3"
                    strokeWidth="1"
                  />
                )}

                {(activeMetric === 'both' || activeMetric === 'portfolio') && (
                  <circle
                    cx={x}
                    cy={py}
                    r={isHovered ? 5 : 3.5}
                    fill="#FFFFFF"
                    stroke="#1D4ED8"
                    strokeWidth={isHovered ? 3 : 2}
                  />
                )}

                {activeMetric === 'earnings' && (
                  <circle
                    cx={x}
                    cy={ey}
                    r={isHovered ? 5 : 3.5}
                    fill="#FFFFFF"
                    stroke="#047857"
                    strokeWidth={2.5}
                  />
                )}

                <text
                  x={x}
                  y={height - 8}
                  textAnchor="middle"
                  className="text-[11px] fill-slate-500 font-mono"
                >
                  {d.label}
                </text>

                {/* Invisible wide hit target */}
                <rect
                  x={x - plotW / (data.length * 2)}
                  y={padTop}
                  width={plotW / data.length}
                  height={plotH}
                  fill="transparent"
                />
              </g>
            );
          })}
        </svg>
      </div>
    </div>
  );
};
