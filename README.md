## Version 0.2 (More BreakPoints | More Responsive )

   ```script
<script>
    // Create an iframe for the chatbot
    const chatbotIframe = document.createElement('iframe');
    chatbotIframe.src = 'https://tech-mate-chatbot.vercel.app';
    chatbotIframe.style.position = 'fixed';
    chatbotIframe.style.bottom = '10px';
    chatbotIframe.style.right = '10px';
    chatbotIframe.style.borderRadius = '16px';
    chatbotIframe.style.zIndex = '100000';
    chatbotIframe.style.minWidth = '431px';
    chatbotIframe.style.maxHeight = '588px';
    chatbotIframe.style.border = 'none'; // Remove any defaults borders
    chatbotIframe.style.transition = 'width 0.05s ease-in, height 0.05s ease-in';
    document.body.appendChild(chatbotIframe);

    // Listen for messages from the iframe
    window.addEventListener('message', (event) => {
        if (event.origin !== 'https://tech-mate-chatbot.vercel.app' || event.data.type !== "chatbot-dimensions") return;

        const { width, height, isChatClosed } = event.data;
        if (window.innerWidth < 574 && !isChatClosed) {
            chatbotIframe.style.width = '100%';
            chatbotIframe.style.height = '100%';
            chatbotIframe.style.bottom = '0';
            chatbotIframe.style.right = '0';
            chatbotIframe.style.minWidth = 'auto';
            chatbotIframe.style.maxHeight = 'none';
            chatbotIframe.style.borderRadius = '0';
        } else if (window.innerWidth < 1150 && !isChatClosed) {
            chatbotIframe.style.width = '33%';
            chatbotIframe.style.height = '70%';
        } else if (width && height) {
            chatbotIframe.style.width = width;
            chatbotIframe.style.height = height;
        }
    });
</script>
   ```

## Version 0.1 (More Enhanced | clean )

   ```script
<script>
    // Create an iframe for the chatbot
    const chatbotIframe = document.createElement('iframe');
    chatbotIframe.src = 'https://tech-mate-chatbot.vercel.app';
    chatbotIframe.style.cssText = `
        position: fixed;
        bottom: 10px;
        right: 10px;
        border-radius: 16px;
        z-index: 100000;
        border: none; /* Remove any defaults borders */
        transition: width 0.05s ease-in, height 0.05s ease-in;
    `;
    document.body.appendChild(chatbotIframe);

    // Listen for messages from the iframe
    window.addEventListener('message', (event) => {
        if (event.origin !== 'https://tech-mate-chatbot.vercel.app' || event.data.type !== "chatbot-dimensions") return;

        const { width, height, isChatClosed } = event.data;
        if (window.innerWidth < 574 && !isChatClosed) {
            chatbotIframe.style.cssText += `
                width: 100%;
                height: 100%;
                bottom: 0;
                right: 0;
                border-radius: 0;
            `;
        } else if (width && height) {
            chatbotIframe.style.width = width;
            chatbotIframe.style.height = height;
        }
    });
</script>
   ```
