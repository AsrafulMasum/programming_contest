import { useParams } from "react-router-dom"; // Import the useParams hook to retrieve route parameters
import useLoadSecureData from "../../Hooks/useLoadSecureData"; // Custom hook to fetch secure data
import { useEffect, useState } from "react"; // Import React hooks for state management and lifecycle
import Container from "../../Layout/Container"; // Layout component for consistent styling
import Loading from "../Loading/Loading";

function Leaderboard() {
  // State to hold the contest ID
  const [contestId, setContestId] = useState();

  // Extract the 'id' parameter from the URL
  const { id } = useParams();

  // Fetch data for the latest contest using a custom hook
  const { data, isLoading: loading } = useLoadSecureData("/latestContest");

  // useEffect to determine and set the contest ID
  useEffect(() => {
    if (id) {
      // If an 'id' is present in the URL, use it as the contest ID
      setContestId(id);
    } else {
      // Otherwise, use the latest contest ID fetched from the API
      setContestId(data?._id);
    }
  }, [data, id]); // Dependency array to re-run when 'data' or 'id' changes

  // Fetch leaderboard data for the specified contest ID
  const { data: leaderboard, isLoading } = useLoadSecureData(
    `/leaderboard/${contestId}`
  );

  return (
    <div
      className="min-h-screen -mt-[68px] pt-28"
      style={{
        background: `url("https://themeforest.wprealizer.com/html-educoda-preview/educoda/assets/images/shape/hero-shape-3.png")`,
        backgroundRepeat: "no-repeat", // Ensuring the background image does not repeat
        backgroundSize: "cover", // Covering the entire section with the background image
        backgroundPosition: "center", // Positioning the image at the center of the section
        backgroundColor: "rgba(39, 18, 123, 0.3)", // Applying a semi-transparent black background color overlay
        backgroundBlendMode: "overlay", // Blending the overlay with the image
      }}
    >
      <Container>
        {loading && isLoading ? (
          <Loading />
        ) : (
          <>
            {/* Leaderboard heading */}
            <h2 className="text-2xl font-bold text-active-color border-b-2 inline-block pb-1 pr-2 border-active-color capitalize mt-10 mb-5">
              Leaderboard
            </h2>

            {/* Leaderboard table */}
            <table className="table mb-10">
              <thead className="text-active-color bg-secondary-color">
                <tr>
                  <th>Serial No.</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Total Marks</th>
                  <th>Time Spent</th>
                </tr>
              </thead>
              <tbody>
                {leaderboard ? (
                  // Render leaderboard data if available
                  leaderboard?.map((user, idx) => (
                    <tr key={user?._id} className="text-white">
                      <th>{idx + 1}</th>
                      <th>{user?.userName}</th>
                      <td>{user?.userEmail}</td>
                      <td>{user?.totalScore}</td>
                      <td>{user?.timeSpent} Sec</td>
                    </tr>
                  ))
                ) : (
                  // Show a message if no leaderboard data is available
                  <div className="text-lg mt-4">No Data Available</div>
                )}
              </tbody>
            </table>
          </>
        )}
      </Container>
    </div>
  );
}

export default Leaderboard; // Export the component for use in other parts of the application
