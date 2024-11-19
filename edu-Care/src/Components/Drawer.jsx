import { Link } from "react-router-dom";
import useAuth from "../Hooks/useAuth";


const Drawer = () => {

  const { user } = useAuth();

  const navItems = (
    <>
      <li>
        <Link to={"/"}>Home</Link>
      </li>
      <li>
        <Link to={"/assignments"}>Assignments</Link>
      </li>
      {user && (
        <li>
          <Link to={"/myAssignments"}>My Assignments</Link>
        </li>
      )}
      {user && (
        <li>
          <Link to={"/addAssignment"}>Add Assignment</Link>
        </li>
      )}
      {user && (
        <li>
          <Link to={"/submittedAssignments"}>Submitted Assignment</Link>
        </li>
      )}
    </>
  );
  return (
    <div className="drawer-side z-50">
        <label
          htmlFor="my-drawer-3"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <ul className="menu p-4 w-80 min-h-full bg-base-200">
          {/* Sidebar content here */}
          {navItems}
        </ul>
      </div>
  );
};

export default Drawer;