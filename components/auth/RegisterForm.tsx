"use client";

import { useActionState } from "react";
import { useState, useEffect } from "react";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from 'next/navigation'
import { registerAction } from "@/lib/auth/actions";

const initialState = {
  success: false,
  error: null,
  message: null,
  fieldErrors: null,
}

export function RegisterForm() {
  const router = useRouter()
  const [state, formAction, isPending] = useActionState(
    registerAction,initialState
  );
  const [showPassword, setShowPassword] = useState(false);
  const [terms, setTerms] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);

  const handleGoogle = async () => {
    setGoogleLoading(true);
    await signIn("google", { callbackUrl: "/" });
    setGoogleLoading(false);
  };

  useEffect(() => {
    if (state.success) {
      const timer = setTimeout(() => router.push('/dashboard'), 1500)
      return () => clearTimeout(timer)
    }
  }, [state.success, router])

    const handleFormSubmit = (formData: FormData) => {
    formAction(formData)
  }

  return (
    <>
      <style>{`
        .rf-title {
          font-size: 26px;
          font-weight: 700;
          color: #0f172a;
          letter-spacing: -0.03em;
          margin-bottom: 24px;
          text-align: center;
          font-family: 'Sora', sans-serif;
        }

        .rf-alert {
          display: flex;
          align-items: flex-start;
          gap: 8px;
          padding: 10px 14px;
          border-radius: 10px;
          font-size: 12.5px;
          margin-bottom: 14px;
          font-family: 'Sora', sans-serif;
        }
        .rf-alert-error {
          background: #fef2f2;
          border: 1px solid #fecaca;
          color: #b91c1c;
        }

        .rf-row {
          display: flex;
          gap: 12px;
          margin-bottom: 12px;
        }

        .rf-field {
          flex: 1;
          position: relative;
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .rf-field-single {
          margin-bottom: 12px;
          position: relative;
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .rf-input {
          width: 100%;
          height: 46px;
          padding: 0 42px 0 16px;
          border: 1.5px solid #e2e8f0;
          border-radius: 10px;
          font-family: 'Sora', sans-serif;
          font-size: 13px;
          color: #0f172a;
          background: #f8fafc;
          outline: none;
          transition: all 0.2s;
        }

        .rf-input::placeholder { color: #94a3b8; }

        .rf-input:focus {
          border-color: #0ea5e9;
          background: #fff;
          box-shadow: 0 0 0 3px rgba(14,165,233,0.12);
        }

        .rf-input-error {
          border-color: #f87171 !important;
          background: #fff5f5 !important;
        }
        .rf-input-error:focus {
          border-color: #ef4444 !important;
          box-shadow: 0 0 0 3px rgba(239,68,68,0.1) !important;
        }

        .rf-field-icon {
          position: absolute;
          right: 14px;
          top: 13px;
          color: #94a3b8;
          cursor: pointer;
          display: flex;
          align-items: center;
          background: none;
          border: none;
          padding: 0;
          transition: color 0.2s;
        }
        .rf-field-icon:hover { color: #0ea5e9; }

        .rf-error-msg {
          font-size: 11px;
          color: #ef4444;
          font-family: 'Sora', sans-serif;
        }

        .rf-terms {
          display: flex;
          align-items: center;
          gap: 10px;
          margin: 14px 0;
        }

        .rf-terms input[type="checkbox"] {
          width: 16px; height: 16px;
          accent-color: #0ea5e9;
          cursor: pointer;
          flex-shrink: 0;
        }

        .rf-terms label {
          font-size: 12px;
          color: #64748b;
          cursor: pointer;
          line-height: 1.4;
          font-family: 'Sora', sans-serif;
        }

        .rf-terms a {
          color: #0ea5e9;
          text-decoration: none;
          font-weight: 500;
        }

        .rf-btn-primary {
          width: 100%;
          height: 48px;
          background: #0f172a;
          color: #fff;
          border: none;
          border-radius: 10px;
          font-family: 'Sora', sans-serif;
          font-size: 14px;
          font-weight: 600;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          transition: all 0.2s;
          letter-spacing: 0.01em;
          position: relative;
          overflow: hidden;
        }

        .rf-btn-primary::after {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, rgba(255,255,255,0.08) 0%, transparent 60%);
        }

        .rf-btn-primary:hover:not(:disabled) {
          background: #1e293b;
          transform: translateY(-1px);
          box-shadow: 0 8px 20px rgba(15,23,42,0.3);
        }

        .rf-btn-primary:active:not(:disabled) { transform: translateY(0); }

        .rf-btn-primary:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }

        .rf-spinner {
          width: 16px; height: 16px;
          border: 2px solid rgba(255,255,255,0.3);
          border-top-color: #fff;
          border-radius: 50%;
          animation: rfSpin 0.7s linear infinite;
        }
        @keyframes rfSpin { to { transform: rotate(360deg); } }

        .rf-divider {
          display: flex;
          align-items: center;
          gap: 12px;
          margin: 16px 0;
        }
        .rf-divider::before, .rf-divider::after {
          content: ''; flex: 1; height: 1px; background: #e2e8f0;
        }
        .rf-divider span {
          font-size: 12px;
          color: #94a3b8;
          font-family: 'Sora', sans-serif;
        }

        .rf-btn-social {
          width: 100%;
          height: 44px;
          border-radius: 10px;
          font-family: 'Sora', sans-serif;
          font-size: 13px;
          font-weight: 500;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          transition: all 0.2s;
          margin-bottom: 10px;
        }

        .rf-btn-google {
          background: #fff;
          border: 1.5px solid #e2e8f0;
          color: #374151;
        }
        .rf-btn-google:hover:not(:disabled) {
          border-color: #cbd5e1;
          background: #f8fafc;
          box-shadow: 0 2px 8px rgba(0,0,0,0.06);
        }

        .rf-btn-apple {
          background: #0f172a;
          border: 1.5px solid #0f172a;
          color: #fff;
          margin-bottom: 0;
        }
        .rf-btn-apple:hover {
          background: #1e293b;
          box-shadow: 0 4px 12px rgba(15,23,42,0.2);
        }

        .rf-btn-social:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }

        .rf-signin {
          text-align: center;
          font-size: 12px;
          color: #64748b;
          margin-top: 16px;
          font-family: 'Sora', sans-serif;
        }
        .rf-signin a {
          color: #0ea5e9;
          font-weight: 600;
          text-decoration: none;
        }
        .rf-signin a:hover { text-decoration: underline; }

        @media (max-width: 640px) {
          .rf-row { flex-direction: column; gap: 10px; }
        }
      `}</style>

      <h1 className="rf-title">Sign Up</h1>

      <form action={formAction} noValidate>
        {/* Global error */}
        {state.message && !state.success && !state.errors && (
          <div className="rf-alert rf-alert-error">
            <svg
              width="14"
              height="14"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
              style={{ flexShrink: 0, marginTop: 1 }}
            >
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="8" x2="12" y2="12" />
              <line x1="12" y1="16" x2="12.01" y2="16" />
            </svg>
            {state.message}
          </div>
        )}

        {/* Name row */}
        <div className="rf-row">
          <div className="rf-field">
            <input
              className={`rf-input ${state.errors?.name ? "rf-input-error" : ""}`}
              type="text"
              name="name"
              placeholder="Name"
              autoComplete="name"
              required
            />
            {state.errors?.name && (
              <span className="rf-error-msg">{state.errors.name[0]}</span>
            )}
          </div>
          {/* <div className="rf-field">
            <input
              className="rf-input"
              type="text"
              name="lastName"
              placeholder="Last name"
              autoComplete="family-name"
            />
          </div> */}
        </div>

        {/* Email */}
        <div className="rf-field-single">
          <input
            className={`rf-input ${state.errors?.email ? "rf-input-error" : ""}`}
            type="email"
            name="email"
            placeholder="Email address"
            autoComplete="email"
            required
          />
          <span className="rf-field-icon" style={{ pointerEvents: "none" }}>
            <svg
              width="15"
              height="15"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              viewBox="0 0 24 24"
            >
              <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </span>
          {state.errors?.email && (
            <span className="rf-error-msg">{state.errors.email[0]}</span>
          )}
        </div>

        {/* Password */}
        <div className="rf-field-single">
          <input
            className={`rf-input ${state.errors?.password ? "rf-input-error" : ""}`}
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder="Password"
            autoComplete="new-password"
            required
          />
          <button
            type="button"
            className="rf-field-icon"
            onClick={() => setShowPassword((v) => !v)}
            tabIndex={-1}
            aria-label={showPassword ? "Hide password" : "Show password"}
          >
            {showPassword ? (
              <svg
                width="15"
                height="15"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                viewBox="0 0 24 24"
              >
                <path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19m-6.72-1.07a3 3 0 11-4.24-4.24" />
                <line x1="1" y1="1" x2="23" y2="23" />
              </svg>
            ) : (
              <svg
                width="15"
                height="15"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                viewBox="0 0 24 24"
              >
                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                <circle cx="12" cy="12" r="3" />
              </svg>
            )}
          </button>
          {state.errors?.password && (
            <span className="rf-error-msg">{state.errors.password[0]}</span>
          )}
        </div>

        {/* Terms */}
        <div className="rf-terms">
          <input
            type="checkbox"
            id="rf-terms"
            checked={terms}
            onChange={(e) => setTerms(e.target.checked)}
            required
          />
          <label htmlFor="rf-terms">
            Accept <Link href="/terms">Terms &amp; Conditions</Link>
          </label>
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="rf-btn-primary"
          disabled={isPending || !terms}
        >
          {isPending ? (
            <span className="rf-spinner" />
          ) : (
            <>
              Join us
              <svg
                width="16"
                height="16"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.2"
                viewBox="0 0 24 24"
              >
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </>
          )}
        </button>
      </form>

      {/* Divider */}
      <div className="rf-divider">
        <span>or</span>
      </div>

      {/* Google */}
      <button
        className="rf-btn-social rf-btn-google"
        type="button"
        onClick={handleGoogle}
        disabled={googleLoading}
      >
        {googleLoading ? (
          <span
            className="rf-spinner"
            style={{
              borderTopColor: "#4285F4",
              borderColor: "rgba(66,133,244,0.3)",
            }}
          />
        ) : (
          <svg width="16" height="16" viewBox="0 0 24 24">
            <path
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              fill="#4285F4"
            />
            <path
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              fill="#34A853"
            />
            <path
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"
              fill="#FBBC05"
            />
            <path
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              fill="#EA4335"
            />
          </svg>
        )}
        Sign up with Google
      </button>

      {/* Apple */}
      <button className="rf-btn-social rf-btn-apple" type="button">
        <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
          <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
        </svg>
        Sign up with Apple
      </button>

      <p className="rf-signin">
        Already have an account? <Link href="/auth/login">Sign in</Link>
      </p>
    </>
  );
}