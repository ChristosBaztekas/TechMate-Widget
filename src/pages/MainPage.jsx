import { Fragment, useState, useEffect } from "react";
import Logo from "@/assets/images/Logo.png"; // Import the logo image
import { StartPage } from "@/pages"; // Import the StartPage component
import { Notifications } from "@/components/Notifications"; // Import the Notifications component

export const MainPage = () => {
    const [isChatClosed, setIsChatClosed] = useState(true);
    const [notification, setNotification] = useState(false);

    // Function to send dimensions to the parent window
    const sendDimensionsToParent = (width, height, isClosed) => {
        console.log("Sending dimensions:", { width, height, isChatClosed: isClosed });
        window.parent.postMessage(
            {
                type: "chatbot-dimensions", // Message key
                width,
                height,
                isChatClosed: isClosed
            },
            "*"
        );
    };

    // Effect to update parent with chat dimensions based on its state
    useEffect(() => {
        if (isChatClosed && notification) {
            sendDimensionsToParent("290px", "220px", true);
        } else if (isChatClosed) {
            sendDimensionsToParent("95px", "87px", true);
        } else {
            sendDimensionsToParent("574px", "570px", false);
        }
    }, [isChatClosed, notification]);

    // Effect to show notification after a delay
    useEffect(() => {
        const timer = setTimeout(() => setNotification(true), 2000); // Delay of 1 second
        return () => clearTimeout(timer); // Cleanup the timer if the component is unmounted
    }, []);

    const handleOpenChat = () => {
        setIsChatClosed(false);
    };

    const handleCloseChat = () => {
        setIsChatClosed(true);
    };

    return (
        <Fragment>
            {!isChatClosed ? (
                <StartPage handleClose={handleCloseChat} radius="10px" />
            ) : (
                <Fragment>
                    {notification && <Notifications hideNotification={setNotification} onNotificationClick={handleOpenChat} />}
                    <div
                        onClick={handleOpenChat}
                        className="fixed m-3 bottom-0 right-0 z-50 flex justify-center text-sm items-center w-16 h-16 bg-gray-400 rounded-full cursor-pointer"
                        role="button"
                        aria-label="Open chat"
                    >
                        {/* Logo */}
                        <img src={Logo} alt="logo" className="absolute -top-1 -left-7 w-15" />
                    </div>
                </Fragment>
            )}
        </Fragment>
    );
};