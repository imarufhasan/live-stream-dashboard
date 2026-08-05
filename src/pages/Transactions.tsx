import { Eye } from "lucide-react";
import { useState } from "react";

import { transactions, payoutRequests } from "../data/transactions";
import type { Transaction } from "../data/transactions";

import TransactionDetailsModal from "../components/transactions/TransactionDetailsModal";

const PER_PAGE = 5;

export default function Transactions() {
  const [tab, setTab] = useState<"transaction" | "payout">("transaction");
  const [selected, setSelected] = useState<Transaction | null>(null);
  const [txPage, setTxPage] = useState(1);
  const [payoutPage, setPayoutPage] = useState(1);

  const page = tab === "transaction" ? txPage : payoutPage;
  const setPage = tab === "transaction" ? setTxPage : setPayoutPage;

  const data = tab === "transaction" ? transactions : payoutRequests;
  const totalPages = Math.max(1, Math.ceil(data.length / PER_PAGE));
  const rows = data.slice((page - 1) * PER_PAGE, page * PER_PAGE);

  const statusStyle = (status: string) => {
    if (status === "Success") return "bg-green-900/40 text-green-400";
    if (status === "Cancelled") return "bg-red-900/40 text-red-400";
    return "bg-blue-900/40 text-blue-400";
  };

  return (
    <div className="min-h-screen bg-black p-5 text-white">
      <h1 className="text-xl font-semibold mb-5">Transaction & Payouts</h1>

      <div className="grid grid-cols-3 gap-5">
        <Card title="Total volume" value="$1000" />
        <Card title="Platform Commission" value="500" />
        <Card title="Pending Payouts" value="20" />
      </div>

      <div className="mt-6 rounded-xl border border-[#444] bg-[#171717] p-3">
        <div className="flex gap-3 mb-4">
          <button
            onClick={() => setTab("transaction")}
            className={`rounded-full px-4 py-2 transition ${
              tab === "transaction"
                ? "bg-red-900 text-white"
                : "bg-[#333] text-[#aaa] hover:text-white"
            }`}
          >
            Platform Transactions
          </button>

          <button
            onClick={() => setTab("payout")}
            className={`rounded-full px-4 py-2 transition ${
              tab === "payout"
                ? "bg-red-900 text-white"
                : "bg-[#333] text-[#aaa] hover:text-white"
            }`}
          >
            Payout Request
          </button>
        </div>

        <table className="w-full text-sm">
          <thead>
            {tab === "transaction" ? (
              <tr className="bg-[#2a2a2a] text-gray-300">
                <th className="p-3 text-left font-medium">Transaction Id</th>
                <th className="p-3 text-left font-medium">Order ID</th>
                <th className="p-3 text-left font-medium">Buyer</th>
                <th className="p-3 text-left font-medium">Seller</th>
                <th className="p-3 text-left font-medium">Total Amount</th>
                <th className="p-3 text-left font-medium">Status</th>
                <th className="p-3 text-left font-medium">Action</th>
              </tr>
            ) : (
              <tr className="bg-[#2a2a2a] text-gray-300">
                <th className="p-3 text-left font-medium">Request ID</th>
                <th className="p-3 text-left font-medium">Seller</th>
                <th className="p-3 text-left font-medium">Amount Requested</th>
                <th className="p-3 text-left font-medium">Bank Info</th>
                <th className="p-3 text-left font-medium">Action</th>
              </tr>
            )}
          </thead>

          <tbody>
            {tab === "transaction"
              ? (rows as Transaction[]).map((item) => (
                  <tr key={item.id} className="border-t border-[#333]">
                    <td className="p-3 text-sm">{item.transactionId}</td>
                    <td className="p-3 text-sm">{item.orderId}</td>
                    <td className="p-3 text-sm">{item.buyer}</td>
                    <td className="p-3 text-sm">{item.seller}</td>
                    <td className="p-3 text-sm">${item.amount.toFixed(2)}</td>
                    <td className="p-3 text-sm">
                      <span
                        className={`rounded px-2 py-1 text-xs ${statusStyle(
                          item.status,
                        )}`}
                      >
                        {item.status}
                      </span>
                    </td>
                    <td className="p-3">
                      <button
                        onClick={() => setSelected(item)}
                        className="text-gray-300 hover:text-white"
                      >
                        <Eye size={18} />
                      </button>
                    </td>
                  </tr>
                ))
              : (rows as (typeof payoutRequests)[number][]).map((item) => (
                  <tr key={item.id} className="border-t border-[#333]">
                    <td className="p-3">{item.requestId}</td>
                    <td className="p-3">{item.seller}</td>
                    <td className="p-3">${item.amount.toFixed(2)}</td>
                    <td className="p-3">
                      <div>{item.bankName}</div>
                      <div className="text-gray-400">{item.bankAccount}</div>
                    </td>
                    <td className="p-3">
                      <div className="flex gap-2">
                        <button className="rounded-full border border-[#666] px-4 py-1.5 text-sm hover:bg-[#222]">
                          Reject
                        </button>
                        <button className="rounded-full bg-red-900 px-4 py-1.5 text-sm hover:bg-red-800">
                          Approve
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
          </tbody>
        </table>

        {/* Pagination */}
        <div className="mt-5 flex items-center justify-between px-1">
          <p className="text-xs text-gray-400">
            Showing {(page - 1) * PER_PAGE + 1}
            {"-"}
            {Math.min(page * PER_PAGE, data.length)} of {data.length}
          </p>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setPage(Math.max(1, page - 1))}
              disabled={page === 1}
              className="rounded-md border border-[#444] px-3 py-1.5 text-sm text-gray-300 disabled:opacity-40 hover:bg-[#222]"
            >
              Prev
            </button>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
              <button
                key={p}
                onClick={() => setPage(p)}
                className={`h-8 w-8 rounded-md text-sm transition ${
                  p === page
                    ? "bg-red-900 text-white"
                    : "text-gray-400 hover:bg-[#222] hover:text-white"
                }`}
              >
                {p}
              </button>
            ))}

            <button
              onClick={() => setPage(Math.min(totalPages, page + 1))}
              disabled={page === totalPages}
              className="rounded-md border border-[#444] px-3 py-1.5 text-sm text-gray-300 disabled:opacity-40 hover:bg-[#222]"
            >
              Next
            </button>
          </div>
        </div>
      </div>

      <TransactionDetailsModal
        open={!!selected}
        transaction={selected}
        onClose={() => setSelected(null)}
      />
    </div>
  );
}

type CardProps = {
  title: string;
  value: string | number;
};

function Card({ title, value }: CardProps) {
  return (
    <div className="rounded-xl border border-[#444] bg-[#171717] p-5">
      <p className="text-gray-400">{title}</p>
      <h2 className="text-2xl mt-3">{value}</h2>
    </div>
  );
}
