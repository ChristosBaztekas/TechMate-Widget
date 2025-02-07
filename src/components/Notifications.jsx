import { Link } from "react-router-dom";
import * as Icons from "@/utils/icons.util"; // Import all icons as Icons
import { useDispatch } from "react-redux";
import { setNotificationState } from "@/store/Slices/userSlice";
import { sendDimensionsToParent } from "@/utils/functions.util"; // Import the sendDimensionsToParent function
import propTypes from "prop-types";

export const Notifications = ({ radius = "10px" }) => {
  const dispatch = useDispatch();

  return (
    <main className="flex justify-center items-start gap-2">
      {/* Button to hide the notification */}
      <button
        className="hover:text-hoverColor text-primaryColor cursor-pointer rounded-full overflow-hidden mt-1 ml-auto"
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
              sendDimensionsToParent("33%", "70%", false);
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

Notifications.propTypes = {
  radius: propTypes.string,
};
