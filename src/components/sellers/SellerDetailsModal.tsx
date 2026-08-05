import { X } from "lucide-react";
import type { Seller } from "../../data/sellers";
import { useState } from "react";
import LiveVideoModal from "./LiveVideoModal";

type Props = {
  open: boolean;
  seller: Seller | null;
  sellerName: string;
  onClose: () => void;
};

export default function SellerDetailsModal({
  open,
  seller,
  sellerName,
  onClose,
}: Props) {
  const [showLiveVideo, setShowLiveVideo] = useState(false);
  if (!open || !seller) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-5 backdrop-blur-sm">
      <div
        className="
          relative
          w-full
          max-w-md
          max-h-[90vh]
          overflow-y-auto
          rounded-2xl
          border
          border-[#555]
          bg-[#363636]
          shadow-2xl
        "
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="
            absolute
            right-4
            top-4
            z-20
            flex
            h-9
            w-9
            items-center
            justify-center
            rounded-full
            bg-[#666]
            text-white
            transition
            hover:bg-red-600
          "
        >
          <X size={18} />
        </button>

        {/* Cover Image */}
        <div className="relative h-37.5 w-full">
          <img
            src={seller.coverImage}
            alt={seller.storeName}
            className="
      h-full
      w-full
      object-cover
      rounded-t-2xl
    "
          />

          {/* Profile Image */}
          <div
            className="
      absolute
      left-1/2
      -bottom-14
      -translate-x-1/2
    "
          >
            <div
              className={`relative
        h-27.5
        w-27.5
        rounded-full
        border-4
        ${
          seller.liveStatus === "Live Now" ? "border-red-500" : "border-gray-300"
        }
        bg-[#363636]
        p-1
        shadow-xl`}
            >
              <img
                src={seller.avatar}
                alt={sellerName}
                onClick={() =>
                  seller.liveStatus === "Live Now" &&
                  seller.liveVideoUrl &&
                  setShowLiveVideo(true)
                }
                className={`
    h-full
    w-full
    rounded-full
    object-cover
    ${seller.liveStatus === "Live Now" ? "cursor-pointer hover:opacity-90" : ""}
  `}
              />

              {/* Live Badge */}
              {seller.liveStatus === "Live Now" && (
                <div
                  className="
            absolute
            -bottom-4
            left-1/2
            -translate-x-1/2
            rounded-full
            bg-red-600
            px-4
            py-1
            text-[11px]
            font-semibold
            text-white
            shadow-lg
            whitespace-nowrap
          "
                >
                  ● LIVE
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="px-5 pb-6 pt-16">
          {/* Store Name */}
          <h2
            className="
              text-center
              text-2xl
              font-bold
              text-white
            "
          >
            {seller.storeName}
          </h2>

          {/* Contact Info */}
          <div
            className="
              mt-6
              rounded-xl
              border
              border-[#666]
              bg-[#414141]
              p-4
            "
          >
            <h3
              className="
                mb-5
                text-lg
                font-semibold
                text-white
              "
            >
              Contact Info
            </h3>

            <div className="space-y-5">
              <InfoItem label="Name" value={seller.sellerName} />

              <InfoItem label="Email" value={seller.email} />

              <InfoItem label="Contact No" value={seller.phone} />
            </div>
          </div>

          {/* Seller Stats */}
          <div
            className="
              mt-4
              rounded-xl
              border
              border-[#666]
              bg-[#414141]
              p-4
            "
          >
            <h3
              className="
                mb-5
                text-lg
                font-semibold
                text-white
              "
            >
              Seller Stats
            </h3>

            <div className="space-y-5">
              <InfoItem
                label="Total Sales"
                value={`${seller.totalSales} orders`}
              />

              {/* Stripe */}
              <div>
                <p
                  className="
                    text-sm
                    font-medium
                    text-gray-400
                  "
                >
                  Stripe Connect Status
                </p>

                <div className="mt-2 flex items-center gap-2">
                  <span
                    className={`
                      h-3
                      w-3
                      rounded-full
                      ${
                        seller.stripeStatus === "Connected"
                          ? "bg-green-500"
                          : "bg-red-500"
                      }
                    `}
                  />

                  <span
                    className="
                      text-sm
                      text-gray-300
                    "
                  >
                    {seller.stripeStatus}
                  </span>

                  {seller.stripeStatus === "Connected" && (
                    <span className="text-sm text-gray-400">
                      : {seller.bankName}
                    </span>
                  )}
                </div>
              </div>

              <InfoItem
                label="Dispatch Location"
                value={seller.dispatchLocation}
              />
            </div>
          </div>

          {/* Close Button */}
          <button
            onClick={onClose}
            className="
              mt-6
              w-full
              rounded-xl
              bg-red-600
              py-3
              text-sm
              font-semibold
              text-white
              transition
              hover:bg-red-700
            "
          >
            Close
          </button>
        </div>
      </div>
      <LiveVideoModal
        open={showLiveVideo}
        videoUrl={seller.liveVideoUrl}
        sellerName={seller.sellerName}
        onClose={() => {
          setShowLiveVideo(false);
        }}
      />
    </div>
  );
}

function InfoItem({ label, value }: { label: string; value: string | number }) {
  return (
    <div>
      <p
        className="
          text-sm
          font-medium
          text-gray-400
        "
      >
        {label}
      </p>

      <p
        className="
          mt-1
          text-base
          font-medium
          text-white
        "
      >
        {value}
      </p>
    </div>
  );
}
