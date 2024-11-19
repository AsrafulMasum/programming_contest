import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../Layout/MainLayout";
import ErrorPage from "../Pages/ErrorPage/ErrorPage";
import Home from "../Pages/Home/Home";
import Assignments from "../Pages/Assignments/Assignments";
import LogIn from "../Pages/LogIn/LogIn";
import SignUp from "../Pages/SignUp/SignUp";
import AddAssignment from "../Pages/AddAssignment/AddAssignment";
import PrivateRoutes from "./PrivateRoutes";
import AssignmentDetails from "../Pages/Assignments/AssignmentDetails";
import UpdateAssignment from "../Pages/Assignments/UpdateAssignment";
import SubmittedAssignments from "../Pages/SubmittedAssignments/SubmittedAssignments";
import MyAssignments from "../Pages/MyAssignments/MyAssignments";

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
        path: "assignments",
        element: <Assignments></Assignments>,
      },
      {
        path: "addAssignment",
        element: (
          <PrivateRoutes>
            <AddAssignment></AddAssignment>
          </PrivateRoutes>
        ),
      },
      {
        path: "assignmentDetails/:id",
        element: (
          <PrivateRoutes>
            <AssignmentDetails></AssignmentDetails>
          </PrivateRoutes>
        ),
      },
      {
        path: "assignmentDetails/update/:id",
        element: (
          <PrivateRoutes>
            <UpdateAssignment></UpdateAssignment>
          </PrivateRoutes>
        ),
      },
      {
        path: "submittedAssignments",
        element: (
          <PrivateRoutes>
            <SubmittedAssignments></SubmittedAssignments>
          </PrivateRoutes>
        ),
      },
      {
        path: "myAssignments",
        element: (
          <PrivateRoutes>
            <MyAssignments></MyAssignments>
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
