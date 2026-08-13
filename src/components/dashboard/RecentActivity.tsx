import { useState } from "react";
import { X } from "lucide-react";

import { activities } from "../../data/dashboardData";

type Activity = (typeof activities)[number];

export default function RecentActivity() {
  const [selectedActivity, setSelectedActivity] = useState<Activity | null>(
    null,
  );

  return (
    <>
      <div
        className="
          mt-8
          rounded-xl
          border
          border-[#343434]
          bg-[#171717]
          p-5
        "
      >
        <h2
          className="
            mb-5
            text-lg
            font-semibold
          "
        >
          Recent Activity
        </h2>

        <div className="space-y-3">
          {activities.map((item) => (
            <div
              key={item.id}
              className="
                flex
                flex-col
                gap-3
                rounded-xl
                bg-[#222]
                px-4
                py-3
                sm:flex-row
                sm:items-center
                sm:justify-between
              "
            >
              {/* Activity Info */}
              <div className="min-w-0">
                <p className="text-sm text-gray-400">
                  {item.message}

                  <span className="ml-3 sm:ml-10">{item.time}</span>
                </p>

                <p className="mt-2 font-semibold text-white">{item.subject}</p>
              </div>

              {/* View Button */}
              <button
                type="button"
                onClick={() => setSelectedActivity(item)}
                className="
                  shrink-0
                  self-start
                  rounded-lg
                  border
                  border-gray-500
                  px-5
                  py-2
                  text-sm
                  transition
                  hover:bg-white
                  hover:text-black
                  sm:self-auto
                "
              >
                View
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Activity Details Modal */}
      {selectedActivity && (
        <div
          className="
            fixed
            inset-0
            z-50
            flex
            items-center
            justify-center
            bg-black/70
            p-4
            backdrop-blur-sm
          "
          onClick={() => setSelectedActivity(null)}
        >
          <div
            className="
              relative
              w-full
              max-w-md
              rounded-2xl
              border
              border-[#444]
              bg-[#222]
              p-5
              text-white
              shadow-2xl
            "
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold">Activity Details</h2>

              <button
                type="button"
                onClick={() => setSelectedActivity(null)}
                className="
                  rounded-full
                  p-2
                  text-gray-400
                  transition
                  hover:bg-[#333]
                  hover:text-white
                "
                aria-label="Close"
              >
                <X size={18} />
              </button>
            </div>

            {/* Details */}
            <div className="mt-6 space-y-5">
              <div>
                <p className="text-xs font-medium text-gray-500">Activity</p>

                <p className="mt-1 text-sm text-gray-300">
                  {selectedActivity.message}
                </p>
              </div>

              <div>
                <p className="text-xs font-medium text-gray-500">Subject</p>

                <p className="mt-1 text-base font-semibold text-white">
                  {selectedActivity.subject}
                </p>
              </div>

              <div>
                <p className="text-xs font-medium text-gray-500">Time</p>

                <p className="mt-1 text-sm text-gray-300">
                  {selectedActivity.time}
                </p>
              </div>
            </div>

            {/* Close */}
            <button
              type="button"
              onClick={() => setSelectedActivity(null)}
              className="
                mt-6
                w-full
                rounded-xl
                bg-red-600
                py-3
                text-sm
                font-semibold
                text-white
                transition
                hover:bg-red-700
              "
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
}
