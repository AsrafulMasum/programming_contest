import { Link, useNavigate, useParams } from "react-router-dom"; // Import hooks for navigation and route parameters
import { useState } from "react"; // Import state management hook
import useLoadSecureData from "../../Hooks/useLoadSecureData"; // Custom hook to load secure data
import { Light as SyntaxHighlighter } from "react-syntax-highlighter"; // Syntax highlighter for code
import { atomOneDark } from "react-syntax-highlighter/dist/esm/styles/hljs"; // Styling for the syntax highlighter
import Container from "../../Layout/Container"; // Layout component for consistent styling
import useAxiosSecure from "../../Hooks/useAxiosSecure"; // Custom Axios instance for secure API calls
import { toast } from "react-toastify"; // Toast notifications for feedback
import Loading from "../Loading/Loading";

function SubmittedContestsDetails() {
  const navigate = useNavigate(); // Navigation hook
  const axiosSecure = useAxiosSecure(); // Secure Axios instance
  const { id } = useParams(); // Extract contest ID from URL parameters

  // Load data for the submitted contest
  const { data: submittedContest, isLoading } = useLoadSecureData(
    `/submittedContests/${id}`
  );

  // Load data for the contest details
  const { data: contest, isLoading: loading } = useLoadSecureData(
    `/contests/${submittedContest?.contestId}`
  );

  // State to track feedback for each question
  const [feedback, setFeedback] = useState(
    new Array(contest?.questions?.length || 0).fill("") // Initialize with empty feedback
  );

  // Update feedback for a specific question
  const handleFeedbackChange = (questionIndex, value) => {
    const updatedFeedback = [...feedback];
    updatedFeedback[questionIndex] = value; // Update feedback for the given index
    setFeedback(updatedFeedback);
  };

  // Submit feedback and update contest status
  const handleSubmit = async () => {
    const updatedData = {
      feedback, // Attach feedback array
      status: "Checked", // Update status to "Checked"
    };

    try {
      const res = await axiosSecure.put(
        `/submittedContests/${id}`, // API endpoint to update feedback
        updatedData
      );
      if (res.data?.success) {
        toast.success("Successfully Checked."); // Show success notification
        navigate("/allSubmittedContests"); // Navigate back to the list of submitted contests
      }
    } catch (error) {
      console.error("Error submitting feedback:", error); // Log errors
    }
  };

  // Ensure all questions have feedback before enabling submit
  const allFeedbackProvided =
    contest?.questions?.length &&
    contest.questions.every((_, idx) => feedback[idx]);

  return (
    <div
      className="-mt-[68px] min-h-screen pt-28 px-4 pb-10"
      style={{
        background: `url("https://themeforest.wprealizer.com/html-educoda-preview/educoda/assets/images/shape/hero-shape-3.png")`,
        backgroundRepeat: "no-repeat", // Ensuring the background image does not repeat
        backgroundSize: "cover", // Covering the entire section with the background image
        backgroundPosition: "center", // Positioning the image at the center of the section
        backgroundColor: "rgba(39, 18, 123, 0.3)", // Applying a semi-transparent black background color overlay
        backgroundBlendMode: "overlay", // Blending the overlay with the image
      }}
    >
      <Container>
        {isLoading && loading ? (
          <Loading />
        ) : (
          <>
            {/* Map through questions in the contest */}
            {contest?.questions?.map((question, idx) => (
              <div key={idx} className="mb-10 text-white font-medium">
                {/* Display question text */}
                <p>
                  <span className="text-xl">Question {idx + 1} :</span>{" "}
                  {question || "No question text available."}
                </p>

                {/* Display submitted answer */}
                <p className="my-5">Answer :</p>
                <SyntaxHighlighter language="javascript" style={atomOneDark}>
                  {submittedContest?.code?.[idx] || "// No code provided"}
                </SyntaxHighlighter>

                {/* Feedback section (only if the contest is pending) */}
                {submittedContest?.status === "Pending" && (
                  <div className="my-4">
                    <p className="text-lg mb-2">Feedback:</p>
                    <div className="flex items-center">
                      {/* Feedback options */}
                      <div className="flex items-center gap-2">
                        <input
                          type="radio"
                          name={`feedback-${idx}`} // Group inputs by question index
                          value="Good"
                          checked={feedback[idx] === "Good"}
                          onChange={() => handleFeedbackChange(idx, "Good")}
                        />
                        <label className="mr-4">Good</label>
                      </div>

                      <div className="flex items-center gap-2">
                        <input
                          type="radio"
                          name={`feedback-${idx}`}
                          value="Needs Improvement"
                          checked={feedback[idx] === "Needs Improvement"}
                          onChange={() =>
                            handleFeedbackChange(idx, "Needs Improvement")
                          }
                        />
                        <label className="mr-4">Needs Improvement</label>
                      </div>

                      <div className="flex items-center gap-2">
                        <input
                          type="radio"
                          name={`feedback-${idx}`}
                          value="Incorrect"
                          checked={feedback[idx] === "Incorrect"}
                          onChange={() =>
                            handleFeedbackChange(idx, "Incorrect")
                          }
                        />
                        <label>Incorrect</label>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}

            {/* Submit button for feedback */}
            {submittedContest?.status === "Pending" ? (
              <div className="mt-10 text-center">
                <button
                  onClick={handleSubmit}
                  disabled={!allFeedbackProvided} // Disable if feedback is incomplete
                  className={`px-6 py-2 font-bold rounded ${
                    allFeedbackProvided
                      ? "bg-active-color text-secondary-color hover:scale-105 duration-500"
                      : "bg-gray-500 text-white cursor-not-allowed"
                  }`}
                >
                  Submit Feedback
                </button>
              </div>
            ) : (
              // If feedback is already submitted, show link to leaderboard
              <div className="flex justify-end">
                <Link
                  to={`/leaderboard/${submittedContest?.contestId}`}
                  className="bg-active-color text-secondary-color text-2xl py-2 rounded px-10"
                >
                  Leaderboard
                </Link>
              </div>
            )}
          </>
        )}
      </Container>
    </div>
  );
}

export default SubmittedContestsDetails; // Export the component
