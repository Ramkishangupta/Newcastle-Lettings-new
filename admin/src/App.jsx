import { Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import {ToastContainer} from 'react-toastify';
import AdminAuth from "./components/AdminAuth";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import AddProperty from "./pages/AddProperty";

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
                  <Route path="/add-items" element={<AddProperty />} />
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
