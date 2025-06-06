import { useEffect, useState } from "react";
import axios from "axios";
import { backendUrl } from "../App"; 
import Loader from '../components/Loader'; 

const UsersList = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchUsers = async () => {
    try {
      const { data } = await axios.get(`${backendUrl}/api/v1/admin/users`, {
        withCredentials: true, 
      });
      setUsers(data.users);
    } catch (error) {
      console.error("Error fetching users:", error);
    } finally {
      setLoading(false);
    }
  };

  const makeAdmin = async (id) => {
    try {
      await axios.put(
        `${backendUrl}/admin/user/${id}`,
        { role: "admin" },
        {
          withCredentials: true, 
        }
      );
      fetchUsers();
    } catch (error) {
      console.error("Failed to update user role:", error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="p-4 overflow-x-auto">
      <h2 className="text-xl font-semibold mb-4">All Users List</h2>

      {loading ? (
        <Loader/>
      ) : (
        <table className="w-full text-sm">
          <thead className="bg-gray-100 text-gray-700">
            <tr>
              <th className="py-3 px-4 text-left">Name</th>
              <th className="py-3 px-4 text-left">Role</th>
              <th className="py-3 px-4 text-left">Action</th>
            </tr>
          </thead>
          <tbody>
            {users.length === 0 ? (
              <tr>
                <td colSpan="4" className="text-center py-4 text-gray-500">
                  No users found.
                </td>
              </tr>
            ) : (
              users.map((user) => (
                <tr
                  key={user._id}
                  className="border-b last:border-b-0 border-gray-300 hover:bg-gray-50"
                >
                  <td className="py-3 px-4">{user.name}</td>
                  <td className="py-3 px-4 capitalize">{user.role}</td>
                  <td className="py-3 px-4">
                    {user.role !== "admin" && user.role !=="superadmin" ? (
                      <button
                        onClick={() => makeAdmin(user._id)}
                        className="text-blue-600 hover:underline cursor-pointer"
                      >
                        Make Admin
                      </button>
                    ) : (
                      <span className="text-gray-500">Admin</span>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default UsersList;
