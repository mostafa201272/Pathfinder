import React from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";

import { Container, Dropdown } from "react-bootstrap";

import navbot from "../images/navbot.svg";
import Luffy from "../images/Luffy.jpg";

const iconStyle = {
    width: "35px",
    height: "35px",
};

function Navbar({ helpIcons }) {
    const Navigate = useNavigate();
    const { pathname } = useLocation();
    const UserLogin = JSON.parse(localStorage.getItem("UserLogin") || {});

    const handleLogOut = () => {
        localStorage.removeItem("UserLogin");
        Navigate("/login");
    };
    return (
        <Container fluid style={{ background: "#191e3b" }}>
            <nav
                className="py-3"
                style={{
                    color: "#fff",
                    display: "flex",
                    alignItems: "center",
                    padding: "20px 0",
                }}
            >
                <img
                    className="App-logo"
                    src={navbot}
                    style={iconStyle}
                    alt=""
                    srcSet=""
                />
                <h5 className="mb-0">PATHFINDER-SC0</h5>
                <ul className="mb-0 d-flex" style={{ listStyle: "none" }}>
                    <li>
                        <Link
                            style={{
                                width: "60px",
                                height: "30px",
                                display: "inline-block",
                                marginRight: "10px",
                                marginBottom: "0",
                                textDecoration: "none",
                            }}
                            to="/"
                        >
                            <span
                                style={{
                                    color: `${
                                        pathname === "/"
                                            ? "rgb(211, 164, 46)"
                                            : "#FFF"
                                    }`,
                                }}
                            >
                                Home
                            </span>
                        </Link>
                    </li>
                    <li>
                        <Link
                            style={{
                                width: "60px",
                                height: "30px",
                                display: "inline-block",
                                marginRight: "auto",
                                textDecoration: "none",
                            }}
                            to="/robots"
                        >
                            <span
                                style={{
                                    color: `${
                                        pathname === "/robots"
                                            ? "rgb(211, 164, 46)"
                                            : "#FFF"
                                    }`,
                                }}
                            >
                                Robots
                            </span>
                        </Link>
                    </li>
                    {UserLogin.username === "tony" && (
                        <li>
                            <Link
                                style={{
                                    width: "60px",
                                    height: "30px",
                                    display: "inline-block",
                                    marginRight: "auto",
                                    textDecoration: "none",
                                }}
                                to="/users"
                            >
                                <span
                                    style={{
                                        color: `${
                                            pathname === "/users"
                                                ? "rgb(211, 164, 46)"
                                                : "#FFF"
                                        }`,
                                    }}
                                >
                                    Users
                                </span>
                            </Link>
                        </li>
                    )}
                </ul>
                <div style={{ display: "flex", marginLeft: "auto" }}>
                    {helpIcons && (
                        <Dropdown>
                            <Dropdown.Toggle
                                style={{
                                    background: "transparent",
                                    border: "none",
                                    boxShadow: "none",
                                }}
                            >
                                help
                            </Dropdown.Toggle>

                            <Dropdown.Menu>
                                {helpIcons?.map((item, i) => (
                                    <Dropdown.Item
                                        key={i}
                                        className="d-flex justify-content-between align-items-center"
                                    >
                                        {item.text}{" "}
                                        <span
                                            style={{
                                                width: "14px",
                                                height: "14px",
                                                display: "inline-block",
                                                background: `${item.color}`,

                                                borderRadius: "50%",
                                            }}
                                        ></span>
                                    </Dropdown.Item>
                                ))}
                            </Dropdown.Menu>
                        </Dropdown>
                    )}
                    <Dropdown>
                        <Dropdown.Toggle
                            style={{
                                background: "transparent",
                                border: "none",
                                boxShadow: "none",
                                paddingTop: "3px",
                            }}
                        >
                            <img
                                src={Luffy}
                                style={{
                                    width: "40px",
                                    height: "40px",
                                    borderRadius: "50%",
                                    border: "2px solid #d3a42e",
                                }}
                                alt="ima"
                            />{" "}
                            {UserLogin.username}{" "}
                        </Dropdown.Toggle>

                        {/* Setting and logout */}
                        <Dropdown.Menu className="text-white">
                            <Dropdown.Item className="">
                                <Link
                                    style={{
                                        width: "60px",
                                        height: "30px",
                                        display: "inline-block",
                                        marginRight: "10px",
                                        marginBottom: "0",
                                        textDecoration: "none",
                                        color: "#222",
                                    }}
                                    to="/setting"
                                >
                                    Setting
                                </Link>
                            </Dropdown.Item>
                            <Dropdown.Item className="" onClick={handleLogOut}>
                                logout
                            </Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                </div>
            </nav>
        </Container>
    );
}

export default Navbar;
