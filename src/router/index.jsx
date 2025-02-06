import { createBrowserRouter, RouterProvider } from "react-router-dom";
import {
  MainPage,
  WelcomePage,
  PhonePageForm1,
  EmailPageForm1,
  CongratulationsPage,
  NewsLetterPage,
  SubmitPage,
} from "@/pages";

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
    element: <PhonePageForm1 />,
  },
  {
    path: "/third",
    element: <CongratulationsPage />,
  },
  {
    path: "/fourth",
    element: <EmailPageForm1 />,
  },
  {
    path: "/newsletter",
    element: <NewsLetterPage />,
  },
  {
    path: "/submit",
    element: <SubmitPage />,
  },
]);

const Router = () => {
  return <RouterProvider router={router} />;
};

export default Router;
