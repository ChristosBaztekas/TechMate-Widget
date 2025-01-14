   ```script
<script>
    // Create a container for the chatbot
    const chatbotContainer = document.createElement('div');
    chatbotContainer.id = 'chatbot-container';

    // Create an iframe for the chatbot
    const chatbotIframe = document.createElement('iframe');
    chatbotIframe.id = 'chatbot-iframe';
    chatbotIframe.src = 'https://tech-mate-chatbot.vercel.app';
    chatbotIframe.frameBorder = '0';

    // Append the iframe to the container
    chatbotContainer.appendChild(chatbotIframe);
    // Append the container to the body of the document
    document.body.appendChild(chatbotContainer);

    // Create a style element to contain CSS rules
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
            width: 50px; /* Default width */
            height: 50px; /* Default height */
            border-radius: 16px;
            z-index: 100000;
            pointer-events: auto;
            transition: width 0.3s ease, height 0.3s ease; /* Smooth transition */
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
    // Append the style element to the head of the document
    document.head.appendChild(style);

    // Listen for messages from the iframe
    window.addEventListener('message', (event) => {
        // Verify the origin of the message
        if (event.origin !== 'https://tech-mate-chatbot.vercel.app') {
            return;
        }

        // Verify the type of the message
        if (event.data.type !== "chatbot-dimensions") {
            console.warn('Ignored message:', event.data);
            return;
        }

        // Extract dimensions and chat state from the message data
        const { width, height, isChatClosed } = event.data;

        // Adjust iframe dimensions based on the message data
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
</script>
   ```
