import { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setNotificationState, setChatState, setWidgetState, } from "@/store/Slices/userSlice";
import { sendDimensionsToParent } from "@/utils/functions.util";
import { fetchGivenQuestion } from "@/store/Slices/chatbotApiSlice";
import Logo from "@/assets/images/Logo.webp";
import * as Icons from "@/utils/icons.util";

export const Widget = () => {
    const dispatch = useDispatch();
    const { messages, isLoading, error, logoUrl, texts } = useSelector(
        (state) => state.chatbotApi
    );

    const [activeQuestion, setActiveQuestion] = useState(null);

    if (isLoading) return null;
    if (error) return null;

    const handleQuestionClick = (question_id) => {
        setActiveQuestion(question_id);
        dispatch(fetchGivenQuestion(question_id));
        dispatch(setNotificationState(true));
        dispatch(setChatState(false));
        sendDimensionsToParent("33%", "70%", false);
        dispatch(setWidgetState(true));
    };

    const handleCloseWidget = () => {
        dispatch(setWidgetState(true));
    };

    // Get greeting bubble array from API response
    const greetingBubble = texts?.greetings?.bubble || [
        "Γεια σου!",
        "Πώς μπορώ να σε βοηθήσω;",
    ];

    return (
        <div className="relative bg-darkColor rounded-[20px] text-lightColor px-3 py-5 mx-auto ml-5 mb-5 vsm:mb-0 vsm:ml-auto vsm:mr-5">
            <span className="flex justify-start items-center gap-3">
                <img
                    src={logoUrl || Logo}
                    alt="logo"
                    className="w-18 flex-shrink-0"
                    loading="lazy"
                />

                <p className="text-left">
                    {greetingBubble.map((line, index) => (
                        <span key={index}>
                            {line}
                            <br />
                        </span>
                    ))}
                </p>
            </span>

            {/* Notification links (questions) */}
            <nav className="flex flex-col justify-center items-center gap-3 text-xs mt-5 w-full">
                {messages[0]?.questions.slice(0, 3).map((item, index) =>
                    activeQuestion === null || activeQuestion === item.id ? (
                        <Link
                            key={index}
                            onClick={() => {
                                handleQuestionClick(item.id);
                            }}
                            className={activeQuestion === item.id ? "active" : ""}
                            style={{ width: "100%", textAlign: "center" }}
                        >
                            <article className="w-full text-lightColor border-2 rounded-full border-primaryColor hover:bg-primaryColor line-clamp-2 text-center px-2 py-2 font-medium cursor-pointer transition-all">
                                {item.question}
                            </article>
                        </Link>
                    ) : null
                )}
            </nav>

            {/* Close Button */}
            <span
                onClick={handleCloseWidget}
                className="w-5 text-primaryColor hover:text-hoverColor transition-all cursor-pointer"
            >
                <Icons.HideWidgetIcon />
            </span>
        </div>
    );
};