export type PastWinnerStatus = "Delivered" | "Shipped" | "Pending";

export type PastWinner = {
  id: number;
  name: string;
  prize: string;
  drawnDate: string;
  status: PastWinnerStatus;
};

export type CurrentWinner = {
  name: string;
  email: string;
  avatar: string;
};

export type CurrentRaffle = {
  id: number;
  title: string;
  description: string;
  category: string;
  image: string;
  ticketsSold: number;
  maxTickets: number;
  totalEntries: number;
  drawAt: string; // ISO datetime — countdown target
  winner: CurrentWinner | null;
};

// NOTE: swap `image` below for a local asset import in your project, e.g.
// import raffleImage from "../../assets/raffle-nike-sneaker.jpg";
export const currentRaffle: CurrentRaffle = {
  id: 101,
  title: "Win Nike Special sneaker",
  description:
    "Join our weekly community raffle! For just £1, you could own one of the rarest cards in existence. 100% of proceeds fund community events and expansion of the PokéLive ecosystem.",
  category: "Footwear",
  image:
    "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?q=80&w=1200&auto=format&fit=crop",
  ticketsSold: 800,
  maxTickets: 1000,
  totalEntries: 12450,
  drawAt: new Date(Date.now() + (65 * 60 + 24) * 1000).toISOString(),
  winner: {
    name: "Nm Sujon",
    email: "sujon@gmail.com",
    avatar:
      "https://ui-avatars.com/api/?name=Nm+Sujon&background=333333&color=fff&size=64",
  },
};

export const pastWinners: PastWinner[] = [
  {
    id: 1,
    name: "Sujon",
    prize: "Nike Sneaker Special",
    drawnDate: "02 Oct, 2026",
    status: "Delivered",
  },
  {
    id: 2,
    name: "Farzana Yesmin",
    prize: "PokéLive Founders Card",
    drawnDate: "25 Sep, 2026",
    status: "Delivered",
  },
  {
    id: 3,
    name: "Rahim Khan",
    prize: "Limited Edition Hoodie",
    drawnDate: "18 Sep, 2026",
    status: "Shipped",
  },
  {
    id: 4,
    name: "Tania Rahman",
    prize: "Nike Sneaker Special",
    drawnDate: "11 Sep, 2026",
    status: "Delivered",
  },
  {
    id: 5,
    name: "Al Amin",
    prize: "Signed Booster Box",
    drawnDate: "04 Sep, 2026",
    status: "Pending",
  },
  {
    id: 6,
    name: "Ruma Akter",
    prize: "PokéLive Founders Card",
    drawnDate: "28 Aug, 2026",
    status: "Delivered",
  },
];

export const prizeCategories = [
  "Footwear",
  "Trading Cards",
  "Apparel",
  "Electronics",
  "Collectibles",
];
