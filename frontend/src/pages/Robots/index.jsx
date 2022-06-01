import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

// Bootstrap
import { Row, Col, Container, Button } from "react-bootstrap";

import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

// Add Robot component and Delete Robot component
import AddRobot from "./AddRobot";
import DeleteRobot from "./DeleteRobot";

// Robot Card component to show all robots
import RobotCard from "../../components/RobotCard";

// get all robots we save it in global
import { robotsGl } from "../../App";

function RobotsPage({ layouts, setLayouts }) {
    // get token from locale storage to send it in the request
    const { token } = JSON.parse(localStorage.getItem("UserLogin"));

    const [robotsG, setRobotsG] = useContext(robotsGl);
    const [delRobIndex, setDelRobIndex] = useState(null);
    const [delRoboName, setdelRoboName] = useState(null);

    // create array from text and color to map and show it in the header
    const helpIcons = [
        {
            text: "Wrok",
            color: "#090",
        },
        {
            text: "Mentanince",
            color: "rgb(205 190 9)",
        },
        {
            text: "Free",
            color: "#900",
        },
    ];

    // get all robot if no robot in the global
    useEffect(() => {
        if (robotsG.length) {
            return 0;
        }
        (async () => {
            await axios
                .get("http://127.0.0.1:8000/maps/robots/", {
                    headers: { Authorization: `Token ${token}` },
                })
                .then((res) => {
                    setRobotsG(res.data);
                })
                .catch((er) => {
                    console.log(er);
                    toast.error(er.message, "Please refresh the page");
                });
        })();
        return 0;
    }, [token, robotsG.length, setRobotsG]);
    return (
        <>
            <Navbar helpIcons={helpIcons} />
            <Container
                fluid
                style={{
                    background: "hsl(250.4, 79.3%, 5.7%)",
                    minHeight: "100vh",
                }}
            >
                <AddRobot
                    layouts={layouts.addRobot}
                    setLayouts={setLayouts}
                    Robots={robotsG}
                    setRobots={setRobotsG}
                />
                <DeleteRobot
                    layouts={layouts.deleteRob}
                    setLayouts={setLayouts}
                    robot={robotsG}
                    setRobots={setRobotsG}
                    delRoboIndex={delRobIndex}
                    delRoboName={delRoboName}
                />
                <div className="d-flex justify-content-between pt-4">
                    <h3 className="m-0 text-white">All Robots</h3>
                    <Button
                        style={{
                            height: "42px",
                            fontWeight: "600",
                            background: "none",
                            color: "#d3a42e",
                            border: "3px solid #d3a42e",
                            outline: "none",
                            boxShadow: "none",
                            margin: "auto 0",
                        }}
                        onClick={() =>
                            setLayouts({ ...layouts, addRobot: true })
                        }
                    >
                        Add Robot
                    </Button>
                </div>
                <Row className="d-flex justify-content-between px-3">
                    {/* Map on robots data to create all robots component */}
                    {robotsG.length ? (
                        robotsG.map((robot, index) => (
                            <Col key={index} className="w-auto mb-4" lg={4}>
                                <RobotCard
                                    name={robot.robot_name}
                                    ip={robot.ip_address}
                                    is_assigned={robot.is_assigned}
                                    at_maintainance={robot.at_maintainance}
                                    image={robot.robot_image}
                                    layouts={layouts}
                                    setLayouts={setLayouts}
                                    index={robot.robot_id}
                                    setDelRobIndex={setDelRobIndex}
                                    setdelRoboName={setdelRoboName}
                                />
                            </Col>
                        ))
                    ) : (
                        <h3 className="text-white text-center">Loading...</h3>
                    )}
                </Row>
                <Footer />
            </Container>
        </>
    );
}

export default RobotsPage;
