import { useMemo, useState } from "react";
import { users, type User } from "../../data/users";
import { Eye, Search, UserCheck, UserX } from "lucide-react";
import UserDetailsModal from "../../components/users/UserDetailsModal";

export default function UserList() {
  const ITEMS_PER_PAGE = 5;

  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userList, setUserList] = useState(users);
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState("");

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;

  const filteredUsers = useMemo(() => {
    const keyword = search.toLowerCase().trim();

    return userList.filter(
      (user) =>
        user.name.toLowerCase().includes(keyword) ||
        user.email.toLowerCase().includes(keyword) ||
        user.phone.includes(keyword),
    );
  }, [search, userList]);

  const totalPages = Math.ceil(filteredUsers.length / ITEMS_PER_PAGE);

  const currentUsers = filteredUsers.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE,
  );

  const handleViewUser = (user: User) => {
    setSelectedUser(user);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setSelectedUser(null);
    setIsModalOpen(false);
  };

  const handleToggleBlock = (id: number) => {
    setUserList((prev) =>
      prev.map((user) =>
        user.id === id
          ? {
              ...user,
              isBlocked: !user.isBlocked,
            }
          : user,
      ),
    );
  };

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-3xl font-bold text-white">All Users</h1>

        <div className="relative w-80">
          <Search
            size={18}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
          />
          <input
            type="text"
            placeholder="Search by name, email or phone..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setCurrentPage(1);
            }}
            className="
    w-full
    rounded-lg
    border
    border-[#333]
    bg-[#1a1a1a]
    py-3
    pl-10
    pr-4
    text-sm
    text-white
    outline-none
    transition
    focus:border-red-500
  "
          />
        </div>
      </div>
      <div className="overflow-hidden rounded-xl border border-[#2b2b2b] bg-[#171717]">
        <table className="w-full">
          <thead className="bg-[#262626]">
            <tr className="text-left text-gray-300">
              <th className="px-6 py-4">User</th>
              <th className="px-6 py-4">Email</th>
              <th className="px-6 py-4">Contact No</th>
              <th className="px-6 py-4 text-center">Action</th>
            </tr>
          </thead>

          <tbody>
            {currentUsers.length > 0 ? (
              currentUsers.map((user) => (
                <tr
                  key={user.id}
                  className="border-t border-[#2b2b2b] hover:bg-[#1f1f1f] transition-colors"
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <img
                        src={user.avatar}
                        alt={user.name}
                        className="h-11 w-11 rounded-full object-cover border border-gray-600"
                      />

                      <div>
                        <h3 className="font-medium text-sm text-white">
                          {user.name}
                        </h3>
                        <p className="text-sm text-gray-400">ID #{user.id}</p>
                      </div>
                    </div>
                  </td>

                  <td className="px-6 py-4 text-sm text-gray-300">
                    {user.email}
                  </td>

                  <td className="px-6 py-4 text-sm text-gray-300">
                    {user.phone}
                  </td>

                  <td className="px-6 py-4">
                    <div className="flex justify-center gap-3">
                      <button
                        onClick={() => handleViewUser(user)}
                        className="rounded-lg bg-[#252525] p-2 text-gray-300 hover:bg-blue-600 hover:text-white transition"
                      >
                        <Eye size={18} />
                      </button>

                      <button
                        onClick={() => {
                          const action = user.isBlocked ? "unblock" : "block";

                          const confirmAction = window.confirm(
                            `Are you sure you want to ${action} ${user.name}?`,
                          );

                          if (confirmAction) {
                            handleToggleBlock(user.id);
                          }
                        }}
                        className={`rounded-lg p-2 transition ${
                          user.isBlocked
                            ? "bg-red-600 text-white"
                            : "bg-[#252525] text-gray-300 hover:bg-red-600 hover:text-white"
                        }`}
                      >
                        {user.isBlocked ? (
                          <UserCheck size={18} />
                        ) : (
                          <UserX size={18} />
                        )}
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={6}
                  className="
              py-16
              text-center
              text-gray-400
              "
                >
                  No user found
                </td>
              </tr>
            )}
          </tbody>
        </table>

        {filteredUsers.length > 0 && (
          <div className="flex items-center justify-between border-t border-[#2b2b2b] p-5">
            <p className="text-sm text-gray-400">
              Showing{" "}
              <span className="font-medium text-white">{startIndex + 1}</span> -
              <span className="font-medium text-white">
                {" "}
                {Math.min(startIndex + ITEMS_PER_PAGE, filteredUsers.length)}
              </span>{" "}
              of{" "}
              <span className="font-medium text-white">
                {filteredUsers.length}
              </span>{" "}
              users
            </p>

            <div className="flex items-center gap-2">
              <button
                disabled={currentPage === 1}
                onClick={() => setCurrentPage((prev) => prev - 1)}
                className="rounded-md bg-[#252525] px-4 py-2 text-white transition hover:bg-[#353535] disabled:cursor-not-allowed disabled:opacity-40"
              >
                Previous
              </button>

              {Array.from({ length: totalPages }).map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentPage(index + 1)}
                  className={`h-10 w-10 rounded-md transition ${
                    currentPage === index + 1
                      ? "bg-red-600 text-white"
                      : "bg-[#252525] text-gray-300 hover:bg-[#353535]"
                  }`}
                >
                  {index + 1}
                </button>
              ))}

              <button
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage((prev) => prev + 1)}
                className="rounded-md bg-[#252525] px-4 py-2 text-white transition hover:bg-[#353535] disabled:cursor-not-allowed disabled:opacity-40"
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>

      <UserDetailsModal
        open={isModalOpen}
        user={selectedUser}
        onClose={handleCloseModal}
      />
    </div>
  );
}
