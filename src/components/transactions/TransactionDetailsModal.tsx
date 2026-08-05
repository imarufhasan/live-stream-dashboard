import { X, CreditCard, User, Store, Receipt } from "lucide-react";
import type { Transaction } from "../../data/transactions";

type Props = {
  open: boolean;
  transaction: Transaction | null;
  onClose: () => void;
};

const statusStyles: Record<Transaction["status"], string> = {
  Success: "bg-green-900/40 text-green-400 border border-green-800",
  Cancelled: "bg-red-900/40 text-red-400 border border-red-800",
  Processing: "bg-blue-900/40 text-blue-400 border border-blue-800",
};

export default function TransactionDetailsModal({
  open,
  transaction,
  onClose,
}: Props) {
  if (!open || !transaction) return null;

  return (
    <div
      className="
fixed
inset-0
z-50
flex
items-center
justify-center
bg-black/70
p-5
"
      onClick={onClose}
    >
      <div
        className="
w-full
max-w-md
rounded-2xl
border
border-[#333]
bg-[#1a1a1a]
p-6
text-white
shadow-2xl
"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-start justify-between">
          <div>
            <h2 className="text-xl font-bold">Transaction Details</h2>
            <p className="mt-1 text-sm text-gray-400">
              {transaction.transactionId} · {transaction.orderId}
            </p>
          </div>

          <button
            onClick={onClose}
            className="rounded-full p-1.5 text-gray-400 hover:bg-[#2a2a2a] hover:text-white"
          >
            <X size={20} />
          </button>
        </div>

        {/* Stripe code + status */}
        <div className="mt-5 flex items-center justify-between rounded-xl border border-[#333] bg-[#111] p-4">
          <div>
            <p className="text-xs tracking-wide text-gray-500">
              STRIPE CHARGE CODE
            </p>
            <p className="mt-1 font-mono text-sm text-gray-200">
              {transaction.stripeCode}
            </p>
          </div>

          <span
            className={`rounded-full px-3 py-1.5 text-xs font-semibold ${
              statusStyles[transaction.status]
            }`}
          >
            {transaction.status}
          </span>
        </div>

        {/* Financial breakdown */}
        <div className="mt-4 rounded-xl border border-[#333] p-4">
          <div className="flex items-center gap-2">
            <Receipt size={16} className="text-gray-400" />
            <h3 className="text-sm font-semibold text-gray-200">
              Financial Breakdown
            </h3>
          </div>

          <Row
            label="Product Subtotal"
            value={`$${transaction.subtotal.toFixed(2)}`}
          />
          <Row
            label="Platform Fee"
            value={`$${transaction.platformFee.toFixed(2)}`}
          />
          <Row
            label="Shipping Fee (insured)"
            value={`$${transaction.shippingFee.toFixed(2)}`}
          />

          <hr className="my-4 border-[#333]" />

          <div className="flex items-center justify-between">
            <span className="text-base text-gray-300">Total</span>
            <b className="text-xl">${transaction.amount.toFixed(2)}</b>
          </div>
        </div>

        {/* Payment method */}
        <div className="mt-4 rounded-xl border border-[#333] p-4">
          <div className="flex items-center gap-2">
            <CreditCard size={16} className="text-gray-400" />
            <h3 className="text-sm font-semibold text-gray-200">
              Payment Method
            </h3>
          </div>

          <p className="mt-3 text-sm text-gray-200">
            {transaction.paymentMethod} ending in {transaction.card}
          </p>
          <p className="mt-1 text-xs text-gray-500">
            Expires {transaction.expiry}
          </p>
        </div>

        {/* Buyer / Seller */}
        <div className="mt-4 grid grid-cols-2 gap-3">
          <Card
            icon={<User size={14} />}
            title="Buyer"
            value={transaction.buyer}
          />
          <Card
            icon={<Store size={14} />}
            title="Seller"
            value={transaction.seller}
          />
        </div>

        <button
          className="
mt-6
w-full
rounded-full
bg-red-900
py-3
font-semibold
transition
hover:bg-red-800
"
        >
          Export Receipt
        </button>
      </div>
    </div>
  );
}

type RowProps = {
  label: string;
  value: string | number;
};

function Row({ label, value }: RowProps) {
  return (
    <div className="mt-3 flex justify-between text-sm text-gray-300">
      <span>{label}</span>
      <span>{value}</span>
    </div>
  );
}

type CardProps = {
  icon: React.ReactNode;
  title: string;
  value: string;
};

function Card({ icon, title, value }: CardProps) {
  return (
    <div className="rounded-xl border border-[#333] p-4">
      <div className="flex items-center gap-2 text-gray-400">
        {icon}
        <p className="text-xs">{title}</p>
      </div>
      <p className="mt-2 text-sm font-medium text-gray-100">{value}</p>
    </div>
  );
}
