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

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;

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
    <div className="w-full min-w-0">
      {/* Header */}
      <div
        className="
          mb-5
          flex
          flex-col
          gap-4
          sm:mb-6
          lg:flex-row
          lg:items-center
          lg:justify-between
        "
      >
        <h1 className="text-2xl font-bold text-white sm:text-3xl">All Users</h1>

        <div className="relative w-full lg:w-80">
          <Search
            size={18}
            className="
              absolute
              left-3
              top-1/2
              -translate-y-1/2
              text-gray-400
            "
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
              placeholder:text-gray-500
              focus:border-red-500
            "
          />
        </div>
      </div>

      {/* Desktop Table */}
      <div
        className="
          hidden
          overflow-hidden
          rounded-xl
          border
          border-[#2b2b2b]
          bg-[#171717]
          md:block
        "
      >
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
                  className="
                    border-t
                    border-[#2b2b2b]
                    transition-colors
                    hover:bg-[#1f1f1f]
                  "
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <img
                        src={user.avatar}
                        alt={user.name}
                        className="
                          h-11
                          w-11
                          shrink-0
                          rounded-full
                          border
                          border-gray-600
                          object-cover
                        "
                      />

                      <div className="min-w-0">
                        <h3 className="text-sm font-medium text-white">
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
                        type="button"
                        onClick={() => handleViewUser(user)}
                        className="
                          rounded-lg
                          bg-[#252525]
                          p-2
                          text-gray-300
                          transition
                          hover:bg-blue-600
                          hover:text-white
                        "
                      >
                        <Eye size={18} />
                      </button>

                      <button
                        type="button"
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
                <td colSpan={4} className="py-16 text-center text-gray-400">
                  No user found
                </td>
              </tr>
            )}
          </tbody>
        </table>

        {/* Desktop Pagination */}
        {filteredUsers.length > 0 && (
          <div
            className="
              flex
              items-center
              justify-between
              gap-4
              border-t
              border-[#2b2b2b]
              p-5
            "
          >
            <ShowingText
              startIndex={startIndex}
              currentLength={currentUsers.length}
              total={filteredUsers.length}
              label="users"
            />

            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              setCurrentPage={setCurrentPage}
            />
          </div>
        )}
      </div>

      {/* Mobile Cards */}
      <div className="space-y-3 md:hidden">
        {currentUsers.length > 0 ? (
          currentUsers.map((user) => (
            <div
              key={user.id}
              className="
                rounded-xl
                border
                border-[#2b2b2b]
                bg-[#171717]
                p-4
              "
            >
              {/* User */}
              <div className="flex items-center gap-3">
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="
                    h-12
                    w-12
                    shrink-0
                    rounded-full
                    border
                    border-gray-600
                    object-cover
                  "
                />

                <div className="min-w-0 flex-1">
                  <h3 className="truncate font-medium text-white">
                    {user.name}
                  </h3>

                  <p className="text-xs text-gray-500">ID #{user.id}</p>
                </div>
              </div>

              {/* Details */}
              <div
                className="
                  mt-4
                  space-y-2
                  border-t
                  border-[#2b2b2b]
                  pt-4
                "
              >
                <div className="flex items-start justify-between gap-4">
                  <span className="text-xs text-gray-500">Email</span>

                  <span className="max-w-[65%] break-all text-right text-sm text-gray-300">
                    {user.email}
                  </span>
                </div>

                <div className="flex items-center justify-between gap-4">
                  <span className="text-xs text-gray-500">Contact</span>

                  <span className="text-sm text-gray-300">{user.phone}</span>
                </div>
              </div>

              {/* Actions */}
              <div className="mt-4 flex gap-2">
                <button
                  type="button"
                  onClick={() => handleViewUser(user)}
                  className="
                    flex
                    flex-1
                    items-center
                    justify-center
                    gap-2
                    rounded-lg
                    bg-[#252525]
                    py-2.5
                    text-sm
                    text-gray-300
                    transition
                    hover:bg-blue-600
                    hover:text-white
                  "
                >
                  <Eye size={17} />
                  View
                </button>

                <button
                  type="button"
                  onClick={() => {
                    const action = user.isBlocked ? "unblock" : "block";

                    const confirmAction = window.confirm(
                      `Are you sure you want to ${action} ${user.name}?`,
                    );

                    if (confirmAction) {
                      handleToggleBlock(user.id);
                    }
                  }}
                  className={`
                    flex
                    flex-1
                    items-center
                    justify-center
                    gap-2
                    rounded-lg
                    py-2.5
                    text-sm
                    transition
                    ${
                      user.isBlocked
                        ? "bg-red-600 text-white"
                        : "bg-[#252525] text-gray-300 hover:bg-red-600 hover:text-white"
                    }
                  `}
                >
                  {user.isBlocked ? (
                    <>
                      <UserCheck size={17} />
                      Unblock
                    </>
                  ) : (
                    <>
                      <UserX size={17} />
                      Block
                    </>
                  )}
                </button>
              </div>
            </div>
          ))
        ) : (
          <div
            className="
              rounded-xl
              border
              border-[#2b2b2b]
              bg-[#171717]
              py-16
              text-center
              text-gray-400
            "
          >
            No user found
          </div>
        )}

        {/* Mobile Pagination */}
        {filteredUsers.length > 0 && (
          <div
            className="
              flex
              items-center
              justify-between
              gap-3
              rounded-xl
              border
              border-[#2b2b2b]
              bg-[#171717]
              p-3
            "
          >
            <button
              type="button"
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((prev) => prev - 1)}
              className="
                rounded-lg
                bg-[#252525]
                px-3
                py-2
                text-xs
                text-white
                transition
                disabled:cursor-not-allowed
                disabled:opacity-40
              "
            >
              Previous
            </button>

            <span className="whitespace-nowrap text-xs text-gray-400">
              Page <span className="font-medium text-white">{currentPage}</span>{" "}
              of <span className="font-medium text-white">{totalPages}</span>
            </span>

            <button
              type="button"
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage((prev) => prev + 1)}
              className="
                rounded-lg
                bg-[#252525]
                px-3
                py-2
                text-xs
                text-white
                transition
                disabled:cursor-not-allowed
                disabled:opacity-40
              "
            >
              Next
            </button>
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

function ShowingText({
  startIndex,
  currentLength,
  total,
  label,
}: {
  startIndex: number;
  currentLength: number;
  total: number;
  label: string;
}) {
  return (
    <p className="text-sm text-gray-400">
      Showing <span className="font-medium text-white">{startIndex + 1}</span>-
      <span className="font-medium text-white">
        {startIndex + currentLength}
      </span>{" "}
      of <span className="font-medium text-white">{total}</span> {label}
    </p>
  );
}

function Pagination({
  currentPage,
  totalPages,
  setCurrentPage,
}: {
  currentPage: number;
  totalPages: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
}) {
  return (
    <div className="flex items-center gap-2">
      <button
        type="button"
        disabled={currentPage === 1}
        onClick={() => setCurrentPage((prev) => prev - 1)}
        className="
          rounded-md
          bg-[#252525]
          px-4
          py-2
          text-sm
          text-white
          transition
          hover:bg-[#353535]
          disabled:cursor-not-allowed
          disabled:opacity-40
        "
      >
        Previous
      </button>

      <div className="flex items-center gap-2">
        {Array.from({ length: totalPages }).map((_, index) => (
          <button
            type="button"
            key={index}
            onClick={() => setCurrentPage(index + 1)}
            className={`
              h-10
              w-10
              rounded-md
              text-sm
              transition
              ${
                currentPage === index + 1
                  ? "bg-red-600 text-white"
                  : "bg-[#252525] text-gray-300 hover:bg-[#353535]"
              }
            `}
          >
            {index + 1}
          </button>
        ))}
      </div>

      <button
        type="button"
        disabled={currentPage === totalPages}
        onClick={() => setCurrentPage((prev) => prev + 1)}
        className="
          rounded-md
          bg-[#252525]
          px-4
          py-2
          text-sm
          text-white
          transition
          hover:bg-[#353535]
          disabled:cursor-not-allowed
          disabled:opacity-40
        "
      >
        Next
      </button>
    </div>
  );
}
