import * as Icons from "@/utils/icons.util"; // Import all icons as Icons
import Logo from "@/assets/images/Logo.png"; // Import the logo image
import { useDispatch } from "react-redux";
import { setChatState } from "@/store/Slices/userSlice";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (
    <header className="relative flex justify-between items-center text-primaryColor py-2 px-5 vsm:px-7 bg-primaryColor transition-all">
      {/* Logo and Greeting */}
      <div className="flex justify-center items-center z-20 text-lightColor my-1 p-2 vsm:p-0">
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
          src={Logo}
          alt="logo"
          className="w-[73px] vsm:w-20 hover:cursor-pointer hover:scale-95 transition-all duration-300"
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
