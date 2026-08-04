import { activities } from "../../data/dashboardData";

export default function RecentActivity() {
  return (
    <div
      className="
mt-8
bg-[#171717]
border
border-[#343434]
rounded-xl
p-5
"
    >
      <h2
        className="
text-lg
font-semibold
mb-5
"
      >
        Recent Activity
      </h2>

      <div className="space-y-3">
        {activities.map((item) => (
          <div
            key={item.id}
            className="
bg-[#222]
rounded-xl
px-4
py-3
flex
justify-between
items-center
"
          >
            <div>
              <p
                className="
text-sm
text-gray-400
"
              >
                {item.message}

                <span className="ml-10">{item.time}</span>
              </p>

              <p
                className="
font-semibold
mt-2
"
              >
                {item.subject}
              </p>
            </div>

            <button
              className="
border
border-gray-500
rounded-lg
px-5
py-2
text-sm
hover:bg-white
hover:text-black
transition
"
            >
              View
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
