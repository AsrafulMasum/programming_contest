import useLoadData from "../../Hooks/useLoadData";
import Container from "../../Layout/Container";
import SubmittedAssignmentCard from "./SubmittedAssignmentCard";
import Loading from "../Loading/Loading";
import useData from "../../Hooks/useData";

const SubmittedAssignments = () => {
  const { dark } = useData();

  const submittedAssignmentsUrl = "/submittedAssignments?status=pending";
  const {
    data: showData,
    isLoading,
    refetch,
  } = useLoadData(submittedAssignmentsUrl, true);

  return (
    <div>
      {isLoading ? (
        <Loading></Loading>
      ) : (
        <div>
          <div className="text-center mt-10 px-4">
            <p className="tracking-widest font-bold text-primary-color">
              All The Submitted Assignments Are Here
            </p>
            <h2
              className={
                dark
                  ? "text-4xl text-white font-semibold"
                  : "text-4xl text-secondary-color font-semibold"
              }
            >
              Submitted Assignments
            </h2>
          </div>
          <div>
            {showData?.length > 0 ? (
              <Container>
                <div className="my-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {showData?.map((assignment) => (
                    <SubmittedAssignmentCard
                      key={assignment?._id}
                      assignment={assignment}
                      refetch={refetch}
                    ></SubmittedAssignmentCard>
                  ))}
                </div>
              </Container>
            ) : (
              <div className="flex flex-col gap-4 justify-center items-center min-h-[60vh]">
                <h3 className="text-6xl">Oops !!!</h3>
                <p className="text-4xl">No assignments has been submitted.</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default SubmittedAssignments;
