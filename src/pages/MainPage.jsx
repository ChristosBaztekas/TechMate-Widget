import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllQuestions } from "@/store/Slices/chatbotApiSlice";
import { setChatState, setNotificationState } from "@/store/Slices/userSlice";
import { sendDimensionsToParent } from "@/utils/functions.util"; // Import sendDimensionsToParent function
import { StartPage } from "@/pages"; // Import StartPage component
import Logo from "@/assets/images/Logo.webp"; // Import logo image
// Components
import { Widget } from "../components/Widget";
import { Notifications } from "@/components/Notifications";

export const MainPage = () => {
  const dispatch = useDispatch();
  const { isChatClosed, notification } = useSelector((state) => state.user);
  const { imageUrl } = useSelector((state) => state.chatbotApi);
  const NOTIFICATION_DELAY = 2000; // Delay of 2 seconds
  const [isWidgetClosed, setIsWidgetClosed] = useState(false); // State to manage widget visibility

  // Effect to update parent with chat dimensions based on its state
  useEffect(() => {
    if (!isWidgetClosed) {
      sendDimensionsToParent("200px", "280px", false, isWidgetClosed);
    } else if (isChatClosed && notification) {
      sendDimensionsToParent("290px", "280px", true, isWidgetClosed);
    } else if (isChatClosed) {
      sendDimensionsToParent("95px", "87px", true, isWidgetClosed);
    } else {
      sendDimensionsToParent("33%", "588px", false, isWidgetClosed);
    }
  }, [isChatClosed, notification, isWidgetClosed]);

  // Effect to show notification after a delay
  useEffect(() => {
    const timer = setTimeout(
      () => dispatch(setNotificationState(true)),
      NOTIFICATION_DELAY
    ); // Delay of 2 seconds
    return () => clearTimeout(timer); // Cleanup the timer if the component is unmount
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchAllQuestions());
  }, [dispatch]);

  // Handle widget close action
  const handleWidgetClose = () => {
    setIsWidgetClosed(true);
  };

  // Render Widget first, then the rest of the content based on isWidgetClosed state
  return (
    <>
      {!isWidgetClosed ? (
        <Widget onClose={handleWidgetClose} />
      ) : (
        <div className="mt-auto">
          {!isChatClosed ? (
            <StartPage />
          ) : (
            <div className="flex justify-end items-end flex-col fixed bottom-0 right-0 mb-5 mr-5">
              {notification && <Notifications />}
              <button
                onClick={() => {
                  dispatch(setChatState(false));
                }}
                style={{
                  backgroundImage: `url(${imageUrl})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center'
                }}
                className="relative mt-5 z-50 flex justify-center text-sm items-center w-16 h-16 rounded-full cursor-pointer"
                role="button"
                aria-label="Open chat"
              >
                <img src={Logo} alt="logo" className="absolute -top-1 -left-7 w-16" loading="lazy" />
              </button>
            </div>
          )}
        </div>
      )}
    </>
  );
};