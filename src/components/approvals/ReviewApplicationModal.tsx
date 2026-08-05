import { X } from "lucide-react";
import type { SellerApproval } from "../../data/sellerApprovals";

type Props = {
  open: boolean;
  seller: SellerApproval | null;
  onClose: () => void;
};

export default function ReviewApplicationModal({
  open,
  seller,
  onClose,
}: Props) {
  if (!open || !seller) return null;

  return (
    <div
      className="
fixed
inset-0
z-50
flex
items-center
justify-center
bg-black/70
p-5
"
    >
      <div
        className="
w-full
max-w-md
max-h-[90vh]
overflow-y-auto
rounded-2xl
bg-[#3b3b3b]
border
border-[#555]
p-5
"
      >
        <div className="flex justify-between mb-4">
          <h2 className="text-2xl font-bold">Review Application</h2>

          <button onClick={onClose}>
            <X />
          </button>
        </div>

        <Section title="Personal Information">
          <Info label="Name" value={seller.applicantName} />

          <Info label="Email" value={seller.email} />

          <Info label="Contact No" value={seller.phone} />

          <Info label="Address" value={seller.address} />
        </Section>

        <Section title="Store Information">
          <Info label="Store Name" value={seller.storeName} />

          <Info label="Shop Description" value={seller.shopDescription} />
        </Section>

        <Section title="Identity Verification">
          <Info label="Document Type" value={seller.documentType} />

          <div className="mt-4 grid grid-cols-2 gap-4">
            <div>
              <p className="mb-2 text-sm text-gray-400">Id Front</p>

              <img
                src={seller.nidFront}
                className="
rounded-lg
"
              />
            </div>

            <div>
              <p className="mb-2 text-sm text-gray-400">Id Back</p>

              <img
                src={seller.nidBack}
                className="
rounded-lg
"
              />
            </div>
          </div>
        </Section>

        <div className="mt-6 flex gap-4">
          <button
            className="
flex-1
rounded-full
border
border-white
py-3
font-semibold
"
          >
            Reject
          </button>

          <button
            className="
flex-1
rounded-full
bg-red-900
py-3
font-semibold
"
          >
            Approve as Seller
          </button>
        </div>
      </div>
    </div>
  );
}

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className="
mb-4
rounded-xl
border
border-[#666]
p-4
"
    >
      <h3 className="mb-4 text-lg font-semibold">{title}</h3>

      {children}
    </div>
  );
}

function Info({ label, value }: { label: string; value: string }) {
  return (
    <div className="mb-4">
      <p className="text-sm text-gray-400">{label}</p>

      <p className="mt-1 text-white">{value}</p>
    </div>
  );
}
