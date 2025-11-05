import React, { useContext, useState } from "react";
import ai from "../assets/ai.png";
import { shopDataContext } from "../context/ShopContext";
import { authDataContext } from "../context/authContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import open from "../assets/open.mp3";

function Ai() {
  const { showSearch, setShowSearch, getCartAmount, cartItem } =
    useContext(shopDataContext);
  const { orderData } = useContext(authDataContext); // Assuming orderData is in context
  const navigate = useNavigate();
  const [activeAi, setActiveAi] = useState(false);
  const openingSound = new Audio(open);

  function speak(message) {
    const utterance = new SpeechSynthesisUtterance(message);
    window.speechSynthesis.speak(utterance);
  }

  const speechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  const recognition = new speechRecognition();
  if (!recognition) {
    console.log("Speech recognition not supported");
  }

  recognition.onresult = (e) => {
    const transcript = e.results[0][0].transcript.trim().toLowerCase();

    if (transcript.includes("search") && transcript.includes("open") && !showSearch) {
      speak("Opening search");
      setShowSearch(true);
      navigate("/collection");
    } else if (transcript.includes("search") && transcript.includes("close") && showSearch) {
      speak("Closing search");
      setShowSearch(false);
    } else if (
      transcript.includes("collection") ||
      transcript.includes("collections") ||
      transcript.includes("product") ||
      transcript.includes("products")
    ) {
      speak("Opening collection page");
      navigate("/collection");
    } else if (transcript.includes("about") || transcript.includes("aboutpage")) {
      speak("Opening about page");
      navigate("/about");
      setShowSearch(false);
    } else if (transcript.includes("home") || transcript.includes("homepage")) {
      speak("Opening home page");
      navigate("/");
      setShowSearch(false);
    } else if (transcript.includes("cart") || transcript.includes("kaat") || transcript.includes("caat")) {
  const total = getCartAmount();
  const deliveryFee = 40; // or use shopDataContext.delivery_fee if available
  const finalTotal = total + deliveryFee;
  const itemCount = Object.keys(cartItem).reduce((acc, key) => {
    const sum = Object.values(cartItem[key]).reduce((a, b) => a + b, 0);
    return acc + sum;
  }, 0);
  speak(`You have ${itemCount} items in your cart. Total amount is ${total} rupees. Including delivery charges of ${deliveryFee} rupees, the final amount is ${finalTotal} rupees.`);
  navigate("/cart");
  setShowSearch(false);
}
else if (
      transcript.includes("order") ||
      transcript.includes("myorders") ||
      transcript.includes("orders") ||
      transcript.includes("my order")
    ) {
      const orderCount = orderData?.length || 0;
      speak(`You have ${orderCount} orders. Opening your orders page.`);
      navigate("/order");
      setShowSearch(false);
    } else if (transcript.includes("contact")) {
      speak("Opening contact page");
      navigate("/contact");
      setShowSearch(false);
    } else {
      toast.error("Try Again");
    }
  };

  recognition.onend = () => {
    setActiveAi(false);
  };

  return (
    <div
      className="fixed lg:bottom-[20px] md:bottom-[40px] bottom-[80px] left-[2%]"
      onClick={() => {
        recognition.start();
        openingSound.play();
        setActiveAi(true);
      }}
    >
      <img
        src={ai}
        alt=""
        className={`w-[100px] cursor-pointer ${
          activeAi
            ? "translate-x-[10%] translate-y-[-10%] scale-125"
            : "translate-x-[0] translate-y-[0] scale-100"
        } transition-transform`}
        style={{
          filter: `${activeAi ? "drop-shadow(0px 0px 30px #00d2fc)" : "drop-shadow(0px 0px 20px black)"}`,
        }}
      />
    </div>
  );
}

export default Ai;
