import { useState } from "react";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

function CreateQuestion() {
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();
  const contestJSON = localStorage.getItem("contest");
  const contest = JSON.parse(contestJSON);
  const numberOfQuestion = contest ? parseInt(contest.numberOfQuestion) : 0;

  // Create an array with a length of numberOfQuestion to dynamically create input fields
  const [questions, setQuestions] = useState(Array(numberOfQuestion).fill(""));

  // Handle change in input fields
  const handleQuestionChange = (index, value) => {
    const newQuestions = [...questions];
    newQuestions[index] = value;
    setQuestions(newQuestions);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (contest) {
      contest.questions = questions;
    }

    const res = await axiosSecure.post("/contests", contest);
    console.log(res?.data);
    if (res?.data?.insertedId) {
      toast.success("Contest created successfully.");
      localStorage.removeItem("contest");
      navigate("/");
    }
  };

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
      <div className="w-full max-w-4xl p-6 m-auto mx-auto rounded border border-[#ABABAB]">
        <div>
          <h2 className="text-lg font-bold text-white">
            Write down the questions.
          </h2>
        </div>

        <form className="mt-6" onSubmit={handleSubmit}>
          {/* Render the input fields dynamically */}
          {Array.from({ length: numberOfQuestion }, (_, index) => (
            <div key={index} className="mt-4">
              <input
                type="text"
                name={`question-${index}`}
                placeholder={`Question ${index + 1}`}
                value={questions[index]}
                onChange={(e) => handleQuestionChange(index, e.target.value)}
                required
                className="block w-full text-sm placeholder:text-white text-white py-3 pl-1 mt-2 bg-transparent border-b border-[#ABABAB] focus:outline-none focus:bg-transparent"
              />
            </div>
          ))}

          <div className="mt-6">
            <button
              type="submit"
              className="w-full px-6 py-2.5 font-medium tracking-wide rounded-sm bg-active-color text-secondary-color flex items-center gap-1 justify-center"
            >
              Submit Contest
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreateQuestion;
