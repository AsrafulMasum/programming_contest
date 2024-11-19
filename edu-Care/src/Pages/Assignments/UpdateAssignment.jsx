import { SlCalender } from "react-icons/sl";
import useData from "../../Hooks/useData";
import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import { useNavigate, useParams } from "react-router-dom";
import useLoadData from "../../Hooks/useLoadData";
import Swal from "sweetalert2";
import axios from "axios";
import Loading from "../Loading/Loading";

const UpdateAssignment = () => {
  const { dark } = useData();
  const { id } = useParams();
  const navigate = useNavigate();
  const [endDate, setEndDate] = useState(new Date());
  const [dueDate, setDueDate] = useState();
  const url = `/assignments/${id}`;

  const { data: assignment, isLoading } = useLoadData(url, true);

  useEffect(() => {
    const selectOption = document.getElementById("difficultyLevel");

    if (assignment?.difficulty === "Easy") {
      selectOption.value = "Easy";
    } else if (assignment?.difficulty === "Medium") {
      selectOption.value = "Medium";
    } else if(assignment?.difficulty === "Hard") {
      selectOption.value = "Hard";
    }
    // const prevDate = new Date(assignment?.endDate)
    // setEndDate(prevDate)
    if (endDate) {
      const date = endDate.toString().split(" ");
      const exactDate = date.slice(0, 4);
      const stringDate = exactDate.join(" ");
      setDueDate(stringDate);
    }
  }, [assignment, endDate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const title = form.title.value;
    const difficulty = form.difficulty.value;
    const marks = form.marks.value;
    const photoURL = form.photoURL.value;
    const description = form.description.value;

    // form.reset();

    const updatedAssignment = {
      title,
      difficulty,
      marks,
      dueDate,
      photoURL,
      description,
      endDate,
    };

    Swal.fire({
      title: "Are you sure?",
      text: "You want to update this assignment?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, update it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .put(`http://localhost:5000/assignments/${id}`, updatedAssignment, {
            withCredentials: true,
          })
          .then((res) => {
            if (res.data.modifiedCount > 0) {
              Swal.fire({
                title: "Updated!",
                text: "Your assignment has been update.",
                icon: "success",
              });
              navigate("/assignments");
            }
          });
      }
    });
  };

  return (
    <div>
      {isLoading ? (
        <Loading></Loading>
      ) : (
        <div
          className="-mt-[68px] min-h-screen pt-36"
          style={{
            background: ` url("https://themeforest.wprealizer.com/html-educoda-preview/educoda/assets/images/shape/hero-shape-3.png")`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundColor: "rgba(39, 18, 123, 0.3)",
            backgroundBlendMode: "overlay",
          }}
        >
          <div className="w-full max-w-4xl p-6 m-auto mx-auto rounded border border-[#ABABAB]">
            <div>
              <h2 className="text-lg font-bold">Update a Assignment</h2>
            </div>

            <form onSubmit={handleSubmit} className="mt-6">
              <div>
                <input
                  type="text"
                  name="title"
                  placeholder="Title"
                  required
                  defaultValue={assignment?.title}
                  className={
                    dark
                      ? "block w-full text-xs placeholder:text-white text-white py-2 pl-1 mt-2 bg-transparent border-b border-[#ABABAB] focus:outline-none focus:bg-transparent"
                      : "block w-full text-xs placeholder:text-[#000000] text-[#000000] py-2 pl-1 mt-2 bg-transparent border-b border-[#ABABAB] focus:outline-none focus:bg-transparent"
                  }
                />
              </div>

              <div
                className={
                  dark
                    ? "block w-full text-xs placeholder:text-white text-white bg-transparent border-b border-[#ABABAB] focus:outline-none focus:bg-transparent"
                    : "block w-full text-xs placeholder:text-[#000000] text-[#000000] bg-transparent border-b border-[#ABABAB] focus:outline-none focus:bg-transparent"
                }
              >
                <select
                  id="difficultyLevel"
                  name="difficulty"
                  className={
                    dark
                      ? "block w-full h-10 text-xs placeholder:text-white text-white bg-transparent focus:outline-none focus:bg-transparent cursor-pointer"
                      : "block w-full h-10 text-xs placeholder:text-[#000000] text-[#000000] bg-transparent focus:outline-none focus:bg-transparent cursor-pointer"
                  }
                >
                  <option className="text-black" value="Easy">
                    Easy
                  </option>
                  <option className="text-black" value="Medium">
                    Medium
                  </option>
                  <option className="text-black" value="Hard">
                    Hard
                  </option>
                </select>
              </div>

              <div>
                <input
                  type="text"
                  name="marks"
                  placeholder="Assignment Marks"
                  defaultValue={assignment?.marks}
                  required
                  className={
                    dark
                      ? "block w-full text-xs placeholder:text-white text-white py-2 pl-1 mt-2 bg-transparent border-b border-[#ABABAB] focus:outline-none focus:bg-transparent"
                      : "block w-full text-xs placeholder:text-[#000000] text-[#000000] py-2 pl-1 mt-2 bg-transparent border-b border-[#ABABAB] focus:outline-none focus:bg-transparent"
                  }
                />
              </div>

              {/* <div>
              <input
                type="date"
                name="dueDate"
                placeholder="Due Date"
                required
                className={
                  dark
                    ? "block w-full text-xs placeholder:text-white text-white py-2 pl-1 mt-2 bg-transparent border-b border-[#ABABAB] focus:outline-none focus:bg-transparent"
                    : "block w-full text-xs placeholder:text-[#000000] text-[#000000] py-2 pl-1 mt-2 bg-transparent border-b border-[#ABABAB] focus:outline-none focus:bg-transparent"
                }
              />
            </div> */}

              <div
                className={
                  dark
                    ? "block w-full text-xs placeholder:text-white text-white py-2 bg-transparent border-b border-[#ABABAB] focus:outline-none focus:bg-transparent"
                    : "block w-full text-xs placeholder:text-[#000000] text-[#000000] py-2 bg-transparent border-b border-[#ABABAB] focus:outline-none focus:bg-transparent"
                }
              >
                <DatePicker
                  className={
                    dark
                      ? "text-xs cursor-pointer h-full w-96 md:w-[42rem] lg:w-[51rem] placeholder:text-white text-white bg-transparent focus:outline-none focus:bg-transparent"
                      : "text-xs cursor-pointer h-full w-96 md:w-[42rem] lg:w-[51rem] placeholder:text-[#000000] text-[#000000] bg-transparent focus:outline-none focus:bg-transparent"
                  }
                  showIcon
                  selected={endDate}
                  onChange={(date) => setEndDate(date)}
                  icon={<SlCalender className="text-sm -mt-[1px]"></SlCalender>}
                ></DatePicker>
              </div>

              <div>
                <input
                  type="text"
                  name="photoURL"
                  placeholder="Photo URL"
                  defaultValue={assignment?.photoURL}
                  required
                  className={
                    dark
                      ? "block w-full text-xs placeholder:text-white text-white py-2 pl-1 mt-2 bg-transparent border-b border-[#ABABAB] focus:outline-none focus:bg-transparent"
                      : "block w-full text-xs placeholder:text-[#000000] text-[#000000] py-2 pl-1 mt-2 bg-transparent border-b border-[#ABABAB] focus:outline-none focus:bg-transparent"
                  }
                />
              </div>

              <div>
                <textarea
                  type="text"
                  name="description"
                  placeholder="Description"
                  defaultValue={assignment?.description}
                  required
                  className={
                    dark
                      ? "block w-full text-xs placeholder:text-white text-white py-2 pl-1 mt-2 bg-transparent border-b border-[#ABABAB] focus:outline-none focus:bg-transparent"
                      : "block w-full text-xs placeholder:text-[#000000] text-[#000000] py-2 pl-1 mt-2 bg-transparent border-b border-[#ABABAB] focus:outline-none focus:bg-transparent"
                  }
                />
              </div>

              <div className="mt-6">
                <button
                  className={
                    dark
                      ? "w-full px-6 py-2.5 text-sm font-medium tracking-wide rounded-sm bg-active-color text-white"
                      : "w-full px-6 py-2.5 text-sm font-medium tracking-wide rounded-sm bg-active-color"
                  }
                >
                  Update Assignment
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default UpdateAssignment;
