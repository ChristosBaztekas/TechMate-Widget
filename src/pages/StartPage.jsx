import { Fragment } from 'react';
import * as Icons from "@/utils/icons.util"; // Import all icons as Icons
import Logo from "@/assets/images/Logo.png"; // Import the logo image

export const StartPage = ({ handleClose, state, radius = "10px" }) => {
    // Function to go back one page
    const goBack = () => {
        window.history.back();
    };

    // Function to refresh the page
    const refreshPage = () => {
        window.location.reload();
    };

    return (
        <Fragment>
            <header className="relative flex justify-between items-start text-primaryColor p-3 h-20 transition-all">
                {/* Pattern Icon */}
                <Icons.PatternIcon />

                {/* Logo and Greeting */}
                <div className="flex justify-center items-center z-20 text-lightColor">
                    <button className="cursor-pointer hover:text-hoverColor" onClick={goBack} aria-label="Go back">
                        <Icons.ArrowIcon />
                    </button>
                    <img src={Logo} alt="logo" className="w-16 vsm:w-auto" />
                    <h1 className="font-bold">Γεια σας! 👋</h1>
                </div>

                {/* Refresh and Close Icons */}
                <div className="flex justify-center items-center gap-2 z-20 text-lightColor">
                    <button className="cursor-pointer hover:text-hoverColor hover:animate-spin" onClick={refreshPage} aria-label="Refresh page">
                        <Icons.RefreshIcon />
                    </button>
                    <button className="hover:text-hoverColor cursor-pointer" onClick={() => handleClose(!state)} aria-label="Close">
                        <Icons.CloseIcon />
                    </button>
                </div>
            </header>

            <main className="flex flex-col gap-5 p-4 vsm:p-8 overflow-scroll overflow-x-hidden flex-grow">
                {/* Chat Section */}
                <section className="flex justify-start items-start gap-4">
                    {/* Logo Container */}
                    <div className="flex justify-center items-center flex-shrink-0 w-12 h-12 mt-2 bg-lightColor rounded-full text-sm font-light">
                        Logo
                    </div>
                    {/* Chat Message */}
                    <p className="w-full bg-lightColor vsm:text-lg text-darkColor font-light p-4 rounded-[20px]">
                        <span className="block mb-4">Γεια σας!</span>
                        Είμαι εδώ για να κάνω τη ζωή σας πιο εύκολη και να απαντήσω σε όλες τις απορίες σας σχετικά με ασφάλειες και καλύψεις.
                    </p>
                </section>

                {/* Choose Section */}
                <section className="flex flex-col justify-center items-end gap-4 text-xs vsm:text-sm">
                    {[
                        "Τι χρειάζεται για να κάνω μία ασφάλεια;",
                        "Μόλις τράκαρα. Τι πρέπει να κάνω;",
                        "Τι χρειάζεται για να κάνω μία ασφάλεια;"
                    ].map((item, index) => (
                        // Option Container
                        <p
                            style={{ borderRadius: radius }}
                            className="w-fit text-lightColor font-semibold border border-primaryColor hover:bg-primaryColor text-center px-4 py-3 cursor-pointer transition-all"
                            key={index}
                        >
                            {item}
                        </p>
                    ))}
                </section>
            </main>

            <footer className="flex p-6 justify-center items-start bg-gradient-to-r from-primaryColor to-gradientColor h-18">
                {/* Textarea for typing the message */}
                <textarea
                    placeholder="Πληκτρολογήστε την ερώτησή σας..."
                    className="w-full min-h-10 max-h-24 text-sm vsm:text-base rounded-[20px] pl-5 p-2 outline-none resize-none overflow-hidden"
                    aria-label="Message input field"
                    rows={1} // Initial height of the textarea
                    onInput={(e) => {
                        // Adjust the height of the textarea based on its content
                        e.target.style.height = 'auto';
                        e.target.style.height = `${e.target.scrollHeight}px`;
                    }}
                />
                {/* Submit button for sending the message */}
                <button type="submit" className="ml-6 mt-2 text-white font-bold hover:text-hoverColor">
                    Send
                </button>
            </footer>

            <footer className="flex justify-center items-center font-light text-sm border border-primaryColor text-lightColor bg-footerColor h-[30px]">
                Supported by TechMate
            </footer>
        </Fragment>
    );
};