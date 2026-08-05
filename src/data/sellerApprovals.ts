import nidFront from "../assets/images/nid-front.jpg";
import nidBack from "../assets/images/nid-back.jpg";

export type SellerApproval = {
  id: number;

  applicantName: string;
  storeName: string;
  category: string;
  appliedDate: string;

  email: string;
  phone: string;
  address: string;

  shopDescription: string;

  documentType: string;

  nidFront: string;
  nidBack: string;
};

export const sellerApprovals: SellerApproval[] = [
  {
    id: 1,
    applicantName: "Nm Sujon",
    storeName: "Sneaker Head",
    category: "Sneaker",
    appliedDate: "01-05-2026",

    email: "nmsujon@gmail.com",
    phone: "+8802564998468",
    address: "Mohakhali, Dhaka",

    shopDescription:
      "Premium sneaker collection with imported and limited edition shoes.",

    documentType: "NID",

    nidFront,
    nidBack,
  },

  {
    id: 2,
    applicantName: "Rahim Khan",
    storeName: "Urban Shoes",
    category: "Footwear",
    appliedDate: "02-05-2026",

    email: "rahimkhan@gmail.com",
    phone: "+880171111111",
    address: "Banani, Dhaka",

    shopDescription: "Original branded shoes and casual footwear store.",

    documentType: "NID",

    nidFront,
    nidBack,
  },

  {
    id: 3,
    applicantName: "Sadia Ahmed",
    storeName: "Beauty Corner",
    category: "Beauty",
    appliedDate: "03-05-2026",

    email: "sadia@gmail.com",
    phone: "+8801812345678",
    address: "Dhanmondi, Dhaka",

    shopDescription: "Beauty products, cosmetics and skincare items.",

    documentType: "NID",

    nidFront,
    nidBack,
  },

  {
    id: 4,
    applicantName: "Tanvir Hasan",
    storeName: "Tech Valley",
    category: "Electronics",
    appliedDate: "04-05-2026",

    email: "tanvir@gmail.com",
    phone: "+8801912345678",
    address: "Uttara, Dhaka",

    shopDescription: "Smart gadgets, accessories and electronic products.",

    documentType: "NID",

    nidFront,
    nidBack,
  },

  {
    id: 5,
    applicantName: "Nusrat Jahan",
    storeName: "Fashion House",
    category: "Fashion",
    appliedDate: "05-05-2026",

    email: "nusrat@gmail.com",
    phone: "+8801612345678",
    address: "Mirpur, Dhaka",

    shopDescription: "Women's fashion clothing and premium collections.",

    documentType: "NID",

    nidFront,
    nidBack,
  },

  {
    id: 6,
    applicantName: "Arif Hossain",
    storeName: "Sports Arena",
    category: "Sports",
    appliedDate: "06-05-2026",

    email: "arif@gmail.com",
    phone: "+8801512345678",
    address: "Motijheel, Dhaka",

    shopDescription: "Sports equipment and fitness accessories.",

    documentType: "NID",

    nidFront,
    nidBack,
  },

  {
    id: 7,
    applicantName: "Mahin Chowdhury",
    storeName: "Luxury Watch BD",
    category: "Accessories",
    appliedDate: "07-05-2026",

    email: "mahin@gmail.com",
    phone: "+8801712345678",
    address: "Gulshan, Dhaka",

    shopDescription: "Luxury watches and premium accessories.",

    documentType: "NID",

    nidFront,
    nidBack,
  },

  {
    id: 8,
    applicantName: "Farzana Akter",
    storeName: "Home Decor Plus",
    category: "Home",
    appliedDate: "08-05-2026",

    email: "farzana@gmail.com",
    phone: "+8801811111111",
    address: "Bashundhara, Dhaka",

    shopDescription: "Modern home decoration products.",

    documentType: "NID",

    nidFront,
    nidBack,
  },

  {
    id: 9,
    applicantName: "Imran Ali",
    storeName: "Gadget World",
    category: "Electronics",
    appliedDate: "09-05-2026",

    email: "imran@gmail.com",
    phone: "+8801911111111",
    address: "Chittagong",

    shopDescription: "Mobile accessories and smart devices.",

    documentType: "NID",

    nidFront,
    nidBack,
  },

  {
    id: 10,
    applicantName: "Rafi Ahmed",
    storeName: "Street Wear",
    category: "Fashion",
    appliedDate: "10-05-2026",

    email: "rafi@gmail.com",
    phone: "+8801611111111",
    address: "Sylhet",

    shopDescription: "Street fashion and trendy outfits.",

    documentType: "NID",

    nidFront,
    nidBack,
  },
];
