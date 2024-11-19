import useData from "../../Hooks/useData";
import axios from "axios";
import useAuth from "../../Hooks/useAuth";
import Swal from "sweetalert2";
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-datepicker";
import { useState } from "react";
import { SlCalender } from "react-icons/sl";

const AddAssignment = () => {
  const { dark } = useData();

  const { user } = useAuth();
  const userEmail = user.email;

  const [endDate, setEndDate] = useState(new Date());

  const date = endDate.toString().split(" ");
  const exactDate = date.slice(0, 5);
  const dueDate = exactDate.join(" ");

  // const [assignmentData, setAssignmentData] = useState({})

  // const url = "/assignments"

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const title = form.title.value;
    const difficulty = form.difficulty.value;
    const marks = form.marks.value;
    const photoURL = form.photoURL.value;
    const description = form.description.value;

    form.reset();

    const assignment = {
      title,
      difficulty,
      marks,
      dueDate,
      photoURL,
      description,
      userEmail,
      endDate,
    };
    // setAssignmentData(assignment);
    axios.post("http://localhost:5000/assignments", assignment, {withCredentials: true}).then((res) => {
      if (res.data.insertedId) {
        Swal.fire({
          title: "Created.",
          text: "Your assignment has been created.",
          icon: "success",
        });
      }
    });
  };

  return (
    <div
      className="-mt-[68px] min-h-screen pt-36 px-4"
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
          <h2 className="text-lg font-bold">Insert a Assignment</h2>
        </div>

        <form onSubmit={handleSubmit} className="mt-6">
          <div>
            <input
              type="text"
              name="title"
              placeholder="Title"
              required
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
              required
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
              Add Assignment
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddAssignment;
