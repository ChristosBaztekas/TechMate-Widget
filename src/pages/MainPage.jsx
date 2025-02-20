import { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllQuestions } from "@/store/Slices/chatbotApiSlice";
import { setChatState, setNotificationState } from "@/store/Slices/userSlice";
import { sendDimensionsToParent } from "@/utils/functions.util"; // Import sendDimensionsToParent function
import { Notifications } from "@/components/Notifications"; // Import Notifications component
import { StartPage } from "@/pages"; // Import StartPage component
import Logo from "@/assets/images/Logo.webp"; // Import logo image

export const MainPage = () => {
  const dispatch = useDispatch();
  const { isChatClosed, notification } = useSelector((state) => state.user);
  const NOTIFICATION_DELAY = 2000; // Delay of 2 seconds

  // Effect to update parent with chat dimensions based on its state
  useEffect(() => {
    if (isChatClosed && notification) {
      sendDimensionsToParent("290px", "220px", true);
    } else if (isChatClosed) {
      sendDimensionsToParent("95px", "87px", true);
    } else {
      sendDimensionsToParent("33%", "588px", false);
    }
  }, [isChatClosed, notification]);

  // Effect to show notification after a delay
  useEffect(() => {
    const timer = setTimeout(
      () => dispatch(setNotificationState(true)),
      NOTIFICATION_DELAY
    ); // Delay of 1 second
    return () => clearTimeout(timer); // Cleanup the timer if the component is unmount
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchAllQuestions());
  }, [dispatch]);

  return (
    <Fragment>
      {!isChatClosed ? (
        <StartPage radius="10px" />
      ) : (
        <>
          {notification && <Notifications />}
          <button
            onClick={() => {
              dispatch(setChatState(false));
            }}
            className="fixed m-3 bottom-0 right-0 z-50 flex justify-center text-sm items-center w-16 h-16 bg-gray-400 rounded-full cursor-pointer"
            role="button"
            aria-label="Open chat"
          >
            {/* Logo */}
            <img
              src={Logo}
              alt="logo"
                className="absolute -top-1 -left-7 w-16" loading="lazy"
            />
          </button>
        </>
      )}
    </Fragment>
  );
};
