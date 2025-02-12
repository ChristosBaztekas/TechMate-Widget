import { createBrowserRouter, RouterProvider } from "react-router-dom";
import {
  MainPage,
  WelcomePage,
  PhonePageForm1,
  PhonePageForm2,
  PhonePageForm3,
  EmailPageForm1,
  EmailPageForm2,
  EmailPageForm3,
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
    path: "/phone-form1",
    element: <PhonePageForm1 />,
  },
  {
    path: "/phone-form2",
    element: <PhonePageForm2 />,
  },
  {
    path: "/phone-form3",
    element: <PhonePageForm3 />,
  },
  {
    path: "/email-form1",
    element: <EmailPageForm1 />,
  },
  {
    path: "/email-form2",
    element: <EmailPageForm2 />,
  },
  {
    path: "/email-form3",
    element: <EmailPageForm3 />,
  },
  {
    path: "/congratulations",
    element: <CongratulationsPage />,
  },
  {
    path: "/newsletter",
    element: <NewsLetterPage />,
  },
  {
    path: "/submitted",
    element: <SubmitPage />,
  },
]);

const Router = () => {
  return <RouterProvider router={router} />;
};

export default Router;
