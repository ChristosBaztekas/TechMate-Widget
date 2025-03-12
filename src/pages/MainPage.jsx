import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllQuestions } from "@/store/Slices/chatbotApiSlice";
import { setChatState, setNotificationState, setWidgetState, } from "@/store/Slices/userSlice";
import { sendDimensionsToParent } from "@/utils/functions.util";
import { StartPage } from "@/pages";
import Logo from "@/assets/images/Logo.webp";
import { Widget } from "../components/Widget";
import { Notifications } from "@/components/Notifications";

export const MainPage = () => {
  const dispatch = useDispatch();
  const { isChatClosed, notification, isWidgetClosed } = useSelector((state) => state.user);
  const { imageUrl } = useSelector((state) => state.chatbotApi);

  const NOTIFICATION_DELAY = 2000; // Delay of 2 seconds

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

  // Show notification after delay
  useEffect(() => {
    const timer = setTimeout(() => dispatch(setNotificationState(true)), NOTIFICATION_DELAY);
    return () => clearTimeout(timer);
  }, [dispatch]);

  // Fetch questions on mount
  useEffect(() => {
    dispatch(fetchAllQuestions());
  }, [dispatch]);

  // Handle widget close action
  const handleWidgetClose = () => {
    dispatch(setWidgetState(true));
  };

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
                  dispatch(setWidgetState(true));
                }}
                style={{
                  backgroundImage: `url(${imageUrl})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center'
                }}
                className="relative mt-2 z-50 flex justify-center text-sm items-center w-16 h-16 rounded-full cursor-pointer"
                role="button"
                aria-label="Open chat"
              >
                <img src={Logo} alt="logo" className="absolute -top-1 -left-3 w-8" loading="lazy" />
              </button>
            </div>
          )}
        </div>
      )}
    </>
  );
};
