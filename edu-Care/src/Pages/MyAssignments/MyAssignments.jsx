import useAuth from "../../Hooks/useAuth";
import useLoadData from "../../Hooks/useLoadData";
import Container from "../../Layout/Container";
import Loading from "../Loading/Loading";
import MyAssignmentsCard from "./MyAssignmentsCard";
import useData from "../../Hooks/useData";

const MyAssignments = () => {
  const { dark } = useData();
  const { user } = useAuth();
  const url = `http://localhost:5000/submittedAssignments/${user?.email}`;
  const { data: myAssignments, isLoading } = useLoadData(url, true);

  return (
    <div>
      {isLoading ? (
        <Loading></Loading>
      ) : (
        <div>
          <div className="text-center mt-10 px-4">
            <p className="tracking-widest font-bold text-primary-color">
              All The Assignments Submitted By Me
            </p>
            <h2
              className={
                dark
                  ? "text-4xl text-white font-semibold"
                  : "text-4xl text-secondary-color font-semibold"
              }
            >
              My Submitted Assignments
            </h2>
          </div>
          <Container>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 my-10">
              {myAssignments?.map((assignment) => (
                <MyAssignmentsCard
                  key={assignment?._id}
                  assignment={assignment}
                ></MyAssignmentsCard>
              ))}
            </div>
          </Container>
        </div>
      )}
    </div>
  );
};

export default MyAssignments;
