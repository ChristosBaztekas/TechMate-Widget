import { Fragment, useState, useEffect } from "react";
import Logo from "@/assets/images/Logo.png"; // Import the logo image
import { StartPage } from "@/pages";

export const MainPage = () => {
    const [isChatClosed, setIsChatClosed] = useState(true);

    // Function to send dimensions to the parent window
    const sendDimensionsToParent = (width, height, isClosed) => {
        window.parent.postMessage({ width, height, isChatClosed: isClosed }, "*");
    };

    // Effect to update parent with chat dimensions based on its state
    useEffect(() => {
        if (isChatClosed) {
            sendDimensionsToParent("95px", "87px", true);
        } else {
            sendDimensionsToParent("574px", "600px", false);
        }
    }, [isChatClosed]);

    return (
        <Fragment>
            {!isChatClosed ? (
                <section className="flex flex-col h-screen overflow-hidden w-full bg-darkColor fixed bottom-0 right-0 z-50">
                    {/* StartPage component with handleClose function */}
                    <StartPage handleClose={() => setIsChatClosed(true)} radius="20px" />
                </section>
            ) : (
                <div
                    onClick={() => setIsChatClosed(false)}
                    className="fixed m-3 bottom-0 right-0 z-50 flex justify-center text-sm items-center w-16 h-16 bg-gray-200 rounded-full cursor-pointer"
                    role="button"
                    aria-label="Open chat"
                >
                    Logo
                    {/* Logo */}
                    <img src={Logo} alt="logo" className="absolute -top-1 -left-7 w-15" />
                </div>
            )}
        </Fragment>
    );
};