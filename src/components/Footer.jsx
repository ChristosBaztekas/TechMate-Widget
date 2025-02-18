import { useNavigate } from "react-router-dom";

const Footer = () => {
  const navigate = useNavigate();

  return (
    <footer
      className="flex justify-center items-center font-light text-sm border border-primaryColor text-lightColor bg-footerColor py-1 w-full"
      onClick={() => {
        navigate("/first");
      }}
    >
      Supported by TechMate
    </footer>
  );
};

export default Footer;
