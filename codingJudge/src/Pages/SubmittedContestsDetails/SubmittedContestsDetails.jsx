import { useParams } from "react-router-dom";
import { useState } from "react";
import useLoadSecureData from "../../Hooks/useLoadSecureData";
import { Light as SyntaxHighlighter } from "react-syntax-highlighter";
import { atomOneDark } from "react-syntax-highlighter/dist/esm/styles/hljs";
import Container from "../../Layout/Container";

function SubmittedContestsDetails() {
  const { id } = useParams();
  const { data: submittedContest } = useLoadSecureData(
    `/submittedContests/${id}`
  );

  const { data: contest } = useLoadSecureData(
    `/contests/${submittedContest?.contestId}`
  );

  // State to track feedback
  const [feedback, setFeedback] = useState({});

  // Handle feedback change
  const handleFeedbackChange = (questionIndex, value) => {
    setFeedback((prev) => ({
      ...prev,
      [questionIndex]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = () => {
    console.log("Submitting Feedback:", feedback);
  };

  // Check if all questions have feedback
  const allFeedbackProvided =
    contest?.questions?.length &&
    contest.questions.every((_, idx) => feedback[idx]);

  return (
    <div
      className="-mt-[68px] min-h-screen pt-28 px-4 pb-10"
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
        {contest?.questions?.map((question, idx) => (
          <div key={idx} className="mb-10 text-white font-medium">
            <p>
              <span className="text-xl">Question {idx + 1} :</span>{" "}
              {question || "No question text available."}
            </p>
            <p className="my-5">Answer :</p>
            <SyntaxHighlighter language="javascript" style={atomOneDark}>
              {submittedContest?.code?.[idx] || "// No code provided"}
            </SyntaxHighlighter>

            {/* Feedback Section */}
            <div className="my-4">
              <p className="text-lg mb-2">Feedback:</p>
              <div className="flex items-center">
                <div className="flex items-center gap-2">
                  <input
                    type="radio"
                    name={`feedback-${idx}`}
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
                    onChange={() => handleFeedbackChange(idx, "Incorrect")}
                  />
                  <label>Incorrect</label>
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* Submit Button */}
        <div className="mt-10 text-center">
          <button
            onClick={handleSubmit}
            disabled={!allFeedbackProvided}
            className={`px-6 py-2 font-bold rounded ${
              allFeedbackProvided
                ? "bg-active-color text-secondary-color hover:scale-105 duration-500"
                : "bg-gray-500 text-white cursor-not-allowed"
            }`}
          >
            Submit Feedback
          </button>
        </div>
      </Container>
    </div>
  );
}

export default SubmittedContestsDetails;
