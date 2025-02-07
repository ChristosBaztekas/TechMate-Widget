import { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setChatState,
  setNotificationState,
  setCurrentPage,
} from "@/store/Slices/userSlice";
import Logo from "@/assets/images/Logo.png"; // Import logo image
import { StartPage } from "@/pages"; // Import StartPage component
import { Notifications } from "@/components/Notifications"; // Import Notifications component
import { sendDimensionsToParent } from "@/utils/functions.util"; // Import sendDimensionsToParent function

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
    return () => clearTimeout(timer); // Cleanup the timer if the component is unmounted
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
              dispatch(setCurrentPage("StartPage"));
            }}
            className="fixed m-3 bottom-0 right-0 z-50 flex justify-center text-sm items-center w-16 h-16 bg-gray-400 rounded-full cursor-pointer"
            role="button"
            aria-label="Open chat"
          >
            {/* Logo */}
            <img
              src={Logo}
              alt="logo"
              className="absolute -top-1 -left-7 w-16"
            />
          </button>
        </>
      )}
    </Fragment>
  );
};
