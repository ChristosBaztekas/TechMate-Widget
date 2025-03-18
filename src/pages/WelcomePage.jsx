import { useDispatch, useSelector } from "react-redux";
import { setChatState } from "@/store/Slices/userSlice";
import { Link, useNavigate } from "react-router-dom";
import * as Icons from "@/utils/icons.util";
import Logo from "@/assets/images/Logo.webp";

export const WelcomePage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { logoUrl, texts } = useSelector((state) => state.chatbotApi);

  // Destructure texts from `welcome` instead of `greetings`
  const welcome = texts?.welcome || {};

  const header = welcome.header || "Γεια σας! 👋";
  const subHeader =
    welcome.subHeader ||
    "Καλωσήρθατε στην υποστήριξη της TechMate! Είμαστε στη διάθεσή σας!";
  const returnToChatTitle = welcome.returnToChatTitle || "Επιστροφή στο Chat";
  const returnToChatDesc =
    welcome.returnToChatDesc ||
    "Μην ανησυχείτε, δεν έχετε χάσει την συνομιλία σας!";
  const support24hTitle = welcome.support24hTitle || "Υποστήριξη όλο το 24ωρο";
  const personalizationTitle =
    welcome.personalizationTitle || "Προσωπική διαμόρφωση";
  const createAppointmentTitle =
    welcome.createAppointmentTitle || "Δημιουργία ραντεβού";
  const footerText = welcome.footerText || "www.techai.gr";

  return (
    <section className="flex flex-col h-screen w-full bg-darkColor fixed bottom-0 right-0 z-50">
      <div className="flex flex-col justify-between h-full">
        {/* Header */}
        <header className="relative flex justify-between items-start py-3 text-primaryColor px-5 vsm:px-7 bg-primaryColor transition-all">
          {/* Pattern Icon */}
          <span className="absolute right-0 left-0 -bottom-12 vsm:-bottom-16 w-full h-fit">
            <Icons.PatternIcon />
          </span>

          {/* Logo and Welcome Text */}
          <div className="flex flex-col justify-center items-start vsm:gap-2 z-20 text-lightColor">
            <img
              src={logoUrl || Logo}
              alt="logo"
              className="w-14 vsm:w-auto xl:w-20 my-5"
              loading="lazy"
              onClick={() => {
                dispatch(setChatState(false));
                navigate("/first");
              }}
            />
            <h1 className="text-3xl font-bold ml-5">{header}</h1>
            <h2 className="text-lg sm:text-xl my-4 vsm:my-1 ml-5">
              {subHeader}
            </h2>
          </div>

          {/* Close Button */}
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

        {/* Return to Chat Button */}
        <Link
          to="/"
          onClick={() => dispatch(setChatState(false))}
          className="group flex justify-between items-center p-3 sm:max-h-[62px] bg-lightColor z-50 mx-8 sm:mx-20 rounded-rad"
        >
          <div>
            <p className="text-lg font-semibold">{returnToChatTitle}</p>
            <p className="text-xs text-darkColor/70 font-medium max-w-64 vsm:max-w-max">
              {returnToChatDesc}
            </p>
          </div>
          <span className="group-hover:text-hoverColor text-primaryColor cursor-pointer group-hover:rotate-[35deg] transition-all">
            <Icons.SendIcon />
          </span>
        </Link>

        {/* Main Links */}
        <main className="sm:flex flex-col vsm:flex-row text-lightColor overflow-scroll justify-evenly mx-10">
          <Link
            to="https://techai.gr/el/"
            target="_blank"
            className="flex flex-col gap-5 justify-center items-center p-5 hover:text-primaryColor transition-all"
          >
            <Icons.ClockIcon />
            <p className="max-w-24 text-center text-sm">{support24hTitle}</p>
          </Link>

          <Link
            to="https://techai.gr/el/"
            target="_blank"
            className="flex flex-col gap-5 justify-center items-center p-5 hover:text-primaryColor transition-all"
          >
            <Icons.PaintIcon />
            <p className="max-w-24 text-center text-sm">{personalizationTitle}</p>
          </Link>

          <Link
            to="https://techai.gr/el/"
            target="_blank"
            className="flex flex-col gap-5 justify-center items-center p-5 hover:text-primaryColor transition-all"
          >
            <Icons.CalenderIcon />
            <p className="max-w-24 text-center text-sm">{createAppointmentTitle}</p>
          </Link>
        </main>

        {/* Footer */}
        <footer className="flex justify-center items-center font-light text-sm border border-primaryColor text-lightColor bg-footerColor p-1">
          {footerText}
        </footer>
      </div>
    </section>
  );
};