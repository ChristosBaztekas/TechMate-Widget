import * as Icons from "@/utils/icons.util"; // Import all icons as Icons
import Logo from "@/assets/images/Logo.png"; // Import the logo image

export const Header = ({ handleClose, state }) => {
    // Function to go back one page
    const goBack = () => {
        window.history.back();
    };

    // Function to refresh the page
    const refreshPage = () => {
        window.location.reload();
    };

    return (
        <header className="relative flex justify-between items-start py-2 tiny:py-3 sm:items-center text-primaryColor px-3 vsm:px-7 h-20 vsm:h-24 sm:min-h-24 sm:h-20 md:h-28 xl:h-48 transition-all">
            {/* Pattern Icon */}
            <Icons.PatternIcon />

            {/* Logo and Greeting */}
            <span className="flex justify-center items-center vsm:gap-2 z-20 text-lightColor">
                <span className="cursor-pointer hover:scale-125" onClick={goBack}>
                    <Icons.ArrowIcon />
                </span>
                <img src={Logo} alt="logo" className="w-14 vsm:w-auto xl:w-20" />
                <h1 className="tiny:text-lg font-bold">Γεια σας! 👋</h1>
            </span>

            {/* Refresh and Close Icons */}
            <span className="flex justify-center items-center gap-2 vsm:gap-6 z-20 text-lightColor">
                <span className="cursor-pointer hover:animate-spin" onClick={refreshPage}>
                    <Icons.RefreshIcon />
                </span>
                <span className="hover:text-red-800 cursor-pointer hover:scale-125" onClick={() => handleClose(!state)}>
                    <Icons.CloseIcon />
                </span>
            </span>
        </header>
    );
};