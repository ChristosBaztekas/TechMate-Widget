// Function to send dimensions (Width, Height) to the parent window
export const sendDimensionsToParent = (width, height, isClosed) => {
  console.log("Sending dimensions:", {
    width,
    height,
    isChatClosed: isClosed,
  });
  window.parent.postMessage(
    {
      type: "chatbot-dimensions", // Message key
      width,
      height,
      isChatClosed: isClosed,
    },
    "*"
  );
};
