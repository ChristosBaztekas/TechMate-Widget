import * as Icons from "@/utils/icons.util"; // Import all icons as Icons
import Logo from "@/assets/images/Logo.png"; // Import the logo image
import Phone from "@/assets/images/phone.png"; // Import the phone image

export const PhonePage = ({ handleClose, state }) => {
    return (
        <section className="flex flex-col h-screen overflow-hidden w-full bg-darkColor fixed bottom-0 right-0 z-50">
            <div className="flex flex-col justify-between h-full bg-[#501AC8]">
                <header className="relative flex justify-between items-center text-primaryColor py-4 px-5 vsm:px-7 bg-primaryColor transition-all">
                    {/* Logo and Greeting */}
                    <div className="flex justify-center items-center z-20 text-lightColor my-1 p-2 vsm:p-0">
                        <button className="cursor-pointer hover:text-hoverColor" aria-label="Go back">
                            <Icons.ArrowIcon />
                        </button>
                        <img src={Logo} alt="logo" className="w-[73px] vsm:w-20" />
                        <h1 className="text-lg font-bold">Γεια σας! 👋</h1>
                    </div>

                    {/* Close Icon */}
                    <button className="hover:text-hoverColor cursor-pointer text-lightColor z-20 my-5" onClick={() => handleClose(!state)}>
                        <Icons.CloseIcon />
                    </button>
                </header>

                <main className="flex flex-col justify-around items-center h-full text-lightColor mx-5">
                    <img src={Phone} alt="phone" className="w-64 vsm:w-40" />
                    <div className="w-full">
                        <input placeholder="Ονοματεπώνυμο" className="bg-lightColor text-xl p-5 text-black/70 rounded-xl h-20 vsm:h-[70px] w-full mb-4 outline-none" />
                        <input placeholder="Τηλέφωνο*" className="bg-lightColor text-xl p-5 text-black/70 rounded-xl h-20 vsm:h-[70px] w-full outline-none" />
                        <div className="w-full flex flex-col vsm:flex-row gap-5 mt-5">
                            <button className="bg-lightColor hover:bg-lightColor/85 text-2xl font-bold text-hoverColor rounded-xl h-20 vsm:h-[70px] w-full">Newsletter!</button>
                            <button className="text-2xl font-bold text-lightColor bg-hoverColor hover:bg-hoverColor/70 rounded-xl h-20 vsm:h-[70px] w-full" style={{ boxShadow: "0px 4px 4px 0px #00000040" }}>
                                Λάβε ΠΡΟΣΦΟΡΑ!
                            </button>
                        </div>
                    </div>
                    <p className="text-left font-medium text-xs my-2">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua</p>
                </main>

                <footer className="flex justify-center items-center font-light text-sm border border-primaryColor text-lightColor bg-footerColor p-1">
                    Supported by TechMate
                </footer>
            </div>
        </section>
    )
}