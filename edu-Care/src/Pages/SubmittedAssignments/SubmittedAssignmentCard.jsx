import PropTypes from "prop-types";
import useLoadData from "../../Hooks/useLoadData";
import { GiNotebook } from "react-icons/gi";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import useData from "../../Hooks/useData";
import useAuth from "../../Hooks/useAuth";
import Swal from "sweetalert2";
import { pdfjs } from "react-pdf";
import Loading from "../Loading/Loading";
import { toast } from "react-toastify";
import axios from "axios";

const SubmittedAssignmentCard = ({ assignment, refetch }) => {
  const { dark } = useData();
  const { user } = useAuth();

  const assignmentId = assignment?.assignmentID;
  const assignmentURL = `/assignments/${assignmentId}`;
  const { data: assignmentData, isLoading } = useLoadData(assignmentURL, true);

  const submittedBy = assignment?.submittedEmail;
  const submittedUserURL = `/users/${submittedBy}`;
  const { data: submittedUser, isLoading: loadingUser } = useLoadData(
    submittedUserURL,
    true
  );

  pdfjs.GlobalWorkerOptions.workerSrc = new URL(
    "pdfjs-dist/build/pdf.worker.min.js",
    import.meta.url
  ).toString();

  // Your PDF file URL
  const pdfUrl = `${assignment?.pdf}`;

  let [isOpen, setIsOpen] = useState(false);

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    if (assignment?.submittedEmail === user?.email) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "You can't give marks to this assignment !",
      });
    } else {
      setIsOpen(true);
    }
  }

  const [isOpenPDF, setIsOpenPDF] = useState(false);

  const openPDFModal = () => {
    setIsOpenPDF(true);
  };

  const closePDFModal = () => {
    setIsOpenPDF(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const givenMarks = form.marks.value;
    const feedback = form.feedback.value;
    const examinerData = { givenMarks, feedback, status: "completed" };

    if (givenMarks > assignmentData?.marks) {
      toast.error("Please provide a valid marks.");
    } else {
      axios
        .put(
          `http://localhost:5000/submittedAssignments/${assignment?._id}`,
          examinerData,
          { withCredentials: true }
        )
        .then((res) => {
          if (res.data.modifiedCount > 0) {
            toast.success("Reviewed Assignment.");
            closeModal();
            refetch();
          }
        });
    }
  };

  return (
    <div>
      {isLoading || loadingUser ? (
        <Loading></Loading>
      ) : (
        <div className="overflow-hidden rounded-lg shadow-lg bg-gray-800">
          <div className="px-4 py-2 flex justify-between">
            <h1 className="font-bold text-white">
              {assignmentData?.title}
            </h1>
            <p className="mt-1 text-sm text-gray-400 flex items-center gap-2">
              <GiNotebook className="text-white text-lg "></GiNotebook>
              {assignmentData?.marks}
            </p>
          </div>

          <img
            className="object-cover w-full h-48 mt-2"
            src={assignmentData?.photoURL}
            alt="NIKE AIR"
          />

          <div className="flex items-center justify-between px-4 py-2 bg-gray-900">
            <div className="flex items-center justify-end">
              <img
                className="object-cover h-8 w-8 rounded-full"
                src={submittedUser?.photoURL}
                alt="Avatar"
              />
              <p
                className="ml-4 font-semibold text-gray-200"
                tabIndex="0"
                role="link"
              >
                {submittedUser?.name}
              </p>
            </div>
            <button
              onClick={openModal}
              className="px-2 py-1 text-xs font-semibold text-white hover:text-gray-900 transition-colors duration-300 transform rounded bg-active-color hover:bg-gray-200 focus:outline-none"
            >
              Give Mark
            </button>
            {/* modal for giving marks */}
            <Transition appear show={isOpen} as={Fragment}>
              <Dialog as="div" className="relative z-10" onClose={closeModal}>
                <Transition.Child
                  as={Fragment}
                  enter="ease-out duration-300"
                  enterFrom="opacity-0"
                  enterTo="opacity-100"
                  leave="ease-in duration-200"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                >
                  <div className="fixed inset-0 bg-black/25" />
                </Transition.Child>

                <div className="fixed inset-0 overflow-y-auto">
                  <div className="flex min-h-full items-center justify-center p-4 text-center">
                    <Transition.Child
                      as={Fragment}
                      enter="ease-out duration-300"
                      enterFrom="opacity-0 scale-95"
                      enterTo="opacity-100 scale-100"
                      leave="ease-in duration-200"
                      leaveFrom="opacity-100 scale-100"
                      leaveTo="opacity-0 scale-95"
                    >
                      <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-center align-middle shadow-xl transition-all">
                        <Dialog.Title
                          as="h3"
                          className="text-lg font-medium leading-6 text-gray-900"
                        >
                          Give marks to your friend !
                        </Dialog.Title>
                        <a
                          href={assignment?.pdf}
                          className="py-4 text-primary-color"
                          target="_blank"
                          rel="noreferrer"
                        >
                          {assignment?.pdf}
                        </a>

                        <p className="pb-4">
                          Quick Note : {assignment?.quickNote}
                        </p>

                        <button
                          onClick={closeModal}
                          className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
                        >
                          ✕
                        </button>

                        <button
                          onClick={openPDFModal}
                          className="btn text-white bg-primary-color normal-case btn-sm"
                        >
                          Show PDF
                        </button>
                        {/* pdf modal */}
                        <Dialog
                          as="div"
                          className="fixed inset-0 z-50 overflow-y-auto"
                          open={isOpenPDF}
                          onClose={closeModal}
                        >
                          <div className="min-h-screen px-4 text-center">
                            <Dialog.Overlay className="fixed inset-0 bg-black opacity-30" />
                            <span
                              className="inline-block h-screen align-middle"
                              aria-hidden="true"
                            >
                              &#8203;
                            </span>
                            <div className="inline-block align-middle p-6 my-8 text-left bg-white shadow-xl transform transition-all sm:my-12 sm:align-middle sm:max-w-3xl sm:w-full sm:p-6">
                              <Dialog.Title
                                as="h3"
                                className="text-lg font-medium leading-6 text-gray-900"
                              >
                                PDF Viewer Modal
                              </Dialog.Title>
                              <div className="mt-2">
                                <iframe
                                  title="PDF Viewer"
                                  src={pdfUrl}
                                  width="100%"
                                  height="500px"
                                />
                              </div>
                              <div className="mt-4">
                                <button
                                  onClick={closePDFModal}
                                  type="button"
                                  className="inline-flex justify-center px-4 py-2 text-sm font-medium text-white bg-blue-500 border border-transparent rounded-md hover:bg-blue-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
                                >
                                  Close Modal
                                </button>
                              </div>
                            </div>
                          </div>
                        </Dialog>

                        <form onSubmit={handleSubmit}>
                          <div>
                            <input
                              type="number"
                              name="marks"
                              placeholder="Give Marks"
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
                              name="feedback"
                              placeholder="Feedback"
                              required
                              className={
                                dark
                                  ? "block w-full text-xs placeholder:text-white text-white py-2 pl-1 mt-2 bg-transparent border-b border-[#ABABAB] focus:outline-none focus:bg-transparent"
                                  : "block w-full text-xs placeholder:text-[#000000] text-[#000000] py-2 pl-1 mt-2 bg-transparent border-b border-[#ABABAB] focus:outline-none focus:bg-transparent"
                              }
                            />
                          </div>
                          <button
                            type="submit"
                            className="btn px-10 mt-10 normal-case bg-active-color border-none text-white font-bold tracking-wide"
                          >
                            Submit
                          </button>
                        </form>
                      </Dialog.Panel>
                    </Transition.Child>
                  </div>
                </div>
              </Dialog>
            </Transition>
          </div>
        </div>
      )}
    </div>
  );
};

export default SubmittedAssignmentCard;

SubmittedAssignmentCard.propTypes = {
  assignment: PropTypes.object,
  refetch: PropTypes.func,
};
