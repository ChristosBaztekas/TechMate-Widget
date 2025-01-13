import * as Icons from "@/utils/icons.util"; // Import all icons as Icons
import Logo from "@/assets/images/Logo.png"; // Import the logo image

export const WelcomePage = ({ handleClose, state }) => {
    return (
        <div className="flex flex-col justify-between h-full">
            <header className="relative flex justify-between items-start py-2 tiny:py-3 text-primaryColor px-3 vsm:px-7 h-40 bg-primaryColor transition-all">
                {/* Pattern Icon */}
                <span className="absolute bottom-0 w-full left-0">
                    <Icons.PatternIcon />
                </span>

                {/* Logo and Greeting */}
                <div className="flex flex-col justify-center items-start vsm:gap-2 z-20 text-lightColor">
                    <img src={Logo} alt="logo" className="w-14 vsm:w-auto xl:w-20 my-5" />
                    <h1 className="text-lg font-bold ml-5">Γεια σας! 👋</h1>
                    <h2 className="font-semibold max-w-96 ml-5">Καλωσήρθατε στην υποστήριξη της TechMate! Είμαστε στη διάθεσή σας!</h2>
                </div>

                {/* Close Icon */}
                <button className="hover:text-red-800 cursor-pointer hover:scale-125 text-lightColor z-20 my-5" onClick={() => handleClose(!state)}>
                    <Icons.CloseIcon />
                </button>
            </header>

            <aside className="flex justify-between items-center p-3 h-[59px] bg-lightColor z-50 mx-2 vsm:mx-20 rounded-[10px]">
                <div>
                    <p className="text-lg font-semibold">Επιστροφή στο Chat</p>
                    <p className="text-xs font-medium">Μην ανησυχείτε, δεν έχετε χάσει την συνομιλία σας!</p>
                </div>
                <Icons.SendIcon />
            </aside>

            <main className="flex flex-col vsm:flex-row vsm:flex-wrap text-lightColor justify-evenly mx-10">
                <section className="flex flex-col justify-center items-center p-5">
                    <Icons.ClockIcon />
                    <p className="max-w-28 text-center">Υποστήριξη όλο το 24ωρο</p>
                </section>
                <section className="flex flex-col justify-center items-center p-5">
                    <Icons.PaintIcon />
                    <p className="max-w-28 text-center">Προσωπική διαμόρφωση</p>
                </section>
                <section className="flex flex-col justify-center items-center p-5">
                    <Icons.CalenderIcon />
                    <p className="max-w-28 text-center">Δημιουργία ραντεβού</p>
                </section>
            </main>

            <footer className="flex justify-center items-center font-light text-sm border border-primaryColor text-lightColor bg-footerColor h-[30px]">
                www.techai.gr
            </footer>
        </div>
    );
};