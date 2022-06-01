import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";

// Bootstrap
import { Container, Button, Table } from "react-bootstrap";

import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

// Icon
import trash from "../../images/trash.svg";

// Import Component Delete User
import DeleteUser from "./DeleteUser";

function Admin({ layouts, setLayouts }) {
    // Get Token From Locale storage
    const { token } = JSON.parse(localStorage.getItem("UserLogin"));

    const [Users, setUsers] = useState([]);

    const [Loading, setLoading] = useState(false);
    const [delUserIndex, setDelUserIndex] = useState(null);
    const [delUserName, setDelUserName] = useState(null);

    // Create custom style
    const rowStyle = {
        background: "transparent",
        color: "#fff",
        fontSize: "85%",
    };
    // Request to get all users
    useEffect(() => {
        setLoading(true);
        (async () => {
            await axios
                .get("http://127.0.0.1:8000/maps/users/", {
                    headers: { Authorization: `Token ${token}` },
                })
                .then((res) => {
                    setUsers(res.data);
                    setLoading(false);
                })
                .catch((er) => {
                    toast.error(er.message, "Please refresh the page");
                    setLoading(false);
                });
        })();
    }, [token]);

    return (
        <>
            <Navbar />
            <Container
                fluid
                style={{
                    background: "hsl(250.4, 79.3%, 5.7%)",
                    minHeight: "100vh",
                }}
            >
                <DeleteUser
                    layouts={layouts.deleteUser}
                    setLayouts={setLayouts}
                    delUserIndex={delUserIndex}
                    delUserName={delUserName}
                    Users={Users}
                    setUsers={setUsers}
                />
                <h2 className="text-start text-white pt-3">Users</h2>
                {!Loading ? (
                    <Table borderless responsive className="mt-4">
                        <thead>
                            <tr
                                style={{
                                    ...rowStyle,
                                    background: "#1d2e4c",
                                    padding: "20px",
                                    border: "none",
                                    fontWeight: "bold",
                                }}
                            >
                                <td>Id</td>
                                <td>Name</td>
                                <td>Email</td>
                                <td>Phone</td>
                                <td>Actions</td>
                            </tr>
                        </thead>
                        <tbody>
                            {/* Map on users to show them */}
                            {Users?.map((user, i) => {
                                return (
                                    <tr
                                        key={i}
                                        style={{
                                            ...rowStyle,
                                            borderBottom: "1px solid #1a334d",
                                        }}
                                    >
                                        <td>{user?.id}</td>
                                        <td>{user?.username}</td>
                                        <td>{user?.email}</td>
                                        <td>
                                            {user?.phone
                                                ? user?.phone
                                                : "phone"}
                                        </td>

                                        <td>
                                            <Button
                                                style={{
                                                    borderRadius: "5px",
                                                    boxShadow:
                                                        "1px 1px 4px 1px #000",
                                                    padding: ".3rem",
                                                    border: "none",
                                                    background: "transparent",
                                                }}
                                                onClick={() => {
                                                    setDelUserIndex(user.id);
                                                    setDelUserName(
                                                        user.username
                                                    );
                                                    setLayouts({
                                                        ...layouts,
                                                        deleteUser: true,
                                                    });
                                                }}
                                            >
                                                <img src={trash} alt="two" />
                                            </Button>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </Table>
                ) : (
                    <h2>Loading...</h2>
                )}
                <Footer />
            </Container>
        </>
    );
}

export default Admin;
