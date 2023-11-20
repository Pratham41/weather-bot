import React, { useEffect } from "react";
import { Delete } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers, blockUser, deleteUser } from "../redux/slices/userSlice";

const Table = () => {
  const dispatch = useDispatch();
  const { loading, error, allUsers, successUpdate, successDelete } =
    useSelector((state) => state.users);
  const handleBlock = async (userData) => {
    dispatch(blockUser(userData));
  };
  const handleDelete = async (userId) => {
    dispatch(deleteUser(userId));
  };
  useEffect(() => {
    if (!allUsers?.length || successUpdate || successDelete) {
      dispatch(fetchUsers());
    }
  }, [allUsers?.length, dispatch, successUpdate, successDelete]);

  return (
    <>
      {error && <h1 className="text-center">Something went wrong....</h1>}
      {loading ? (
        <h1 className="text-center">Loading......</h1>
      ) : (
        <>
          <h1 className="mb-10 text-xl font-semibold text-gray-500">
            Totals Users ({allUsers.length})
          </h1>
          <div className="overflow-x-auto rounded-lg">
            <table className="min-w-full bg-white rounded-xl">
              <thead>
                <tr className="text-left bg-gray-600 text-white">
                  <th className="py-5 px-4">Sr No</th>
                  <th className="py-5 px-4">Id</th>
                  <th className="py-5 px-4">User Id</th>
                  <th className="py-5 px-4">Name</th>
                  <th className="py-5 px-4"></th>
                  <th className="py-5 px-4"></th>
                  <th className="py-5 px-4"></th>
                  {/* Add more table headers as needed */}
                </tr>
              </thead>
              <tbody>
                {allUsers?.map((u, i) => (
                  <tr className="text-left" key={u._id}>
                    <td className="py-4 px-4">{i + 1}</td>
                    <td className="py-4 px-4">{u._id}</td>
                    <td className="py-4 px-4">{u.userId}</td>
                    <td className="py-4 px-4">{u.name}</td>
                    <td className="py-4 px-4 text-center">
                      {u.isSubscribed ? (
                        <p className="text-green-500 bg-green-100 p-1 text-center text-xs rounded-lg">
                          Subscribed
                        </p>
                      ) : (
                        <p className="text-blue-500 bg-blue-100 p-1 text-center text-xs rounded-lg">
                          Not Subscribed
                        </p>
                      )}
                    </td>
                    <td className="py-4 px-4 text-center">
                      {u.isBlocked ? (
                        <button
                          onClick={() =>
                            handleBlock({ userId: u._id, flag: false })
                          }
                          className="text-purple-800 bg-purple-100 px-2 py-1 rounded-lg text-xs"
                        >
                          Unblock
                        </button>
                      ) : (
                        <button
                          onClick={() =>
                            handleBlock({ userId: u._id, flag: true })
                          }
                          className="text-red-800 text-xs bg-red-100 px-2 py-1 rounded-lg"
                        >
                          Block
                        </button>
                      )}
                    </td>
                    <td className="py-4 px-4">
                      <button
                        onClick={() => handleDelete(u._id)}
                        className="text-red-600"
                      >
                        <Delete fontSize="small" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </>
  );
};

export default Table;
