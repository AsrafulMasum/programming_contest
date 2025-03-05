import axios from "axios";

const axiosPublic = axios.create({
  baseURL: "https://code-forge-three.vercel.app",
});

const useAxiosPublic = () => {
  return axiosPublic;
};

export default useAxiosPublic;
