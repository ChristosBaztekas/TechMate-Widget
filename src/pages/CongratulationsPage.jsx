import * as Icons from "@/utils/icons.util"; // Import all icons as Icons
import Logo from "@/assets/images/Logo.png"; // Import the logo image
import { useDispatch } from "react-redux";
import { setChatState } from "@/store/Slices/userSlice";
import { useNavigate } from "react-router-dom";

export const CongratulationsPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  return (
    <section className="flex flex-col h-screen overflow-hidden w-full bg-darkColor fixed bottom-0 right-0 z-50">
      <div className="flex flex-col justify-between h-full bg-[#501AC8]">
        <header className="relative flex justify-between items-center text-primaryColor py-4 px-5 vsm:px-7 bg-primaryColor transition-all">
          {/* Logo and Greeting */}
          <div className="flex justify-center items-center z-20 text-lightColor my-1">
            <button
              className="cursor-pointer hover:text-hoverColor"
              aria-label="Go back"
            >
              <Icons.ArrowIcon />
            </button>
            <img src={Logo} alt="logo" className="w-[73px] vsm:w-20" />
            <h1 className="text-lg font-bold">Γεια σας! 👋</h1>
          </div>

          {/* Close Icon */}
          <button
            className="hover:text-hoverColor cursor-pointer text-lightColor z-20 my-5"
            onClick={() => {
              dispatch(setChatState(true));
              navigate("/");
            }}
          >
            <Icons.CloseIcon />
          </button>
        </header>

        <main className="flex flex-col justify-around items-stretch h-full text-lightColor mx-5 vsm:mx-10">
          <p className="text-center font-bold text-3xl vsm:text-4xl">
            Συγχαρητήρια!
          </p>
          <p className="text-center font-bold text-8xl text-hoverColor">6</p>
          <div>
            <p className="text-center text-2xl mb-9">
              Συμπλήρωσε το τηλέφωνό σου για να σε καλέσουμε και να σε
              ενημερώσουμε για τη προσφορά σου!
            </p>
            <button className="bg-lightColor hover:bg-lightColor/85 text-xl font-black text-footerColor rounded-xl h-20 w-full">
              Θέλω ΠΡΟΣΦΟΡΑ!
            </button>
          </div>
        </main>

        <footer className="flex justify-center items-center font-light text-sm border border-primaryColor text-lightColor bg-footerColor p-1">
          Supported by TechMate
        </footer>
      </div>
    </section>
  );
};
