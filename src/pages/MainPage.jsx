import { Fragment, useState, useEffect } from "react";
import { Header, Footer, SendMessage, ChatSection } from "@/components";
import Logo from "@/assets/images/Logo.png";

export const MainPage = () => {
    const [isChatClosed, setIsChatClosed] = useState(true);

    const sendDimensionsToParent = (width, height) => {
        window.parent.postMessage({ width, height }, "*");
    };

    useEffect(() => {
        if (isChatClosed) {
            sendDimensionsToParent("60px", "50px");
        } else {
            sendDimensionsToParent("520px", "600px");
        }
    }, [isChatClosed]);

    return (
        <Fragment>
            {!isChatClosed ? (
                <section className="flex flex-col h-screen overflow-hidden w-[520px] bg-darkColor fixed bottom-0 right-0 z-50">
                    <Header handleClose={() => setIsChatClosed(true)} />
                    <ChatSection />
                    <SendMessage />
                    <Footer />
                </section>
            ) : (
                <div
                    onClick={() => setIsChatClosed(false)}
                    className="fixed bottom-0 right-0 z-50 flex justify-center items-center w-12 h-12 vsm:w-14 vsm:h-14 bg-lightColor rounded-full cursor-pointer"
                >
                    <img src={Logo} alt="logo" className="absolute top-0 -left-4 w-10 h-8" />
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

//     @media (max-width: 550px) {
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

//     const {width, height} = event.data;
//     if (width && height) {
//         chatbotIframe.style.width = width;
//     chatbotIframe.style.height = height;
//         }
//     });

// </script>