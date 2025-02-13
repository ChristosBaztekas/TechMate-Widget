import { useDispatch } from "react-redux";
import { setChatState } from "@/store/Slices/userSlice";
import { useNavigate } from "react-router-dom";
import * as Icons from "@/utils/icons.util"; // Import all icons as Icons
import Logo from "@/assets/images/Logo.png"; // Import the logo image

export const WelcomePage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  return (
    <section className="flex flex-col h-screen w-full bg-darkColor fixed bottom-0 right-0 z-50 rounded-rad">
      <div className="flex flex-col justify-between h-full">
        <header className="relative flex justify-between items-start py-3 text-primaryColor px-5 vsm:px-7 bg-primaryColor transition-all">
          {/* Pattern Icon */}
          <span className="absolute right-0 left-0 -bottom-12 vsm:-bottom-16 w-full h-fit">
            <Icons.PatternIcon />
          </span>

          {/* Logo and Greeting */}
          <div className="flex flex-col justify-center items-start vsm:gap-2 z-20 text-lightColor">
            <img
              src={Logo}
              alt="logo"
              className="w-14 vsm:w-auto xl:w-20 my-5"
              onClick={() => {
                dispatch(setChatState(false));
                navigate("/first");
              }}
            />
            <h1 className="text-3xl font-bold ml-5">Γεια σας! 👋</h1>
            <h2 className="text-lg sm:text-xl my-4 vsm:my-1 ml-5">
              Καλωσήρθατε στην υποστήριξη της TechMate! Είμαστε στη διάθεσή σας!
            </h2>
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

        <aside className="flex justify-between items-center p-3 sm:max-h-[62px] bg-lightColor z-50 mx-8 sm:mx-20 rounded-[10px]">
          <div>
            <p className="text-lg font-semibold">Επιστροφή στο Chat</p>
            <p className="text-xs text-darkColor/70 font-medium max-w-64 vsm:max-w-max">
              Μην ανησυχείτε, δεν έχετε χάσει την συνομιλία σας!
            </p>
          </div>
          <span className="text-primaryColor hover:text-hoverColor cursor-pointer">
            <Icons.SendIcon />
          </span>
        </aside>

        <main className="sm:flex flex-col vsm:flex-row text-lightColor overflow-scroll justify-evenly mx-10">
          <section className="flex flex-col gap-5 justify-center items-center p-5">
            <Icons.ClockIcon />
            <p className="max-w-24 text-center text-sm">
              Υποστήριξη όλο το 24ωρο
            </p>
          </section>
          <section className="flex flex-col gap-5 justify-center items-center p-5">
            <Icons.PaintIcon />
            <p className="max-w-24 text-center text-sm">Προσωπική διαμόρφωση</p>
          </section>
          <section className="flex flex-col gap-5 justify-center items-center p-5">
            <Icons.CalenderIcon />
            <p className="max-w-24 text-center text-sm">Δημιουργία ραντεβού</p>
          </section>
        </main>

        <footer className="flex justify-center items-center font-light text-sm border border-primaryColor text-lightColor bg-footerColor p-1">
          www.techai.gr
        </footer>
      </div>
    </section>
  );
};
