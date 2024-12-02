import useLoadSecureData from "../../Hooks/useLoadSecureData";
import Container from "../../Layout/Container";

function Emergency() {
  const { data: emergencies } = useLoadSecureData("/emergency");
  console.log(emergencies);
  return (
    <div className="mt-12">
      <Container>
        <div>
          <h2 className="text-2xl font-bold text-active-color border-b-2 inline-block pb-1 pr-2 mb-5 border-active-color capitalize">
            Emergencies
          </h2>
          <table className="table mb-10">
            {/* head */}
            <thead className="text-active-color bg-secondary-color">
              <tr>
                <th>Contest ID</th>
                <th>User Email</th>
                <th>Time left</th>
              </tr>
            </thead>
            <tbody>
              {emergencies?.length ? (
                emergencies?.map((emergency) => (
                  <tr key={emergency?._id} className="text-white">
                    <th>{emergency?._id}</th>
                    <td className="capitalize">{emergency?.userEmail}</td>
                    <td>
                      <span>{emergency?.timeLeft.hours}h</span> :{" "}
                      <span>{emergency?.timeLeft.minutes}m</span> :{" "}
                      <span>{emergency?.timeLeft.seconds}s</span>
                    </td>
                  </tr>
                ))
              ) : (
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

export default Emergency;
