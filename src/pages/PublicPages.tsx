import React, { useState } from 'react';
import {
  ArrowRight,
  Clock,
  Shield,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  Search,
  Lock,
  FileText,
  Mail,
  MapPin,
  Copy,
  Check,
} from 'lucide-react';
import { PageRoute, InvestmentPlan, FAQItem } from '../types';
import { MOCK_INVESTMENT_PLANS } from '../data/mockInvestments';
import { MOCK_REFERRAL_BOOST_TIERS } from '../data/mockReferrals';
import { MOCK_FAQ_ITEMS } from '../data/mockWithdrawals';
import hqImage from '../assets/images/vaulta_institutional_hq_1791481301873.jpg';

interface PublicPageProps {
  currentPage: PageRoute;
  onNavigate: (page: PageRoute) => void;
  onSelectPlanForSignup?: (planName: string) => void;
}

export const PublicPages: React.FC<PublicPageProps> = ({
  currentPage,
  onNavigate,
  onSelectPlanForSignup,
}) => {
  const [previewTab, setPreviewTab] = useState<'overview' | 'allocations' | 'settlement'>('overview');
  const [openFaqId, setOpenFaqId] = useState<string | null>('faq-1');
  const [faqSearch, setFaqSearch] = useState('');
  const [faqCategory, setFaqCategory] = useState<string>('All');
  const [copiedDemoRef, setCopiedDemoRef] = useState(false);

  // Contact form state
  const [contactName, setContactName] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [contactTopic, setContactTopic] = useState('General Platform Inquiry');
  const [contactMessage, setContactMessage] = useState('');
  const [contactError, setContactError] = useState('');
  const [contactSubmitted, setContactSubmitted] = useState(false);

  const handleCopyDemoRef = () => {
    navigator.clipboard?.writeText('VLT-8F3K92');
    setCopiedDemoRef(true);
    setTimeout(() => setCopiedDemoRef(false), 2000);
  };

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactName.trim()) {
      setContactError('Please enter your full name.');
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contactEmail)) {
      setContactError('Please provide a valid institutional or personal email address.');
      return;
    }
    if (contactMessage.trim().length < 15) {
      setContactError('Please include a brief message of at least 15 characters.');
      return;
    }
    setContactError('');
    setContactSubmitted(true);
  };

  /* ============================================================================
   * 1. HOME PAGE
   * ============================================================================ */
  if (currentPage === 'home') {
    // DEMO PLACEHOLDER STATISTICS:
    // IMPORTANT: These statistics (10K+, $25M+, 150+, 99.9%) are placeholders for the design only
    // and must be replaced with verified live telemetry before production launch.
    const demoTrustStats = [
      { value: '10K+', label: 'Registered Users', context: 'Demo metric · Global client accounts' },
      { value: '$25M+', label: 'Investment Volume', context: 'Demo metric · Cumulative USDT volume' },
      { value: '150+', label: 'Countries & Regions', context: 'Demo metric · International coverage' },
      { value: '99.9%', label: 'Platform Availability', context: 'Demo metric · Target system uptime' },
    ];

    return (
      <div className="space-y-0">
        {/* HERO SECTION */}
        <section className="bg-slate-950 text-white border-b border-slate-800 py-16 lg:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              {/* Left Column: Brand Value Proposition */}
              <div className="lg:col-span-6 space-y-6">
                <div className="flex items-center gap-2 text-xs text-slate-400">
                  <span className="font-semibold text-sky-400">VAULTA DIGITAL INVESTMENT PLATFORM</span>
                  <span aria-hidden="true">·</span>
                  <span>USDT Structured Allocations</span>
                </div>

                <div className="space-y-3">
                  <p className="text-sm font-mono uppercase tracking-widest text-slate-400">VAULTA</p>
                  <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-[1.08]">
                    Invest. Grow. Repeat.
                  </h1>
                </div>

                <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-xl">
                  Manage your digital investments with a simple, transparent and modern platform.
                </p>

                <div className="flex flex-wrap items-center gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => onNavigate('signup')}
                    className="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold text-slate-950 bg-white rounded-lg hover:bg-slate-100 transition-colors cursor-pointer whitespace-nowrap"
                  >
                    <span>Start Investing</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => onNavigate('how-it-works')}
                    className="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold text-white border border-slate-700 rounded-lg hover:bg-slate-900 transition-colors cursor-pointer whitespace-nowrap"
                  >
                    <span>How It Works</span>
                  </button>
                </div>

                <div className="pt-4 border-t border-slate-800/80 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-slate-400">
                  <span>Standardized USDT Plans</span>
                  <span aria-hidden="true">·</span>
                  <span>72-Hour Withdrawal Commitment</span>
                  <span aria-hidden="true">·</span>
                  <span>5% Referral Reward Structure</span>
                </div>
              </div>

              {/* Right Column: Visually Obvious Product Interface Preview (Demo Values) */}
              <div className="lg:col-span-6">
                <div
                  className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden shadow-2xl"
                  aria-label="Vaulta Product Interface Preview with Demo Data"
                >
                  {/* Browser / Product Window Chrome Header */}
                  <div className="bg-slate-950 px-4 py-3 border-b border-slate-800 flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-slate-700" />
                      <span className="w-2.5 h-2.5 rounded-full bg-slate-700" />
                      <span className="w-2.5 h-2.5 rounded-full bg-slate-700" />
                      <span className="ml-2 text-xs font-mono text-slate-400">
                        app.vaulta.com/dashboard
                      </span>
                    </div>
                    <div className="text-[11px] font-mono text-amber-400">
                      Product Interface Preview · Demo Data
                    </div>
                  </div>

                  {/* Interactive Preview Navigation Bar */}
                  <div className="px-5 py-3 bg-slate-900/60 border-b border-slate-800 flex items-center justify-between">
                    <div className="text-xs text-slate-300 font-medium">
                      Account: <span className="font-mono text-white">VLT-ACC-904821</span>
                    </div>
                    <div className="flex items-center gap-1 bg-slate-950 p-1 rounded-lg">
                      <button
                        type="button"
                        onClick={() => setPreviewTab('overview')}
                        className={`px-2.5 py-1 text-[11px] font-medium rounded transition-colors cursor-pointer ${
                          previewTab === 'overview'
                            ? 'bg-slate-800 text-white'
                            : 'text-slate-400 hover:text-white'
                        }`}
                      >
                        Balances
                      </button>
                      <button
                        type="button"
                        onClick={() => setPreviewTab('allocations')}
                        className={`px-2.5 py-1 text-[11px] font-medium rounded transition-colors cursor-pointer ${
                          previewTab === 'allocations'
                            ? 'bg-slate-800 text-white'
                            : 'text-slate-400 hover:text-white'
                        }`}
                      >
                        Active Plan
                      </button>
                      <button
                        type="button"
                        onClick={() => setPreviewTab('settlement')}
                        className={`px-2.5 py-1 text-[11px] font-medium rounded transition-colors cursor-pointer ${
                          previewTab === 'settlement'
                            ? 'bg-slate-800 text-white'
                            : 'text-slate-400 hover:text-white'
                        }`}
                      >
                        72h Commitment
                      </button>
                    </div>
                  </div>

                  {/* Preview Body */}
                  <div className="p-6 space-y-5">
                    {previewTab === 'overview' && (
                      <>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div className="p-4 rounded-lg bg-slate-950/90 border border-slate-800">
                            <div className="flex items-center justify-between text-xs text-slate-400">
                              <span>Total Balance</span>
                              <span className="font-mono text-[11px] text-slate-500">Demo</span>
                            </div>
                            <div className="text-2xl font-mono font-bold text-white mt-1.5 tabular-nums">
                              10,500.00 <span className="text-xs font-normal text-slate-400">USDT</span>
                            </div>
                            <div className="text-xs text-emerald-400 mt-1 font-mono tabular-nums">
                              +5.0% weekly target schedule
                            </div>
                          </div>

                          <div className="p-4 rounded-lg bg-slate-950/90 border border-slate-800">
                            <div className="flex items-center justify-between text-xs text-slate-400">
                              <span>Invested Capital</span>
                              <span className="font-mono text-[11px] text-slate-500">Demo</span>
                            </div>
                            <div className="text-2xl font-mono font-bold text-white mt-1.5 tabular-nums">
                              10,000.00 <span className="text-xs font-normal text-slate-400">USDT</span>
                            </div>
                            <div className="text-xs text-slate-400 mt-1">
                              1 Active Allocation (Premium Plan)
                            </div>
                          </div>

                          <div className="p-4 rounded-lg bg-slate-950/90 border border-slate-800">
                            <div className="flex items-center justify-between text-xs text-slate-400">
                              <span>Weekly Earnings</span>
                              <span className="font-mono text-[11px] text-slate-500">Demo</span>
                            </div>
                            <div className="text-2xl font-mono font-bold text-emerald-400 mt-1.5 tabular-nums">
                              +500.00 <span className="text-xs font-normal text-slate-400">USDT</span>
                            </div>
                            <div className="text-xs text-slate-400 mt-1">
                              Next distribution: 2026-10-14
                            </div>
                          </div>

                          <div className="p-4 rounded-lg bg-slate-950/90 border border-slate-800">
                            <div className="flex items-center justify-between text-xs text-slate-400">
                              <span>Available Balance</span>
                              <span className="font-mono text-[11px] text-slate-500">Demo</span>
                            </div>
                            <div className="text-2xl font-mono font-bold text-white mt-1.5 tabular-nums">
                              500.00 <span className="text-xs font-normal text-slate-400">USDT</span>
                            </div>
                            <div className="text-xs text-sky-400 mt-1">
                              Ready for withdrawal or reinvestment
                            </div>
                          </div>
                        </div>
                      </>
                    )}

                    {previewTab === 'allocations' && (
                      <div className="p-4 rounded-lg bg-slate-950/90 border border-slate-800 space-y-3">
                        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                          <div>
                            <div className="text-xs text-slate-400">Allocation Reference</div>
                            <div className="text-sm font-mono font-semibold text-white">INV-4092 · Premium Plan</div>
                          </div>
                          <div className="text-xs font-medium text-emerald-400">Active (Demo)</div>
                        </div>
                        <div className="grid grid-cols-3 gap-3 text-xs">
                          <div>
                            <div className="text-slate-400">Principal</div>
                            <div className="font-mono font-semibold text-white mt-0.5 tabular-nums">10,000 USDT</div>
                          </div>
                          <div>
                            <div className="text-slate-400">Weekly Return</div>
                            <div className="font-mono font-semibold text-emerald-400 mt-0.5 tabular-nums">5.0% (500 USDT)</div>
                          </div>
                          <div>
                            <div className="text-slate-400">Referral Boost</div>
                            <div className="font-mono font-semibold text-sky-400 mt-0.5 tabular-nums">+0.15 pct pts</div>
                          </div>
                        </div>
                      </div>
                    )}

                    {previewTab === 'settlement' && (
                      <div className="p-4 rounded-lg bg-slate-950/90 border border-slate-800 space-y-2">
                        <div className="text-xs font-semibold text-sky-400">
                          72-Hour Withdrawal Processing Target
                        </div>
                        <p className="text-xs text-slate-300 leading-relaxed">
                          Eligible withdrawal requests are targeted to be processed within 72 hours. Track every status stage from Pending and Under Review through Completed.
                        </p>
                        <div className="pt-2 text-[11px] font-mono text-slate-400">
                          Latest Demo Settlement: WDR-50419 · 750 USDT · Completed in 19h
                        </div>
                      </div>
                    )}

                    {/* Bottom Interactive Footer inside Preview */}
                    <div className="pt-3 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
                      <span>Simulated UI Preview — Not live financial data</span>
                      <button
                        type="button"
                        onClick={() => onNavigate('dashboard')}
                        className="text-sky-400 hover:text-sky-300 font-semibold cursor-pointer"
                      >
                        Launch Interactive Demo Dashboard →
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 7: TRUST / PERFORMANCE SECTION (DEMO VALUES) */}
        <section className="bg-white border-b border-slate-200 py-12">
          {/* INTERNAL COMMENT: The metrics below (10K+, $25M+, 150+, 99.9%) are demo placeholder values for design layout only and must be replaced before production launch. */}
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between mb-6">
              <div className="text-xs text-slate-500">
                <span>Platform Scale Overview</span>
                <span className="mx-2" aria-hidden="true">·</span>
                <span className="font-medium text-amber-800">Placeholder Demo Metrics</span>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {demoTrustStats.map((stat, idx) => (
                <div key={idx} className="border-l-2 border-slate-900 pl-5 py-1">
                  <div className="text-3xl font-mono font-bold text-slate-900 tabular-nums">
                    {stat.value}
                  </div>
                  <div className="text-sm font-semibold text-slate-800 mt-1">{stat.label}</div>
                  <div className="text-xs text-slate-500 mt-0.5">{stat.context}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* SECTION 8: 72-HOUR WITHDRAWAL COMMITMENT BANNER */}
        <section className="bg-slate-50 py-14 border-b border-slate-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-slate-900 text-white rounded-xl p-8 lg:p-10 border border-slate-800 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
              <div className="flex items-start gap-5 max-w-3xl">
                <div className="w-12 h-12 rounded-xl bg-blue-900/60 border border-blue-700/50 flex items-center justify-center shrink-0 text-sky-400">
                  <Clock className="w-6 h-6" />
                </div>
                <div className="space-y-2.5">
                  <div className="flex items-center gap-2 text-xs text-sky-400 font-semibold tracking-wide">
                    <span>SERVICE LEVEL COMMITMENT</span>
                    <span aria-hidden="true">·</span>
                    <span>SUBJECT TO GUARANTEE TERMS</span>
                  </div>
                  <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-white">
                    72-HOUR WITHDRAWAL COMMITMENT
                  </h2>
                  <p className="text-sm sm:text-base text-slate-200 font-medium">
                    Eligible withdrawal requests are targeted to be processed within 72 hours.
                  </p>
                  <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                    If an eligible withdrawal request is not processed within 72 hours, Vaulta will provide compensation of $500, subject to the applicable Guarantee Terms.
                  </p>
                </div>
              </div>

              <div className="shrink-0 w-full lg:w-auto">
                <button
                  type="button"
                  onClick={() => onNavigate('guarantee-terms')}
                  className="w-full lg:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 text-xs font-semibold text-slate-950 bg-white rounded-lg hover:bg-slate-100 transition-colors cursor-pointer whitespace-nowrap"
                >
                  <Shield className="w-4 h-4 text-blue-800" />
                  <span>View Guarantee Terms</span>
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 9: HOW VAULTA WORKS (FOUR-STEP SECTION) */}
        <section className="bg-white py-20 border-b border-slate-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
            <div className="max-w-2xl space-y-2">
              <div className="text-xs font-semibold text-blue-700">Operational Workflow</div>
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">
                How Vaulta Works
              </h2>
              <p className="text-sm sm:text-base text-slate-600">
                A structured four-step process designed for clarity from account creation to ongoing portfolio monitoring.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  step: '01. Step 1',
                  title: 'Create Your Account',
                  description:
                    'Register with your full name, email address, and strong credentials. Optionally include a Referral ID during onboarding.',
                },
                {
                  step: '02. Step 2',
                  title: 'Verify Your Email',
                  description:
                    'Confirm your registered email address via our verification link to enable account security controls and funding access.',
                },
                {
                  step: '03. Step 3',
                  title: 'Fund Your Account',
                  description:
                    'Select your preferred USDT settlement network (Network A, B, or C) and fund your account balance.',
                },
                {
                  step: '04. Step 4',
                  title: 'Monitor Your Investment',
                  description:
                    'Activate an investment plan and track weekly returns, referral boosts, and withdrawal statuses in one unified dashboard.',
                },
              ].map((item, idx) => (
                <div
                  key={idx}
                  className="bg-slate-50 border border-slate-200 rounded-xl p-6 flex flex-col justify-between space-y-4"
                >
                  <div className="space-y-3">
                    <div className="text-xs font-mono font-semibold text-blue-700">{item.step}</div>
                    <h3 className="text-base font-semibold text-slate-900">{item.title}</h3>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                  <div className="pt-2 border-t border-slate-200/80 text-xs font-medium text-slate-500">
                    Standardized Digital Onboarding
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* SECTION 10: INVESTMENT PLANS SECTION */}
        <section className="bg-slate-50 py-20 border-b border-slate-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
              <div className="max-w-2xl space-y-2">
                <div className="flex items-center gap-2 text-xs text-slate-500">
                  <span className="font-semibold text-blue-700">Structured Tiers</span>
                  <span aria-hidden="true">·</span>
                  <span className="text-amber-800 font-medium">UI / Demo Examples Only</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">
                  Investment Plans
                </h2>
                <p className="text-sm sm:text-base text-slate-600">
                  Transparent USDT tiers configured via our service abstraction layer. Values shown below represent frontend demonstration examples.
                </p>
              </div>
              <button
                type="button"
                onClick={() => onNavigate('investments')}
                className="text-xs font-semibold text-blue-700 hover:text-blue-900 inline-flex items-center gap-1.5 cursor-pointer whitespace-nowrap"
              >
                <span>Compare Full Plan Specifications</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {MOCK_INVESTMENT_PLANS.map((plan: InvestmentPlan) => (
                <div
                  key={plan.id}
                  className="bg-white border border-slate-200 rounded-xl p-7 flex flex-col justify-between hover:border-slate-300 transition-colors"
                >
                  <div className="space-y-5">
                    <div className="flex items-baseline justify-between border-b border-slate-100 pb-4">
                      <div>
                        <h3 className="text-lg font-bold text-slate-900">{plan.name}</h3>
                        <p className="text-xs text-slate-500 mt-0.5">{plan.targetAudience}</p>
                      </div>
                      <span className="text-xs font-medium text-emerald-700 whitespace-nowrap">
                        {plan.status}
                      </span>
                    </div>

                    <div>
                      <div className="text-xs text-slate-500">Investment Amount</div>
                      <div className="text-3xl font-mono font-bold text-slate-900 mt-1 tabular-nums">
                        {plan.amountUsdt.toLocaleString('en-US')} USDT
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 py-3 border-y border-slate-100 text-xs">
                      <div>
                        <div className="text-slate-500">Weekly Return</div>
                        <div className="text-sm font-mono font-semibold text-emerald-700 mt-0.5 tabular-nums">
                          {plan.weeklyReturnPercent}% weekly return
                        </div>
                      </div>
                      <div>
                        <div className="text-slate-500">Investment Period</div>
                        <div className="text-sm font-mono font-semibold text-slate-900 mt-0.5 tabular-nums">
                          {plan.periodWeeks} Weeks
                        </div>
                      </div>
                      <div>
                        <div className="text-slate-500">Estimated Weekly</div>
                        <div className="text-sm font-mono font-semibold text-slate-900 mt-0.5 tabular-nums">
                          {plan.estimatedWeeklyUsdt.toLocaleString('en-US')} USDT / wk
                        </div>
                      </div>
                      <div>
                        <div className="text-slate-500">Estimated Earnings</div>
                        <div className="text-sm font-mono font-semibold text-emerald-700 mt-0.5 tabular-nums">
                          +{plan.estimatedTotalEarningsUsdt.toLocaleString('en-US')} USDT
                        </div>
                      </div>
                    </div>

                    <ul className="space-y-2 text-xs text-slate-600">
                      {plan.features.map((feat, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700 shrink-0 mt-0.5" />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="pt-6 mt-6 border-t border-slate-100">
                    <button
                      type="button"
                      onClick={() => {
                        if (onSelectPlanForSignup) onSelectPlanForSignup(plan.name);
                        onNavigate('signup');
                      }}
                      className="w-full py-2.5 px-4 text-xs font-semibold text-white bg-slate-900 rounded-lg hover:bg-slate-800 transition-colors cursor-pointer"
                    >
                      Select {plan.name} Plan
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* REFERRAL HIGHLIGHT SECTION ON HOME */}
        <section className="bg-white py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
              <div className="lg:col-span-6 space-y-4">
                <div className="text-xs font-semibold text-blue-700">Referral Program</div>
                <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">
                  Grow With Vaulta
                </h2>
                <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                  Earn a referral reward when an eligible user joins Vaulta through your referral ID and makes an eligible investment.
                </p>
                <div className="space-y-3 pt-2">
                  <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                    <div className="text-xs text-slate-500">Direct Referral Reward</div>
                    <div className="text-base font-semibold text-slate-900 mt-0.5">
                      5% referral reward on the eligible investment amount.
                    </div>
                  </div>
                  <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                    <div className="text-xs text-slate-500">Weekly Return Rate Boost (Additive Percentage Points)</div>
                    <div className="text-base font-semibold text-slate-900 mt-0.5">
                      0.05 percentage-point weekly return boost per eligible referral.
                    </div>
                    <p className="text-xs text-slate-500 mt-1">
                      Added directly in percentage points to your weekly return rate — never applied as a small multiplier.
                    </p>
                  </div>
                </div>
                <div className="pt-2">
                  <button
                    type="button"
                    onClick={() => onNavigate('referral')}
                    className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-semibold text-white bg-slate-900 rounded-lg hover:bg-slate-800 transition-colors cursor-pointer"
                  >
                    <span>Explore Referral Program</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              <div className="lg:col-span-6 bg-slate-50 border border-slate-200 rounded-xl p-6 space-y-4">
                <div className="flex items-center justify-between border-b border-slate-200 pb-3">
                  <span className="text-xs font-semibold text-slate-900">
                    Weekly Boost Progression (Percentage Points)
                  </span>
                  <span className="text-xs text-slate-500">Demo Structure</span>
                </div>
                <div className="space-y-3">
                  {MOCK_REFERRAL_BOOST_TIERS.map((tier) => (
                    <div
                      key={tier.eligibleReferrals}
                      className="flex items-center justify-between p-3.5 bg-white border border-slate-200 rounded-lg"
                    >
                      <div>
                        <div className="text-xs font-semibold text-slate-900">
                          {tier.eligibleReferrals} eligible {tier.eligibleReferrals === 1 ? 'referral' : 'referrals'}
                        </div>
                        <div className="text-xs text-slate-500 mt-0.5">{tier.description}</div>
                      </div>
                      <div className="text-right font-mono">
                        <div className="text-sm font-bold text-emerald-700 tabular-nums">{tier.boostLabel}</div>
                        <div className="text-[11px] text-slate-500 tabular-nums">
                          e.g. {tier.exampleBaseRate} → {tier.exampleAdjustedRate}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }

  /* ============================================================================
   * 2. ABOUT PAGE
   * ============================================================================ */
  if (currentPage === 'about') {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 space-y-14">
        <div className="max-w-3xl space-y-3">
          <div className="text-xs font-semibold text-blue-700">About Vaulta</div>
          <h1 className="text-3xl sm:text-4xl font-bold text-slate-900">
            Institutional Discipline for Digital Investment Management
          </h1>
          <p className="text-base text-slate-600 leading-relaxed">
            Vaulta is built around a straightforward thesis: digital capital management should look and operate with the clarity, reporting rigor, and predictability of modern institutional finance.
          </p>
        </div>

        {/* Architectural Image Showcase with Fallback */}
        <div className="relative rounded-xl overflow-hidden border border-slate-200 bg-slate-900 h-72 sm:h-96">
          <img
            src={hqImage}
            alt="Vaulta modern institutional lobby and architectural interior"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/35 to-transparent flex items-end p-6 sm:p-8">
            <div className="text-white max-w-xl space-y-1">
              <div className="text-xs font-mono text-sky-400">VAULTA PLATFORM ARCHITECTURE</div>
              <div className="text-lg font-semibold">
                Designed for international investors requiring structured USDT workflows and transparent ledger reporting.
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white border border-slate-200 rounded-xl p-6 space-y-2">
            <h2 className="text-base font-semibold text-slate-900">01. Clarity Over Complexity</h2>
            <p className="text-sm text-slate-600 leading-relaxed">
              Instead of overwhelming users with order books, margin tickers, or speculative tokens, Vaulta focuses on standardized USDT investment plans and clear weekly reporting.
            </p>
          </div>
          <div className="bg-white border border-slate-200 rounded-xl p-6 space-y-2">
            <h2 className="text-base font-semibold text-slate-900">02. Service-Level Accountability</h2>
            <p className="text-sm text-slate-600 leading-relaxed">
              Our 72-Hour Withdrawal Commitment establishes a clear operational target for eligible withdrawal processing, backed by defined Guarantee Terms.
            </p>
          </div>
          <div className="bg-white border border-slate-200 rounded-xl p-6 space-y-2">
            <h2 className="text-base font-semibold text-slate-900">03. Modular Backend Readiness</h2>
            <p className="text-sm text-slate-600 leading-relaxed">
              This platform frontend is architected with clean service abstractions, strict TypeScript contracts, and centralized state layers ready for enterprise backend integration.
            </p>
          </div>
        </div>
      </div>
    );
  }

  /* ============================================================================
   * 3. HOW IT WORKS PAGE
   * ============================================================================ */
  if (currentPage === 'how-it-works') {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 space-y-14">
        <div className="max-w-3xl space-y-3">
          <div className="text-xs font-semibold text-blue-700">Platform Guide</div>
          <h1 className="text-3xl sm:text-4xl font-bold text-slate-900">
            How Vaulta Works
          </h1>
          <p className="text-base text-slate-600 leading-relaxed">
            Follow our four-step lifecycle to register, verify your identity credentials, fund your account in USDT, and monitor weekly return distributions.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
            {
              num: 'Step 1',
              title: 'Create Your Account',
              body: 'Complete the registration form with your full name, email address, and a strong password. If you were invited by an existing client, enter their Referral ID (e.g., VLT-8F3K92) during registration.',
              actionLabel: 'Go to Sign Up',
              route: 'signup' as PageRoute,
            },
            {
              num: 'Step 2',
              title: 'Verify Your Email',
              body: 'Every new account requires email verification before accessing funding or investment features. Click the verification link sent to your inbox to activate your profile.',
              actionLabel: 'Preview Email Verification UI',
              route: 'verify-email' as PageRoute,
            },
            {
              num: 'Step 3',
              title: 'Fund Your Account',
              body: 'Navigate to the Deposit section, select USDT and your preferred settlement network (Network A, Network B, or Network C), and transfer funds to your designated deposit address.',
              actionLabel: 'Preview Deposit Interface',
              route: 'deposit' as PageRoute,
            },
            {
              num: 'Step 4',
              title: 'Monitor Your Investment',
              body: 'Choose between the Starter (1,000 USDT), Growth (5,000 USDT), or Premium (10,000 USDT) plans. Monitor your portfolio value, weekly earnings, and withdrawal requests in real time.',
              actionLabel: 'Explore Investment Plans',
              route: 'investments' as PageRoute,
            },
          ].map((step, i) => (
            <div key={i} className="bg-white border border-slate-200 rounded-xl p-7 flex flex-col justify-between space-y-5">
              <div className="space-y-2">
                <div className="text-xs font-mono font-semibold text-blue-700">{step.num}</div>
                <h2 className="text-xl font-bold text-slate-900">{step.title}</h2>
                <p className="text-sm text-slate-600 leading-relaxed">{step.body}</p>
              </div>
              <div>
                <button
                  type="button"
                  onClick={() => onNavigate(step.route)}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-700 hover:text-blue-900 cursor-pointer"
                >
                  <span>{step.actionLabel}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  /* ============================================================================
   * 4. INVESTMENT PLANS PAGE
   * ============================================================================ */
  if (currentPage === 'investments') {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 space-y-12">
        <div className="max-w-3xl space-y-3">
          <div className="flex items-center gap-2 text-xs text-slate-500">
            <span className="font-semibold text-blue-700">Investment Plans</span>
            <span aria-hidden="true">·</span>
            <span className="font-medium text-amber-800">Demo/Sample Values Only</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-slate-900">
            Standardized USDT Investment Plans
          </h1>
          <p className="text-base text-slate-600 leading-relaxed">
            Each plan displays a standardized principal amount, target weekly return rate, investment period, and estimated earnings. Values shown are frontend UI demonstration examples.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {MOCK_INVESTMENT_PLANS.map((plan) => (
            <div key={plan.id} className="bg-white border border-slate-200 rounded-xl p-7 flex flex-col justify-between">
              <div className="space-y-5">
                <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                  <h2 className="text-xl font-bold text-slate-900">{plan.name}</h2>
                  <span className="text-xs font-medium text-emerald-700">{plan.status}</span>
                </div>
                <div>
                  <div className="text-xs text-slate-500">Investment Amount</div>
                  <div className="text-3xl font-mono font-bold text-slate-900 mt-1 tabular-nums">
                    {plan.amountUsdt.toLocaleString('en-US')} USDT
                  </div>
                </div>
                <div className="space-y-2.5 py-4 border-y border-slate-100 text-xs">
                  <div className="flex justify-between">
                    <span className="text-slate-500">Weekly Return</span>
                    <span className="font-mono font-semibold text-emerald-700 tabular-nums">
                      {plan.weeklyReturnPercent}% weekly return
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Investment Period</span>
                    <span className="font-mono font-semibold text-slate-900 tabular-nums">
                      {plan.periodWeeks} Weeks
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Estimated Weekly Earnings</span>
                    <span className="font-mono font-semibold text-slate-900 tabular-nums">
                      {plan.estimatedWeeklyUsdt.toLocaleString('en-US')} USDT
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Estimated Total Period Earnings</span>
                    <span className="font-mono font-semibold text-emerald-700 tabular-nums">
                      +{plan.estimatedTotalEarningsUsdt.toLocaleString('en-US')} USDT
                    </span>
                  </div>
                </div>
                <ul className="space-y-2 text-xs text-slate-600">
                  {plan.features.map((f, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700 shrink-0 mt-0.5" />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="pt-6 mt-6 border-t border-slate-100 flex flex-col gap-2">
                <button
                  type="button"
                  onClick={() => onNavigate('signup')}
                  className="w-full py-2.5 px-4 text-xs font-semibold text-white bg-slate-900 rounded-lg hover:bg-slate-800 transition-colors cursor-pointer"
                >
                  Start {plan.name} Plan
                </button>
                <button
                  type="button"
                  onClick={() => onNavigate('risk-disclosure')}
                  className="w-full py-2 text-xs font-medium text-slate-500 hover:text-slate-800 cursor-pointer"
                >
                  Read Risk Disclosure
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  /* ============================================================================
   * 5. REFERRAL PROGRAM PAGE (PUBLIC)
   * ============================================================================ */
  if (currentPage === 'referral') {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 space-y-12">
        <div className="max-w-3xl space-y-3">
          <div className="text-xs font-semibold text-blue-700">Vaulta Referral Center</div>
          <h1 className="text-3xl sm:text-4xl font-bold text-slate-900">
            Grow With Vaulta
          </h1>
          <p className="text-base text-slate-600 leading-relaxed">
            Earn a referral reward when an eligible user joins Vaulta through your referral ID and makes an eligible investment.
          </p>
        </div>

        {/* Two Core Pillars of the Referral Program */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white border border-slate-200 rounded-xl p-7 space-y-3">
            <div className="text-xs font-mono font-semibold text-blue-700">01. DIRECT REFERRAL REWARD</div>
            <h2 className="text-xl font-bold text-slate-900">
              5% referral reward on the eligible investment amount.
            </h2>
            <p className="text-sm text-slate-600 leading-relaxed">
              When an invited user registers with your Referral ID, completes email verification, and activates an eligible investment plan, a 5% reward on their eligible investment amount is credited to your Referral Earnings balance.
            </p>
          </div>

          <div className="bg-white border border-slate-200 rounded-xl p-7 space-y-3">
            <div className="text-xs font-mono font-semibold text-emerald-700">02. ADDITIVE WEEKLY RETURN BOOST</div>
            <h2 className="text-xl font-bold text-slate-900">
              0.05 percentage-point weekly return boost per eligible referral.
            </h2>
            <p className="text-sm text-slate-600 leading-relaxed">
              Each eligible referral increases your weekly return rate by <strong>0.05 percentage points</strong> (additive percentage points, not a multiplier).
            </p>
          </div>
        </div>

        {/* Explicit Percentage-Point Progression Table */}
        <div className="bg-white border border-slate-200 rounded-xl p-7 space-y-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-4">
            <div>
              <h3 className="text-base font-semibold text-slate-900">
                Percentage-Point Boost Examples (Demo Structure)
              </h3>
              <p className="text-xs text-slate-500">
                Illustrating how +0.05 percentage points per eligible referral adds directly to the weekly rate.
              </p>
            </div>
            <button
              type="button"
              onClick={() => onNavigate('referral-terms')}
              className="text-xs font-semibold text-blue-700 hover:underline cursor-pointer"
            >
              View Referral Program Terms →
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {MOCK_REFERRAL_BOOST_TIERS.map((tier) => (
              <div key={tier.eligibleReferrals} className="p-5 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                <div className="text-xs font-semibold text-slate-600">
                  {tier.eligibleReferrals} eligible {tier.eligibleReferrals === 1 ? 'referral' : 'referrals'}
                </div>
                <div className="text-xl font-mono font-bold text-emerald-700 tabular-nums">
                  {tier.boostLabel}
                </div>
                <div className="text-xs text-slate-500 font-mono tabular-nums">
                  Example: {tier.exampleBaseRate} base → {tier.exampleAdjustedRate} weekly
                </div>
              </div>
            ))}
          </div>

          {/* Interactive Sample Referral ID Preview */}
          <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="text-xs text-slate-500">Sample Referral ID Format</div>
              <div className="flex items-center gap-3">
                <span className="text-base font-mono font-bold text-slate-900">VLT-8F3K92</span>
                <button
                  type="button"
                  onClick={handleCopyDemoRef}
                  className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-medium text-slate-700 bg-slate-100 rounded hover:bg-slate-200 cursor-pointer"
                >
                  {copiedDemoRef ? <Check className="w-3.5 h-3.5 text-emerald-700" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedDemoRef ? 'Copied Demo ID' : 'Copy Sample ID'}</span>
                </button>
              </div>
            </div>
            <button
              type="button"
              onClick={() => onNavigate('user-referrals')}
              className="px-5 py-2.5 text-xs font-semibold text-white bg-slate-900 rounded-lg hover:bg-slate-800 cursor-pointer"
            >
              Open Full Referral Dashboard (Demo)
            </button>
          </div>
        </div>
      </div>
    );
  }

  /* ============================================================================
   * 6. SECURITY PAGE (PUBLIC)
   * ============================================================================ */
  if (currentPage === 'security') {
    const securitySections = [
      {
        title: '01. Account Security',
        description:
          'Every Vaulta account requires verified email ownership, strong password complexity enforcement, session device tracking, and optional Two-Factor Authentication (2FA) controls.',
      },
      {
        title: '02. Data Protection',
        description:
          'Sensitive account metadata is compartmentalized across services. Client-side code never stores private keys, wallet seed phrases, database credentials, or administrative secrets.',
      },
      {
        title: '03. Transaction Security',
        description:
          'Deposits and withdrawals are recorded with unique transaction identifiers, network protocol tags, and explicit pre-submission address verification prompts.',
      },
      {
        title: '04. Withdrawal Controls',
        description:
          'All withdrawal requests pass through structured review stages (Pending, Under Review, Processing, Completed, or Rejected) to verify destination parameters and account integrity.',
      },
      {
        title: '05. Monitoring',
        description:
          'Administrative actions, status changes, and compliance reviews are logged in an immutable-style Audit Log recording timestamp, administrator identifier, user, transaction, and IP context.',
      },
      {
        title: '06. Responsible Platform Operations',
        description:
          'Vaulta communicates operational targets—such as our 72-Hour Withdrawal Commitment—with transparent eligibility criteria and Risk Disclosures rather than unverified absolutes.',
      },
    ];

    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 space-y-12">
        <div className="max-w-3xl space-y-3">
          <div className="text-xs font-semibold text-blue-700">Security & Governance</div>
          <h1 className="text-3xl sm:text-4xl font-bold text-slate-900">
            Platform Security & Operational Controls
          </h1>
          <p className="text-base text-slate-600 leading-relaxed">
            Vaulta applies layered account controls, structured withdrawal verification, and transparent operational procedures to safeguard user accounts and platform integrity.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {securitySections.map((sec, idx) => (
            <div key={idx} className="bg-white border border-slate-200 rounded-xl p-6 space-y-3">
              <div className="w-9 h-9 rounded-lg bg-slate-100 text-slate-800 flex items-center justify-center">
                <Lock className="w-4 h-4" />
              </div>
              <h2 className="text-base font-semibold text-slate-900">{sec.title}</h2>
              <p className="text-sm text-slate-600 leading-relaxed">{sec.description}</p>
            </div>
          ))}
        </div>

        <div className="bg-slate-900 text-white rounded-xl p-7 border border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div className="space-y-1 max-w-2xl">
            <h3 className="text-base font-semibold">Manage Your Account Security Settings</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Review active login sessions, configure security notifications, and inspect Two-Factor Authentication settings inside your client portal.
            </p>
          </div>
          <button
            type="button"
            onClick={() => onNavigate('security-settings')}
            className="px-4 py-2.5 text-xs font-semibold text-slate-900 bg-white rounded-lg hover:bg-slate-100 cursor-pointer whitespace-nowrap"
          >
            Open Security Settings
          </button>
        </div>
      </div>
    );
  }

  /* ============================================================================
   * 7. FAQ PAGE
   * ============================================================================ */
  if (currentPage === 'faq') {
    const categories = ['All', 'General', 'Account & Security', 'Deposits & Withdrawals', 'Investments & Referrals'];
    const filteredFaqs = MOCK_FAQ_ITEMS.filter((item: FAQItem) => {
      const matchesCategory = faqCategory === 'All' || item.category === faqCategory;
      const matchesSearch =
        item.question.toLowerCase().includes(faqSearch.toLowerCase()) ||
        item.answer.toLowerCase().includes(faqSearch.toLowerCase());
      return matchesCategory && matchesSearch;
    });

    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-14 space-y-10">
        <div className="space-y-3">
          <div className="text-xs font-semibold text-blue-700">Knowledge Base</div>
          <h1 className="text-3xl sm:text-4xl font-bold text-slate-900">
            Frequently Asked Questions
          </h1>
          <p className="text-base text-slate-600">
            Clear answers regarding account onboarding, USDT deposits, the 72-Hour Withdrawal Commitment, and our referral program.
          </p>
        </div>

        {/* Search & Filter Controls */}
        <div className="space-y-4">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={faqSearch}
              onChange={(e) => setFaqSearch(e.target.value)}
              placeholder="Search questions (e.g., 72-hour withdrawal, referral ID, USDT)..."
              className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-300 rounded-lg text-sm text-slate-900 focus:outline-none focus:border-blue-700"
            />
          </div>

          <div className="flex flex-wrap items-center gap-1.5 bg-slate-100 p-1.5 rounded-lg">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setFaqCategory(cat)}
                className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors cursor-pointer whitespace-nowrap ${
                  faqCategory === cat
                    ? 'bg-white text-slate-900 shadow-xs font-semibold'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Expandable Accordion List */}
        <div className="space-y-3">
          {filteredFaqs.length === 0 ? (
            <div className="bg-white border border-slate-200 rounded-xl p-8 text-center text-sm text-slate-600">
              No FAQ entries matched "{faqSearch}". Try clearing your search filter.
            </div>
          ) : (
            filteredFaqs.map((faq) => {
              const isOpen = openFaqId === faq.id;
              return (
                <div key={faq.id} className="bg-white border border-slate-200 rounded-xl overflow-hidden">
                  <button
                    type="button"
                    onClick={() => setOpenFaqId(isOpen ? null : faq.id)}
                    className="w-full px-6 py-4 text-left flex items-center justify-between gap-4 hover:bg-slate-50/70 transition-colors cursor-pointer"
                    aria-expanded={isOpen}
                  >
                    <div>
                      <div className="text-[11px] text-slate-400 font-medium mb-0.5">{faq.category}</div>
                      <div className="text-sm sm:text-base font-semibold text-slate-900">{faq.question}</div>
                    </div>
                    {isOpen ? (
                      <ChevronUp className="w-4 h-4 text-slate-500 shrink-0" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-slate-500 shrink-0" />
                    )}
                  </button>
                  {isOpen && (
                    <div className="px-6 pb-5 pt-1 text-sm text-slate-600 leading-relaxed border-t border-slate-100">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>
      </div>
    );
  }

  /* ============================================================================
   * 8. CONTACT PAGE
   * ============================================================================ */
  if (currentPage === 'contact') {
    return (
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          <div className="lg:col-span-5 space-y-6">
            <div className="space-y-2">
              <div className="text-xs font-semibold text-blue-700">Client Desk</div>
              <h1 className="text-3xl font-bold text-slate-900">Contact Vaulta</h1>
              <p className="text-sm text-slate-600 leading-relaxed">
                Have questions regarding institutional onboarding, investment plans, or withdrawal procedures? Reach out to our client operations team.
              </p>
            </div>

            <div className="space-y-4 pt-2">
              <div className="p-4 bg-white border border-slate-200 rounded-xl flex items-start gap-3">
                <Mail className="w-4 h-4 text-blue-700 shrink-0 mt-1" />
                <div className="text-xs space-y-0.5">
                  <div className="font-semibold text-slate-900">Client Support Desk (Demo)</div>
                  <div className="font-mono text-slate-600">support@vaulta-demo.com</div>
                </div>
              </div>
              <div className="p-4 bg-white border border-slate-200 rounded-xl flex items-start gap-3">
                <MapPin className="w-4 h-4 text-blue-700 shrink-0 mt-1" />
                <div className="text-xs space-y-0.5">
                  <div className="font-semibold text-slate-900">Registered Office (Placeholder)</div>
                  <div className="text-slate-600">Bahnhofstrasse 42, 8001 Zürich, Switzerland</div>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7 bg-white border border-slate-200 rounded-xl p-7">
            {contactSubmitted ? (
              <div className="py-8 text-center space-y-4">
                <CheckCircle2 className="w-10 h-10 text-emerald-700 mx-auto" />
                <h2 className="text-lg font-bold text-slate-900">Inquiry Received (Demo)</h2>
                <p className="text-sm text-slate-600 max-w-md mx-auto">
                  Thank you, {contactName}. Your message regarding "{contactTopic}" has been logged in our demo support queue.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setContactSubmitted(false);
                    setContactName('');
                    setContactEmail('');
                    setContactMessage('');
                  }}
                  className="px-4 py-2 text-xs font-semibold text-white bg-slate-900 rounded-lg cursor-pointer"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleContactSubmit} className="space-y-4" noValidate>
                <h2 className="text-lg font-semibold text-slate-900">Send a Direct Message</h2>
                {contactError && (
                  <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-xs text-red-700">
                    {contactError}
                  </div>
                )}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-slate-700 mb-1">Full Name</label>
                    <input
                      type="text"
                      value={contactName}
                      onChange={(e) => setContactName(e.target.value)}
                      placeholder="Alexander Lindqvist"
                      className="w-full px-3.5 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:border-blue-700"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-slate-700 mb-1">Email Address</label>
                    <input
                      type="email"
                      value={contactEmail}
                      onChange={(e) => setContactEmail(e.target.value)}
                      placeholder="name@company.com"
                      className="w-full px-3.5 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:border-blue-700"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">Subject Category</label>
                  <select
                    value={contactTopic}
                    onChange={(e) => setContactTopic(e.target.value)}
                    className="w-full px-3.5 py-2 border border-slate-300 rounded-lg text-sm bg-white focus:outline-none focus:border-blue-700"
                  >
                    <option>General Platform Inquiry</option>
                    <option>Investment Plans & Allocations</option>
                    <option>72-Hour Withdrawal Commitment</option>
                    <option>Referral Program Attribution</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">Message</label>
                  <textarea
                    rows={4}
                    value={contactMessage}
                    onChange={(e) => setContactMessage(e.target.value)}
                    placeholder="Provide details regarding your inquiry..."
                    className="w-full px-3.5 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:border-blue-700"
                  />
                </div>
                <button
                  type="submit"
                  className="px-5 py-2.5 text-xs font-semibold text-white bg-slate-900 rounded-lg hover:bg-slate-800 transition-colors cursor-pointer"
                >
                  Submit Inquiry
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    );
  }

  /* ============================================================================
   * 9-13. LEGAL & PLACEHOLDER POLICY PAGES
   * (Terms, Privacy, Risk Disclosure, Guarantee Terms, Referral Terms)
   * ============================================================================ */
  const legalConfigs: Record<
    string,
    {
      kicker: string;
      title: string;
      lastUpdated: string;
      sections: { heading: string; content: string }[];
    }
  > = {
    terms: {
      kicker: 'Legal Documentation (Placeholder)',
      title: 'Terms & Conditions',
      lastUpdated: 'October 2026 · Draft Template for Legal Review',
      sections: [
        {
          heading: '1. Scope of Platform & Demonstration Status',
          content:
            'This document is a structured placeholder for Vaulta’s Terms & Conditions. In this frontend version, all balances, USDT deposit addresses, returns, and withdrawals are simulated demonstration records. Final legally binding terms must be reviewed and approved by qualified legal counsel prior to commercial launch.',
        },
        {
          heading: '2. Account Eligibility & Verification',
          content:
            'Users must provide accurate registration details, maintain a verified email address, and comply with applicable jurisdictional requirements. Accounts remain limited to one individual or corporate entity per registration.',
        },
        {
          heading: '3. Investment Plans & Return Schedules',
          content:
            'Investment plan allocations (Starter, Growth, Premium) and their displayed return schedules are subject to platform operational terms and the Risk Disclosure statement.',
        },
      ],
    },
    privacy: {
      kicker: 'Data Governance (Placeholder)',
      title: 'Privacy Policy',
      lastUpdated: 'October 2026 · Draft Template for Legal Review',
      sections: [
        {
          heading: '1. Information Collected',
          content:
            'Vaulta collects account identification details (Full Name, Email Address, Country), transaction records, and login session metadata necessary to operate and secure the platform.',
        },
        {
          heading: '2. Data Minimization & Security',
          content:
            'We do not store private wallet keys or seed phrases. Personal data handling procedures are structured to align with international data protection standards once connected to production infrastructure.',
        },
      ],
    },
    'risk-disclosure': {
      kicker: 'Mandatory Investment Disclaimer (Placeholder)',
      title: 'Risk Disclosure & Investment Disclaimer',
      lastUpdated: 'October 2026 · Draft Template for Legal Review',
      sections: [
        {
          heading: '1. No Financial or Legal Advice',
          content:
            'Nothing on the Vaulta website constitutes personalized financial, legal, tax, or investment advice. All figures displayed in this frontend build (including 5% weekly return examples) are illustrative UI demonstration placeholders.',
        },
        {
          heading: '2. Digital Asset & Network Risks',
          content:
            'Digital asset transfers over blockchain networks (such as USDT transfers across external networks) carry inherent technical, settlement, and counterparty risks. Sending assets on an unsupported network may result in permanent loss.',
        },
        {
          heading: '3. Past & Simulated Performance',
          content:
            'Simulated or historical performance figures shown in charts and plan cards do not guarantee future results.',
        },
      ],
    },
    'guarantee-terms': {
      kicker: 'Service Commitment Qualification (Placeholder)',
      title: '72-Hour Withdrawal Commitment — Guarantee Terms',
      lastUpdated: 'October 2026 · Placeholder Qualification Terms',
      sections: [
        {
          heading: '1. Overview of the 72-Hour Withdrawal Commitment',
          content:
            'Eligible withdrawal requests are targeted to be processed within 72 hours. If an eligible withdrawal request is not processed within 72 hours, Vaulta will provide compensation of $500, subject to the applicable Guarantee Terms defined below.',
        },
        {
          heading: '2. Eligibility Requirements',
          content:
            'To qualify as an eligible withdrawal request: (a) the user’s email and required account verification must be completed in full; (b) the withdrawal must be requested from cleared Available Balance; and (c) the destination USDT wallet address and selected network must be valid and pass automated checksum verification.',
        },
        {
          heading: '3. Exclusions & Security Holds',
          content:
            'The 72-hour processing target excludes delays caused by: external blockchain network congestion or outages, incomplete user verification responses, compliance/AML holds triggered by anomalous account activity, or force majeure events.',
        },
        {
          heading: '4. Compensation Claim Procedure (Placeholder)',
          content:
            'Detailed legal procedures, maximum per-account claim limits, and credit settlement rules will be finalized by legal counsel in this section prior to live operations.',
        },
      ],
    },
    'referral-terms': {
      kicker: 'Program Governance (Placeholder)',
      title: 'Referral Program Terms',
      lastUpdated: 'October 2026 · Placeholder Program Rules',
      sections: [
        {
          heading: '1. Referral Attribution',
          content:
            'A referral is attributed when a new user registers using a valid Referral ID (e.g., VLT-8F3K92) or referral link at the time of initial signup. Self-referrals or duplicate accounts are strictly ineligible.',
        },
        {
          heading: '2. 5% Referral Reward',
          content:
            'The referring user earns a 5% referral reward calculated on the eligible investment amount once the referred user verifies their email and activates an eligible investment plan.',
        },
        {
          heading: '3. +0.05 Percentage-Point Weekly Return Boost',
          content:
            'Each eligible referral contributes a +0.05 percentage-point boost to the referrer’s weekly return rate (for example: 1 eligible referral = +0.05 percentage points; 2 eligible referrals = +0.10 percentage points; 3 eligible referrals = +0.15 percentage points). This boost is an additive percentage-point adjustment, not a multiplier.',
        },
      ],
    },
  };

  const activeLegal = legalConfigs[currentPage] || legalConfigs.terms;

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-14 space-y-8">
      <div className="bg-white border border-slate-200 rounded-xl p-8 space-y-6">
        <div className="border-b border-slate-100 pb-6 space-y-2">
          <div className="flex items-center gap-2 text-xs text-blue-700 font-semibold">
            <FileText className="w-4 h-4" />
            <span>{activeLegal.kicker}</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900">{activeLegal.title}</h1>
          <div className="text-xs text-slate-500">{activeLegal.lastUpdated}</div>
        </div>

        {/* Quick switcher between legal documents */}
        <div className="flex flex-wrap gap-1.5 bg-slate-100 p-1.5 rounded-lg">
          {[
            { label: 'Terms & Conditions', route: 'terms' as PageRoute },
            { label: 'Privacy Policy', route: 'privacy' as PageRoute },
            { label: 'Risk Disclosure', route: 'risk-disclosure' as PageRoute },
            { label: '72h Guarantee Terms', route: 'guarantee-terms' as PageRoute },
            { label: 'Referral Terms', route: 'referral-terms' as PageRoute },
          ].map((doc) => (
            <button
              key={doc.route}
              type="button"
              onClick={() => onNavigate(doc.route)}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors cursor-pointer ${
                currentPage === doc.route
                  ? 'bg-white text-slate-900 shadow-xs font-semibold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {doc.label}
            </button>
          ))}
        </div>

        <div className="space-y-6 pt-2">
          {activeLegal.sections.map((sec, idx) => (
            <div key={idx} className="space-y-2">
              <h2 className="text-base font-semibold text-slate-900">{sec.heading}</h2>
              <p className="text-sm text-slate-600 leading-relaxed">{sec.content}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
