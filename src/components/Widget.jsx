import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setNotificationState, setChatState } from "@/store/Slices/userSlice";
import { sendDimensionsToParent } from '@/utils/functions.util';
import { fetchAllQuestions, fetchGivenQuestion } from '@/store/Slices/chatbotApiSlice';
import Logo from "@/assets/images/Logo.webp"; // Import logo image
import * as Icons from "@/utils/icons.util"; // Import all icons

export const Widget = ({ onClose }) => {
    const dispatch = useDispatch();
    const { messages, isLoading, error } = useSelector(
        (state) => state.chatbotApi
    );
    useEffect(() => {
        dispatch(fetchAllQuestions());
    }, [dispatch]);

    // Don't render anything if data is still loading
    if (isLoading) return null;
    // Don't render anything if there is an error
    if (error) return null;

    return (
        <div className="relative bg-darkColor rounded-[20px] text-lightColor px-3 py-5 mx-auto ml-5 mb-5 vsm:mb-0 vsm:ml-auto vsm:max-w-[320px] vsm:mr-5">
            <span className="flex justify-start items-center">
                <img src={Logo} alt="logo" className="w-18 flex-shrink-0" loading="lazy" />
                <p>
                    Γεια σου!<br />Πώς μπορώ να σε βοηθήσω;
                </p>
            </span>

            {/* Section containing the notification links */}
            <nav className="flex flex-col justify-center items-center gap-3 text-xs mt-5">
                {messages[0].questions.slice(0, 3).map((item, index) => (
                    <Link
                        key={index}
                        onClick={() => {
                            dispatch(setNotificationState(true));
                            dispatch(setChatState(false));
                            dispatch(fetchGivenQuestion(item.id));
                            sendDimensionsToParent("33%", "70%", false);
                            onClose(true)
                        }}
                    >
                        <article className="w-72 text-lightColor border-2 rounded-full border-primaryColor hover:bg-primaryColor text-center px-2 py-2 cursor-pointer transition-all">
                            {item.question}
                        </article>
                    </Link>
                ))}
            </nav>

            {/* Close Button */}
            <span onClick={onClose} className="w-5">
                <Icons.HideWidgetIcon />
            </span>
        </div>
    )
}