"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Package,
  Truck,
  CheckCircle,
  XCircle,
  Clock,
  MapPin,
  ShoppingBag,
  RefreshCw,
} from "lucide-react";

type OrderItem = {
  id: string;
  quantity: number;
  price: number;
  product: { name: string; images: string[]; slug: string; price: number };
};

type Order = {
  id: string;
  total: number;
  status: string;
  createdAt: Date;
  paymentId?: string | null;
  items: OrderItem[];
};

const STEPS = [
  {
    key: "PENDING",
    label: "Order Placed",
    icon: ShoppingBag,
    desc: "Your order has been received",
  },
  {
    key: "PAID",
    label: "Payment Confirmed",
    icon: CheckCircle,
    desc: "Payment successfully processed",
  },
  {
    key: "SHIPPED",
    label: "Shipped",
    icon: Truck,
    desc: "Your order is on the way",
  },
  {
    key: "DELIVERED",
    label: "Delivered",
    icon: MapPin,
    desc: "Package delivered successfully",
  },
];

const STATUS_ORDER = ["PENDING", "PAID", "SHIPPED", "DELIVERED"];

const STATUS_CONFIG: Record<
  string,
  { label: string; color: string; bg: string; icon: any }
> = {
  PENDING: {
    label: "Order Placed",
    color: "#d97706",
    bg: "#fffbeb",
    icon: Clock,
  },
  PAID: {
    label: "Payment Confirmed",
    color: "#0ea5e9",
    bg: "#f0f9ff",
    icon: CheckCircle,
  },
  SHIPPED: { label: "Shipped", color: "#7c3aed", bg: "#f5f3ff", icon: Truck },
  DELIVERED: {
    label: "Delivered",
    color: "#16a34a",
    bg: "#f0fdf4",
    icon: CheckCircle,
  },
  CANCELLED: {
    label: "Cancelled",
    color: "#dc2626",
    bg: "#fef2f2",
    icon: XCircle,
  },
};

function formatDate(date: Date | string) {
  return new Date(date).toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

function formatDateTime(date: Date | string) {
  return new Date(date).toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
}

const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700&family=Sora:wght@300;400;500;600;700&display=swap');

.ot-root { font-family: 'Sora', sans-serif; max-width: 780px; margin: 0 auto; padding: 32px 24px 80px; }

.ot-back { display: inline-flex; align-items: center; gap: 6px; font-size: 13px; font-weight: 500; color: #64748b; text-decoration: none; margin-bottom: 28px; transition: color 0.2s; }
.ot-back:hover { color: #0f172a; }

.ot-header { margin-bottom: 32px; }
.ot-header-top { display: flex; align-items: flex-start; justify-content: space-between; flex-wrap: wrap; gap: 12px; margin-bottom: 8px; }
.ot-order-id { font-family: 'Playfair Display', serif; font-size: 26px; font-weight: 700; color: #0f172a; letter-spacing: -0.02em; }
.ot-order-date { font-size: 13px; color: #94a3b8; margin-top: 4px; }
.ot-status-badge { display: inline-flex; align-items: center; gap: 6px; padding: 6px 16px; border-radius: 100px; font-size: 13px; font-weight: 600; }

/* Timeline */
.ot-timeline { background: #fff; border: 1px solid #f1f5f9; border-radius: 20px; padding: 28px; margin-bottom: 24px; }
.ot-timeline-title { font-size: 13px; font-weight: 700; color: #0f172a; margin-bottom: 24px; }

.ot-steps { display: flex; align-items: flex-start; gap: 0; position: relative; }

.ot-step { flex: 1; display: flex; flex-direction: column; align-items: center; position: relative; }

.ot-step-connector {
  position: absolute; top: 20px; left: 50%; right: -50%;
  height: 2px; background: #e2e8f0; z-index: 0;
  transition: background 0.4s;
}
.ot-step-connector-active { background: #0ea5e9; }
.ot-step:last-child .ot-step-connector { display: none; }

.ot-step-icon {
  width: 40px; height: 40px; border-radius: 50%;
  border: 2px solid #e2e8f0; background: #fff;
  display: flex; align-items: center; justify-content: center;
  position: relative; z-index: 1;
  transition: all 0.3s; flex-shrink: 0;
}
.ot-step-icon-done    { border-color: #0ea5e9; background: #0ea5e9; color: #fff; }
.ot-step-icon-current { border-color: #0ea5e9; background: #fff; color: #0ea5e9; box-shadow: 0 0 0 4px rgba(14,165,233,0.12); }
.ot-step-icon-pending { border-color: #e2e8f0; color: #cbd5e1; }

.ot-step-label { font-size: 11px; font-weight: 600; color: #94a3b8; margin-top: 10px; text-align: center; transition: color 0.3s; }
.ot-step-label-active { color: #0f172a; }
.ot-step-desc { font-size: 10px; color: #cbd5e1; text-align: center; margin-top: 2px; line-height: 1.4; }

/* Cancelled state */
.ot-cancelled { background: #fef2f2; border: 1px solid #fecaca; border-radius: 16px; padding: 20px 24px; display: flex; align-items: center; gap: 14px; margin-bottom: 24px; }
.ot-cancelled-icon { width: 44px; height: 44px; border-radius: 50%; background: #fee2e2; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
.ot-cancelled-title { font-size: 15px; font-weight: 700; color: #dc2626; }
.ot-cancelled-sub   { font-size: 13px; color: #f87171; margin-top: 2px; }

/* Order details */
.ot-card { background: #fff; border: 1px solid #f1f5f9; border-radius: 20px; overflow: hidden; margin-bottom: 20px; }
.ot-card-header { padding: 16px 20px; border-bottom: 1px solid #f8fafc; }
.ot-card-title { font-size: 13px; font-weight: 700; color: #0f172a; }

/* Items */
.ot-item { display: flex; align-items: center; gap: 14px; padding: 14px 20px; border-bottom: 1px solid #f8fafc; }
.ot-item:last-child { border-bottom: none; }
.ot-item-img { width: 56px; height: 68px; border-radius: 10px; overflow: hidden; background: #f1f5f9; flex-shrink: 0; }
.ot-item-img img { width: 100%; height: 100%; object-fit: cover; }
.ot-item-name { font-size: 14px; font-weight: 600; color: #0f172a; text-decoration: none; transition: color 0.2s; }
.ot-item-name:hover { color: #0ea5e9; }
.ot-item-qty  { font-size: 12px; color: #94a3b8; margin-top: 3px; }
.ot-item-price { margin-left: auto; font-size: 15px; font-weight: 700; color: #0f172a; flex-shrink: 0; }

/* Summary */
.ot-summary { padding: 16px 20px; display: flex; flex-direction: column; gap: 8px; }
.ot-summary-row { display: flex; justify-content: space-between; font-size: 13px; color: #64748b; }
.ot-summary-total { display: flex; justify-content: space-between; font-size: 16px; font-weight: 700; color: #0f172a; padding-top: 10px; border-top: 1px solid #f1f5f9; }

/* Info grid */
.ot-info-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin-bottom: 20px; }
.ot-info-card { background: #fff; border: 1px solid #f1f5f9; border-radius: 16px; padding: 18px 20px; }
.ot-info-label { font-size: 10px; font-weight: 600; letter-spacing: 0.1em; text-transform: uppercase; color: #94a3b8; margin-bottom: 8px; }
.ot-info-value { font-size: 13px; font-weight: 600; color: #0f172a; }
.ot-info-sub   { font-size: 12px; color: #94a3b8; margin-top: 2px; }

/* Refresh */
.ot-refresh { display: flex; align-items: center; gap: 6px; font-size: 11px; color: #94a3b8; cursor: pointer; background: none; border: none; font-family: 'Sora', sans-serif; padding: 0; transition: color 0.2s; }
.ot-refresh:hover { color: #0ea5e9; }
.ot-refresh-spin { animation: otSpin 1s linear infinite; }

@keyframes otFadeUp { from { opacity: 0; transform: translateY(12px); } to { opacity: 1; transform: translateY(0); } }
@keyframes otSpin   { to { transform: rotate(360deg); } }

.ot-root > * { animation: otFadeUp 0.35s ease both; }

@media (max-width: 600px) {
  .ot-root { padding: 20px 16px 60px; }
  .ot-info-grid { grid-template-columns: 1fr; }
  .ot-step-desc { display: none; }
}
`;

export function OrderTrackingClient({ order: initialOrder }: { order: Order }) {
  const [order, setOrder] = useState(initialOrder);
  const [refreshing, setRefreshing] = useState(false);

  // Poll every 10 seconds for status updates
  useEffect(() => {
    const interval = setInterval(async () => {
      try {
        const res = await fetch("/api/account/orders");
        if (!res.ok) return;
        const data = await res.json();
        const updated = data.orders?.find((o: Order) => o.id === order.id);
        if (updated) setOrder(updated);
      } catch {}
    }, 10000);
    return () => clearInterval(interval);
  }, [order.id]);

  const handleRefresh = async () => {
    setRefreshing(true);
    try {
      const res = await fetch("/api/account/orders");
      const data = await res.json();
      const updated = data.orders?.find((o: Order) => o.id === order.id);
      if (updated) setOrder(updated);
    } finally {
      setTimeout(() => setRefreshing(false), 600);
    }
  };

  const isCancelled = order.status === "CANCELLED";
  const currentStepIdx = STATUS_ORDER.indexOf(order.status);
  const statusCfg = STATUS_CONFIG[order.status] ?? STATUS_CONFIG.PENDING;
  const StatusIcon = statusCfg.icon;

  const subtotal = order.items.reduce(
    (s, i) => s + Number(i.price) * i.quantity,
    0,
  );
  const total = Number(order.total);
  const shipping = total - subtotal > 0 ? total - subtotal : 0;

  return (
    <>
      <style>{CSS}</style>
      <div className="ot-root">
        {/* Back */}
        <Link href="/account/orders" className="ot-back">
          <ArrowLeft size={14} /> Back to orders
        </Link>

        {/* Header */}
        <div className="ot-header">
          <div className="ot-header-top">
            <div>
              <h1 className="ot-order-id">
                Order #{order.id.slice(-8).toUpperCase()}
              </h1>
              <p className="ot-order-date">
                Placed on {formatDate(order.createdAt)}
              </p>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <button className="ot-refresh" onClick={handleRefresh}>
                <RefreshCw
                  size={12}
                  className={refreshing ? "ot-refresh-spin" : ""}
                />
                Refresh
              </button>
              <span
                className="ot-status-badge"
                style={{ color: statusCfg.color, background: statusCfg.bg }}
              >
                <StatusIcon size={13} /> {statusCfg.label}
              </span>
            </div>
          </div>
        </div>

        {/* Cancelled */}
        {isCancelled ? (
          <div className="ot-cancelled">
            <div className="ot-cancelled-icon">
              <XCircle size={22} color="#dc2626" />
            </div>
            <div>
              <p className="ot-cancelled-title">Order Cancelled</p>
              <p className="ot-cancelled-sub">
                This order has been cancelled. Contact support if you need help.
              </p>
            </div>
          </div>
        ) : (
          /* Timeline */
          <div className="ot-timeline">
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                marginBottom: 24,
              }}
            >
              <p className="ot-timeline-title" style={{ margin: 0 }}>
                Order Progress
              </p>
              <span style={{ fontSize: 11, color: "#94a3b8" }}>
                Auto-updates every 10s
              </span>
            </div>
            <div className="ot-steps">
              {STEPS.map((step, i) => {
                const isDone = currentStepIdx > i;
                const isCurrent = currentStepIdx === i;
                const isNext = currentStepIdx < i;
                const Icon = step.icon;

                return (
                  <div key={step.key} className="ot-step">
                    <div
                      className={`ot-step-connector ${isDone ? "ot-step-connector-active" : ""}`}
                    />
                    <div
                      className={`ot-step-icon ${isDone ? "ot-step-icon-done" : isCurrent ? "ot-step-icon-current" : "ot-step-icon-pending"}`}
                    >
                      <Icon size={16} />
                    </div>
                    <p
                      className={`ot-step-label ${!isNext ? "ot-step-label-active" : ""}`}
                    >
                      {step.label}
                    </p>
                    <p className="ot-step-desc">{step.desc}</p>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Info grid */}
        <div className="ot-info-grid">
          <div className="ot-info-card">
            <p className="ot-info-label">Order ID</p>
            <p className="ot-info-value">#{order.id.slice(-8).toUpperCase()}</p>
            {order.paymentId && (
              <p className="ot-info-sub">Pay: {order.paymentId.slice(-12)}</p>
            )}
          </div>
          <div className="ot-info-card">
            <p className="ot-info-label">Order Date</p>
            <p className="ot-info-value">{formatDateTime(order.createdAt)}</p>
          </div>
          <div className="ot-info-card">
            <p className="ot-info-label">Items</p>
            <p className="ot-info-value">
              {order.items.reduce((s, i) => s + i.quantity, 0)} items
            </p>
            <p className="ot-info-sub">
              {order.items.length} product{order.items.length !== 1 ? "s" : ""}
            </p>
          </div>
          <div className="ot-info-card">
            <p className="ot-info-label">Total</p>
            <p className="ot-info-value">${total.toFixed(2)}</p>
            <p className="ot-info-sub">incl. shipping</p>
          </div>
        </div>

        {/* Items */}
        <div className="ot-card">
          <div className="ot-card-header">
            <p className="ot-card-title">Items in this order</p>
          </div>
          {order.items.map((item) => (
            <div key={item.id} className="ot-item">
              <div className="ot-item-img">
                <img
                  src={item.product.images?.[0] ?? "/placeholder.jpg"}
                  alt={item.product.name}
                />
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <Link
                  href={`/products/${item.product.slug}`}
                  className="ot-item-name"
                >
                  {item.product.name}
                </Link>
                <p className="ot-item-qty">
                  Qty: {item.quantity} × ${Number(item.price).toFixed(2)}
                </p>
              </div>
              <span className="ot-item-price">
                ${(Number(item.price) * item.quantity).toFixed(2)}
              </span>
            </div>
          ))}

          {/* Summary */}
          <div className="ot-summary">
            <div className="ot-summary-row">
              <span>Subtotal</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            {shipping > 0 && (
              <div className="ot-summary-row">
                <span>Shipping</span>
                <span>${shipping.toFixed(2)}</span>
              </div>
            )}
            {shipping === 0 && (
              <div className="ot-summary-row">
                <span>Shipping</span>
                <span style={{ color: "#16a34a", fontWeight: 600 }}>Free</span>
              </div>
            )}
            <div className="ot-summary-total">
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </div>
          </div>
        </div>

        {/* Help */}
        <div style={{ textAlign: "center", padding: "8px 0" }}>
          <p
            style={{
              fontSize: 13,
              color: "#94a3b8",
              fontFamily: "Sora,sans-serif",
            }}
          >
            Need help with this order?{" "}
            <Link
              href="/contact"
              style={{
                color: "#0ea5e9",
                fontWeight: 600,
                textDecoration: "none",
              }}
            >
              Contact support
            </Link>
          </p>
        </div>
      </div>
    </>
  );
}
