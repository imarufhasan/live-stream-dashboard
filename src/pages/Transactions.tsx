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
    if (status === "Success") {
      return "bg-green-900/40 text-green-400";
    }

    if (status === "Cancelled") {
      return "bg-red-900/40 text-red-400";
    }

    return "bg-blue-900/40 text-blue-400";
  };

  const handleTabChange = (newTab: "transaction" | "payout") => {
    setTab(newTab);
  };

  const handlePrevious = () => {
    setPage((prev) => Math.max(1, prev - 1));
  };

  const handleNext = () => {
    setPage((prev) => Math.min(totalPages, prev + 1));
  };

  return (
    <div className="w-full min-w-0 text-white">
      {/* ========================================
          Header
      ======================================== */}

      <div className="mb-5">
        <h1 className="text-2xl font-semibold sm:text-3xl">
          Transaction & Payouts
        </h1>
      </div>

      {/* ========================================
          Stats Cards
      ======================================== */}

      <div
        className="
          grid
          grid-cols-1
          gap-3
          sm:grid-cols-2
          lg:grid-cols-3
          lg:gap-5
        "
      >
        <Card title="Total Volume" value="$1000" />

        <Card title="Platform Commission" value="500" />

        <Card title="Pending Payouts" value="20" />
      </div>

      {/* ========================================
          Main Content
      ======================================== */}

      <div
        className="
          mt-5
          rounded-xl
          border
          border-[#444]
          bg-[#171717]
          p-3
          sm:mt-6
          sm:p-4
        "
      >
        {/* ========================================
            Tabs
        ======================================== */}

        <div
          className="
            mb-4
            flex
            w-full
            gap-2
            overflow-x-auto
            pb-1
            sm:gap-3
          "
        >
          <button
            type="button"
            onClick={() => handleTabChange("transaction")}
            className={`
              shrink-0
              rounded-full
              px-4
              py-2
              text-sm
              transition
              ${
                tab === "transaction"
                  ? "bg-red-900 text-white"
                  : "bg-[#333] text-[#aaa] hover:text-white"
              }
            `}
          >
            Platform Transactions
          </button>

          <button
            type="button"
            onClick={() => handleTabChange("payout")}
            className={`
              shrink-0
              rounded-full
              px-4
              py-2
              text-sm
              transition
              ${
                tab === "payout"
                  ? "bg-red-900 text-white"
                  : "bg-[#333] text-[#aaa] hover:text-white"
              }
            `}
          >
            Payout Request
          </button>
        </div>

        {/* ========================================
            Desktop Transaction Table
        ======================================== */}

        {tab === "transaction" && (
          <div className="hidden overflow-hidden rounded-lg lg:block">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-[#2a2a2a] text-gray-300">
                  <th className="p-3 text-left font-medium">Transaction Id</th>

                  <th className="p-3 text-left font-medium">Order ID</th>

                  <th className="p-3 text-left font-medium">Buyer</th>

                  <th className="p-3 text-left font-medium">Seller</th>

                  <th className="p-3 text-left font-medium">Total Amount</th>

                  <th className="p-3 text-left font-medium">Status</th>

                  <th className="p-3 text-left font-medium">Action</th>
                </tr>
              </thead>

              <tbody>
                {(rows as Transaction[]).length > 0 ? (
                  (rows as Transaction[]).map((item) => (
                    <tr
                      key={item.id}
                      className="
                        border-t
                        border-[#333]
                        transition
                        hover:bg-[#1e1e1e]
                      "
                    >
                      <td className="p-3">{item.transactionId}</td>

                      <td className="p-3">{item.orderId}</td>

                      <td className="p-3">{item.buyer}</td>

                      <td className="p-3">{item.seller}</td>

                      <td className="p-3">${item.amount.toFixed(2)}</td>

                      <td className="p-3">
                        <span
                          className={`
                            inline-block
                            rounded
                            px-2
                            py-1
                            text-xs
                            ${statusStyle(item.status)}
                          `}
                        >
                          {item.status}
                        </span>
                      </td>

                      <td className="p-3">
                        <button
                          type="button"
                          onClick={() => setSelected(item)}
                          className="
                            rounded-lg
                            bg-[#252525]
                            p-2
                            text-gray-300
                            transition
                            hover:bg-blue-600
                            hover:text-white
                          "
                          title="View transaction"
                        >
                          <Eye size={18} />
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan={7}
                      className="
                        py-16
                        text-center
                        text-gray-400
                      "
                    >
                      No transactions found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}

        {/* ========================================
            Desktop Payout Table
        ======================================== */}

        {tab === "payout" && (
          <div className="hidden overflow-hidden rounded-lg lg:block">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-[#2a2a2a] text-gray-300">
                  <th className="p-3 text-left font-medium">Request ID</th>

                  <th className="p-3 text-left font-medium">Seller</th>

                  <th className="p-3 text-left font-medium">
                    Amount Requested
                  </th>

                  <th className="p-3 text-left font-medium">Bank Info</th>

                  <th className="p-3 text-left font-medium">Action</th>
                </tr>
              </thead>

              <tbody>
                {(rows as (typeof payoutRequests)[number][]).length > 0 ? (
                  (rows as (typeof payoutRequests)[number][]).map((item) => (
                    <tr
                      key={item.id}
                      className="
                        border-t
                        border-[#333]
                        transition
                        hover:bg-[#1e1e1e]
                      "
                    >
                      <td className="p-3">{item.requestId}</td>

                      <td className="p-3">{item.seller}</td>

                      <td className="p-3">${item.amount.toFixed(2)}</td>

                      <td className="p-3">
                        <div>{item.bankName}</div>

                        <div className="text-gray-400">{item.bankAccount}</div>
                      </td>

                      <td className="p-3">
                        <div className="flex gap-2">
                          <button
                            type="button"
                            className="
                              rounded-full
                              border
                              border-[#666]
                              px-4
                              py-1.5
                              text-sm
                              transition
                              hover:bg-[#222]
                            "
                          >
                            Reject
                          </button>

                          <button
                            type="button"
                            className="
                              rounded-full
                              bg-red-900
                              px-4
                              py-1.5
                              text-sm
                              transition
                              hover:bg-red-800
                            "
                          >
                            Approve
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan={5}
                      className="
                        py-16
                        text-center
                        text-gray-400
                      "
                    >
                      No payout requests found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}

        {/* ========================================
            Mobile / Tablet Transaction Cards
        ======================================== */}

        {tab === "transaction" && (
          <div className="space-y-3 lg:hidden">
            {(rows as Transaction[]).length > 0 ? (
              (rows as Transaction[]).map((item) => (
                <div
                  key={item.id}
                  className="
                    rounded-xl
                    border
                    border-[#333]
                    bg-[#1d1d1d]
                    p-4
                  "
                >
                  {/* Header */}
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <p className="text-xs text-gray-500">Transaction ID</p>

                      <p className="mt-1 break-all text-sm font-medium text-white">
                        {item.transactionId}
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={() => setSelected(item)}
                      className="
                        shrink-0
                        rounded-lg
                        bg-[#252525]
                        p-2.5
                        text-gray-300
                        transition
                        hover:bg-blue-600
                        hover:text-white
                      "
                      title="View transaction"
                    >
                      <Eye size={18} />
                    </button>
                  </div>

                  {/* Details */}
                  <div
                    className="
                      mt-4
                      space-y-3
                      border-t
                      border-[#333]
                      pt-4
                    "
                  >
                    {/* Order ID */}
                    <div className="flex items-start justify-between gap-4">
                      <span className="shrink-0 text-xs text-gray-500">
                        Order ID
                      </span>

                      <span className="break-all text-right text-sm text-gray-300">
                        {item.orderId}
                      </span>
                    </div>

                    {/* Buyer */}
                    <div className="flex items-start justify-between gap-4">
                      <span className="shrink-0 text-xs text-gray-500">
                        Buyer
                      </span>

                      <span className="text-right text-sm text-gray-300">
                        {item.buyer}
                      </span>
                    </div>

                    {/* Seller */}
                    <div className="flex items-start justify-between gap-4">
                      <span className="shrink-0 text-xs text-gray-500">
                        Seller
                      </span>

                      <span className="text-right text-sm text-gray-300">
                        {item.seller}
                      </span>
                    </div>

                    {/* Amount */}
                    <div className="flex items-center justify-between gap-4">
                      <span className="text-xs text-gray-500">
                        Total Amount
                      </span>

                      <span className="text-sm font-semibold text-white">
                        ${item.amount.toFixed(2)}
                      </span>
                    </div>

                    {/* Status */}
                    <div className="flex items-center justify-between gap-4">
                      <span className="text-xs text-gray-500">Status</span>

                      <span
                        className={`
                          rounded
                          px-2
                          py-1
                          text-xs
                          ${statusStyle(item.status)}
                        `}
                      >
                        {item.status}
                      </span>
                    </div>
                  </div>

                  {/* View Button */}
                  <button
                    type="button"
                    onClick={() => setSelected(item)}
                    className="
                      mt-4
                      flex
                      w-full
                      items-center
                      justify-center
                      gap-2
                      rounded-lg
                      bg-[#252525]
                      py-2.5
                      text-sm
                      font-medium
                      text-gray-300
                      transition
                      hover:bg-blue-600
                      hover:text-white
                    "
                  >
                    <Eye size={17} />
                    View Transaction
                  </button>
                </div>
              ))
            ) : (
              <div
                className="
                  rounded-xl
                  border
                  border-[#333]
                  bg-[#1d1d1d]
                  py-16
                  text-center
                  text-gray-400
                "
              >
                No transactions found
              </div>
            )}
          </div>
        )}

        {/* ========================================
            Mobile / Tablet Payout Cards
        ======================================== */}

        {tab === "payout" && (
          <div className="space-y-3 lg:hidden">
            {(rows as (typeof payoutRequests)[number][]).length > 0 ? (
              (rows as (typeof payoutRequests)[number][]).map((item) => (
                <div
                  key={item.id}
                  className="
                    rounded-xl
                    border
                    border-[#333]
                    bg-[#1d1d1d]
                    p-4
                  "
                >
                  {/* Header */}
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <p className="text-xs text-gray-500">Request ID</p>

                      <p className="mt-1 break-all text-sm font-medium text-white">
                        {item.requestId}
                      </p>
                    </div>

                    <span className="shrink-0 text-lg font-semibold text-white">
                      ${item.amount.toFixed(2)}
                    </span>
                  </div>

                  {/* Details */}
                  <div
                    className="
                      mt-4
                      space-y-3
                      border-t
                      border-[#333]
                      pt-4
                    "
                  >
                    {/* Seller */}
                    <div className="flex items-start justify-between gap-4">
                      <span className="shrink-0 text-xs text-gray-500">
                        Seller
                      </span>

                      <span className="text-right text-sm text-gray-300">
                        {item.seller}
                      </span>
                    </div>

                    {/* Amount */}
                    <div className="flex items-center justify-between gap-4">
                      <span className="text-xs text-gray-500">
                        Amount Requested
                      </span>

                      <span className="text-sm font-semibold text-white">
                        ${item.amount.toFixed(2)}
                      </span>
                    </div>

                    {/* Bank Name */}
                    <div className="flex items-start justify-between gap-4">
                      <span className="shrink-0 text-xs text-gray-500">
                        Bank
                      </span>

                      <span className="text-right text-sm text-gray-300">
                        {item.bankName}
                      </span>
                    </div>

                    {/* Account */}
                    <div className="flex items-start justify-between gap-4">
                      <span className="shrink-0 text-xs text-gray-500">
                        Account
                      </span>

                      <span
                        className="
                          max-w-[65%]
                          break-all
                          text-right
                          text-sm
                          text-gray-400
                        "
                      >
                        {item.bankAccount}
                      </span>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="mt-4 flex gap-2">
                    <button
                      type="button"
                      className="
                        flex
                        flex-1
                        items-center
                        justify-center
                        rounded-full
                        border
                        border-[#666]
                        px-4
                        py-2.5
                        text-sm
                        transition
                        hover:bg-[#333]
                      "
                    >
                      Reject
                    </button>

                    <button
                      type="button"
                      className="
                        flex
                        flex-1
                        items-center
                        justify-center
                        rounded-full
                        bg-red-900
                        px-4
                        py-2.5
                        text-sm
                        transition
                        hover:bg-red-800
                      "
                    >
                      Approve
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div
                className="
                  rounded-xl
                  border
                  border-[#333]
                  bg-[#1d1d1d]
                  py-16
                  text-center
                  text-gray-400
                "
              >
                No payout requests found
              </div>
            )}
          </div>
        )}

        {/* ========================================
            Pagination
        ======================================== */}

        {data.length > 0 && (
          <>
            {/* Desktop Pagination */}
            <div
              className="
                mt-5
                hidden
                items-center
                justify-between
                px-1
                lg:flex
              "
            >
              <p className="text-xs text-gray-400">
                Showing{" "}
                <span className="text-white">{(page - 1) * PER_PAGE + 1}</span>-
                <span className="text-white">
                  {Math.min(page * PER_PAGE, data.length)}
                </span>{" "}
                of <span className="text-white">{data.length}</span>
              </p>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handlePrevious}
                  disabled={page === 1}
                  className="
                    rounded-md
                    border
                    border-[#444]
                    px-3
                    py-1.5
                    text-sm
                    text-gray-300
                    transition
                    hover:bg-[#222]
                    disabled:cursor-not-allowed
                    disabled:opacity-40
                  "
                >
                  Prev
                </button>

                {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                  (p) => (
                    <button
                      type="button"
                      key={p}
                      onClick={() => setPage(p)}
                      className={`
                      h-8
                      w-8
                      rounded-md
                      text-sm
                      transition
                      ${
                        p === page
                          ? "bg-red-900 text-white"
                          : "text-gray-400 hover:bg-[#222] hover:text-white"
                      }
                    `}
                    >
                      {p}
                    </button>
                  ),
                )}

                <button
                  type="button"
                  onClick={handleNext}
                  disabled={page === totalPages}
                  className="
                    rounded-md
                    border
                    border-[#444]
                    px-3
                    py-1.5
                    text-sm
                    text-gray-300
                    transition
                    hover:bg-[#222]
                    disabled:cursor-not-allowed
                    disabled:opacity-40
                  "
                >
                  Next
                </button>
              </div>
            </div>

            {/* Mobile Pagination */}
            <div
              className="
                mt-4
                flex
                items-center
                justify-between
                gap-3
                rounded-xl
                border
                border-[#333]
                bg-[#1d1d1d]
                p-3
                lg:hidden
              "
            >
              <button
                type="button"
                onClick={handlePrevious}
                disabled={page === 1}
                className="
                  rounded-lg
                  bg-[#333]
                  px-3
                  py-2
                  text-xs
                  text-white
                  transition
                  hover:bg-[#444]
                  disabled:cursor-not-allowed
                  disabled:opacity-40
                "
              >
                Prev
              </button>

              <p className="whitespace-nowrap text-xs text-gray-400">
                Page <span className="font-medium text-white">{page}</span> of{" "}
                <span className="font-medium text-white">{totalPages}</span>
              </p>

              <button
                type="button"
                onClick={handleNext}
                disabled={page === totalPages}
                className="
                  rounded-lg
                  bg-[#333]
                  px-3
                  py-2
                  text-xs
                  text-white
                  transition
                  hover:bg-[#444]
                  disabled:cursor-not-allowed
                  disabled:opacity-40
                "
              >
                Next
              </button>
            </div>
          </>
        )}
      </div>

      {/* ========================================
          Transaction Details Modal
      ======================================== */}

      <TransactionDetailsModal
        open={!!selected}
        transaction={selected}
        onClose={() => setSelected(null)}
      />
    </div>
  );
}

/* ========================================
   Stats Card
======================================== */

type CardProps = {
  title: string;
  value: string | number;
};

function Card({ title, value }: CardProps) {
  return (
    <div
      className="
        rounded-xl
        border
        border-[#444]
        bg-[#171717]
        p-4
        sm:p-5
      "
    >
      <p className="text-sm text-gray-400 sm:text-base">{title}</p>

      <h2 className="mt-2 text-2xl font-semibold sm:mt-3 sm:text-3xl">
        {value}
      </h2>
    </div>
  );
}
