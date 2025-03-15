import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllQuestions } from "@/store/Slices/chatbotApiSlice";
import { setChatState, setNotificationState, setWidgetState, setTheme } from "@/store/Slices/userSlice";
import { sendDimensionsToParent } from "@/utils/functions.util";
import { StartPage } from "@/pages";
import Logo from "@/assets/images/Logo.webp";
import { Widget } from "../components/Widget";
import { Notifications } from "@/components/Notifications";
import { setIdentifier } from "../store/Slices/userSlice";

export const MainPage = () => {
  const dispatch = useDispatch();
  const { isChatClosed, notification, isWidgetClosed, theme } = useSelector((state) => state.user);
  const { imageUrl } = useSelector((state) => state.chatbotApi);
  const NOTIFICATION_DELAY = 2000;

  // Dynamic Theme Application
  useEffect(() => {
    const themes = {
      purple: {
        darkColor: "#000000",
        lightColor: "#FFF",
        primaryColor: "#501AC8",
        hoverColor: "#B366CF",
        gradientColor: "#1C064C",
        footerColor: "#370E92"
      },
      green: {
        darkColor: "#000000",
        lightColor: "#FFF",
        primaryColor: "#0D642F",
        hoverColor: "#7CB937",
        gradientColor: "#03421C",
        footerColor: "#508A0F"
      },
      red: {
        darkColor: "#000000",
        lightColor: "#FFF",
        primaryColor: "#C7313D",
        hoverColor: "#E55640",
        gradientColor: "#681017",
        footerColor: "#9D2816"
      },
      blue: {
        darkColor: "#000000",
        lightColor: "#FFF",
        primaryColor: "#184A88",
        hoverColor: "#0077B6",
        gradientColor: "#03045E",
        footerColor: "#14577B"
      }
    };

    const selectedTheme = themes[theme] || themes["purple"];

    Object.keys(selectedTheme).forEach((key) => {
      document.documentElement.style.setProperty(`--${camelToKebab(key)}`, selectedTheme[key]);
    });
  }, [theme]);

  const camelToKebab = (str) => str.replace(/[A-Z]/g, m => "-" + m.toLowerCase());

  // Listen to parent messages (from SDK)
  useEffect(() => {
    const handleMessage = (event) => {
      // OPTIONAL: validate origin => event.origin === "https://client-domain.com"
      const data = event.data;

      if (data?.type === "chatbot-config") {
        const { theme, showWidget, identifier: receivedIdentifier } = data.payload;

        if (receivedIdentifier) {
          dispatch(setIdentifier(receivedIdentifier));
        }

        if (theme) {
          dispatch(setTheme(theme));
        }

        if (typeof showWidget === "boolean") {
          dispatch(setWidgetState(!showWidget));
        }
      }
    };

    window.addEventListener("message", handleMessage);

    return () => {
      window.removeEventListener("message", handleMessage);
    };
  }, [dispatch]);

  // Dimensions handler
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

  // Notification after delay
  useEffect(() => {
    const timer = setTimeout(() => dispatch(setNotificationState(true)), NOTIFICATION_DELAY);
    return () => clearTimeout(timer);
  }, [dispatch]);

  // Fetch questions
  useEffect(() => {
    dispatch(fetchAllQuestions());
  }, [dispatch]);

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