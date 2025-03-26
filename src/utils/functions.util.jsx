export const sendDimensionsToParent = (
  width,
  height,
  isClosed,
  isWidgetClosed,
) => {
  const message = {
    type: 'chatbot-dimensions',
    width,
    height,
    isChatClosed: isClosed,
    Widget: isWidgetClosed,
  }
  window.parent.postMessage(message, '*')
}
