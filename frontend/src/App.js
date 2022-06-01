import { createContext, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

import { Routes, Route, Navigate, Outlet } from "react-router-dom";
import "./App.css";

// auth
import Resgister from "./pages/Auth/Resgister";
import Login from "./pages/Auth/Login";
import ForgetPassword from "./pages/Auth/ForgetPassword";
import ResetCode from "./pages/Auth/ResetCode";
import ResetPassword from "./pages/Auth/ResetPassword";

// pages
import Robots from "./pages/Robots";
import UpdateRobot from "./pages/Robots/UpdateRobot";
import Admin from "./pages/Admin";
import UpdateUserInfo from "./pages/UpdateInfo";

import Projects from "./pages/Projects";
import ProjectById from "./pages/Projects/ProjectById";
import UpdateProject from "./pages/Projects/UpdateProject";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { createTheme } from "react-data-table-component";

export const robotsGl = createContext();
export const projectsGl = createContext();
function App() {
    const [layouts, setLayouts] = useState({});

    const [robotsG, setRobotsG] = useState([]);
    const [projectsG, setProjectsG] = useState([]);

    const UserLogin = JSON.parse(localStorage.getItem("UserLogin") || null);

    // To change table background to black
    createTheme(
        "solarized",
        {
            text: { primary: "#268bd2", secondary: "#268bd2" },
            background: { default: "#222738" },
        },
        "dark"
    );
    return (
        <robotsGl.Provider value={[robotsG, setRobotsG]}>
            <projectsGl.Provider value={[projectsG, setProjectsG]}>
                <div className="App">
                    {/* Toast Alert style */}
                    <ToastContainer
                        position="top-center"
                        autoClose={5000}
                        hideProgressBar={false}
                        newestOnTop={false}
                        closeOnClick
                        rtl={false}
                        pauseOnFocusLoss
                        draggable
                        pauseOnHover
                    />

                    <Routes>
                        <Route element={<NotRequirdAuth />}>
                            <Route
                                path="/register"
                                element={<Resgister />}
                            ></Route>

                            <Route path="/login" element={<Login />}></Route>
                            <Route
                                path="/ForgetPassword"
                                element={<ForgetPassword />}
                            ></Route>
                            <Route
                                path="/ResetCode"
                                element={<ResetCode />}
                            ></Route>
                            <Route
                                path="/ResetPassword"
                                element={<ResetPassword />}
                            ></Route>
                        </Route>

                        <Route element={<RequirdAuth />}>
                            <Route
                                path="/"
                                element={
                                    <Projects
                                        layouts={layouts}
                                        setLayouts={setLayouts}
                                    />
                                }
                            />
                            <Route
                                path="/project/:id"
                                element={<ProjectById />}
                            />
                            <Route
                                path="/project/:id/update"
                                element={<UpdateProject />}
                            />
                            <Route
                                path="/robots"
                                element={
                                    <Robots
                                        layouts={layouts}
                                        setLayouts={setLayouts}
                                    />
                                }
                            />
                            <Route
                                path="/robot/:id/update"
                                element={<UpdateRobot />}
                            />
                            <Route
                                path="/setting"
                                element={<UpdateUserInfo />}
                            />

                            {UserLogin?.username === "tony" && (
                                <Route
                                    path="/users"
                                    element={
                                        <Admin
                                            layouts={layouts}
                                            setLayouts={setLayouts}
                                        />
                                    }
                                />
                            )}
                        </Route>

                        <Route path="*" element={<h2>404 NOT FOUND</h2>} />
                    </Routes>
                </div>
            </projectsGl.Provider>
        </robotsGl.Provider>
    );
}

export default App;

// to handle navigate
function RequirdAuth() {
    const userDetails = localStorage.getItem("UserLogin");

    if (userDetails === null) {
        // to navigate to login page
        return <Navigate to="/login" />;
    }
    return <Outlet />;
}

function NotRequirdAuth() {
    const userDetails = localStorage.getItem("UserLogin");

    if (userDetails === null) {
        return <Outlet />;
    }
    // to navigate to home page
    return <Navigate to="/" />;
}
