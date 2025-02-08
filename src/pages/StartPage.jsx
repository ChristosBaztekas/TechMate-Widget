import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setChatState } from "@/store/Slices/userSlice";
import propTypes from "prop-types";
import * as Icons from "@/utils/icons.util"; // Import all icons
import Logo from "@/assets/images/Logo.png"; // Import logo image

export const StartPage = ({ radius = "10px" }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Function to refresh the page
  const refreshPage = () => navigate(0);

  return (
    <section className="flex flex-col h-screen overflow-hidden w-full bg-darkColor fixed bottom-0 right-0 z-50 rounded-rad">
      <header className="relative flex justify-between items-start vsm:items-center text-primaryColor py-3 px-5 vsm:px-7 h-20 transition-all">
        {/* Pattern Icon */}
        <span className="absolute right-0 left-0 top-0 w-full h-fit">
          <Icons.PatternIcon />
        </span>

        {/* Logo and Greeting */}
        <div className="flex justify-center items-center z-20 text-lightColor">
          <button
            className="cursor-pointer hover:text-hoverColor"
            onClick={() => {
              dispatch(setChatState(true));
              navigate("/");
            }}
            aria-label="Go back"
          >
            <Icons.ArrowIcon />
          </button>
          <img src={Logo} alt="logo" className="w-16 vsm:w-auto" />
          <h1 className="font-bold">Γεια σας! 👋</h1>
        </div>

        {/* Refresh and Close Icons */}
        <div className="flex justify-center items-center gap-2 z-20 text-lightColor">
          <button
            className="cursor-pointer hover:text-hoverColor hover:animate-spin"
            onClick={refreshPage}
            aria-label="Refresh page"
          >
            <Icons.RefreshIcon />
          </button>
          <button
            className="hover:text-hoverColor cursor-pointer"
            onClick={() => {
              dispatch(setChatState(true));
              navigate("/");
            }}
            aria-label="Close"
          >
            <Icons.CloseIcon />
          </button>
        </div>
      </header>

      <main className="flex flex-col gap-5 px-4 py-4 sm:px-8 overflow-scroll overflow-x-hidden flex-grow">
        {/* Chat Section */}
        <section className="flex justify-start items-start gap-2 sm:gap-4">
          {/* Logo Container */}
          <div className="flex justify-center items-center flex-shrink-0 w-12 h-12 mt-2 bg-lightColor rounded-full text-sm font-light">
            Logo
          </div>
          {/* Chat Message */}
          <p className="w-full bg-lightColor sm:text-lg text-darkColor font-light p-4 rounded-[20px]">
            <span className="block mb-4">Γεια σας!</span>
            Είμαι εδώ για να κάνω τη ζωή σας πιο εύκολη και να απαντήσω σε όλες
            τις απορίες σας σχετικά με ασφάλειες και καλύψεις.
          </p>
        </section>

        {/* Choose Section */}
        <section className="flex flex-col justify-center items-end gap-2 sm:gap-3 text-xs">
          {[
            {
              text: "Τι χρειάζεται για να κάνω μία ασφάλεια;",
              path: "/first",
            },
            {
              text: "Μόλις τράκαρα. Τι πρέπει να κάνω;",
              path: "/second",
            },
            {
              text: "Τι χρειάζεται για να κάνω μία ασφάλεια;",
              path: "/third",
            },
            {
              text: "Τι χρειάζεται για να κάνω",
              path: "/fourth",
            },
            {
              text: "Τι χρειάζεται",
              path: "/newsletter",
            },
            {
              text: "Τι χρειάζεται για να κάνω μία ;",
              path: "/submit",
            },
          ].map((item, index) => (
            // Option Container
            <Link to={item.path} key={index}>
              <p
                style={{ borderRadius: radius }}
                className="w-fit text-lightColor border border-primaryColor hover:bg-primaryColor text-center px-4 py-3 cursor-pointer transition-all"
              >
                {item.text}
              </p>
            </Link>
          ))}
        </section>
      </main>

      <div className="flex p-6 justify-center items-start bg-gradient-to-r from-primaryColor to-gradientColor h-18">
        {/* Textarea for typing the message */}
        <textarea
          placeholder="Πληκτρολογήστε την ερώτησή σας..."
          className="w-full min-h-10 max-h-24 text-sm vsm:text-base rounded-[20px] pl-5 p-2 outline-none resize-none overflow-hidden"
          aria-label="Message input field"
          rows={1} // Initial height of the textarea
          onInput={(e) => {
            // Adjust the height of the textarea based on its content
            e.target.style.height = "auto";
            e.target.style.height = `${e.target.scrollHeight}px`;
          }}
        />
        {/* Submit button for sending the message */}
        <button
          type="submit"
          className="ml-6 mt-2 text-white font-bold hover:text-hoverColor"
        >
          Send
        </button>
      </div>

      <footer className="flex justify-center items-center font-light text-sm border border-primaryColor text-lightColor bg-footerColor p-1">
        Supported by TechMate
      </footer>
    </section>
  );
};

StartPage.propTypes = {
  radius: propTypes.string,
};
