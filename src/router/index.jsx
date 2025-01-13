import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { MainPage, WelcomePage, PhonePage, CongratulationsPage } from "@/pages";

const router = createBrowserRouter([
    {
        path: "/",
        element: <MainPage />,
    },
    {
        path: "/first",
        element: <WelcomePage />,
    },
    {
        path: "/second",
        element: <PhonePage />,
    },
    {
        path: "/third",
        element: <CongratulationsPage />,
    },
]);

const Router = () => {
    return <RouterProvider router={router} />;
};

export default Router;