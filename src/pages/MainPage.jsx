import { Fragment, useState, useEffect } from "react";
import { Header, Footer, SendMessage, ChatSection } from "@/components";
import Logo from "@/assets/images/Logo.png";
import { WelcomePage } from "./WelcomePage";

export const MainPage = () => {
    const [isChatClosed, setIsChatClosed] = useState(true);

    const sendDimensionsToParent = (width, height, isClosed) => {
        window.parent.postMessage({ width, height, isChatClosed: isClosed }, "*");
    };

    useEffect(() => {
        if (isChatClosed) {
            sendDimensionsToParent("95px", "87px", true);
        } else {
            sendDimensionsToParent("600px", "600px", false);
        }
    }, [isChatClosed]);

    return (
        <Fragment>
            {!isChatClosed ? (
                <section className="flex flex-col h-screen overflow-hidden w-full bg-darkColor fixed bottom-0 right-0 z-50">
                    <WelcomePage handleClose={() => setIsChatClosed(true)} />
                    {/* 
                    <Header handleClose={() => setIsChatClosed(true)} />
                    <ChatSection />
                    <SendMessage />
                    <Footer />
                */}
                </section>
            ) : (
                <div
                    onClick={() => setIsChatClosed(false)}
                    className="fixed m-3 bottom-0 right-0 z-50 flex justify-center text-sm items-center w-16 h-16 bg-gray-200 rounded-full cursor-pointer"
                >
                    logo
                    <img src={Logo} alt="logo" className="absolute -top-1 -left-7 w-15" />
                </div>
            )}
        </Fragment>
    );
};

// <script>
//     const chatbotContainer = document.createElement('div');
//     chatbotContainer.id = 'chatbot-container';

//     const chatbotIframe = document.createElement('iframe');
//     chatbotIframe.id = 'chatbot-iframe';
//     chatbotIframe.src = 'http://localhost:5173/';
//     chatbotIframe.frameBorder = '0';

//     chatbotContainer.appendChild(chatbotIframe);
//     document.body.appendChild(chatbotContainer);

//     const style = document.createElement('style');
//     style.textContent = `
//     #chatbot-container {
//         position: fixed;
//     top: 0;
//     left: 0;
//     width: 100%;
//     height: 100%;
//     pointer-events: none;
//     }

//     #chatbot-iframe {
//         position: absolute;
//     bottom: 10px;
//     right: 10px;
//     width: 50px; /* Default width */
//     height: 50px; /* Default height */
//     border-radius: 16px;
//     z-index: 100000;
//     pointer-events: auto;
//     transition: width 0.3s ease, height 0.3s ease; /* Smooth transition */
//     }

//     @media (max-width: 600px) {
//         #chatbot - iframe {
//         width: 100%;
//     height: 100%;
//     bottom: 0;
//     right: 0;
//     border-radius: 0;
//         }
//     }
//     `;
//     document.head.appendChild(style);

//     window.addEventListener('message', (event) => {
//         if (event.origin !== 'http://localhost:5173') {
//             return;
//         }

//     const {width, height, isChatClosed} = event.data;

//     // Adjust dimensions for small screens when chat is closed
//     if (window.innerWidth < 600 && !isChatClosed) {
//         chatbotIframe.style.width = '100%';
//     chatbotIframe.style.height = '100%';
//     chatbotIframe.style.bottom = '0';
//     chatbotIframe.style.right = '0';
//     chatbotIframe.style.borderRadius = '0';
//         } else if (width && height) {
//         chatbotIframe.style.width = width;
//     chatbotIframe.style.height = height;
//         }
//     });
// </script>