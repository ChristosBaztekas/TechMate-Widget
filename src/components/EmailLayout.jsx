import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import propTypes from "prop-types";
import { postUserEmail, postUserPhone } from "@/API/techMateApi";
import { setFormID } from "@/store/Slices/chatbotApiSlice";
import { setFormSubmitted } from "@/store/Slices/userSlice";
// Components
import Header from "./Header";
import Footer from "./Footer";

export const EmailLayout = ({ emailIcon, mobileIcon }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [localFormId, setLocalFormId] = useState("");

  const { conversationId } = useSelector((state) => state.chatbotApi);

  const handleSendEmail = async () => {
    if (!email) return;

    try {
      const response = await postUserEmail(conversationId, email);

      if (response?.form_id) {
        setLocalFormId(response.form_id);
        dispatch(setFormID(response.form_id));
        setStep(2);
      }
    } catch (error) {
      console.error("Error in handleSendEmail:", error);
    }
  };

  const handleSendPhone = async () => {
    if (!phone || !localFormId) return;

    try {
      await postUserPhone(conversationId, {
        phone,
        form_id: localFormId,
      });

      dispatch(setFormSubmitted(true));
      navigate("/submitted");
    } catch (error) {
      console.error("Error in handleSendPhone:", error);
    }
  };

  return (
    <section className="flex flex-col h-screen w-full bg-darkColor fixed bottom-0 right-0 z-50 overflow-x-hidden rounded-rad">
      <div className="flex flex-col justify-between h-full bg-primaryColor">
        <Header />

        <main className="flex flex-col justify-around items-center overflow-scroll h-full text-lightColor mx-5">
          <img
            src={step === 1 ? emailIcon : mobileIcon}
            alt={step === 1 ? "email" : "phone"}
            className="vsm:w-40"
            loading="lazy"
          />

          {step === 1 ? (
            <div className="w-full mt-8">
              <input
                placeholder="E-mail"
                type="email"
                className="bg-lightColor text-xl p-5 text-black/70 rounded-rad h-20 vsm:h-[70px] w-full mb-4 outline-none border border-transparent"
                aria-label="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <div className="w-full flex mt-1">
                <button
                  className="bg-lightColor hover:opacity-90 text-2xl font-semibold text-footerColor rounded-rad h-20 vsm:h-[70px] w-full"
                  aria-label="I want an OFFER!"
                  onClick={handleSendEmail}
                >
                  Θέλω ΠΡΟΣΦΟΡΑ!
                </button>
              </div>
            </div>
          ) : (
            <div className="w-full mt-8">
              <input
                placeholder="Phone Number"
                type="tel"
                className="bg-lightColor text-xl p-5 text-black/70 rounded-rad h-20 vsm:h-[70px] w-full mb-4 outline-none border border-transparent"
                aria-label="Phone Number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
              <div className="w-full flex mt-1">
                <button
                  className="bg-lightColor hover:opacity-90 text-2xl font-semibold text-footerColor rounded-rad h-20 vsm:h-[70px] w-full"
                  aria-label="Send Phone Number"
                  onClick={handleSendPhone}
                >
                  Υποβάλλω!
                </button>
              </div>
            </div>
          )}

          <p className="text-left font-medium text-xs">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua
          </p>
        </main>

        <Footer />
      </div>
    </section>
  );
};

EmailLayout.propTypes = {
  emailIcon: propTypes.string.isRequired,
  mobileIcon: propTypes.string.isRequired,
};