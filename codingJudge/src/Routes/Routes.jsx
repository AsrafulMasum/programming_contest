import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../Layout/MainLayout";
import ErrorPage from "../Pages/ErrorPage/ErrorPage";
import Home from "../Pages/Home/Home";
import LogIn from "../Pages/LogIn/LogIn";
import SignUp from "../Pages/SignUp/SignUp";
import PrivateRoutes from "./PrivateRoutes";
import CreateContest from "../Pages/CreateContest/CreateContest";
import AdminRoutes from "./AdminRoutes";
import CreateQuestion from "../Pages/CreateQuestion/CreateQuestion";
import Contests from "../Pages/Contests/Contests";
import ContestDetails from "../Pages/ContestDetails/ContestDetails";
import ContestPaper from "../Pages/ContestPaper/ContestPaper";

const Routes = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout></MainLayout>,
    errorElement: <ErrorPage></ErrorPage>,
    children: [
      {
        index: true,
        element: <Home></Home>,
      },
      {
        path: "contests",
        element: <Contests />,
      },
      {
        path: "createContest",
        element: (
          <AdminRoutes>
            <CreateContest />
          </AdminRoutes>
        ),
      },
      {
        path: "createQuestion",
        element: (
          <AdminRoutes>
            <CreateQuestion />
          </AdminRoutes>
        ),
      },
      {
        path: "contestDetails/:id",
        element: (
          <PrivateRoutes>
            <ContestDetails />
          </PrivateRoutes>
        ),
      },
      {
        path: "contestPaper/:id",
        element: (
          <PrivateRoutes>
            <ContestPaper />
          </PrivateRoutes>
        ),
      },
      {
        path: "logIn",
        element: <LogIn></LogIn>,
      },
      {
        path: "signUp",
        element: <SignUp></SignUp>,
      },
    ],
  },
]);

export default Routes;
