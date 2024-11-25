import { useParams } from "react-router-dom";
import useLoadSecureData from "../../Hooks/useLoadSecureData";

function SubmittedContestDetails() {
  const { id } = useParams();
  const { data: submittedContest } = useLoadSecureData(
    `/submittedContests/${id}`
  );

  const { data: contest } = useLoadSecureData(
    `/contests/${submittedContest?.contestId}`
  );
console.log(submittedContest?.code?.length)
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
      {contest?.questions?.map((question, idx) => (
        <div key={idx} className="mb-10 text-white font-medium">
          <p>
            <span className="text-xl">Question {idx + 1} :</span>{" "}
            {question || "No question text available."}
          </p>
          <p key={idx} className="mt-5">Answer : {submittedContest?.code?.[idx]}</p>
        </div>
      ))}
    </div>
  );
}

export default SubmittedContestDetails;
