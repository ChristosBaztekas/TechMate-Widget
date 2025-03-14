import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setChatState } from "@/store/Slices/userSlice";
import Header from "@/components/Header"; // Components
import Icon from "@/assets/images/congrats.webp"; // Image
import Footer from "../components/Footer";

export const SubmitPage = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    window.history.pushState({}, "", "/congratulations");
  }, []);

  return (
    <section className="flex flex-col h-screen overflow-hidden w-full bg-darkColor fixed bottom-0 right-0 z-50">
      <div className="flex flex-col justify-between h-full bg-primaryColor">
        <Header />

        <main className="flex flex-col justify-around items-center h-full text-lightColor mx-6 vsm:mx-5">
          <img src={Icon} alt="Congratulations" className="bg-contain w-36" loading="lazy" />
          <p className="text-center font-bold text-3xl sm:text-4xl">
            Συγχαρητήρια!
          </p>
          <div className="flex flex-col items-center w-full">
            <p className="text-center text-xl sm:text-2xl mb-6 sm:w-[85%] mt-4 font-semibold">
              Έλαβες τη προσφορά σου και θα επικοινωνήσουμε μαζί σου το
              συντομότερο δυνατό!
            </p>
            <button
              className="bg-hoverColor hover:opacity-90 text-xl font-bold text-lightColor rounded-rad h-16 sm:h-20 w-full"
              onClick={() => {
                dispatch(setChatState(true));
                window.history.pushState({}, "", "/");
                window.location.reload();
              }}
            >
              Επιστροφή στο Chat
            </button>
          </div>

          <p className="text-left font-medium text-xs my-4 vsm:my-2">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua
          </p>
        </main>

        <Footer />
      </div>
    </section>
  );
};