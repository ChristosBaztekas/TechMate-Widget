import { useState } from "react";
import propTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux"
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
  const { conversationId } = useSelector((state) => state.chatbotApi);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSend = async () => {
    if (!name || !phone) return;

    try {
      const response = await postUserInfo(conversationId, name, phone);
      dispatch(setFormID(response.form_id));
      dispatch(setFormSubmitted(true));
      navigate("/submitted");
      console.log(response);
    } catch (error) {
      console.error("Error while posting user info", error);
    }
  };

  return (
    <section className="flex flex-col h-screen w-full bg-primaryColor fixed bottom-0 right-0 z-50 overflow-x-hidden">
      <div className="flex flex-col justify-between h-full">
        <Header />

        <main className="flex flex-col justify-around  overflow-scroll items-center h-full text-lightColor mx-5">
          <img src={icon} alt="phone" className="vsm:w-40" />
          <div className="w-full">
            <input
              placeholder="Ονοματεπώνυμο"
              className="bg-lightColor text-xl p-5 text-black/70 rounded-rad w-full mb-4 outline-none"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <input
              placeholder="Τηλέφωνο*"
              className="bg-lightColor text-xl p-5 text-black/70 rounded-rad w-full outline-none"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
            <div className="w-full flex flex-col vsm:flex-row gap-2 sm:gap-5 mt-5">
              <button
                className="bg-lightColor hover:bg-lightColor/85 text-xl sm:text-2xl font-bold text-hoverColor rounded-rad h-16 w-full"
                onClick={() => navigate("/newsletter")}
              >
                Newsletter!
              </button>
              <button
                className="text-xl sm:text-2xl font-bold text-lightColor bg-hoverColor hover:bg-hoverColor/70 rounded-rad h-16 w-full"
                style={{ boxShadow: "0px 4px 4px 0px #00000040" }}
                onClick={handleSend}
              >
                Λάβε ΠΡΟΣΦΟΡΑ!
              </button>
            </div>
          </div>
          <p className="text-left font-medium text-xs my-2">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua
          </p>
        </main>

        <Footer />
      </div>
    </section>
  );
};

PhoneLayout.propTypes = {
  icon: propTypes.string.isRequired,
};
