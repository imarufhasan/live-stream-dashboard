import { useEffect, useMemo, useState } from "react";
import { Plus, Pencil, Sparkles, Truck, BellRing } from "lucide-react";

import { currentRaffle as initialRaffle, pastWinners } from "../data/raffle";
import type { PastWinnerStatus } from "../data/raffle";
import CreateRaffleModal from "../components/raffle/CreateRaffleModal";

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

  return { label: `${hh}:${mm}:${ss}`, ended: remaining <= 0 };
}

const statusStyle: Record<PastWinnerStatus, string> = {
  Delivered: "bg-green-900/40 text-green-400",
  Shipped: "bg-blue-900/40 text-blue-400",
  Pending: "bg-yellow-900/40 text-yellow-400",
};

export default function RaffleManagement() {
  const [modalOpen, setModalOpen] = useState(false);
  const [raffle, setRaffle] = useState(initialRaffle);
  const [drawn, setDrawn] = useState(false);
  const [drawing, setDrawing] = useState(false);

  const countdown = useCountdown(raffle.drawAt);

  const progressPct = useMemo(
    () =>
      Math.min(100, Math.round((raffle.ticketsSold / raffle.maxTickets) * 100)),
    [raffle.ticketsSold, raffle.maxTickets],
  );

  const handleDrawWinner = () => {
    setDrawing(true);
    // simulate the VRF draw taking a moment
    setTimeout(() => {
      setDrawn(true);
      setDrawing(false);
    }, 900);
  };

  return (
    <div className="min-h-screen bg-black p-5 text-white">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold">Raffle Management</h1>

        <button
          onClick={() => setModalOpen(true)}
          className="flex items-center gap-1.5 rounded-full bg-red-900 px-5 py-2.5 text-sm font-semibold transition hover:bg-red-800"
        >
          <Plus size={16} />
          Create New Raffle
        </button>
      </div>

      {/* Main grid */}
      <div className="mt-5 grid grid-cols-1 gap-5 lg:grid-cols-[1.4fr_1fr]">
        {/* Left: prize card */}
        <div>
          <img
            src={raffle.image}
            alt={raffle.title}
            className="h-56 w-full rounded-xl object-cover lg:h-64"
          />

          <div className="mt-4 flex items-start justify-between">
            <h2 className="text-lg font-bold">{raffle.title}</h2>
            <button className="rounded-md p-1.5 text-gray-400 hover:bg-[#1e1e1e] hover:text-white">
              <Pencil size={16} />
            </button>
          </div>

          <p className="mt-2 text-sm leading-relaxed text-gray-400">
            {raffle.description}
          </p>

          {!drawn && (
            <div className="mt-5 grid grid-cols-2 gap-4">
              <div className="rounded-xl border border-[#333] bg-[#141414] p-4">
                <p className="text-xs text-gray-500">Ticket Sold</p>
                <p className="mt-2 text-2xl font-bold">
                  {raffle.ticketsSold}
                  <span className="text-sm font-normal text-gray-500">
                    /{raffle.maxTickets}
                  </span>
                </p>
                <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-[#2a2a2a]">
                  <div
                    className="h-full rounded-full bg-red-700"
                    style={{ width: `${progressPct}%` }}
                  />
                </div>
              </div>

              <div className="rounded-xl border border-[#333] bg-[#141414] p-4">
                <p className="text-xs text-gray-500">Time Remaining</p>
                <p className="mt-2 text-2xl font-bold tabular-nums">
                  {countdown.label}
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Right: winner generation / winner selected */}
        <div className="rounded-xl border border-[#333] bg-[#141414] p-5">
          <div className="flex items-start gap-3">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-red-900/30">
              <Sparkles size={16} className="text-red-400" />
            </div>
            <div>
              <h3 className="font-bold">
                {drawn ? "Winner Selected" : "Winner Generation"}
              </h3>
              <p className="mt-1 text-sm text-gray-400">
                {drawn
                  ? `The verifiable random function has successfully identified a single ticket holder from ${raffle.totalEntries.toLocaleString()} entries.`
                  : "Provably fair random selection"}
              </p>
            </div>
          </div>

          {!drawn ? (
            <>
              <div className="mt-5 rounded-xl border border-[#333] p-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-300">Raffle Status</span>
                  <span className="rounded-full bg-yellow-900/40 px-3 py-1 text-xs font-semibold text-yellow-400">
                    {countdown.ended ? "READY" : "AWAITING END"}
                  </span>
                </div>
                <p className="mt-2 text-xs text-gray-500">
                  The drawing algorithm becomes active once the timer reaches
                  zero.
                </p>
              </div>

              <button
                onClick={handleDrawWinner}
                disabled={drawing}
                className="mt-4 rounded-full bg-red-900 px-6 py-3 text-sm font-semibold transition hover:bg-red-800 disabled:opacity-60"
              >
                {drawing ? "Drawing…" : "Draw Winner"}
              </button>
            </>
          ) : (
            raffle.winner && (
              <>
                <div className="mt-5 flex items-center justify-between rounded-xl border border-[#333] bg-[#1a1a1a] p-4">
                  <div className="flex items-center gap-3">
                    <img
                      src={raffle.winner.avatar}
                      alt={raffle.winner.name}
                      className="h-10 w-10 rounded-full"
                    />
                    <div>
                      <p className="text-sm font-semibold">
                        {raffle.winner.name}
                      </p>
                      <p className="text-xs text-gray-500">
                        {raffle.winner.email}
                      </p>
                    </div>
                  </div>
                  <span className="text-xs font-semibold text-gray-400">
                    Winner
                  </span>
                </div>

                <div className="mt-4 flex gap-3">
                  <button className="flex flex-1 items-center justify-center gap-2 rounded-full bg-red-900 px-4 py-2.5 text-sm font-semibold transition hover:bg-red-800">
                    <Truck size={15} />
                    Generate Shipping Level
                  </button>
                  <button className="flex flex-1 items-center justify-center gap-2 rounded-full border border-[#555] px-4 py-2.5 text-sm font-semibold text-gray-200 transition hover:bg-[#1e1e1e]">
                    <BellRing size={15} />
                    Notify Winner
                  </button>
                </div>
              </>
            )
          )}
        </div>
      </div>

      {/* Past Winners */}
      <div className="mt-5 overflow-hidden rounded-xl border border-[#333]">
        <div className="bg-[#2a2a2a] px-3 py-3">
          <p className="text-sm font-semibold">Past Winners</p>
        </div>

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
            {pastWinners.map((w) => (
              <tr key={w.id} className="border-t border-[#2a2a2a]">
                <td className="p-3">{w.name}</td>
                <td className="p-3 text-gray-300">{w.prize}</td>
                <td className="p-3 text-gray-300">{w.drawnDate}</td>
                <td className="p-3">
                  <span
                    className={`rounded px-2 py-1 text-xs ${statusStyle[w.status]}`}
                  >
                    {w.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

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
