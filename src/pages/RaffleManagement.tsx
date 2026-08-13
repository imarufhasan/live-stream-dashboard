import { useEffect, useMemo, useState } from "react";
import { Plus, Pencil, Sparkles, Truck, BellRing } from "lucide-react";

import { currentRaffle as initialRaffle, pastWinners } from "../data/raffle";

import type { PastWinnerStatus } from "../data/raffle";

import CreateRaffleModal from "../components/raffle/CreateRaffleModal";

/* ========================================
   Countdown Hook
======================================== */

function useCountdown(targetIso: string) {
  const [remaining, setRemaining] = useState(() =>
    Math.max(0, new Date(targetIso).getTime() - Date.now()),
  );

  useEffect(() => {
    const id = setInterval(() => {
      setRemaining(Math.max(0, new Date(targetIso).getTime() - Date.now()));
    }, 1000);

    return () => clearInterval(id);
  }, [targetIso]);

  const totalSeconds = Math.floor(remaining / 1000);

  const hh = String(Math.floor(totalSeconds / 3600)).padStart(2, "0");

  const mm = String(Math.floor((totalSeconds % 3600) / 60)).padStart(2, "0");

  const ss = String(totalSeconds % 60).padStart(2, "0");

  return {
    label: `${hh}:${mm}:${ss}`,
    ended: remaining <= 0,
  };
}

/* ========================================
   Status Styles
======================================== */

const statusStyle: Record<PastWinnerStatus, string> = {
  Delivered: "bg-green-900/40 text-green-400",
  Shipped: "bg-blue-900/40 text-blue-400",
  Pending: "bg-yellow-900/40 text-yellow-400",
};

/* ========================================
   Component
======================================== */

export default function RaffleManagement() {
  const [modalOpen, setModalOpen] = useState(false);

  const [raffle, setRaffle] = useState(initialRaffle);

  const [drawn, setDrawn] = useState(false);

  const [drawing, setDrawing] = useState(false);

  /* ========================================
     Past Winners Pagination
  ======================================== */

  const WINNERS_PER_PAGE = 5;

  const [winnerPage, setWinnerPage] = useState(1);

  const totalWinnerPages = Math.max(
    1,
    Math.ceil(pastWinners.length / WINNERS_PER_PAGE),
  );

  const currentWinners = pastWinners.slice(
    (winnerPage - 1) * WINNERS_PER_PAGE,
    winnerPage * WINNERS_PER_PAGE,
  );

  /* ========================================
     Countdown
  ======================================== */

  const countdown = useCountdown(raffle.drawAt);

  /* ========================================
     Progress
  ======================================== */

  const progressPct = useMemo(
    () =>
      Math.min(100, Math.round((raffle.ticketsSold / raffle.maxTickets) * 100)),
    [raffle.ticketsSold, raffle.maxTickets],
  );

  /* ========================================
     Draw Winner
  ======================================== */

  const handleDrawWinner = () => {
    setDrawing(true);

    // simulate the VRF draw taking a moment
    setTimeout(() => {
      setDrawn(true);
      setDrawing(false);
    }, 900);
  };

  /* ========================================
     Pagination
  ======================================== */

  const handlePreviousPage = () => {
    setWinnerPage((prev) => Math.max(1, prev - 1));
  };

  const handleNextPage = () => {
    setWinnerPage((prev) => Math.min(totalWinnerPages, prev + 1));
  };

  return (
    <div className="w-full min-w-0 text-white">
      {/* ========================================
          Header
      ======================================== */}

      <div
        className="
          flex
          flex-col
          gap-4
          sm:flex-row
          sm:items-center
          sm:justify-between
        "
      >
        <h1 className="text-2xl font-semibold sm:text-3xl">
          Raffle Management
        </h1>

        <button
          type="button"
          onClick={() => setModalOpen(true)}
          className="
            flex
            w-full
            items-center
            justify-center
            gap-1.5
            rounded-full
            bg-red-900
            px-5
            py-2.5
            text-sm
            font-semibold
            transition
            hover:bg-red-800
            sm:w-auto
          "
        >
          <Plus size={16} />

          <span>Create New Raffle</span>
        </button>
      </div>

      {/* ========================================
          Main Content
      ======================================== */}

      <div
        className="
          mt-5
          grid
          grid-cols-1
          gap-5
          lg:grid-cols-[1.4fr_1fr]
        "
      >
        {/* ========================================
            Left: Prize Card
        ======================================== */}

        <div className="min-w-0">
          <img
            src={raffle.image}
            alt={raffle.title}
            className="
              h-52
              w-full
              rounded-xl
              object-cover
              sm:h-60
              lg:h-64
            "
          />

          {/* Title */}
          <div
            className="
              mt-4
              flex
              items-start
              justify-between
              gap-3
            "
          >
            <h2 className="min-w-0 wrap-break-word text-lg font-bold sm:text-xl">
              {raffle.title}
            </h2>

            <button
              type="button"
              className="
                shrink-0
                rounded-md
                p-1.5
                text-gray-400
                transition
                hover:bg-[#1e1e1e]
                hover:text-white
              "
            >
              <Pencil size={16} />
            </button>
          </div>

          {/* Description */}
          <p className="mt-2 text-sm leading-relaxed text-gray-400">
            {raffle.description}
          </p>

          {/* Ticket + Countdown */}
          {!drawn && (
            <div
              className="
                mt-5
                grid
                grid-cols-1
                gap-3
                sm:grid-cols-2
                sm:gap-4
              "
            >
              {/* Tickets */}
              <div
                className="
                  rounded-xl
                  border
                  border-[#333]
                  bg-[#141414]
                  p-4
                "
              >
                <p className="text-xs text-gray-500">Ticket Sold</p>

                <p className="mt-2 text-2xl font-bold">
                  {raffle.ticketsSold}

                  <span className="text-sm font-normal text-gray-500">
                    /{raffle.maxTickets}
                  </span>
                </p>

                <div
                  className="
                    mt-3
                    h-1.5
                    w-full
                    overflow-hidden
                    rounded-full
                    bg-[#2a2a2a]
                  "
                >
                  <div
                    className="
                      h-full
                      rounded-full
                      bg-red-700
                      transition-all
                    "
                    style={{
                      width: `${progressPct}%`,
                    }}
                  />
                </div>

                <p className="mt-2 text-xs text-gray-500">
                  {progressPct}% sold
                </p>
              </div>

              {/* Time */}
              <div
                className="
                  rounded-xl
                  border
                  border-[#333]
                  bg-[#141414]
                  p-4
                "
              >
                <p className="text-xs text-gray-500">Time Remaining</p>

                <p
                  className="
                    mt-2
                    break-all
                    text-2xl
                    font-bold
                    tabular-nums
                  "
                >
                  {countdown.label}
                </p>
              </div>
            </div>
          )}
        </div>

        {/* ========================================
            Right: Winner Generation
        ======================================== */}

        <div
          className="
            min-w-0
            rounded-xl
            border
            border-[#333]
            bg-[#141414]
            p-4
            sm:p-5
          "
        >
          {/* Header */}
          <div className="flex items-start gap-3">
            <div
              className="
                flex
                h-9
                w-9
                shrink-0
                items-center
                justify-center
                rounded-full
                bg-red-900/30
              "
            >
              <Sparkles size={16} className="text-red-400" />
            </div>

            <div className="min-w-0">
              <h3 className="font-bold">
                {drawn ? "Winner Selected" : "Winner Generation"}
              </h3>

              <p className="mt-1 text-sm leading-relaxed text-gray-400">
                {drawn
                  ? `The verifiable random function has successfully identified a single ticket holder from ${raffle.totalEntries.toLocaleString()} entries.`
                  : "Provably fair random selection"}
              </p>
            </div>
          </div>

          {!drawn ? (
            <>
              {/* Raffle Status */}
              <div
                className="
                  mt-5
                  rounded-xl
                  border
                  border-[#333]
                  p-4
                "
              >
                <div
                  className="
                    flex
                    flex-col
                    gap-3
                    sm:flex-row
                    sm:items-center
                    sm:justify-between
                  "
                >
                  <span className="text-sm text-gray-300">Raffle Status</span>

                  <span
                    className="
                      w-fit
                      rounded-full
                      bg-yellow-900/40
                      px-3
                      py-1
                      text-xs
                      font-semibold
                      text-yellow-400
                    "
                  >
                    {countdown.ended ? "READY" : "AWAITING END"}
                  </span>
                </div>

                <p className="mt-2 text-xs leading-relaxed text-gray-500">
                  The drawing algorithm becomes active once the timer reaches
                  zero.
                </p>
              </div>

              {/* Draw Button */}
              <button
                type="button"
                onClick={handleDrawWinner}
                disabled={drawing}
                className="
                  mt-4
                  w-full
                  rounded-full
                  bg-red-900
                  px-6
                  py-3
                  text-sm
                  font-semibold
                  transition
                  hover:bg-red-800
                  disabled:cursor-not-allowed
                  disabled:opacity-60
                  sm:w-auto
                "
              >
                {drawing ? "Drawing…" : "Draw Winner"}
              </button>
            </>
          ) : (
            raffle.winner && (
              <>
                {/* Winner */}
                <div
                  className="
                    mt-5
                    flex
                    flex-col
                    gap-4
                    rounded-xl
                    border
                    border-[#333]
                    bg-[#1a1a1a]
                    p-4
                    sm:flex-row
                    sm:items-center
                    sm:justify-between
                  "
                >
                  <div className="flex min-w-0 items-center gap-3">
                    <img
                      src={raffle.winner.avatar}
                      alt={raffle.winner.name}
                      className="
                        h-10
                        w-10
                        shrink-0
                        rounded-full
                        object-cover
                      "
                    />

                    <div className="min-w-0">
                      <p className="truncate text-sm font-semibold">
                        {raffle.winner.name}
                      </p>

                      <p className="truncate text-xs text-gray-500">
                        {raffle.winner.email}
                      </p>
                    </div>
                  </div>

                  <span className="text-xs font-semibold text-gray-400">
                    Winner
                  </span>
                </div>

                {/* Winner Actions */}
                <div
                  className="
                    mt-4
                    flex
                    flex-col
                    gap-3
                    sm:flex-row
                  "
                >
                  <button
                    type="button"
                    className="
                      flex
                      flex-1
                      items-center
                      justify-center
                      gap-2
                      rounded-full
                      bg-red-900
                      px-4
                      py-2.5
                      text-sm
                      font-semibold
                      transition
                      hover:bg-red-800
                    "
                  >
                    <Truck size={15} />

                    <span>Generate Shipping Level</span>
                  </button>

                  <button
                    type="button"
                    className="
                      flex
                      flex-1
                      items-center
                      justify-center
                      gap-2
                      rounded-full
                      border
                      border-[#555]
                      px-4
                      py-2.5
                      text-sm
                      font-semibold
                      text-gray-200
                      transition
                      hover:bg-[#1e1e1e]
                    "
                  >
                    <BellRing size={15} />

                    <span>Notify Winner</span>
                  </button>
                </div>
              </>
            )
          )}
        </div>
      </div>

      {/* ========================================
          Past Winners
      ======================================== */}

      <div
        className="
          mt-5
          overflow-hidden
          rounded-xl
          border
          border-[#333]
        "
      >
        {/* Section Header */}
        <div className="bg-[#2a2a2a] px-4 py-3">
          <p className="text-sm font-semibold">Past Winners</p>
        </div>

        {/* ========================================
            Desktop Table
        ======================================== */}

        <div className="hidden lg:block">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-[#1c1c1c] text-gray-400">
                <th className="p-3 text-left font-medium">Name</th>

                <th className="p-3 text-left font-medium">Prize</th>

                <th className="p-3 text-left font-medium">Drawn Date</th>

                <th className="p-3 text-left font-medium">Status</th>
              </tr>
            </thead>

            <tbody>
              {currentWinners.length > 0 ? (
                currentWinners.map((w) => (
                  <tr
                    key={w.id}
                    className="
                      border-t
                      border-[#2a2a2a]
                      transition
                      hover:bg-[#1c1c1c]
                    "
                  >
                    <td className="p-3">{w.name}</td>

                    <td className="p-3 text-gray-300">{w.prize}</td>

                    <td className="p-3 text-gray-300">{w.drawnDate}</td>

                    <td className="p-3">
                      <span
                        className={`
                          inline-block
                          rounded
                          px-2
                          py-1
                          text-xs
                          ${statusStyle[w.status]}
                        `}
                      >
                        {w.status}
                      </span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={4}
                    className="
                      py-12
                      text-center
                      text-gray-500
                    "
                  >
                    No past winners found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* ========================================
            Mobile / Tablet Cards
        ======================================== */}

        <div className="space-y-3 bg-[#151515] p-3 lg:hidden">
          {currentWinners.length > 0 ? (
            currentWinners.map((w) => (
              <div
                key={w.id}
                className="
                  rounded-xl
                  border
                  border-[#333]
                  bg-[#1c1c1c]
                  p-4
                "
              >
                {/* Name */}
                <div
                  className="
                    flex
                    items-start
                    justify-between
                    gap-3
                  "
                >
                  <div className="min-w-0">
                    <p className="text-xs text-gray-500">Winner</p>

                    <p className="mt-1 wrap-break-word text-sm font-semibold text-white">
                      {w.name}
                    </p>
                  </div>

                  <span
                    className={`
                      shrink-0
                      rounded
                      px-2
                      py-1
                      text-xs
                      ${statusStyle[w.status]}
                    `}
                  >
                    {w.status}
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
                  {/* Prize */}
                  <div
                    className="
                      flex
                      items-start
                      justify-between
                      gap-4
                    "
                  >
                    <span className="shrink-0 text-xs text-gray-500">
                      Prize
                    </span>

                    <span className="wrap-break-word text-right text-sm text-gray-300">
                      {w.prize}
                    </span>
                  </div>

                  {/* Date */}
                  <div
                    className="
                      flex
                      items-start
                      justify-between
                      gap-4
                    "
                  >
                    <span className="shrink-0 text-xs text-gray-500">
                      Drawn Date
                    </span>

                    <span className="text-right text-sm text-gray-300">
                      {w.drawnDate}
                    </span>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="py-12 text-center text-gray-500">
              No past winners found
            </div>
          )}
        </div>

        {/* ========================================
            Pagination
        ======================================== */}

        {pastWinners.length > 0 && (
          <>
            {/* Desktop Pagination */}
            <div
              className="
                hidden
                items-center
                justify-between
                border-t
                border-[#333]
                bg-[#151515]
                px-4
                py-4
                lg:flex
              "
            >
              <p className="text-xs text-gray-400">
                Showing{" "}
                <span className="text-white">
                  {(winnerPage - 1) * WINNERS_PER_PAGE + 1}
                </span>
                -
                <span className="text-white">
                  {Math.min(winnerPage * WINNERS_PER_PAGE, pastWinners.length)}
                </span>{" "}
                of <span className="text-white">{pastWinners.length}</span>
              </p>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handlePreviousPage}
                  disabled={winnerPage === 1}
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

                {Array.from(
                  { length: totalWinnerPages },
                  (_, index) => index + 1,
                ).map((page) => (
                  <button
                    type="button"
                    key={page}
                    onClick={() => setWinnerPage(page)}
                    className={`
                      h-8
                      w-8
                      rounded-md
                      text-sm
                      transition
                      ${
                        winnerPage === page
                          ? "bg-red-900 text-white"
                          : "text-gray-400 hover:bg-[#222] hover:text-white"
                      }
                    `}
                  >
                    {page}
                  </button>
                ))}

                <button
                  type="button"
                  onClick={handleNextPage}
                  disabled={winnerPage === totalWinnerPages}
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
                flex
                items-center
                justify-between
                gap-3
                border-t
                border-[#333]
                bg-[#151515]
                p-3
                lg:hidden
              "
            >
              <button
                type="button"
                onClick={handlePreviousPage}
                disabled={winnerPage === 1}
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
                Page{" "}
                <span className="font-medium text-white">{winnerPage}</span> of{" "}
                <span className="font-medium text-white">
                  {totalWinnerPages}
                </span>
              </p>

              <button
                type="button"
                onClick={handleNextPage}
                disabled={winnerPage === totalWinnerPages}
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
          Create Raffle Modal
      ======================================== */}

      <CreateRaffleModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onCreate={(data) => {
          setRaffle((prev) => ({
            ...prev,
            title: data.name || prev.title,
            description: data.description || prev.description,
            maxTickets: data.maxTickets || prev.maxTickets,
            ticketsSold: 0,
            drawAt: data.drawDate
              ? new Date(
                  `${data.drawDate}T${data.drawTime || "18:00"}`,
                ).toISOString()
              : prev.drawAt,
            winner: null,
          }));

          setDrawn(false);
        }}
      />
    </div>
  );
}
