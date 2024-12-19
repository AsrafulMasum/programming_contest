import { Link } from "react-router-dom"; // Importing Link component for navigation
import Container from "../../Layout/Container"; // Importing a container component for consistent layout
import useLoadSecureData from "../../Hooks/useLoadSecureData"; // Importing a custom hook to securely load data

function AllSubmittedContests() {
  // Using the custom hook to fetch submitted contests data securely
  const { data: submittedContests } = useLoadSecureData("/submittedContests");

  return (
    <div
      className="-mt-[68px] min-h-screen pt-28 px-4"
      style={{
        background: `url("https://themeforest.wprealizer.com/html-educoda-preview/educoda/assets/images/shape/hero-shape-3.png")`,
        backgroundRepeat: "no-repeat", // Ensuring the background image does not repeat
        backgroundSize: "cover", // Covering the entire section with the background image
        backgroundPosition: "center", // Positioning the image at the center of the section
        backgroundColor: "rgba(39, 18, 123, 0.3)", // Applying a semi-transparent black background color overlay
        backgroundBlendMode: "overlay", // Blending the overlay with the image
      }}
    >
      {/* Container for consistent layout */}
      <Container>
        <div>
          {/* Page title */}
          <h2 className="text-2xl font-bold text-active-color border-b-2 inline-block pb-1 pr-2 mb-5 border-active-color capitalize">
            Your Submitted Contests
          </h2>

          {/* Table for displaying submitted contests */}
          <table className="table mb-10">
            {/* Table header with column titles */}
            <thead className="text-active-color bg-secondary-color">
              <tr>
                <th>Contest Name</th>
                <th>Time left</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {/* Conditionally rendering the table rows if there are submitted contests */}
              {submittedContests?.length ? (
                submittedContests?.map((submittedContest) => (
                  <tr key={submittedContest?._id} className="text-white">
                    {/* Contest Name */}
                    <th>{submittedContest?.contestName}</th>
                    {/* Time left formatted as hours, minutes, and seconds */}
                    <td>
                      <span>{submittedContest?.timeLeft.hours}h</span> :{" "}
                      <span>{submittedContest?.timeLeft.minutes}m</span> :{" "}
                      <span>{submittedContest?.timeLeft.seconds}s</span>
                    </td>
                    {/* Contest status, capitalized */}
                    <td className="capitalize">{submittedContest?.status}</td>
                    {/* Action link to view details of the submitted contest */}
                    <th>
                      <Link
                        to={`/submittedContestDetails/${submittedContest?._id}`}
                        className="btn-xs hover:bg-white text-black uppercase rounded bg-active-color py-[2px]"
                      >
                        details
                      </Link>
                    </th>
                  </tr>
                ))
              ) : (
                // Displaying a message if no contests are available
                <div className="text-lg mt-4">
                  No Submitted Contests Available
                </div>
              )}
            </tbody>
          </table>
        </div>
      </Container>
    </div>
  );
}

export default AllSubmittedContests;
