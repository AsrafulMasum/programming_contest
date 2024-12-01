import { Link, useParams } from "react-router-dom";
import useLoadSecureData from "../../Hooks/useLoadSecureData";
import { Light as SyntaxHighlighter } from "react-syntax-highlighter";
import { atomOneDark } from "react-syntax-highlighter/dist/esm/styles/hljs";
import Container from "../../Layout/Container";

function SubmittedContestDetailsForUser() {
  const { id } = useParams();
  const { data: submittedContest } = useLoadSecureData(
    `/submittedContests/${id}`
  );

  const { data: contest } = useLoadSecureData(
    `/contests/${submittedContest?.contestId}`
  );
  console.log(submittedContest);
  return (
    <div className="-mt-[68px] min-h-screen pt-28 px-4 pb-10">
      <Container>
        {contest?.questions?.map((question, idx) => (
          <div key={idx} className="mb-16 text-white font-medium">
            <div className="flex justify-between items-center">
              <p>
                <span className="text-xl">Question {idx + 1} :</span>{" "}
                {question || "No question text available."}
              </p>
              {submittedContest?.feedback?.length && (
                <p>
                  Feedback :{" "}
                  <span className="text-active-color">
                    {submittedContest?.feedback?.[idx]}
                  </span>
                </p>
              )}
            </div>
            <p key={idx} className="my-5">
              Answer :
            </p>
            <SyntaxHighlighter language="javascript" style={atomOneDark}>
              {submittedContest?.code?.[idx]}
            </SyntaxHighlighter>
          </div>
        ))}
        {submittedContest?.status === "Checked" && (
          <div className="flex justify-end">
            <Link
              to={`/leaderboard/${submittedContest?.contestId}`}
              className="bg-active-color text-black text-2xl py-2 rounded px-10"
            >
              Leaderboard
            </Link>
          </div>
        )}
      </Container>
    </div>
  );
}

export default SubmittedContestDetailsForUser;
