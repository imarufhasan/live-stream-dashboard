export type ReportStatus = "pending" | "resolved" | "dismissed";

export interface Report {
  id: number;
  reportId: string;
  title: string;
  description: string;
  reporter: string;
  dateTime: string;
  image: string;
  status: ReportStatus;
}

export const reports: Report[] = [
  {
    id: 1,
    reportId: "#12344",
    title: "Abusive language and threats by user @rockstar123.",
    description:
      "Hello Admin, I am submitting a report regarding this user. In the comments section of my post from yesterday, they used extremely vulgar language unprovoked and made personal threats against me. I believe this is a severe violation of your Community Guidelines. I have attached a screenshot of the comments as proof. Please take action quickly.",
    reporter: "Nimsujon",
    dateTime: "25 Aug,2026, 08:10 Am",
    image: "https://picsum.photos/seed/report1/500/380",
    status: "pending",
  },
  {
    id: 2,
    reportId: "#12345",
    title: "Fake raffle listing asking for upfront payment.",
    description:
      "This user posted a raffle that isn't listed anywhere on the official raffle page, and is asking winners to pay a 'processing fee' before receiving their prize. This looks like a scam and other users may fall for it.",
    reporter: "ArifKhan",
    dateTime: "24 Aug,2026, 06:42 Pm",
    image: "https://picsum.photos/seed/report2/500/380",
    status: "pending",
  },
  {
    id: 3,
    reportId: "#12346",
    title: "Spam links posted repeatedly in comments.",
    description:
      "The same user has posted an identical external link under at least ten different posts in the last hour. It looks like automated spam and is cluttering the comment sections.",
    reporter: "Priya_S",
    dateTime: "24 Aug,2026, 02:15 Pm",
    image: "https://picsum.photos/seed/report3/500/380",
    status: "resolved",
  },
  {
    id: 4,
    reportId: "#12347",
    title: "Impersonation of a verified seller account.",
    description:
      "This profile is using the exact name, photo, and bio of a verified seller on the platform. I believe it was created to trick buyers into sending payments to the wrong account.",
    reporter: "Tanvir99",
    dateTime: "23 Aug,2026, 11:05 Am",
    image: "https://picsum.photos/seed/report4/500/380",
    status: "dismissed",
  },
  {
    id: 5,
    reportId: "#12348",
    title: "Inappropriate image uploaded to public gallery.",
    description:
      "An image was uploaded to the shared gallery that is not appropriate for the platform and violates the content guidelines. Please review and remove it.",
    reporter: "Nimsujon",
    dateTime: "23 Aug,2026, 09:30 Am",
    image: "https://picsum.photos/seed/report5/500/380",
    status: "pending",
  },
  {
    id: 6,
    reportId: "#12349",
    title: "Harassment in direct messages.",
    description:
      "I have been receiving repeated unwanted messages from this user after telling them to stop. It has continued for several days and is making me uncomfortable using the app.",
    reporter: "Sabbir_H",
    dateTime: "22 Aug,2026, 07:58 Pm",
    image: "https://picsum.photos/seed/report6/500/380",
    status: "pending",
  },
  {
    id: 7,
    reportId: "#12350",
    title: "Duplicate account created to bypass a ban.",
    description:
      "This account appears to belong to a user who was previously banned for policy violations. The username and posting pattern are nearly identical to the old account.",
    reporter: "MoinUddin",
    dateTime: "22 Aug,2026, 03:20 Pm",
    image: "https://picsum.photos/seed/report7/500/380",
    status: "resolved",
  },
  {
    id: 8,
    reportId: "#12351",
    title: "Misleading raffle prize description.",
    description:
      "The raffle listing advertises a brand new item, but winners in the comments say they received a used or damaged product instead. This seems misleading to buyers.",
    reporter: "RituAkter",
    dateTime: "21 Aug,2026, 10:12 Am",
    image: "https://picsum.photos/seed/report8/500/380",
    status: "pending",
  },
  {
    id: 9,
    reportId: "#12352",
    title: "Hate speech in a public comment thread.",
    description:
      "A user posted comments targeting a specific community with derogatory language. Several other users have also flagged the same comment thread.",
    reporter: "KamalHossain",
    dateTime: "20 Aug,2026, 05:47 Pm",
    image: "https://picsum.photos/seed/report9/500/380",
    status: "dismissed",
  },
  {
    id: 10,
    reportId: "#12353",
    title: "Suspicious login activity reported by user.",
    description:
      "The account holder says they noticed logins from a location they don't recognize and did not authorize. They are worried their account may have been compromised.",
    reporter: "Nimsujon",
    dateTime: "20 Aug,2026, 01:03 Pm",
    image: "https://picsum.photos/seed/report10/500/380",
    status: "pending",
  },
  {
    id: 11,
    reportId: "#12354",
    title: "Copyright violation on uploaded artwork.",
    description:
      "The image uploaded by this user appears to be taken directly from another artist's portfolio without credit or permission. Original source link is attached.",
    reporter: "Farhana_R",
    dateTime: "19 Aug,2026, 08:26 Am",
    image: "https://picsum.photos/seed/report11/500/380",
    status: "pending",
  },
  {
    id: 12,
    reportId: "#12355",
    title: "Seller not delivering after payment confirmation.",
    description:
      "I completed payment for an item over a week ago and the seller has stopped responding to messages. No item has been shipped or delivered.",
    reporter: "ShakibAl",
    dateTime: "18 Aug,2026, 04:11 Pm",
    image: "https://picsum.photos/seed/report12/500/380",
    status: "resolved",
  },
];
