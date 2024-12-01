import { useParams } from "react-router-dom";
import useLoadSecureData from "../../Hooks/useLoadSecureData";
import { useEffect, useState } from "react";
import Container from "../../Layout/Container";

function Leaderboard() {
  const [contestId, setContestId] = useState();
  const { id } = useParams();
  const { data } = useLoadSecureData("/latestContest");

  useEffect(() => {
    if (id) {
      setContestId(id);
    } else {
      setContestId(data?._id);
    }
  }, [data, id]);

  const { data: leaderboard } = useLoadSecureData(`/leaderboard/${contestId}`);

  return (
    <div>
      <Container>
        <h2 className="text-2xl font-bold text-active-color border-b-2 inline-block pb-1 pr-2 border-active-color capitalize mt-10 mb-5">
          Leaderboard
        </h2>
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
              leaderboard?.map((contest, idx) => (
                <tr key={contest?._id} className="text-white">
                  <th>{idx + 1}</th>
                  <th>{contest?.userName}</th>
                  <td>{contest?.userEmail}</td>
                  <td>{contest?.totalScore}</td>
                  <td>{contest?.timeSpent} Sec</td>
                </tr>
              ))
            ) : (
              <div className="text-lg mt-4">No Data Available</div>
            )}
          </tbody>
        </table>
      </Container>
    </div>
  );
}

export default Leaderboard;
