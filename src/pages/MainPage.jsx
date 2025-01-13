import { Fragment, useState } from "react";
import { Header, Footer, SendMessage, ChatSection } from "@/components"; // Components
import Logo from "@/assets/images/Logo.png"; // Import the logo image

// MainPage component
export const MainPage = () => {
    const [isChatClosed, setIsChatClosed] = useState(true); // State to manage Chatbot visibility

    return (
        <Fragment>
            {/* If Chat is open */}
            {isChatClosed ? (
                <section className="flex flex-col h-screen vsm:h-auto rounded-2xl overflow-hidden bg-darkColor">
                    <Header handleClose={setIsChatClosed} state={isChatClosed} />
                    <ChatSection /> {/* ChatSection will take the remaining height */}
                    <SendMessage />
                    <Footer />
                </section>
            ) : (
                // If Chat is closed
                <div onClick={() => setIsChatClosed(!isChatClosed)} className="relative flex justify-center items-center flex-shrink-0 w-12 h-12 vsm:w-14 vsm:h-14 bg-lightColor rounded-full font-light cursor-pointer">
                    Logo
                    <img src={Logo} alt="logo" className="absolute top-0 -left-6 w-14" />
                </div>
            )}
        </Fragment>
    );
};