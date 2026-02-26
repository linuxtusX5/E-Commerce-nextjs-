import type { ReactNode } from "react";
type Props = {
  title: string;
  badge?: string;
  subtitle: string;
  children: React.ReactNode;
};

export function AuthCard({ title, badge, subtitle, children }: Props) {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Sora:wght@300;400;500;600;700&display=swap');

        .auth-root {
          min-height: 100vh;
          background: #0d1f2d;
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: 'Sora', sans-serif;
          padding: 24px;
          position: relative;
          overflow: hidden;
        }

        .auth-root::before {
          content: '';
          position: fixed;
          inset: 0;
          background:
            radial-gradient(ellipse 60% 50% at 15% 50%, rgba(0,150,180,0.18) 0%, transparent 70%),
            radial-gradient(ellipse 40% 40% at 80% 20%, rgba(0,80,120,0.12) 0%, transparent 60%);
          pointer-events: none;
        }

        .auth-card {
          width: 100%;
          max-width: 860px;
          min-height: 540px;
          border-radius: 24px;
          display: flex;
          overflow: hidden;
          box-shadow: 0 40px 100px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.06);
          position: relative;
          z-index: 1;
          animation: cardIn 0.6s cubic-bezier(0.22,1,0.36,1) both;
        }

        @keyframes cardIn {
          from { opacity: 0; transform: translateY(30px) scale(0.97); }
          to   { opacity: 1; transform: translateY(0) scale(1); }
        }

        /* ── Left panel ── */
        .auth-left {
          flex: 0 0 42%;
          position: relative;
          overflow: hidden;
          border-radius: 20px;
          margin: 6px;
        }

        .auth-left-bg {
          position: absolute;
          inset: 0;
          background:
            linear-gradient(160deg, rgba(0,40,80,0.7) 0%, rgba(0,0,0,0.3) 50%, rgba(0,30,60,0.5) 100%),
            url('https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=800&q=80') center/cover no-repeat;
          border-radius: 16px;
        }

        .auth-orb {
          position: absolute;
          border-radius: 50%;
          filter: blur(40px);
          opacity: 0.4;
          animation: orbFloat 6s ease-in-out infinite;
        }
        .auth-orb-1 {
          width: 180px; height: 180px;
          background: radial-gradient(circle, #00b4d8, #0077b6);
          top: -40px; right: -40px;
        }
        .auth-orb-2 {
          width: 120px; height: 120px;
          background: radial-gradient(circle, #48cae4, #023e8a);
          bottom: 40px; left: -20px;
          animation-delay: -3s;
        }

        @keyframes orbFloat {
          0%, 100% { transform: translateY(0px); }
          50%       { transform: translateY(-20px); }
        }

        .auth-left-content {
          position: relative;
          z-index: 2;
          height: 100%;
          display: flex;
          flex-direction: column;
          justify-content: flex-end;
          padding: 36px 32px;
        }

        .auth-badge {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          background: rgba(255,255,255,0.1);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255,255,255,0.15);
          border-radius: 100px;
          padding: 5px 14px;
          font-size: 11px;
          color: rgba(255,255,255,0.85);
          letter-spacing: 0.05em;
          text-transform: uppercase;
          margin-bottom: 16px;
          width: fit-content;
        }

        .auth-badge::before {
          content: '';
          width: 6px; height: 6px;
          border-radius: 50%;
          background: #00d4ff;
          box-shadow: 0 0 6px #00d4ff;
        }

        .auth-left-title {
          font-size: clamp(22px, 3vw, 30px);
          font-weight: 700;
          color: #fff;
          line-height: 1.2;
          margin-bottom: 10px;
          letter-spacing: -0.02em;
          white-space: pre-line;
        }

        .auth-left-sub {
          font-size: 13px;
          color: rgba(255,255,255,0.6);
          line-height: 1.6;
          font-weight: 300;
          white-space: pre-line;
        }

        /* ── Right panel ── */
        .auth-right {
          flex: 1;
          background: #fff;
          padding: 44px 40px;
          display: flex;
          flex-direction: column;
          justify-content: center;
          overflow-y: auto;
          animation: slideIn 0.7s 0.1s cubic-bezier(0.22,1,0.36,1) both;
        }

        @keyframes slideIn {
          from { opacity: 0; transform: translateX(20px); }
          to   { opacity: 1; transform: translateX(0); }
        }

        @media (max-width: 640px) {
          .auth-card { flex-direction: column; max-width: 420px; }
          .auth-left  { flex: 0 0 160px; margin: 6px 6px 0; }
          .auth-right { padding: 28px 24px; }
        }
      `}</style>

      <div className="auth-root">
        <div className="auth-card">
          {/* Left decorative panel */}
          <div className="auth-left">
            <div className="auth-left-bg" />
            <div className="auth-orb auth-orb-1" />
            <div className="auth-orb auth-orb-2" />
            <div className="auth-left-content">
              <div className="auth-badge">{badge}</div>
              <h2 className="auth-left-title">{title}</h2>
              <p className="auth-left-sub">{subtitle}</p>
            </div>
          </div>

          {/* Right form panel */}
          <div className="auth-right">{children}</div>
        </div>
      </div>
    </>
  );
}
