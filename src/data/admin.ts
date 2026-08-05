export type AdminStatus = "Active" | "Blocked";

export type Admin = {
  id: number;
  name: string;
  email: string;
  status: AdminStatus;
  avatar: string;
};

export const admins: Admin[] = [
  {
    id: 1,
    name: "Nm Sujon",
    email: "msujon872@gmail.com",
    status: "Active",
    avatar: "https://ui-avatars.com/api/?name=Nm+Sujon&background=333333&color=fff&size=64",
  },
  {
    id: 2,
    name: "Farzana Yesmin",
    email: "farzana.yesmin@gmail.com",
    status: "Active",
    avatar: "https://ui-avatars.com/api/?name=Farzana+Yesmin&background=333333&color=fff&size=64",
  },
  {
    id: 3,
    name: "Rahim Khan",
    email: "rahim.khan91@gmail.com",
    status: "Blocked",
    avatar: "https://ui-avatars.com/api/?name=Rahim+Khan&background=333333&color=fff&size=64",
  },
  {
    id: 4,
    name: "Tania Rahman",
    email: "tania.rahman@gmail.com",
    status: "Active",
    avatar: "https://ui-avatars.com/api/?name=Tania+Rahman&background=333333&color=fff&size=64",
  },
  {
    id: 5,
    name: "Al Amin",
    email: "alamin.dev@gmail.com",
    status: "Active",
    avatar: "https://ui-avatars.com/api/?name=Al+Amin&background=333333&color=fff&size=64",
  },
  {
    id: 6,
    name: "Ruma Akter",
    email: "ruma.akter22@gmail.com",
    status: "Blocked",
    avatar: "https://ui-avatars.com/api/?name=Ruma+Akter&background=333333&color=fff&size=64",
  },
  {
    id: 7,
    name: "Hasibul Hasan",
    email: "hasibul.hasan@gmail.com",
    status: "Active",
    avatar: "https://ui-avatars.com/api/?name=Hasibul+Hasan&background=333333&color=fff&size=64",
  },
];