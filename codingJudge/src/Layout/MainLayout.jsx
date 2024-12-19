import { Outlet } from "react-router-dom";
import Header from "../Components/Header";

const MainLayout = () => {
  return (
    <div>
      <Header>
        <div className="pt-[68px]">
          <Outlet></Outlet>
        </div>
      </Header>
    </div>
  );
};

export default MainLayout;
