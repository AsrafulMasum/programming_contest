import { Link } from "react-router-dom";
import useAuth from "../../Hooks/useAuth";
import useLoadSecureData from "../../Hooks/useLoadSecureData";
import Container from "../../Layout/Container";

function SubmittedContests() {
  const { user } = useAuth();
  const { data: submittedContests } = useLoadSecureData(
    `/submittedContestsByUser/${user?.email}`
  );

  return (
    <div
      className="-mt-[68px] min-h-screen pt-28 px-4"
      style={{
        background:
          'url("https://themeforest.wprealizer.com/html-educoda-preview/educoda/assets/images/shape/hero-shape-3.png")',
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundColor: "rgba(39, 18, 123, 0.3)",
        backgroundBlendMode: "overlay",
      }}
    >
      <Container>
        <div>
          <h2 className="text-2xl font-bold text-active-color border-b-2 inline-block pb-1 pr-2 mb-5 border-active-color capitalize">
            Your Submitted Contests
          </h2>
          <table className="table mb-10">
            {/* head */}
            <thead className="text-active-color bg-secondary-color">
              <tr>
                <th>Contest Name</th>
                <th>Time left</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {submittedContests ? (
                submittedContests?.map((submittedContest) => (
                  <tr key={submittedContest?._id} className="text-white">
                    <th>{submittedContest?.contestName}</th>
                    <td>
                      <span>{submittedContest?.timeLeft.hours}h</span> :{" "}
                      <span>{submittedContest?.timeLeft.minutes}m</span> :{" "}
                      <span>{submittedContest?.timeLeft.seconds}s</span>
                    </td>
                    <td className="capitalize">{submittedContest?.status}</td>
                    <th>
                      <Link
                        to={`/submittedContestDetails/${submittedContest?._id}`}
                        className="btn-xs hover:bg-white text-secondary-color uppercase rounded bg-active-color py-[2px]"
                      >
                        details
                      </Link>
                    </th>
                  </tr>
                ))
              ) : (
                <div>No Submitted Contests Available</div>
              )}
            </tbody>
          </table>
        </div>
      </Container>
    </div>
  );
}

export default SubmittedContests;
