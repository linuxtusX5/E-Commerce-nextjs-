"use client";

import Link from "next/link";
import { useEffect } from "react";

export default function NotFound() {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, []);
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700&family=Sora:wght@300;400;500;600;700&display=swap');

        .nf-root {
          min-height: 100vh;
          background: #0a0f1a;
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: 'Sora', sans-serif;
          padding: 24px;
          position: relative;
          overflow: hidden;
        }

        .nf-glow-1 {
          position: absolute;
          width: 600px; height: 600px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(14,165,233,0.08) 0%, transparent 70%);
          top: -200px; left: -200px;
          pointer-events: none;
        }

        .nf-glow-2 {
          position: absolute;
          width: 400px; height: 400px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(139,92,246,0.06) 0%, transparent 70%);
          bottom: -100px; right: -100px;
          pointer-events: none;
        }

        .nf-inner {
          position: relative; z-index: 1;
          text-align: center; max-width: 520px;
        }

        .nf-code {
          font-family: 'Playfair Display', serif;
          font-size: clamp(100px, 20vw, 160px);
          font-weight: 700;
          color: transparent;
          -webkit-text-stroke: 2px rgba(14,165,233,0.3);
          line-height: 1;
          letter-spacing: -0.04em;
          margin-bottom: 8px;
          animation: nfFade 0.6s ease both;
        }

        .nf-title {
          font-family: 'Playfair Display', serif;
          font-size: clamp(22px, 4vw, 32px);
          font-weight: 700;
          color: #fff;
          letter-spacing: -0.02em;
          margin-bottom: 14px;
          animation: nfFade 0.6s ease 0.1s both;
        }

        .nf-sub {
          font-size: 15px;
          font-weight: 300;
          color: rgba(255,255,255,0.4);
          line-height: 1.7;
          margin-bottom: 36px;
          animation: nfFade 0.6s ease 0.2s both;
        }

        .nf-actions {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 12px;
          flex-wrap: wrap;
          animation: nfFade 0.6s ease 0.3s both;
        }

        .nf-btn-primary {
          height: 46px; padding: 0 28px;
          background: #0ea5e9; color: #fff;
          border-radius: 12px; border: none;
          font-family: 'Sora', sans-serif;
          font-size: 14px; font-weight: 600;
          text-decoration: none;
          display: flex; align-items: center; gap: 8px;
          transition: all 0.2s; cursor: pointer;
        }
        .nf-btn-primary:hover {
          background: #0284c7;
          transform: translateY(-2px);
          box-shadow: 0 8px 24px rgba(14,165,233,0.3);
        }

        .nf-btn-secondary {
          height: 46px; padding: 0 28px;
          background: transparent;
          border: 1.5px solid rgba(255,255,255,0.12);
          color: rgba(255,255,255,0.6);
          border-radius: 12px;
          font-family: 'Sora', sans-serif;
          font-size: 14px; font-weight: 500;
          text-decoration: none;
          display: flex; align-items: center; gap: 8px;
          transition: all 0.2s;
        }
        .nf-btn-secondary:hover {
          border-color: rgba(255,255,255,0.25);
          color: #fff;
        }

        .nf-divider {
          width: 40px; height: 2px;
          background: rgba(14,165,233,0.4);
          border-radius: 2px;
          margin: 32px auto;
          animation: nfFade 0.6s ease 0.35s both;
        }

        .nf-links {
          display: flex; align-items: center;
          justify-content: center; gap: 20px;
          flex-wrap: wrap;
          animation: nfFade 0.6s ease 0.4s both;
        }

        .nf-link {
          font-size: 13px; font-weight: 500;
          color: rgba(255,255,255,0.35);
          text-decoration: none;
          transition: color 0.2s;
        }
        .nf-link:hover { color: #0ea5e9; }

        @keyframes nfFade {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      <div className="nf-root">
        <div className="nf-glow-1" />
        <div className="nf-glow-2" />

        <div className="nf-inner">
          <p className="nf-code">404</p>
          <h1 className="nf-title">Page not found</h1>
          <p className="nf-sub">
            The page you're looking for doesn't exist or has been moved. Let's
            get you back on track.
          </p>

          <div className="nf-actions">
            <Link href="/" className="nf-btn-primary">
              ← Back to Home
            </Link>
            <Link href="/products" className="nf-btn-secondary">
              Browse Products
            </Link>
          </div>

          <div className="nf-divider" />

          <div className="nf-links">
            <Link href="/products" className="nf-link">
              Shop
            </Link>
            <Link href="/account/orders" className="nf-link">
              My Orders
            </Link>
            <Link href="/account/wishlist" className="nf-link">
              Wishlist
            </Link>
            <Link href="/search" className="nf-link">
              Search
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
