export interface User {
  id: number;
  avatar: string;
  name: string;
  username: string;
  email: string;
  phone: string;
  gender: "Male" | "Female";
  role: "Customer" | "Seller";
  status: "Active" | "Inactive";
  isBlocked: boolean;
  country: string;
  city: string;
  address: string;
  createdAt: string;
  lastLogin: string;
}

const names = [
  "John Smith",
  "Emma Johnson",
  "Liam Williams",
  "Olivia Brown",
  "Noah Davis",
  "Sophia Miller",
  "James Wilson",
  "Isabella Moore",
  "Benjamin Taylor",
  "Mia Anderson",
  "Lucas Thomas",
  "Charlotte Jackson",
  "Henry White",
  "Amelia Harris",
  "Daniel Martin",
  "Ethan Walker",
  "Ava Hall",
  "Michael Allen",
  "Emily Young",
  "David King",
  "Grace Scott",
  "Jack Green",
  "Ella Adams",
  "Ryan Baker",
  "Scarlett Carter",
];

const cities = ["New York", "Los Angeles", "Chicago", "Houston", "Dallas"];

export const users: User[] = Array.from({ length: 25 }, (_, index) => ({
  id: index + 1,

  avatar: `https://i.pravatar.cc/150?img=${(index % 70) + 1}`,

  name: names[index],

  username: `user${index + 1}`,

  email: `user${index + 1}@gmail.com`,

  phone: `+1 202-555-${String(1100 + index).padStart(4, "0")}`,

  gender: index % 2 === 0 ? "Male" : "Female",

  role: index % 6 === 0 ? "Seller" : "Customer",

  status: index % 5 === 0 ? "Inactive" : "Active",

  isBlocked: index % 7 === 0,

  country: "United States",

  city: cities[index % cities.length],

  address: `${100 + index} Main Street`,

  createdAt: `2026-${String((index % 12) + 1).padStart(2, "0")}-${String((index % 28) + 1).padStart(2, "0")}`,

  lastLogin: `2026-08-${String((index % 30) + 1).padStart(2, "0")} 10:${String(index).padStart(2, "0")}`,
}));
