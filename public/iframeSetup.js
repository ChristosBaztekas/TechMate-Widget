// public/iframeSetup.js
export const initializeChatBot = (iframeSrc) => {
    document.addEventListener('DOMContentLoaded', () => {
        const chatbotContainer = document.createElement('div');
        chatbotContainer.id = 'chatbot-container';

        const chatbotIframe = document.createElement('iframe');
        chatbotIframe.id = 'chatbot-iframe';
        chatbotIframe.src = iframeSrc;
        chatbotIframe.frameBorder = '0';

        chatbotContainer.appendChild(chatbotIframe);
        document.body.appendChild(chatbotContainer);

        const style = document.createElement('style');
        style.textContent = `
        #chatbot-container {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
        }

        #chatbot-iframe {
            position: absolute;
            bottom: 10px;
            right: 10px;
            width: 50px;
            height: 50px;
            border-radius: 16px;
            z-index: 100000;
            pointer-events: auto;
            transition: width 0.3s ease, height 0.3s ease;
        }

        @media (max-width: 600px) {
            #chatbot-iframe {
                width: 100%;
                height: 100%;
                bottom: 0;
                right: 0;
                border-radius: 0;
            }
        }
        `;
        document.head.appendChild(style);

        window.addEventListener('message', (event) => {
            if (event.origin !== iframeSrc) {
                return;
            }

            const { width, height, isChatClosed } = event.data;

            if (window.innerWidth < 574 && !isChatClosed) {
                chatbotIframe.style.width = '100%';
                chatbotIframe.style.height = '100%';
                chatbotIframe.style.bottom = '0';
                chatbotIframe.style.right = '0';
                chatbotIframe.style.borderRadius = '0';
            } else if (width && height) {
                chatbotIframe.style.width = width;
                chatbotIframe.style.height = height;
            }
        });
    });
};