## Version 0.2 (More Enhanced | clean )

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
