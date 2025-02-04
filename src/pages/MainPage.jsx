import { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Logo from "@/assets/images/Logo.png"; // Import the logo image
import { StartPage } from "@/pages"; // Import the StartPage component
import { Notifications } from "@/components/Notifications"; // Import the Notifications component
import { setChatState, setNotificationState } from "@/store/Slices/userSlice";

export const MainPage = () => {
  const dispatch = useDispatch();
  const { isChatClosed, notification } = useSelector((state) => state.user);

  // Function to send dimensions to the parent window
  const sendDimensionsToParent = (width, height, isClosed) => {
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

  // Effect to update parent with chat dimensions based on its state
  useEffect(() => {
    if (isChatClosed && notification) {
      sendDimensionsToParent("290px", "220px", true);
    } else if (isChatClosed) {
      sendDimensionsToParent("95px", "87px", true);
    } else {
      sendDimensionsToParent("574px", "570px", false);
    }
  }, [isChatClosed, dispatch, notification]);

  // Effect to show notification after a delay
  useEffect(() => {
    const timer = setTimeout(() => dispatch(setNotificationState(true)), 2000); // Delay of 1 second
    return () => clearTimeout(timer); // Cleanup the timer if the component is unmounted
  }, [dispatch]);

  return (
    <Fragment>
      {!isChatClosed ? (
        <StartPage radius="10px" />
      ) : (
        <Fragment>
          {notification && <Notifications />}
          <div
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
              className="absolute -top-1 -left-7 w-15"
            />
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};
