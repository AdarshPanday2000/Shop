import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { cartPhoto } from "../assets";
import CartItem from "../components/CartItem";
import { ToastContainer, toast } from "react-toastify";
import StripeCheckout from "react-stripe-checkout";
import axios from "axios";

function Cart() {
  const userInfo = useSelector((state) => state.shop.userInfo);
  const productData = useSelector((state) => state.shop.productData);
  const [totalAmount, setTotalAmount] = useState("");
  const [payNow, setPayNow] = useState(false);

  useEffect(() => {
    let price = 0;
    productData.map((item) => {
      price += item.price * item.quantity;
      return price;
    });
    setTotalAmount(price.toFixed(2));
  }, [productData]);

  function handleCheckout() {
    if (userInfo) {
      setPayNow(true);
    } else {
      toast.error("Please sign in to checkout");
    }
  }

  const payment = async (token) => {
    await axios.post("https://shop-api-azure-tau.vercel.app/pay", {
      amount: totalAmount * 100, //its calculating in cents, so change in usd
      token: token,
    });
  };

  return (
    <div>
      <img className="w-full h-60 object-cover" src={cartPhoto} />
      <div className="max-w-screen-xl mx-auto py-20 flex">
        <CartItem />
        <div className="w-1/3 bg-[#fafafa] py-6 px-4">
          <div className="flex flex-col gap-6 border-b-[1px] border-b-gray-400 pb-6">
            <h2 className="text-2xl font-medium">Cart totals</h2>
            <p className="flex items-center gap-4 text-base">
              Subtotal{" "}
              <span className="font-titleFont font-bold text-lg">
                $ {totalAmount}
              </span>
            </p>
            <p className="flex items-start gap-4 text-base">
              Shipping{" "}
              <span>
                Lorem ipsum dolor sit amet consectetur, adipisicing elit.
              </span>
            </p>
          </div>
          <p className="font-titleFont font-bold flex justify-between mt-6">
            Total<span className="text-xl font-bold">$ {totalAmount}</span>
          </p>
          <button
            onClick={handleCheckout}
            className="text-base bg-black text-white w-full py-3 mt-6 hover:bg-gray-800 duration-200"
          >
            Proceed to checkout
          </button>
          {payNow && (
            <div className="w-full mt-6 flex items-center justify-center">
              <StripeCheckout
                stripeKey="pk_test_51OeelXSAtZIWkNZCCI4UzQ8IuxujogLLvIGCchWA8wqrprD3V6YbP34j9abUZkEUTYIr4efFTI7ZqPuSg1a6FEB70014CV32bI"
                name="Shop Online"
                amount={totalAmount * 100}
                label="Pay to eShop"
                description={`Your payment amount is $${totalAmount}`}
                token={payment}
                email={userInfo.email}
              />
            </div>
          )}
        </div>
      </div>
      <ToastContainer
        position="top-left"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </div>
  );
}

export default Cart;
