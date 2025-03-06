// Import necessary dependencies
import { toast } from "react-toastify";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import useLoadSecureData from "../../Hooks/useLoadSecureData"; // Custom hook to load secure data
import Container from "../../Layout/Container"; // Container component for layout styling
import Loading from "../Loading/Loading";
import useAuth from "../../Hooks/useAuth";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

function Emergency() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [dbUser, setDbUser] = useState(null); // State for storing the user's details from the database

  // Fetch user data from the server once the user is authenticated
  useEffect(() => {
    const getDbUser = async () => {
      const res = await fetch(
        `https://code-forge-three.vercel.app/users/${user?.email}`
      );
      const data = await res.json();
      setDbUser(data); // Setting the user data in the state
    };
    if (user) {
      getDbUser(); // Fetch the user data when the user is available
    }
  }, [user]);

  const axiosSecure = useAxiosSecure();
  // Use the custom hook to load data from the "/emergency" endpoint
  const {
    data: emergencies,
    isLoading,
    refetch,
  } = useLoadSecureData("/emergency");

  const handleApprove = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#1A064E",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, approve it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const res = await axiosSecure.put(`/emergency/${id}`, {
          status: "Approved",
        });
        if (res?.data?.success) {
          Swal.fire({
            title: "Approved!",
            text: "You approved this contest emergency.",
            icon: "success",
            confirmButtonColor: "#1A064E",
          });
          refetch();
        }
      }
    });
  };

  const handleRetake = async (id, emergencyId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#1A064E",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Take Retake!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          // Send a DELETE request to the server to delete the emergency record
          const response = await axiosSecure.delete(
            `/emergency/${emergencyId}`
          );

          if (response?.data?.success) {
            // If successful, navigate to the contestPaper page
            navigate(`/contestPaper/${id}`, { state: { retake: true } });
          } else {
            // If the response doesn't have the expected success field, log the message
            toast.error(
              response?.data?.message ||
                "Failed to delete the emergency record."
            );
          }
        } catch (error) {
          // Handle specific errors based on status code or network issues
          if (error.response?.status === 404) {
            toast.error("Emergency record not found.");
          } else if (
            error.response?.status === 401 ||
            error.response?.status === 403
          ) {
            toast.error("You are not authorized to perform this action.");
          } else {
            console.error("Error deleting emergency data:", error);
            toast.error("Error deleting the emergency record.");
          }
        }
      }
    });
  };

  return (
    <div
      className="min-h-screen -mt-[68px] pt-32"
      style={{
        background: `url("https://themeforest.wprealizer.com/html-educoda-preview/educoda/assets/images/shape/hero-shape-3.png")`,
        backgroundRepeat: "no-repeat", // Ensuring the background image does not repeat
        backgroundSize: "cover", // Covering the entire section with the background image
        backgroundPosition: "center", // Positioning the image at the center of the section
        backgroundColor: "rgba(39, 18, 123, 0.3)", // Applying a semi-transparent black background color overlay
        backgroundBlendMode: "overlay", // Blending the overlay with the image
      }}
    >
      {/* Container component for layout */}
      <Container>
        {isLoading ? (
          <Loading />
        ) : (
          <>
            {/* Title for the emergencies table */}
            <h2 className="text-2xl font-bold text-active-color border-b-2 inline-block pb-1 pr-2 mb-5 border-active-color capitalize">
              Emergencies
            </h2>

            {/* Table to display the list of emergencies */}
            <table className="table mb-10">
              {/* Table head with column names */}
              <thead className="text-active-color bg-secondary-color">
                <tr>
                  <th>Contest Title</th>
                  <th>User Email</th>
                  <th>Time left</th>
                  {dbUser?.role === "User" && <th>Status</th>}
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {/* Check if emergencies data is available */}
                {emergencies?.length ? (
                  // Map through emergencies data and display each emergency in a row
                  emergencies?.map((emergency) => (
                    <tr key={emergency?._id} className="text-white">
                      <th>{emergency?.contestTitle}</th>{" "}
                      {/* Display Contest ID */}
                      <td>{emergency?.userEmail}</td> {/* Display User Email */}
                      <td>
                        {/* Format and display the time left */}
                        <span>{emergency?.timeLeft.hours}h</span> :{" "}
                        <span>{emergency?.timeLeft.minutes}m</span> :{" "}
                        <span>{emergency?.timeLeft.seconds}s</span>
                      </td>
                      {dbUser?.role === "User" && (
                        <td>{emergency?.status || "Pending"}</td>
                      )}
                      {dbUser?.role === "User" && (
                        <th>
                          {emergency?.status ? (
                            <button
                              onClick={() =>
                                handleRetake(
                                  emergency?.contestId,
                                  emergency?._id
                                )
                              }
                              className="btn-xs hover:bg-white text-black uppercase rounded bg-active-color py-[2px]"
                            >
                              Retake {/* Text for the link */}
                            </button>
                          ) : (
                            <button
                              disabled
                              className="btn-xs hover:bg-white text-black uppercase  bg-white rounded py-[2px]"
                            >
                              Retake {/* Text for the link */}
                            </button>
                          )}
                        </th>
                      )}
                      {dbUser?.role === "Admin" && (
                        <th>
                          {/* Link to contest details page */}
                          {emergency?.status ? (
                            <button
                              onClick={() => handleApprove(emergency?._id)}
                              disabled
                              className="btn-xs hover:bg-white text-black uppercase rounded bg-white py-[2px]"
                            >
                              Approved {/* Text for the link */}
                            </button>
                          ) : (
                            <button
                              onClick={() => handleApprove(emergency?._id)}
                              className="btn-xs hover:bg-white text-black uppercase rounded bg-active-color py-[2px]"
                            >
                              Approve {/* Text for the link */}
                            </button>
                          )}
                        </th>
                      )}
                    </tr>
                  ))
                ) : (
                  // If there are no emergencies, display this message
                  <div className="text-lg mt-4">
                    No Submitted Contests Available
                  </div>
                )}
              </tbody>
            </table>
          </>
        )}
      </Container>
    </div>
  );
}

export default Emergency;
