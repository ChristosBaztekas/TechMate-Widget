import Header from "./Header";
import Footer from "./Footer";
import propTypes from "prop-types";
import { postUserEmail } from "@/API/techMateApi";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setFormID } from "@/store/Slices/chatbotApiSlice";
import { setFormSubmitted } from "@/store/Slices/userSlice";
import { useState } from "react";

export const EmailLayout = ({ icon }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");

  const { conversationId } = useSelector((state) => state.chatbotApi);

  const handleSend = async () => {
    if (!email) return;

    try {
      const response = await postUserEmail(conversationId, email);
      dispatch(setFormID(response.form_id));
      dispatch(setFormSubmitted(true));
      navigate("/submitted");
      console.log(response);
    } catch (error) {
      console.error("Error while posting user email", error);
    }
  };

  return (
    <section className="flex flex-col h-screen w-full bg-darkColor fixed bottom-0 right-0 z-50 overflow-x-hidden rounded-rad">
      <div className="flex flex-col justify-between h-full bg-primaryColor">
        <Header />

        <main className="flex flex-col justify-around items-center overflow-scroll h-full text-lightColor mx-5">
          <img src={icon} alt="email" className="vsm:w-40" />
          <div className="w-full mt-8">
            <input
              placeholder="E-mail"
              type="email"
              className="bg-lightColor text-xl p-5 text-black/70 rounded-rad h-20 vsm:h-[70px] w-full mb-4 outline-none"
              aria-label="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <div className="w-full flex mt-1">
              <button
                className="bg-lightColor hover:bg-lightColor/85 text-2xl font-black text-footerColor rounded-rad h-20 vsm:h-[70px] w-full"
                aria-label="I want an OFFER!"
                onClick={handleSend}
              >
                Θέλω ΠΡΟΣΦΟΡΑ!
              </button>
            </div>
          </div>
          <p className="text-left font-medium text-xs">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua
          </p>
        </main>

        <Footer />
      </div>
    </section>
  );
};

EmailLayout.propTypes = {
  icon: propTypes.string.isRequired,
};
