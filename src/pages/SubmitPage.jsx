import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { setChatState } from "@/store/Slices/userSlice";
import Header from "@/components/Header";
import Footer from "../components/Footer";

export const SubmitPage = () => {
  const dispatch = useDispatch();
  const location = useLocation();

  // Get formType from navigate state (sent when navigating)
  const { formType } = location.state || {};

  // Get chatbot texts data from Redux store
  const { texts } = useSelector((state) => state.chatbotApi);

  // Completion data based on the formType
  const completionData =
    texts?.forms?.[formType]?.completion || {
      // Fallback data if no formType or completion data found
      icon: "https://data.techmate.gr/icons/congrats.webp",
      title: "Συγχαρητήρια!",
      description:
        "Έλαβες τη προσφορά σου και θα επικοινωνήσουμε μαζί σου το συντομότερο δυνατό!",
      button: "Επιστροφή στο Chat",
      disclaimerText:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    };

  useEffect(() => {
    // Update URL without reloading the page
    window.history.pushState({}, "", "/congratulations");
  }, []);

  return (
    <section className="flex flex-col h-screen overflow-hidden w-full bg-darkColor fixed bottom-0 right-0 z-50">
      <div className="flex flex-col justify-between h-full bg-primaryColor">
        {/* Header component */}
        <Header />

        <main className="flex flex-col justify-around items-center h-full text-lightColor mx-6 vsm:mx-5">
          {/* Completion icon */}
          <img
            src={completionData.icon}
            alt="Congratulations"
            className="bg-contain w-36"
            loading="lazy"
          />

          {/* Completion title */}
          <p className="text-center font-bold text-3xl sm:text-4xl">
            {completionData.title}
          </p>

          {/* Description and action button */}
          <div className="flex flex-col items-center w-full">
            <p className="text-center text-xl sm:text-2xl mb-6 sm:w-[85%] mt-4 font-semibold">
              {completionData.description}
            </p>

            <button
              className="bg-hoverColor hover:opacity-90 text-xl font-bold text-lightColor rounded-rad h-16 sm:h-20 w-full"
              onClick={() => {
                // Open chat state and reload home page
                dispatch(setChatState(true));
                window.history.pushState({}, "", "/");
                window.location.reload();
              }}
            >
              {completionData.button}
            </button>
          </div>

          {/* Disclaimer text */}
          <p className="text-left font-medium text-xs my-4 vsm:my-2">
            {completionData.disclaimerText}
          </p>
        </main>

        {/* Footer component */}
        <Footer />
      </div>
    </section>
  );
};