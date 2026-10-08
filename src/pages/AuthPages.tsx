import React, { useState } from 'react';
import {
  Mail,
  Lock,
  CheckCircle2,
  AlertCircle,
  ArrowRight,
  KeyRound,
  UserPlus,
} from 'lucide-react';
import { PageRoute } from '../types';
import { authService } from '../services/authService';

interface AuthPagesProps {
  currentPage: PageRoute;
  onNavigate: (page: PageRoute) => void;
  onLoginSuccess: (role: 'user' | 'admin', email?: string) => void;
  initialReferralId?: string;
}

export const AuthPages: React.FC<AuthPagesProps> = ({
  currentPage,
  onNavigate,
  onLoginSuccess,
  initialReferralId = '',
}) => {
  // Login state
  const [loginEmail, setLoginEmail] = useState('a.lindqvist@nordiccapital-demo.ch');
  const [loginPassword, setLoginPassword] = useState('Vaulta#2026!');
  const [rememberMe, setRememberMe] = useState(true);
  const [loginError, setLoginError] = useState('');

  // Signup state
  const [fullName, setFullName] = useState('');
  const [signupEmail, setSignupEmail] = useState('');
  const [signupPassword, setSignupPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [referralId, setReferralId] = useState(initialReferralId || 'VLT-8F3K92');
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [signupError, setSignupError] = useState('');

  // Forgot & Reset password state
  const [forgotEmail, setForgotEmail] = useState('');
  const [forgotSent, setForgotSent] = useState(false);
  const [forgotError, setForgotError] = useState('');

  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [resetError, setResetError] = useState('');
  const [resetSuccess, setResetSuccess] = useState(false);

  // Email verification state
  const [verifiedBanner, setVerifiedBanner] = useState(false);

  const validateEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const validateStrongPassword = (pwd: string) =>
    pwd.length >= 8 && /[A-Z]/.test(pwd) && /[0-9]/.test(pwd);

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateEmail(loginEmail)) {
      setLoginError('Please enter a valid email address.');
      return;
    }
    if (!loginPassword || loginPassword.length < 6) {
      setLoginError('Invalid credentials. Password must be at least 6 characters.');
      return;
    }
    setLoginError('');
    const result = await authService.login(loginEmail, loginPassword);
    onLoginSuccess(result.role, loginEmail);
  };

  const handleSignupSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim()) {
      setSignupError('Full Name is required.');
      return;
    }
    if (!validateEmail(signupEmail)) {
      setSignupError('A valid email address is required.');
      return;
    }
    if (!validateStrongPassword(signupPassword)) {
      setSignupError(
        'Strong password required: minimum 8 characters, at least one uppercase letter and one number.'
      );
      return;
    }
    if (signupPassword !== confirmPassword) {
      setSignupError('Password confirmation does not match your password.');
      return;
    }
    if (!termsAccepted) {
      setSignupError('You must agree to the Terms & Conditions and Privacy Policy to continue.');
      return;
    }
    setSignupError('');
    await authService.register({
      fullName,
      email: signupEmail,
      password: signupPassword,
      referralId: referralId.trim() || undefined,
    });
    onNavigate('verify-email');
  };

  const handleForgotSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateEmail(forgotEmail)) {
      setForgotError('Please enter a valid registered email address.');
      return;
    }
    setForgotError('');
    await authService.requestPasswordReset(forgotEmail);
    setForgotSent(true);
  };

  const handleResetSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateStrongPassword(newPassword)) {
      setResetError(
        'Please enter a strong password (minimum 8 characters, including an uppercase letter and number).'
      );
      return;
    }
    if (newPassword !== confirmNewPassword) {
      setResetError('Confirm New Password must match New Password.');
      return;
    }
    setResetError('');
    await authService.resetPassword(newPassword);
    setResetSuccess(true);
  };

  /* ============================================================================
   * 12. LOGIN PAGE
   * ============================================================================ */
  if (currentPage === 'login') {
    return (
      <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center px-4 py-12 bg-slate-50">
        <div className="w-full max-w-md bg-white border border-slate-200 rounded-xl p-8 space-y-6">
          <div className="space-y-1.5">
            <div className="text-xs font-mono font-semibold text-blue-700">VAULTA CLIENT PORTAL</div>
            <h1 className="text-2xl font-bold text-slate-900">Sign In to Your Account</h1>
            <p className="text-xs text-slate-500">
              Access your investment portfolio, weekly earnings, and withdrawal controls.
            </p>
          </div>

          {loginError && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-lg flex items-start gap-2.5 text-xs text-red-700">
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
              <span>{loginError}</span>
            </div>
          )}

          <form onSubmit={handleLoginSubmit} className="space-y-4" noValidate>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">Email</label>
              <input
                type="email"
                value={loginEmail}
                onChange={(e) => setLoginEmail(e.target.value)}
                placeholder="name@domain.com"
                className="w-full px-3.5 py-2.5 border border-slate-300 rounded-lg text-sm text-slate-900 focus:outline-none focus:border-blue-700"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">Password</label>
              <input
                type="password"
                value={loginPassword}
                onChange={(e) => setLoginPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full px-3.5 py-2.5 border border-slate-300 rounded-lg text-sm text-slate-900 focus:outline-none focus:border-blue-700"
              />
            </div>

            <div className="flex items-center justify-between text-xs">
              <label className="inline-flex items-center gap-2 text-slate-600 cursor-pointer">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="rounded border-slate-300 text-blue-700 focus:ring-blue-700"
                />
                <span>Remember Me</span>
              </label>
              <button
                type="button"
                onClick={() => onNavigate('forgot-password')}
                className="font-semibold text-blue-700 hover:underline cursor-pointer"
              >
                Forgot Password?
              </button>
            </div>

            <div className="pt-2 space-y-2.5">
              <button
                type="submit"
                className="w-full py-2.5 px-4 text-xs font-semibold text-white bg-slate-900 rounded-lg hover:bg-slate-800 transition-colors cursor-pointer"
              >
                Login
              </button>
              <button
                type="button"
                onClick={() => onNavigate('signup')}
                className="w-full py-2.5 px-4 text-xs font-semibold text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors cursor-pointer"
              >
                Create Account
              </button>
            </div>
          </form>

          {/* Demo Testing Quick Controls */}
          <div className="pt-4 border-t border-slate-100 space-y-2">
            <div className="text-[11px] font-medium text-slate-400">
              Demo Environment Shortcuts
            </div>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => onLoginSuccess('user', 'a.lindqvist@nordiccapital-demo.ch')}
                className="px-3 py-1.5 text-xs font-medium text-slate-700 bg-slate-100 rounded hover:bg-slate-200 cursor-pointer"
              >
                Instant User Demo
              </button>
              <button
                type="button"
                onClick={() => {
                  onLoginSuccess('admin', 'admin@vaulta.com');
                  onNavigate('admin-overview');
                }}
                className="px-3 py-1.5 text-xs font-medium text-slate-700 bg-slate-100 rounded hover:bg-slate-200 cursor-pointer"
              >
                Instant Admin Demo
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  /* ============================================================================
   * 11. SIGN UP PAGE
   * ============================================================================ */
  if (currentPage === 'signup') {
    return (
      <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center px-4 py-12 bg-slate-50">
        <div className="w-full max-w-lg bg-white border border-slate-200 rounded-xl p-8 space-y-6">
          <div className="space-y-1.5">
            <div className="text-xs font-mono font-semibold text-blue-700">ACCOUNT REGISTRATION</div>
            <h1 className="text-2xl font-bold text-slate-900">Create Your Vaulta Account</h1>
            <p className="text-xs text-slate-500">
              Complete your profile below. Email verification is required before funding or investing.
            </p>
          </div>

          {signupError && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-lg flex items-start gap-2.5 text-xs text-red-700">
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
              <span>{signupError}</span>
            </div>
          )}

          <form onSubmit={handleSignupSubmit} className="space-y-4" noValidate>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Full Name</label>
              <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Alexander Lindqvist"
                className="w-full px-3.5 py-2 border border-slate-300 rounded-lg text-sm text-slate-900 focus:outline-none focus:border-blue-700"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Email</label>
              <input
                type="email"
                value={signupEmail}
                onChange={(e) => setSignupEmail(e.target.value)}
                placeholder="name@domain.com"
                className="w-full px-3.5 py-2 border border-slate-300 rounded-lg text-sm text-slate-900 focus:outline-none focus:border-blue-700"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Password</label>
                <input
                  type="password"
                  value={signupPassword}
                  onChange={(e) => setSignupPassword(e.target.value)}
                  placeholder="Min 8 chars, 1 upper, 1 number"
                  className="w-full px-3.5 py-2 border border-slate-300 rounded-lg text-sm text-slate-900 focus:outline-none focus:border-blue-700"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Confirm Password
                </label>
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Re-enter password"
                  className="w-full px-3.5 py-2 border border-slate-300 rounded-lg text-sm text-slate-900 focus:outline-none focus:border-blue-700"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="text-xs font-semibold text-slate-700">Referral ID</label>
                <span className="text-[11px] text-slate-400">Optional</span>
              </div>
              <input
                type="text"
                value={referralId}
                onChange={(e) => setReferralId(e.target.value)}
                placeholder="e.g. VLT-8F3K92"
                className="w-full px-3.5 py-2 border border-slate-300 rounded-lg text-sm font-mono text-slate-900 focus:outline-none focus:border-blue-700"
              />
            </div>

            <label className="flex items-start gap-2.5 text-xs text-slate-600 cursor-pointer pt-1">
              <input
                type="checkbox"
                checked={termsAccepted}
                onChange={(e) => setTermsAccepted(e.target.checked)}
                className="mt-0.5 rounded border-slate-300 text-blue-700 focus:ring-blue-700"
              />
              <span>
                I agree to the{' '}
                <button
                  type="button"
                  onClick={() => onNavigate('terms')}
                  className="text-blue-700 font-semibold hover:underline"
                >
                  Terms & Conditions
                </button>{' '}
                and{' '}
                <button
                  type="button"
                  onClick={() => onNavigate('privacy')}
                  className="text-blue-700 font-semibold hover:underline"
                >
                  Privacy Policy
                </button>
                .
              </span>
            </label>

            <button
              type="submit"
              className="w-full py-2.5 px-4 text-xs font-semibold text-white bg-slate-900 rounded-lg hover:bg-slate-800 transition-colors cursor-pointer inline-flex items-center justify-center gap-2"
            >
              <UserPlus className="w-4 h-4" />
              <span>Create Account</span>
            </button>
          </form>

          <div className="pt-4 border-t border-slate-100 text-center text-xs text-slate-600">
            Already have a Vaulta account?{' '}
            <button
              type="button"
              onClick={() => onNavigate('login')}
              className="font-semibold text-blue-700 hover:underline cursor-pointer"
            >
              Login
            </button>
          </div>
        </div>
      </div>
    );
  }

  /* ============================================================================
   * 14. EMAIL VERIFICATION PAGE
   * ============================================================================ */
  if (currentPage === 'verify-email') {
    return (
      <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center px-4 py-12 bg-slate-50">
        <div className="w-full max-w-md bg-white border border-slate-200 rounded-xl p-8 text-center space-y-5">
          <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center mx-auto">
            <Mail className="w-6 h-6" />
          </div>

          <h1 className="text-2xl font-bold text-slate-900">Verify Your Email</h1>

          <p className="text-sm text-slate-600 leading-relaxed">
            We've sent a verification link to your email address. Please verify your email before accessing your account.
          </p>

          {signupEmail && (
            <div className="p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-xs font-mono text-slate-700">
              Sent to: {signupEmail}
            </div>
          )}

          {verifiedBanner ? (
            <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-lg text-xs text-emerald-800 space-y-3">
              <div className="flex items-center justify-center gap-1.5 font-semibold">
                <CheckCircle2 className="w-4 h-4" />
                <span>Email Verified Successfully (Demo)</span>
              </div>
              <button
                type="button"
                onClick={() => onLoginSuccess('user', signupEmail || undefined)}
                className="w-full py-2 px-4 text-xs font-semibold text-white bg-slate-900 rounded-lg hover:bg-slate-800 cursor-pointer"
              >
                Enter Client Dashboard →
              </button>
            </div>
          ) : (
            <div className="space-y-2.5 pt-2">
              <button
                type="button"
                onClick={() => setVerifiedBanner(true)}
                className="w-full py-2.5 px-4 text-xs font-semibold text-white bg-slate-900 rounded-lg hover:bg-slate-800 transition-colors cursor-pointer"
              >
                Simulate Clicking Email Verification Link (Demo)
              </button>
              <button
                type="button"
                onClick={() => onNavigate('login')}
                className="w-full py-2.5 px-4 text-xs font-medium text-slate-600 border border-slate-200 rounded-lg hover:bg-slate-50 cursor-pointer"
              >
                Return to Login
              </button>
            </div>
          )}
        </div>
      </div>
    );
  }

  /* ============================================================================
   * 15. FORGOT PASSWORD PAGE
   * ============================================================================ */
  if (currentPage === 'forgot-password') {
    return (
      <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center px-4 py-12 bg-slate-50">
        <div className="w-full max-w-md bg-white border border-slate-200 rounded-xl p-8 space-y-6">
          <div className="space-y-1.5">
            <div className="text-xs font-mono font-semibold text-blue-700">ACCOUNT RECOVERY</div>
            <h1 className="text-2xl font-bold text-slate-900">Forgot Password</h1>
            <p className="text-xs text-slate-500">
              Enter your registered email address to receive a password reset link.
            </p>
          </div>

          {forgotSent ? (
            <div className="space-y-5">
              <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-lg flex items-start gap-3 text-xs text-emerald-800">
                <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5" />
                <div>
                  <div className="font-semibold">Reset Link Dispatched</div>
                  <p className="mt-0.5">Check your email for a password reset link.</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => onNavigate('reset-password')}
                className="w-full py-2.5 px-4 text-xs font-semibold text-white bg-slate-900 rounded-lg hover:bg-slate-800 cursor-pointer inline-flex items-center justify-center gap-2"
              >
                <span>Open Reset Password Form (Demo Flow)</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          ) : (
            <form onSubmit={handleForgotSubmit} className="space-y-4" noValidate>
              {forgotError && (
                <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-xs text-red-700">
                  {forgotError}
                </div>
              )}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">Email</label>
                <input
                  type="email"
                  value={forgotEmail}
                  onChange={(e) => setForgotEmail(e.target.value)}
                  placeholder="name@domain.com"
                  className="w-full px-3.5 py-2.5 border border-slate-300 rounded-lg text-sm focus:outline-none focus:border-blue-700"
                />
              </div>
              <button
                type="submit"
                className="w-full py-2.5 px-4 text-xs font-semibold text-white bg-slate-900 rounded-lg hover:bg-slate-800 cursor-pointer"
              >
                Send Password Reset Link
              </button>
            </form>
          )}

          <div className="pt-3 border-t border-slate-100 text-center">
            <button
              type="button"
              onClick={() => onNavigate('login')}
              className="text-xs font-semibold text-slate-600 hover:text-slate-900 cursor-pointer"
            >
              ← Back to Login
            </button>
          </div>
        </div>
      </div>
    );
  }

  /* ============================================================================
   * 16. RESET PASSWORD PAGE
   * ============================================================================ */
  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center px-4 py-12 bg-slate-50">
      <div className="w-full max-w-md bg-white border border-slate-200 rounded-xl p-8 space-y-6">
        <div className="space-y-1.5">
          <div className="text-xs font-mono font-semibold text-blue-700">CREDENTIAL UPDATE</div>
          <h1 className="text-2xl font-bold text-slate-900">Reset Password</h1>
          <p className="text-xs text-slate-500">
            Choose a strong new password for your Vaulta account.
          </p>
        </div>

        {resetSuccess ? (
          <div className="space-y-5">
            <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-lg flex items-start gap-3 text-xs text-emerald-800">
              <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5" />
              <div>
                <div className="font-semibold">Password Updated</div>
                <p className="mt-0.5">Your password has been updated successfully.</p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => onNavigate('login')}
              className="w-full py-2.5 px-4 text-xs font-semibold text-white bg-slate-900 rounded-lg hover:bg-slate-800 cursor-pointer"
            >
              Proceed to Login
            </button>
          </div>
        ) : (
          <form onSubmit={handleResetSubmit} className="space-y-4" noValidate>
            {resetError && (
              <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-xs text-red-700">
                {resetError}
              </div>
            )}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                New Password
              </label>
              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="Min 8 chars, 1 uppercase, 1 number"
                className="w-full px-3.5 py-2.5 border border-slate-300 rounded-lg text-sm focus:outline-none focus:border-blue-700"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                Confirm New Password
              </label>
              <input
                type="password"
                value={confirmNewPassword}
                onChange={(e) => setConfirmNewPassword(e.target.value)}
                placeholder="Re-enter new password"
                className="w-full px-3.5 py-2.5 border border-slate-300 rounded-lg text-sm focus:outline-none focus:border-blue-700"
              />
            </div>
            <button
              type="submit"
              className="w-full py-2.5 px-4 text-xs font-semibold text-white bg-slate-900 rounded-lg hover:bg-slate-800 cursor-pointer inline-flex items-center justify-center gap-2"
            >
              <KeyRound className="w-4 h-4" />
              <span>Update Password</span>
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
