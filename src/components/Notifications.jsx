import { Link } from "react-router-dom";
import * as Icons from "@/utils/icons.util"; // Import all icons as Icons

export const Notifications = ({ hideNotification, radius = "10px", onNotificationClick }) => {
    return (
        <main className="flex justify-center items-start gap-2">
            <button className="hover:text-hoverColor text-primaryColor cursor-pointer" onClick={() => hideNotification(false)} aria-label="Close">
                <Icons.HideNotificationIcon />
            </button>
            <section className="flex flex-col justify-center items-end gap-2 text-xs">
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
                    <Link to={item.path} key={index} onClick={onNotificationClick}>
                        <p
                            style={{ borderRadius: radius }}
                            className="w-fit text-darkColor bg-lightColor border-2 border-primaryColor hover:bg-primaryColor text-center px-2 py-2 cursor-pointer transition-all"
                        >
                            {item.text}
                        </p>
                    </Link>
                ))}
            </section>
        </main>
    );
};