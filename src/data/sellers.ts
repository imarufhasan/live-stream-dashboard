import sampleVideo from "../assets/videos/live-demo.mp4";
import cover1 from "../assets/images/store-cover.jpg";

export type Seller = {
  id: number;
  avatar: string;
  coverImage: string;

  storeName: string;
  sellerName: string;

  email: string;
  phone: string;
  location: string;

  activeProducts: number;
  rating: number;

  totalSales: number;

  stripeStatus: "Connected" | "Disconnected";
  bankName: string;
  dispatchLocation: string;

  liveStatus: "Live Now" | "Offline";
  liveVideoUrl?: string;

  isBlocked: boolean;
};

export const sellers: Seller[] = [
  {
    id: 1,
    avatar: "https://i.pravatar.cc/150?img=12",
    coverImage: cover1,

    storeName: "Beauty House",
    sellerName: "Emma Watson",

    email: "emma@gmail.com",
    phone: "+1 555 222 111",
    location: "New York, USA",

    activeProducts: 120,
    rating: 4.8,

    totalSales: 854,
    stripeStatus: "Connected",
    bankName: "Barclays ****5678",
    dispatchLocation: "New York Warehouse",

    liveStatus: "Live Now",
    liveVideoUrl: sampleVideo,

    isBlocked: false,
  },

  {
    id: 2,
    avatar: "https://i.pravatar.cc/150?img=15",
    coverImage: cover1,

    storeName: "Urban Fashion",
    sellerName: "John Carter",

    email: "john@gmail.com",
    phone: "+8801711111112",
    location: "Dhaka",

    activeProducts: 35,
    rating: 4.8,

    totalSales: 410,
    stripeStatus: "Connected",
    bankName: "DBBL ****2281",
    dispatchLocation: "Mohakhali, Dhaka",

    liveStatus: "Offline",

    isBlocked: false,
  },

  {
    id: 3,
    avatar: "https://i.pravatar.cc/150?img=20",
    coverImage: cover1,

    storeName: "Tech World",
    sellerName: "Michael Smith",

    email: "michael@gmail.com",
    phone: "+8801711111113",
    location: "Chattogram",

    activeProducts: 21,
    rating: 4.6,

    totalSales: 210,
    stripeStatus: "Disconnected",
    bankName: "N/A",
    dispatchLocation: "Agrabad",

    liveStatus: "Live Now",
    liveVideoUrl: sampleVideo,

    isBlocked: false,
  },

  {
    id: 4,
    avatar: "https://i.pravatar.cc/150?img=25",
    coverImage: cover1,

    storeName: "Luxury Wear",
    sellerName: "Emma Wilson",

    email: "emma@gmail.com",
    phone: "+8801711111114",
    location: "Sylhet",

    activeProducts: 18,
    rating: 4.9,

    totalSales: 620,
    stripeStatus: "Connected",
    bankName: "City Bank ****9001",
    dispatchLocation: "Sylhet Hub",

    liveStatus: "Offline",

    isBlocked: false,
  },

  {
    id: 5,
    avatar: "https://i.pravatar.cc/150?img=30",
    coverImage: cover1,

    storeName: "Street Style",
    sellerName: "David Miller",

    email: "david@gmail.com",
    phone: "+8801711111115",
    location: "Khulna",

    activeProducts: 42,
    rating: 4.7,

    totalSales: 760,
    stripeStatus: "Connected",
    bankName: "HSBC ****4411",
    dispatchLocation: "Khulna Depot",

    liveStatus: "Live Now",
    liveVideoUrl: sampleVideo,

    isBlocked: false,
  },

  ...Array.from({ length: 15 }, (_, index): Seller => ({
    id: index + 6,

    avatar: `https://i.pravatar.cc/150?img=${index + 35}`,
    coverImage: cover1,

    storeName: `Fashion Store ${index + 1}`,
    sellerName: `Seller User ${index + 1}`,

    email: `seller${index + 1}@gmail.com`,
    phone: `+880171111${1200 + index}`,
    location: "Dhaka",

    activeProducts: 10 + index,
    rating: Number((4 + Math.random()).toFixed(1)),

    totalSales: 100 + index * 12,

    stripeStatus:
      index % 3 === 0
        ? ("Disconnected" as const)
        : ("Connected" as const),

    bankName: "Dutch Bangla ****4587",

    dispatchLocation: "Dhaka Warehouse",

    liveStatus:
      index % 2 === 0
        ? ("Live Now" as const)
        : ("Offline" as const),

    liveVideoUrl:
      index % 2 === 0 ? sampleVideo : undefined,

    isBlocked: false,
  })),
];