import { useState } from "react";
import propTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { postUserInfo } from "@/API/techMateApi";
import { useNavigate } from "react-router-dom";
import { setFormID } from "@/store/Slices/chatbotApiSlice";
import { setFormSubmitted } from "@/store/Slices/userSlice";

// Components
import Header from "./Header";
import Footer from "./Footer";

export const PhoneLayout = ({ icon }) => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { conversationId, texts } = useSelector((state) => state.chatbotApi);

  // Destructure form texts safely (with fallbacks)
  const formTexts = texts?.forms?.["form-a"]?.form || {};
  const {
    input1 = "Ονοματεπώνυμο",
    input2 = "Τηλέφωνο*",
    buttonLeft = "Newsletter!",
    buttonRight = "Λάβε ΠΡΟΣΦΟΡΑ!",
    disclaimerText = "",
    icon: formIcon, // from API
  } = formTexts;

  // Prioritize API icon, fallback to prop icon
  const displayedIcon = formIcon || icon;

  const handleSend = async () => {
    if (!name || !phone) return;

    try {
      const response = await postUserInfo(conversationId, name, phone);
      dispatch(setFormID(response.form_id));
      dispatch(setFormSubmitted(true));
      navigate("/submitted", { state: { formType: "form-a" } });
      console.log(response);
    } catch (error) {
      console.error("Error while posting user info", error);
    }
  };

  return (
    <section className="flex flex-col h-screen w-full bg-primaryColor fixed bottom-0 right-0 z-50 overflow-x-hidden">
      <div className="flex flex-col justify-between h-full">
        <Header />

        <main className="flex flex-col justify-around overflow-scroll items-center h-full text-lightColor mx-5">
          <img
            src={displayedIcon}
            alt="phone"
            className="vsm:w-40"
            loading="lazy"
          />
          <div className="w-full">
            <input
              placeholder={input1}
              className="bg-lightColor text-xl p-5 text-black/70 rounded-rad w-full mb-4 outline-none"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <input
              placeholder={input2}
              className="bg-lightColor text-xl p-5 text-black/70 rounded-rad w-full outline-none"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />

            <div className="w-full flex flex-col vsm:flex-row gap-2 sm:gap-5 mt-5">
              <button
                className="bg-lightColor hover:opacity-90 text-xl sm:text-2xl font-bold text-hoverColor rounded-rad h-16 w-full"
                onClick={() => navigate("/newsletter")}
              >
                {buttonLeft}
              </button>
              <button
                className="text-xl sm:text-2xl font-bold text-lightColor bg-hoverColor hover:opacity-90 rounded-rad h-16 w-full"
                style={{ boxShadow: "0px 4px 4px 0px #00000040" }}
                onClick={handleSend}
              >
                {buttonRight}
              </button>
            </div>
          </div>

          <p className="text-left font-medium text-xs my-2">
            {disclaimerText}
          </p>
        </main>

        <Footer />
      </div>
    </section>
  );
};

// Prop types validation
PhoneLayout.propTypes = {
  icon: propTypes.string.isRequired, // Expecting fallback icon prop
};