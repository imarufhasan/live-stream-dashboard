import { X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import productImage from "../../assets/images/product-demo.jpg";

type Props = {
  open: boolean;
  videoUrl?: string;
  sellerName: string;
  onClose: () => void;
};


const dummyChats = [
  {
    user: "PokeFan88",
    message: "Omgg that card condition is crazy!",
  },
  {
    user: "PokeFan88",
    message: "Amazing product 🔥",
  },
  {
    user: "PokeFan88",
    message: "How much is this?",
  },
  {
    user: "SneakerLover",
    message: "This looks premium!",
  },
  {
    user: "FashionKing",
    message: "Need this one 😍",
  },
];


export default function LiveVideoModal({
  open,
  videoUrl,
  sellerName,
  onClose,
}: Props) {

  const [messages, setMessages] = useState(dummyChats.slice(0,3));

  const chatRef = useRef<HTMLDivElement>(null);


  useEffect(() => {

    if(!open) return;


    const interval = setInterval(()=>{

      setMessages(prev=>{

        const next =
          dummyChats[
            Math.floor(
              Math.random()*dummyChats.length
            )
          ];

        return [
          ...prev,
          next
        ].slice(-5);

      });


    },2500);


    return ()=>clearInterval(interval);


  },[open]);



  if(!open || !videoUrl) return null;


  return (

    <div
      className="
      fixed
      inset-0
      z-100
      bg-black
      flex
      items-center
      justify-center
      "
    >


      <div
        className="
        relative
        h-full
        w-full
        max-w-md
        overflow-hidden
        bg-black
        "
      >


        {/* VIDEO */}

        <video
          src={videoUrl}
          autoPlay
          loop
          muted
          className="
          absolute
          inset-0
          h-full
          w-full
          object-cover
          "
        />



        {/* DARK OVERLAY */}

        <div
          className="
          absolute
          inset-0
          bg-linear-to-b
          from-black/40
          via-transparent
          to-black/60
          "
        />



        {/* TOP SELLER INFO */}

        <div
          className="
          absolute
          left-4
          top-5
          z-10
          flex
          items-center
          gap-3
          rounded-full
          bg-black/50
          px-3
          py-2
          "
        >

          <img
            src="https://i.pravatar.cc/100?img=12"
            className="
            h-10
            w-10
            rounded-full
            "
          />


          <div>

            <p className="text-sm font-semibold text-white">
              {sellerName}
            </p>


            <div className="flex items-center gap-2">

              <span
                className="
                rounded
                bg-red-600
                px-2
                py-0.5
                text-[10px]
                text-white
                "
              >
                LIVE
              </span>


              <span className="text-xs text-gray-300">
                1.8k
              </span>

            </div>

          </div>


        </div>




        {/* CLOSE */}

        <button
          onClick={onClose}
          className="
          absolute
          right-4
          top-5
          z-20
          rounded-full
          bg-black/40
          p-2
          text-white
          "
        >
          <X/>
        </button>





        {/* CHAT AREA */}

        <div
          ref={chatRef}
          className="
          absolute
          bottom-72
          left-4
          z-10
          flex
          flex-col-reverse
          gap-3
          "
        >

          {
            messages.map((chat,index)=>(

              <div
                key={index}
                className="
                max-w-70
                rounded-full
                bg-black/60
                px-4
                py-2
                text-sm
                text-white
                backdrop-blur
                "
              >

                <span className="font-bold">
                  {chat.user}
                </span>


                <span className="ml-2 text-gray-200">
                  {chat.message}
                </span>


              </div>

            ))
          }


        </div>





        {/* PRODUCT CARD */}

        <div
          className="
          absolute
          bottom-24
          left-4
          right-4
          z-10
          flex
          gap-3
          rounded-2xl
          bg-black/70
          p-3
          "
        >

          <img
            src={productImage}
            className="
            h-20
            w-20
            rounded-lg
            object-cover
            "
          />


          <div>

            <h3 className="font-bold text-white">
              Nike Sneaker
            </h3>


            <p className="text-xl font-bold text-white">
              $2.500
            </p>


            <p className="text-xs text-gray-300">
              PSA 10 Gem Mint. Extremely rare
              shadowless edition.
            </p>


          </div>

        </div>






        {/* FORCE END */}

        <button
          onClick={onClose}
          className="
          absolute
          bottom-5
          left-1/2
          z-20
          -translate-x-1/2
          rounded-full
          bg-red-600
          px-8
          py-3
          font-bold
          text-white
          "
        >
          Force End Stream
        </button>



      </div>

    </div>

  );
}