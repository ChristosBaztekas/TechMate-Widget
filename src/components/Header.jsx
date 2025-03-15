import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setChatState } from "@/store/Slices/userSlice";
import * as Icons from "@/utils/icons.util"; // Import all icons as Icons
import Logo from "@/assets/images/Logo.webp"; // Import the logo image

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { logoUrl } = useSelector((state) => state.chatbotApi);

  return (
    <header className="relative flex justify-between items-center text-primaryColor py-2 px-5 vsm:px-7 bg-primaryColor transition-all">
      {/* Logo and Greeting */}
      <div className="flex justify-center items-center gap-3 z-20 text-lightColor my-1 p-2 vsm:p-0">
        <button
          className="cursor-pointer hover:text-hoverColor"
          aria-label="Go back"
          onClick={() => {
            navigate("/");
            dispatch(setChatState(false));
          }}
        >
          <Icons.ArrowIcon />
        </button>
        <img
          src={logoUrl || Logo}
          alt="logo"
          className="w-12 cursor-pointer hover:cursor-pointer hover:scale-95 transition-all duration-300" loading="lazy"
          onClick={() => {
            dispatch(setChatState(false));
            navigate("/first");
          }}
        />
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
  );
};

export default Header;