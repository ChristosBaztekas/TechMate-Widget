import propTypes from "prop-types";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchGivenQuestion, resetMessages, restartChat, setActiveQuestions } from "@/store/Slices/chatbotApiSlice";
import { setNotificationState, setChatState } from "@/store/Slices/userSlice";
import { sendDimensionsToParent } from "@/utils/functions.util";
import * as Icons from "@/utils/icons.util";

export const Notifications = () => {
  const dispatch = useDispatch();
  const { notificationQuestions, isLoading, error } = useSelector((state) => state.chatbotApi);

  if (isLoading) return null;
  if (error) return null;

  return (
    <main className="flex justify-center items-start gap-2 mt-auto">
      <button
        className="hover:text-hoverColor text-primaryColor cursor-pointer rounded-full overflow-hidden mt-1 flex-shrink-0"
        onClick={() => dispatch(setNotificationState(false))}
        aria-label="Close"
      >
        <Icons.HideNotificationIcon />
      </button>
      <nav className="flex flex-col justify-center items-end gap-2 text-xs" aria-label="Notifications">
        {notificationQuestions.map((item, index) => (
          <Link
            className="w-full"
            key={index}
            onClick={() => {
              dispatch(setNotificationState(true));
              dispatch(setChatState(false));
              dispatch(restartChat());
              dispatch(setActiveQuestions([]));
              dispatch(resetMessages({ question: item }));
              dispatch(fetchGivenQuestion(item.id));
              sendDimensionsToParent("33%", "70%", false);
            }}
          >
            <article className="ml-auto w-fit text-darkColor bg-lightColor border-2 rounded-rad font-medium border-primaryColor hover:bg-primaryColor hover:text-lightColor text-center px-2 py-2 cursor-pointer line-clamp-3 transition-all">
              {item.question}
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