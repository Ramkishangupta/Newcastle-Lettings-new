import { Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import {ToastContainer} from 'react-toastify';
import AdminAuth from "./components/AdminAuth";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import AddProperty from "./pages/AddProperty";
import PropertyList from "./pages/PropertyList";
import UsersList from "./pages/UserList";
import AddService from "./pages/addService";
import UpdateService from "./pages/UpadateService";
import ComplaintList from "./pages/ComplaintList";

export const backendUrl = import.meta.env.VITE_BACKEND_URL
function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true); 

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const { data } = await axios.get(`${backendUrl}/api/v1/me`, {
          withCredentials: true, 
        });
        setIsAuthenticated(true);
      } catch (err) {
        setIsAuthenticated(false); 
      } finally {
        setLoading(false);
      }
    };
    checkAuth();
  }, []);

  if (loading) return <div className="text-center mt-20">Checking authentication...</div>;

  return (
    <>
      <div className="min-h-screen flex flex-col">
        <ToastContainer/>
        {!isAuthenticated ? (
          <AdminAuth onAuthenticated={() => setIsAuthenticated(true)} />
        ) : (
          <>
            <Navbar onLogout={() => setIsAuthenticated(false)}/>
            <div className="flex flex-1">
              <Sidebar />
              <main className="flex-1 bg-gray-50 p-4 ">
                <Routes>
                  <Route path="/" element={<AddProperty />} />
                  <Route path="/list" element={<PropertyList />} />
                  <Route path="/users" element={<UsersList />} />
                  <Route path="/service" element={<AddService />} />
                  <Route path="/update-service" element={<UpdateService />} />
                  <Route path="/complaint" element={<ComplaintList />} />
                </Routes>
              </main>
            </div>
          </>
        )}
      </div>
    </>
  );
}

export default App;
