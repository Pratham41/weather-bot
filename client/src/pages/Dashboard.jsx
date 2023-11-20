import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { removeInfo, getInfo } from "../redux/slices/adminSlice";

const Dashboard = ({ children }) => {
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.admin);

  let navigate = useNavigate(true);

  const handleLogout = () => {
    localStorage.removeItem("userInfo");
    dispatch(removeInfo());
    navigate("/login");
  };

  useEffect(() => {
    if (!userInfo) {
      dispatch(getInfo());
    }
  }, [dispatch, userInfo]);

  return (
    <div className="flex flex-col lg:flex-row min-h-screen">
      <aside className="bg-gray-800 text-white w-full lg:w-64 p-4">
        {Object.keys(userInfo).length > 0 && (
          <>
            <div className="flex flex-col justify-center items-center mb-8">
              <img
                src={userInfo?.picture ? userInfo?.picture : "/images/man.png"}
                height={50}
                width={50}
                alt="profile"
                className="rounded-full"
              />
              <h1 className="text-xl mt-2">{userInfo?.name}</h1>
              <p className="text-xs mt-2 text-purple-300">{userInfo?.email}</p>
            </div>
            <hr />
            <ul className="text-center mt-10">
              <li className="my-2">
                <Link to={"/"} className="block text-white">
                  Users
                </Link>
              </li>
              <li className="my-2">
                <Link to={"/settings"} className="block text-white">
                  Settings
                </Link>
              </li>
              <li className="my-2">
                <button onClick={handleLogout} className="text-white">
                  Logout
                </button>
              </li>
            </ul>
          </>
        )}
      </aside>

      <div className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 p-4">
        <main className="mt-4 p-6">{children}</main>
      </div>
    </div>
  );
};

export default Dashboard;
