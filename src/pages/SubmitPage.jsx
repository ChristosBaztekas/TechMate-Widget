import Header from "@/components/Header";
import Icon from "@/assets/images/congrats.png";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setChatState } from "@/store/Slices/userSlice";

export const SubmitPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  return (
    <section className="flex flex-col h-screen overflow-hidden w-full bg-darkColor fixed bottom-0 right-0 z-50 rounded-rad">
      <div className="flex flex-col justify-between h-full bg-[#501AC8]">
        <Header />

        <main className="flex flex-col justify-around items-center h-full text-lightColor mx-6 vsm:mx-5">
          <img
            src={Icon}
            alt="Congratulations"
            className="bg-contain vsm:w-36 vsm:h-36"
          />
          <p className="text-center font-bold text-4xl vsm:text-4xl">
            Συγχαρητήρια!
          </p>
          <div className="flex flex-col items-center w-full">
            <p className="text-center text-2xl mb-6 w-[85%] mt-4 font-bold">
              Έλαβες τη προσφορά σου και θα επικοινωνήσουμε μαζί σου το
              συντομότερο δυνατό!
            </p>
            <button
              className="bg-hoverColor hover:bg-hoverColor/85 text-xl font-bold text-white rounded-xl h-20 w-full"
              onClick={() => {
                dispatch(setChatState(false));
                navigate("/");
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

        <footer className="flex justify-center items-center font-light text-sm border border-primaryColor text-lightColor bg-footerColor p-1">
          Supported by TechMate
        </footer>
      </div>
    </section>
  );
};
