import { Link } from "react-router-dom"; // Importing Link component for navigation in React Router
import useAuth from "../Hooks/useAuth"; // Custom hook for managing authentication state
import { useEffect, useState } from "react"; // Importing React hooks (useState, useEffect)

const Drawer = () => {
  // Extracting user information from the authentication hook (useAuth)
  const { user } = useAuth();

  // State to store the user data fetched from the backend (e.g., user role)
  const [dbUser, setDbUser] = useState(null);

  // Fetch user data from the server once the user is authenticated
  useEffect(() => {
    const getDbUser = async () => {
      try {
        const res = await fetch(
          `https://code-forge-three.vercel.app/users/${user?.email}`
        );
        if (!res.ok) throw new Error("Failed to fetch");
        const data = await res.json();
        setDbUser(data);
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };

    if (user?.email) getDbUser();
  }, [user?.email]);

  // Defining the navigation items conditionally based on the user's role
  const navItems = (
    <>
      <li>
        <Link to={"/"}>Home</Link> {/* Link to the home page */}
      </li>
      <li>
        <Link to={"/contests"}>Contests</Link> {/* Link to the contests page */}
      </li>

      {/* If the user is logged in and their role is 'User', show the 'Submitted Contests' link */}
      {user && dbUser?.role === "User" && (
        <li>
          <Link to={"/submittedContests"}>Submitted Contests</Link>{" "}
          {/* Link to submitted contests page */}
        </li>
      )}

      {/* If the user is logged in and their role is 'Admin', show the 'Create Contest' link */}
      {user && dbUser?.role === "Admin" && (
        <li>
          <Link to={"/createContest"}>Create Contest</Link>{" "}
          {/* Link to create contest page */}
        </li>
      )}

      {/* If the user is logged in and their role is 'Admin', show the 'Submitted Contests' link */}
      {user && dbUser?.role === "Admin" && (
        <li>
          <Link to={"/allSubmittedContests"}>Submitted Contests</Link>{" "}
          {/* Link to all submitted contests page */}
        </li>
      )}
    </>
  );

  return (
    <div className="drawer-side z-50">
      {/* The drawer overlay is the background when the sidebar is open. 
          The 'my-drawer-3' corresponds to the target drawer toggle (most likely defined elsewhere in your app). */}
      <label
        htmlFor="my-drawer-3" // Connects the overlay with the drawer toggle button
        aria-label="close sidebar" // Accessibility label for closing the sidebar
        className="drawer-overlay"
      ></label>

      {/* The sidebar menu */}
      <ul className="menu p-4 w-80 min-h-full bg-base-200">
        {/* The navigation links are conditionally rendered based on the user's role */}
        {navItems} {/* Render the dynamic navigation items */}
      </ul>
    </div>
  );
};

export default Drawer; // Exporting the Drawer component to be used in other parts of the app
