import useLoadPublicData from "../../Hooks/useLoadPublicData";
import Container from "../../Layout/Container";
import { Link } from "react-router-dom";

function Contests() {
  const { data: contests } = useLoadPublicData("/contests");

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
          <h2 className="text-2xl font-bold text-active-color border-b-2 inline-block pb-1 pr-2 border-active-color capitalize">
            Top skill tests
          </h2>
          <p className="my-5 text-white">
            Test your knowledge in Python, C, C++, and Java and DSA concepts.
            Skill tests help you check your industry readiness in the courses
            you are learning.
          </p>
          <table className="table mb-10">
            {/* head */}
            <thead className="text-active-color bg-secondary-color">
              <tr>
                <th>Code</th>
                <th>Contest Name</th>
                <th>Duration</th>
                <th>No. Of Question</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {contests ? (
                contests?.map((contest) => (
                  <tr key={contest?._id} className="text-white">
                    <th>{contest?.contestCode}</th>
                    <td>{contest?.title}</td>
                    <td>{contest?.duration} Min</td>
                    <td>{contest?.numberOfQuestion}</td>
                    <th>
                      <Link
                        to={`/contestDetails/${contest?._id}`}
                        className="btn-xs hover:bg-white text-secondary-color uppercase rounded bg-active-color py-[2px]"
                      >
                        details
                      </Link>
                    </th>
                  </tr>
                ))
              ) : (
                <div>No Contests Available</div>
              )}
            </tbody>
          </table>
        </div>
      </Container>
    </div>
  );
}

export default Contests;
