import * as Icons from "@/utils/icons.util"; // Import all icons as Icons
import Logo from "@/assets/images/Logo.png"; // Import the logo image
import Phone from "@/assets/images/phone.png";

export const PhonePage = ({ handleClose, state }) => {
    return (
        <div className="flex flex-col justify-between h-full bg-[#501AC8]">
            <header className="relative flex justify-between items-start py-2 tiny:py-3 text-primaryColor px-3 vsm:px-7 bg-primaryColor transition-all">

                {/* Logo and Greeting */}
                <div className="flex justify-center items-center z-20 text-lightColor my-1">
                    <Icons.ArrowIcon />
                    <img src={Logo} alt="logo" className="w-14 vsm:w-auto xl:w-20" />
                    <h1 className="text-lg font-bold">Γεια σας! 👋</h1>
                </div>

                {/* Close Icon */}
                <button className="hover:text-red-800 cursor-pointer hover:scale-125 text-lightColor z-20 my-5" onClick={() => handleClose(!state)}>
                    <Icons.CloseIcon />
                </button>
            </header>

            <main className="flex flex-col justify-around items-center h-full text-lightColor mx-5">
                <img src={Phone} alt="logo" className="w-44" />
                <span className="w-full">
                    <input placeholder="Ονοματεπώνυμο" className="bg-lightColor text-xl p-5 text-footerColor rounded-xl h-20 w-full mb-3" />
                    <input placeholder="Τηλέφωνο*" className="bg-lightColor text-xl p-5 text-footerColor rounded-xl h-20 w-full mb-3" />
                    <span className="w-full flex gap-5">
                        <button className="bg-lightColor text-2xl font-bold text-hoverColor rounded-xl h-20 w-full">Newsletter!</button>
                        <button className="text-2xl font-bold text-lightColor bg-hoverColor rounded-xl h-20 w-full">Λάβε ΠΡΟΣΦΟΡΑ!</button>
                    </span>
                </span>
                <p className="text-left font-bold text-xs">Συμπλήρωσε το τηλέφωνό σου για να σε καλέσουμε και να σε ενημερώσουμε για τη προσφορά σου!</p>
            </main>

            <footer className="flex justify-center items-center font-light text-sm border border-primaryColor text-lightColor bg-footerColor h-[30px]">
                www.techai.gr
            </footer>
        </div>
    )
}
