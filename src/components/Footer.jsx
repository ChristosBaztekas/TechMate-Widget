import { useNavigate } from "react-router-dom";

const Footer = () => {
  const navigate = useNavigate();
  return (
    <footer
      className="flex justify-center items-center border border-primaryColor bg-footerColor py-1 w-full"
    >
      <p className="text-lightColor font-light text-sm cursor-pointer" onClick={() => { navigate("/first"); }}>
        Supported by TechMate
      </p>
    </footer>
  );
};

export default Footer;