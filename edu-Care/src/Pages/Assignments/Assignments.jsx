import axios from "axios";
import Container from "../../Layout/Container";
import AssignmentCard from "./AssignmentCard";
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Loading from "../Loading/Loading";
import useData from "../../Hooks/useData";

const Assignments = () => {
  const { dark } = useData();

  const [showAssignment, setShowAssignment] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(3);
  const [filterBy, setFilterBy] = useState("");
  const [count, setCount] = useState(null);

  useEffect(() => {
    axios
      .get(
        `http://localhost:5000/assignments?filter=${filterBy}`
      )
      .then((res) => setCount(res.data.length));
  }, [filterBy]);

  const numberOfPages = Math.ceil(count / itemsPerPage);

  const pages = [...Array(numberOfPages).keys()];

  // fetching data based on page
  const { isLoading, refetch } = useQuery({
    queryKey: ["repoData"],
    queryFn: async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/assignments?page=${currentPage}&size=${itemsPerPage}&filter=${filterBy}`
        );
        setShowAssignment(response.data);
        return response.data;
      } catch (error) {
        console.log(error);
      }
    },
  });

  useEffect(() => {
    refetch();
  }, [refetch, currentPage, currentPage]);

  useEffect(() => {
    refetch();
    setCurrentPage(0);
  }, [refetch, filterBy]);

  // responsive design change the itemPerPage state value functionality
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768 && window.innerWidth < 1024) {
        setItemsPerPage(4);
      } else {
        setItemsPerPage(3);
      }
    };
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // filter button functionality
  const handleFilter = (filter) => {
    if (filter === "All") {
      setFilterBy(filter);
    } else if (filter === "Easy") {
      setFilterBy(filter);
    } else if (filter === "Medium") {
      setFilterBy(filter);
    } else if (filter === "Hard") {
      setFilterBy(filter);
    }
  };

  return (
    <div>
      {isLoading ? (
        <Loading></Loading>
      ) : (
        <Container>
          <div className="my-10">
            <div className="md:text-center mb-10 space-y-4 relative">
              <p className="tracking-widest font-bold text-primary-color">
                All The Assignments Are Here
              </p>
              <h2 className={dark ? "text-4xl text-white font-semibold" : "text-4xl text-secondary-color font-semibold"}>
                Assignments
              </h2>
              {/* filter button */}
              <div className="dropdown dropdown-hover dropdown-bottom dropdown-end absolute top-0 right-0">
                <label
                  tabIndex={0}
                  className="btn hover:bg-active-color hover:text-white md:px-10 normal-case m-1"
                >
                  Difficulty
                </label>
                <ul
                  tabIndex={0}
                  className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52"
                >
                  <li>
                    <button onClick={() => handleFilter("All")}>All</button>
                  </li>
                  <li>
                    <button onClick={() => handleFilter("Easy")}>Easy</button>
                  </li>
                  <li>
                    <button onClick={() => handleFilter("Medium")}>
                      Medium
                    </button>
                  </li>
                  <li>
                    <button onClick={() => handleFilter("Hard")}>Hard</button>
                  </li>
                </ul>
              </div>
            </div>
            {/* assignment cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {showAssignment?.map((assignment) => (
                <AssignmentCard
                  key={assignment._id}
                  assignment={assignment}
                ></AssignmentCard>
              ))}
            </div>
          </div>
          {/* pagination button */}
          <div className="mb-10 flex justify-center items-center flex-wrap">
            {pages?.map((page, idx) => (
              <button
                onClick={() => setCurrentPage(page)}
                className="btn bg-active-color mr-1 focus:bg-primary-color text-white mb-1"
                key={idx}
              >
                {page + 1}
              </button>
            ))}
          </div>
        </Container>
      )}
    </div>
  );
};

export default Assignments;
