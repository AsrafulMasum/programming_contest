import { NavLink, useRouteError } from "react-router-dom";

const ErrorPage = () => {
  const error = useRouteError();
  console.log(error.error.stack);
  return (
    <div>
      <div className="min-h-screen text-center flex flex-col justify-center items-center gap-4">
        <h2 className="text-4xl font-bold">
          <span className="text-[#FF444A]">{error.status}</span> ||{" "}
          <span className="text-[#FF444A]">Page {error.statusText}</span>
        </h2>
        <p className="text-2xl font-medium">{error.data}</p>
        <NavLink to={"/"}>
          <button className="bg-active-color text-white font-semibold px-6 py-2 rounded">
            Go Home
          </button>
        </NavLink>
      </div>
    </div>
  );
};

export default ErrorPage;