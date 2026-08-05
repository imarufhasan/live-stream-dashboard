export type Category = {
  id: number;
  name: string;
  image: string;
};

// NOTE: swap these for local asset imports in your project if you have real
// category thumbnails, e.g. import phoneIcon from "../assets/categories/phone.png";
export const categories: Category[] = [
  {
    id: 1,
    name: "Phone",
    image: "https://ui-avatars.com/api/?name=Phone&background=e0620a&color=fff&size=64&bold=true",
  },
  {
    id: 2,
    name: "Laptop",
    image: "https://ui-avatars.com/api/?name=Laptop&background=2563eb&color=fff&size=64&bold=true",
  },
  {
    id: 3,
    name: "Sneakers",
    image: "https://ui-avatars.com/api/?name=Sneakers&background=16a34a&color=fff&size=64&bold=true",
  },
  {
    id: 4,
    name: "Trading Cards",
    image: "https://ui-avatars.com/api/?name=TC&background=9333ea&color=fff&size=64&bold=true",
  },
  {
    id: 5,
    name: "Watches",
    image: "https://ui-avatars.com/api/?name=Watches&background=b91c1c&color=fff&size=64&bold=true",
  },
  {
    id: 6,
    name: "Apparel",
    image: "https://ui-avatars.com/api/?name=Apparel&background=0891b2&color=fff&size=64&bold=true",
  },
  {
    id: 7,
    name: "Accessories",
    image: "https://ui-avatars.com/api/?name=Acc&background=ca8a04&color=fff&size=64&bold=true",
  },
  {
    id: 8,
    name: "Gaming Gear",
    image: "https://ui-avatars.com/api/?name=Gaming&background=db2777&color=fff&size=64&bold=true",
  },
];