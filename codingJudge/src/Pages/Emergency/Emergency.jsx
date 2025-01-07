// Import necessary dependencies
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import useLoadSecureData from "../../Hooks/useLoadSecureData"; // Custom hook to load secure data
import Container from "../../Layout/Container"; // Container component for layout styling
import Loading from "../Loading/Loading";

function Emergency() {
  const axiosSecure = useAxiosSecure();
  // Use the custom hook to load data from the "/emergency" endpoint
  const { data: emergencies, isLoading } = useLoadSecureData("/emergency");

  const handleApprove = async (id) => {
    const res = await axiosSecure.put(`/emergency/${id}`, {
      status: "Approved",
    });
    console.log(res?.data?.success);
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
                      <th>
                        {/* Link to contest details page */}
                        <button
                          onClick={() => handleApprove(emergency?._id)}
                          className="btn-xs hover:bg-white text-black uppercase rounded bg-active-color py-[2px]"
                        >
                          Approve {/* Text for the link */}
                        </button>
                      </th>
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
