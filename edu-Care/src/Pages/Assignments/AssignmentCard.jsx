import PropTypes from "prop-types";
import { AiTwotoneHourglass } from "react-icons/ai";
import { GiNotebook } from "react-icons/gi";
import { SlCalender } from "react-icons/sl";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../../Hooks/useAuth";
import Swal from "sweetalert2";

const AssignmentCard = ({ assignment }) => {
  const { user } = useAuth();

  const navigate = useNavigate();

  const handleUpdate = (id) => {
    if (assignment?.userEmail === user?.email) {
      navigate(`/assignmentDetails/update/${id}`);
    } else {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "You can't update this assignment!",
      });
    }
  };

  return (
    <div>
      <div className="w-full h-full flex flex-col overflow-hidden rounded-lg shadow-lg bg-gray-800">
        <img
          className="object-cover object-center w-full h-56"
          src={assignment?.photoURL}
          alt="avatar"
        />

        <div className="flex justify-between items-center px-6 py-3 bg-gray-900">
          <div className="flex items-center">
            <AiTwotoneHourglass className="text-white text-lg"></AiTwotoneHourglass>

            <h1 className="mx-3 text-lg font-semibold text-white">
              {assignment?.difficulty}
            </h1>
          </div>
          <div className="flex items-center">
            <GiNotebook className="text-white text-lg"></GiNotebook>

            <h1 className="mx-3 text-lg font-semibold text-white">
              {assignment?.marks}
            </h1>
          </div>
        </div>

        <div className="px-6 py-4 flex-grow flex flex-col">
          <div className="flex-grow">
            <h1 className="text-xl font-semibold text-white">
              {assignment?.title}
            </h1>

            <p className="py-2 text-gray-400">
              {assignment?.description}
            </p>

            <div className="flex items-center mt-2 text-gray-200">
              <SlCalender></SlCalender>
              <h1 className="px-2 text-sm">{assignment?.dueDate}</h1>
            </div>
          </div>

          <div className="flex items-center justify-end gap-4 mt-8 text-gray-200">
            <Link
              to={`/assignmentDetails/${assignment?._id}`}
              className="btn px-10 normal-case bg-active-color border-none text-white font-bold tracking-wide"
            >
              Details
            </Link>

            <Link
              onClick={() => handleUpdate(assignment._id)}
              // to={`/assignmentDetails/update/${assignment?._id}`}
              className="btn px-10 normal-case bg-transparent text-white font-bold tracking-wide"
            >
              Update
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AssignmentCard;

AssignmentCard.propTypes = {
  assignment: PropTypes.object,
};
