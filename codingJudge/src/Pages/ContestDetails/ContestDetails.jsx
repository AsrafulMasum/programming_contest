import { useNavigate, useParams } from "react-router-dom";
import useLoadSecureData from "../../Hooks/useLoadSecureData";
import Container from "../../Layout/Container";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import useAuth from "../../Hooks/useAuth";
import { useEffect, useState } from "react";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import useLoadPublicData from "../../Hooks/useLoadPublicData";

function ContestDetails() {
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const { id } = useParams();
  const { data: contest } = useLoadSecureData(`/contests/${id}`);

  const { user } = useAuth();
  const [dbUser, setDbUser] = useState(null);
  const { data: submittedContests } = useLoadSecureData(
    `/submittedContestsByUser/${user?.email}`
  );
  const { data: emergencyData } = useLoadSecureData(
    `/emergency/${user?.email}`
  );
  const { data } = useLoadPublicData(`/submittedContests`);

  const isTaken = submittedContests?.some((item) => item.contestId === id);
  const onEmergency = emergencyData?.some((item) => item.contestId === id);
  const participated = data?.some((item) => item.contestId === id);

  useEffect(() => {
    const getDbUser = async () => {
      const res = await fetch(`http://localhost:5000/users/${user?.email}`);
      const data = await res.json();
      setDbUser(data);
    };
    if (user) {
      getDbUser();
    }
  }, [user]);

  const handleDeleteContest = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#2f4858",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        if (participated) {
          const updatedData = {
            visibility: "Hide",
          };
          const res = await axiosSecure.put(`/contests/${id}`, updatedData);
          console.log(res?.data?.success);
          if (res?.data?.success) {
            Swal.fire({
              title: "Deleted!",
              text: "Contest has been deleted.",
              icon: "success",
              confirmButtonColor: "#2f4858",
            });
            navigate("/contests");
          }
        } else {
          const res = await axiosSecure.delete(`/contests/${id}`);
          if (res?.data?.success) {
            Swal.fire({
              title: "Deleted!",
              text: "Contest has been deleted.",
              icon: "success",
              confirmButtonColor: "#2f4858",
            });
            navigate("/contests");
          }
        }
      }
    });
  };

  const handleModal = () => {
    if (isTaken) {
      Swal.fire({
        title: "Participated!",
        text: "You have been participated.",
        icon: "success",
        confirmButtonColor: "#2f4858",
      });
      navigate("/contests");
    } else if (onEmergency) {
      Swal.fire({
        title: "On Emergency!",
        text: "You have faced issues on the contest.",
        icon: "success",
        confirmButtonColor: "#2f4858",
      });
      navigate("/contests");
    } else {
      Swal.fire({
        title: "Are you sure?",
        text: "You want to take this contest!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#2f4858",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, take it!",
      }).then(async (result) => {
        if (result.isConfirmed) {
          const { value: contestCode } = await Swal.fire({
            title: "Inter contest code",
            input: "text",
            inputLabel: "Contest Code",
            inputPlaceholder: "Enter The Contest Code",
            confirmButtonColor: "#2f4858",
          });
          if (contestCode && contestCode === contest?.contestCode) {
            navigate(`/contestPaper/${contest?._id}`);
          } else {
            toast.error("Enter valid code.");
          }
        }
      });
    }
  };

  return (
    <div className="min-h-screen pt-24 px-4 pb-10">
      <Container>
        <>
          <h4 className="text-4xl font-semibold text-white">
            {contest?.title}
          </h4>

          <p className="text-2xl mt-10 text-white">
            Duration : {contest?.duration} Min
          </p>

          <p className="text-2xl mt-10 text-white">
            Code :{" "}
            <span className="text-active-color">{contest?.contestCode}</span>
          </p>

          <p className="text-2xl mt-10 text-white">
            Description : {contest?.description}
          </p>

          {dbUser?.role === "Admin" ? (
            <div className="mt-10 flex justify-end">
              <button
                onClick={handleDeleteContest}
                className="text-xl bg-active-color text-black px-10 py-2 rounded font-medium hover:scale-105 duration-500"
              >
                Delete The Contest
              </button>
            </div>
          ) : (
            <div className="mt-10 flex justify-end">
              <button
                onClick={handleModal}
                className="text-xl bg-active-color text-black px-10 py-2 rounded font-medium hover:scale-105 duration-500"
              >
                Take The Contest
              </button>
            </div>
          )}
        </>
      </Container>
    </div>
  );
}

export default ContestDetails;
