export type AdminProfile = {
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  avatar: string;
};

export const dummyProfile: AdminProfile = {
  firstName: "Jack",
  lastName: "Smith",
  email: "john.smith@example.com",
  role: "Administrator",
  avatar: "https://i.pravatar.cc/150?img=13",
};