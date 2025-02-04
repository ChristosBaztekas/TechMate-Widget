import { Link } from "react-router-dom";
import * as Icons from "@/utils/icons.util"; // Import all icons as Icons
import { useDispatch } from "react-redux";
import { setNotificationState } from "@/store/Slices/userSlice";

export const Notifications = ({ radius = "10px" }) => {
  const dispatch = useDispatch();

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

  return (
    <main className="flex justify-center items-start gap-2">
      {/* Button to hide the notification */}
      <button
        className="hover:text-hoverColor text-primaryColor cursor-pointer rounded-full overflow-hidden mt-1"
        onClick={() => {
          dispatch(setNotificationState(false));
        }}
        aria-label="Close"
      >
        <Icons.HideNotificationIcon />
      </button>
      {/* Section containing the notification links */}
      <nav
        className="flex flex-col justify-center items-end gap-2 text-xs"
        aria-label="Notifications"
      >
        {[
          {
            text: "Τι χρειάζεται για να κάνω μία ασφάλεια;",
            path: "/first",
          },
          {
            text: "Μόλις τράκαρα. Τι πρέπει να κάνω;",
            path: "/second",
          },
          {
            text: "Τι χρειάζεται για να κάνω μία ασφάλεια;",
            path: "/third",
          },
        ].map((item, index) => (
          <Link
            to={item.path}
            key={index}
            onClick={() => {
              dispatch(setNotificationState(true));
              sendDimensionsToParent("574px", "570px", false);
            }}
          >
            <article
              style={{ borderRadius: radius }}
              className="w-fit text-darkColor bg-lightColor border-2 border-primaryColor hover:bg-primaryColor hover:text-white text-center px-2 py-2 cursor-pointer transition-all"
            >
              {item.text}
            </article>
          </Link>
        ))}
      </nav>
    </main>
  );
};
