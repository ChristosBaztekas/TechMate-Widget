export const sendDimensionsToParent = (width, height, isClosed, isWidgetClosed) => {
  const message = {
    type: "chatbot-dimensions",
    width,
    height,
    isChatClosed: isClosed,
    Widget: isWidgetClosed,
  };

  console.log("Sending message to parent:", message);

  window.parent.postMessage(message, "*"); // Replace * with specific origin in production
};