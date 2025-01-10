import * as Icons from "@/utils/icons.util"; // Import all icons as Icons
import Logo from "@/assets/images/Logo.png"; // Import the logo image

export const Header = () => {
    return (
        <header className="relative flex justify-between items-start py-2 tiny:py-3 sm:items-center text-primaryColor px-3 vsm:px-7 h-20 vsm:h-24 sm:min-h-24 sm:h-20 md:h-28 xl:h-48">
            {/* Pattern Icon */}
            <Icons.PatternIcon />

            {/* Logo and Greeting */}
            <span className="flex justify-center items-center vsm:gap-2 z-20 text-lightColor">
                <Icons.ArrowIcon />
                <img src={Logo} alt="logo" className="w-14 vsm:w-auto xl:w-20" />
                <h1 className="tiny:text-lg font-bold">Γεια σας! 👋</h1>
            </span>

            {/* Refresh and Close Icons */}
            <span className="flex justify-center items-center gap-2 vsm:gap-6 z-20 text-lightColor">
                <Icons.RefreshIcon />
                <Icons.CloseIcon />
            </span>
        </header>
    )
}
