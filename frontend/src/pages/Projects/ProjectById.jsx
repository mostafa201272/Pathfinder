import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useParams } from "react-router";

import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

// Bootstrap
import { Container, Row, Col, Button } from "react-bootstrap";

// Charts or Sliders
import ProjectSliders from "../../components/ProjectSliders";

// Table Data
import ProjectTable from "../../components/ProjectTable";

// Get All Icons
// ***********************************************************
import robot2 from "../../images/robot2.webp";
import resize from "../../images/resize.svg";
import map from "../../images/map.svg";
import show from "../../images/show.svg";
import redDot from "../../images/redDot.svg";
import play from "../../images/play.svg";
import backArrow from "../../images/backArrow.svg";
import forwardArrow from "../../images/forwardArrow.svg";
// ***********************************************************

const Project = () => {
    // get the project id from the ( url )
    const { id } = useParams();

    // get token from locale storage to send it in the request
    const { token } = JSON.parse(localStorage.getItem("UserLogin"));

    // create useState Fro show project details in the top page
    const [project, setProject] = useState({});

    // useState to save all data to show it in the table
    const [tabelData, settabelData] = useState([]);

    const [loading] = useState(false);
    const [LoadingTable, setLoadingTable] = useState(false);

    // create useState to handle filter by gas type
    const [GasType, setGasType] = useState("");
    useEffect(() => {
        // for test ********************************
        // (async () => {
        //     // setLoading(true);
        //     // `https://pathfinder-v1.herokuapp.com/maps/project/${id}/data/range?inst1=2022-01-14T22:30:58.800787Z&inst2=2022-01-14T22:30:58.807945Z`,
        //     await axios
        //         .get(
        //             `https://pathfinder-v1.herokuapp.com/maps/project/${id}/data/poisonous/`,
        //             {
        //                 headers: { Authorization: `Token ${token}` },
        //                 // params: {
        //                 //     "inst1": "2022-01-14T22:30:58.800787Z",
        //                 //     "inst2": "2022-01-14T22:30:58.807945Z",
        //                 // },
        //             }
        //         )
        //         .then((res) => {
        //             // setProject(res.data);
        //             // setLoading(false);
        //             console.log(res.data);
        //         })
        //         .catch((er) => {
        //             toast.error(er.message);
        //             console.log(er);
        //         });
        // })();

        // Request to get all project data poisonous
        (async () => {
            setLoadingTable(true);
            await axios
                .get(
                    `http://127.0.0.1:8000/maps/project/${id}/data/poisonous/`,
                    { headers: { Authorization: `Token ${token}` } }
                )
                .then((res) => {
                    settabelData(res.data);
                    setProject(res.data.slice(-1));
                    setLoadingTable(false);
                })
                .catch((er) => {
                    toast.error(er.message);
                    setLoadingTable(false);
                });
        })();
    }, [token, id]);
    return (
        <>
            <Navbar />
            <Container
                fluid
                style={{
                    background: "hsl(250.4, 79.3%, 5.7%)",
                    minHeight: "100vh",
                    padding: "20px",
                }}
            >
                <Row className="d-flex">
                    {loading ? (
                        <h2>loading...</h2>
                    ) : (
                        <>
                            <Col style={{ flex: "1" }}>
                                <Col>
                                    <h2 style={{ color: "#d3a42e" }}>
                                        PATHFINDER-SC0
                                    </h2>
                                </Col>
                                <Col className="d-flex justify-content-stretch">
                                    <h5
                                        className="fw-bold pe-2 text-white"
                                        style={{
                                            borderRight: "1px solid #fff",
                                        }}
                                    >
                                        All Projects
                                    </h5>
                                    <h6 className="fw-bold py-1 ps-2 text-white">
                                        project {project[0]?.project}
                                    </h6>
                                </Col>
                                {/* charts */}
                                <Col className="d-flex justify-content-between">
                                    <ProjectSliders
                                        name={"Temperature"}
                                        value={`${65}`}
                                        start={-25}
                                        end={45}
                                    />
                                    <ProjectSliders
                                        name={"Humidity"}
                                        value={35}
                                        start={-25}
                                        end={45}
                                    />
                                    <ProjectSliders
                                        name={"Gas"}
                                        value={43}
                                        start={0}
                                        end={70}
                                    />
                                </Col>
                            </Col>
                            {/* robot two images */}
                            <Row style={{ flex: "2", minWidth: "400px" }}>
                                {/* robot left */}
                                <Col className="d-flex flex-column w-100">
                                    {/* Robot Images */}
                                    <div
                                        style={{
                                            width: "100%",
                                            background: "#1d2e4c",
                                            padding: "7px",
                                            borderRadius: "12px",
                                            position: "relative",
                                            display: "flex",
                                            marginBottom: "12px",
                                        }}
                                    >
                                        <span
                                            style={{
                                                width: "10px",
                                                height: "10px",
                                                position: "absolute",
                                                left: "50%",
                                                bottom: "-7%",
                                                transform:
                                                    "translate(-50%, -3%) rotateZ(180deg)",
                                                borderLeft:
                                                    "15px solid transparent",
                                                borderRight:
                                                    "15px solid transparent",
                                                borderBottom:
                                                    "15px solid #1d2e4c",
                                            }}
                                        ></span>
                                        <img
                                            src={robot2}
                                            className="w-100"
                                            alt=""
                                        />
                                    </div>
                                    {/* Robot  Contols */}
                                    <div
                                        style={{
                                            width: "100%",
                                            background: "#1d2e4c",
                                            borderRadius: "5px",
                                            height: "42px",
                                            display: "flex",
                                            padding: "7px",
                                        }}
                                    >
                                        <div
                                            style={{
                                                background: "#0c1824",
                                                fontWeight: "600",
                                                borderRadius: "3px",
                                                margin: "auto",
                                                padding: "5px 10px 5px",
                                                textAlign: "center",
                                                fontSize: "65%",
                                                width: "100%",
                                                display: "flex",
                                                justifyContent: "space-around",
                                                alignItems: "center",
                                            }}
                                        >
                                            <span>
                                                <img
                                                    alt=""
                                                    style={{ width: "15px" }}
                                                    src={redDot}
                                                />
                                            </span>
                                            <span>
                                                <img
                                                    alt=""
                                                    style={{ width: "15px" }}
                                                    src={backArrow}
                                                />
                                            </span>
                                            <span>
                                                <img
                                                    alt=""
                                                    style={{ width: "15px" }}
                                                    src={play}
                                                />
                                            </span>
                                            <span>
                                                <img
                                                    alt=""
                                                    style={{ width: "15px" }}
                                                    src={forwardArrow}
                                                />
                                            </span>
                                            <span>
                                                <img
                                                    alt=""
                                                    style={{ width: "15px" }}
                                                    src={show}
                                                />
                                            </span>
                                            <span>
                                                <img
                                                    alt=""
                                                    style={{ width: "15px" }}
                                                    src={resize}
                                                />
                                            </span>
                                        </div>
                                    </div>
                                    {/* Robot Data */}
                                    <div className="d-flex flex-column justify-content-between pt-4 h-100">
                                        <div>
                                            <span>Control</span>
                                            <h4
                                                style={{
                                                    color: "green",
                                                    fontWeight: "600",
                                                    fontSize: "100%",
                                                }}
                                            >
                                                {project[0]?.control_type}
                                            </h4>
                                        </div>
                                        <div>
                                            <span>Date</span>
                                            <h4
                                                style={{
                                                    color: "red",
                                                    fontSize: "100%",
                                                }}
                                            >
                                                {project[0]?.time_collected
                                                    ?.toString()
                                                    ?.slice(0, 10)}
                                            </h4>
                                        </div>
                                        <div>
                                            <span>Time</span>
                                            {project[0]?.time_collected && (
                                                <h4
                                                    style={{
                                                        color: "red",
                                                        fontSize: "100%",
                                                    }}
                                                >
                                                    {project[0]?.time_collected
                                                        ?.toString()
                                                        ?.slice(11, 13) > 12
                                                        ? `0${
                                                              project[0]?.time_collected
                                                                  ?.toString()
                                                                  ?.slice(
                                                                      11,
                                                                      13
                                                                  ) - 12
                                                          }`
                                                        : project[0]?.time_collected
                                                              ?.toString()
                                                              ?.slice(
                                                                  11,
                                                                  13
                                                              )}{" "}
                                                    {project[0]?.time_collected
                                                        ?.toString()
                                                        ?.slice(13, 16)}{" "}
                                                    {project[0]?.time_collected
                                                        .toString()
                                                        .slice(11, 13) < 12
                                                        ? "AM"
                                                        : "PM"}
                                                </h4>
                                            )}
                                        </div>
                                        <div>
                                            <span>Mission Time</span>
                                            <h4
                                                style={{
                                                    color: "red",
                                                    fontSize: "100%",
                                                    margin: "0",
                                                }}
                                            >
                                                {project[0]?.time_collected.slice(
                                                    0,
                                                    10
                                                )}
                                            </h4>
                                        </div>
                                    </div>
                                </Col>
                                {/* robot right */}
                                <Col className="d-flex flex-column w-100">
                                    {/* Robot Image */}
                                    <div
                                        style={{
                                            width: "100%",
                                            background: "#1d2e4c",
                                            padding: "7px",
                                            borderRadius: "12px",
                                            position: "relative",
                                            display: "flex",
                                            marginBottom: "12px",
                                        }}
                                    >
                                        <span
                                            style={{
                                                width: "10px",
                                                height: "10px",
                                                position: "absolute",
                                                left: "50%",
                                                bottom: "-7%",
                                                transform:
                                                    "translate(-50%, -3%) rotateZ(180deg)",
                                                borderLeft:
                                                    "15px solid transparent",
                                                borderRight:
                                                    "15px solid transparent",
                                                borderBottom:
                                                    "15px solid #1d2e4c",
                                            }}
                                        ></span>
                                        <img
                                            src={robot2}
                                            className="w-100"
                                            alt=""
                                        />
                                    </div>
                                    {/* Robot Controls */}
                                    <div
                                        style={{
                                            width: "100%",
                                            background: "#1d2e4c",
                                            borderRadius: "5px",
                                            height: "42px",
                                            display: "flex",
                                            padding: "7px",
                                        }}
                                    >
                                        <div
                                            style={{
                                                background: "#0c1824",
                                                fontWeight: "600",
                                                borderRadius: "3px",
                                                margin: "auto",
                                                padding: "5px 10px 5px",
                                                textAlign: "center",
                                                fontSize: "65%",
                                                width: "100%",
                                                display: "flex",
                                                justifyContent: "space-around",
                                                alignItems: "center",
                                            }}
                                        >
                                            <span>
                                                <img
                                                    alt=""
                                                    style={{ width: "15px" }}
                                                    src={redDot}
                                                />
                                            </span>
                                            <span>
                                                <img
                                                    alt=""
                                                    style={{ width: "15px" }}
                                                    src={backArrow}
                                                />
                                            </span>
                                            <span>
                                                <img
                                                    alt=""
                                                    style={{ width: "15px" }}
                                                    src={play}
                                                />
                                            </span>
                                            <span>
                                                <img
                                                    alt=""
                                                    style={{ width: "15px" }}
                                                    src={forwardArrow}
                                                />
                                            </span>
                                            <span>
                                                <img
                                                    alt=""
                                                    style={{ width: "15px" }}
                                                    src={show}
                                                />
                                            </span>
                                            <span>
                                                <img
                                                    alt=""
                                                    style={{ width: "15px" }}
                                                    src={resize}
                                                />
                                            </span>
                                        </div>
                                    </div>
                                    {/* Robot Data */}
                                    <div className="d-flex flex-column justify-content-between pt-4 h-100">
                                        <div>
                                            <span>Robot IP</span>
                                            <h4
                                                style={{
                                                    color: "green",
                                                    fontSize: "100%",
                                                }}
                                            >
                                                {project?.robot?.ip_address}
                                            </h4>
                                        </div>
                                        <div>
                                            <span>X-Position</span>
                                            <h4
                                                style={{
                                                    color: "red",
                                                    fontSize: "100%",
                                                }}
                                            >
                                                {project[0]?.x_position}
                                            </h4>
                                        </div>
                                        <div>
                                            <span>Y-Position</span>
                                            <h4
                                                style={{
                                                    color: "red",
                                                    fontSize: "100%",
                                                }}
                                            >
                                                {project[0]?.y_position}
                                            </h4>
                                        </div>
                                        <div>
                                            <span>Speed</span>
                                            <h4
                                                style={{
                                                    color: "red",
                                                    fontSize: "100%",
                                                    margin: "0",
                                                }}
                                            >
                                                {project[0]?.speed} m/s
                                            </h4>
                                        </div>
                                    </div>
                                </Col>
                            </Row>

                            {/* map image */}
                            <Col
                                style={{
                                    flex: "2",
                                    minHeight: "100%",
                                    width: "100%",
                                    background: "#1d2e4c",
                                    padding: "9px",
                                    borderRadius: "12px",
                                    position: "relative",
                                    display: "flex",
                                    marginBottom: "12px",
                                }}
                            >
                                {/* Right button  Ai */}
                                <Button
                                    onClick={() => console.log("Right button")}
                                    className={
                                        "d-flex justify-content-center align-items-center position-absolute rounded-circle text-white fw-bold border-0"
                                    }
                                    style={{
                                        padding: "10px 15px",
                                        right: "5px",
                                        bottom: "5px",
                                        background: "#1d2e4c",
                                    }}
                                >
                                    Ai
                                </Button>
                                {/* Left button Pe */}
                                <Button
                                    onClick={() => console.log("left button")}
                                    className={
                                        "d-flex justify-content-center align-items-center position-absolute rounded-circle text-white fw-bold border-0"
                                    }
                                    style={{
                                        padding: "10px 15px",
                                        left: "5px",
                                        bottom: "5px",
                                        background: "#1d2e4c",
                                    }}
                                >
                                    Pe
                                </Button>

                                {/* Center Buttons */}
                                <div
                                    style={{
                                        width: "100px",
                                        height: "80px",
                                        position: "absolute",
                                        left: "50%",
                                        bottom: "10px",
                                        transform: "translateX(-50%)",
                                        background: "#1d2e4c",
                                        borderRadius: "5px",
                                    }}
                                >
                                    <div
                                        style={{
                                            position: "relative",
                                            width: "100%",
                                            height: "100%",
                                            left: "0px",
                                            right: "0px",
                                            color: "#FFF",
                                            background: "#1d2e4c",
                                            padding: "0px",
                                        }}
                                    >
                                        {/* Top Button */}
                                        <TopAndBottom
                                            onClick={() => console.log("Top")}
                                            position={"top"}
                                            ArrowDir={
                                                "transparent transparent #FFF transparent"
                                            }
                                        />
                                        {/* Bottom Button */}
                                        <TopAndBottom
                                            onClick={() =>
                                                console.log("Bottom")
                                            }
                                            position={"bottom"}
                                            ArrowDir={
                                                "#FFF transparent transparent transparent"
                                            }
                                        />
                                        {/* Center Button */}
                                        <Button
                                            onClick={() =>
                                                console.log("Center Btn")
                                            }
                                            style={{
                                                position: "absolute",
                                                border: "none",
                                                width: "20px",
                                                height: "20px",
                                                left: "50%",
                                                top: "50%",
                                                transform:
                                                    "translate(-50%,-50%)",
                                                background: "#FFF",
                                            }}
                                        ></Button>
                                        {/* Right Button */}
                                        <LeftAndRight
                                            onClick={() => console.log("Right")}
                                            position={"right"}
                                            ArrowDir={
                                                "transparent transparent  transparent #FFF"
                                            }
                                        />
                                        {/* Left Button */}
                                        <LeftAndRight
                                            onClick={() => console.log("Left")}
                                            position={"left"}
                                            ArrowDir={
                                                "transparent #FFF transparent transparent"
                                            }
                                        />
                                    </div>
                                </div>
                                <img
                                    alt=""
                                    className="h-100 w-100"
                                    style={{
                                        objectFit: "cover",
                                        borderRadius: "12px",
                                    }}
                                    src={map}
                                />
                            </Col>
                        </>
                    )}
                </Row>
                {/* Table */}
                <Row className="mt-4">
                    <ProjectTable
                        Data={tabelData}
                        loading={LoadingTable}
                        GasType={GasType}
                        setGasType={setGasType}
                    />
                </Row>
                <Footer />
            </Container>
        </>
    );
};

export default Project;

// Top And Bottom Buttons In map
export const TopAndBottom = ({ ArrowDir, position }) => {
    const style = {
        position: "absolute",
        borderWidth: "12px",
        background: "transparent",
        borderColor: ArrowDir,
        borderStyle: "solid",
        left: "50%",
        transform: "translateX(-50%)",
        padding: "0px",
    };
    return (
        <Button
            className="arrow"
            style={{
                ...style,
                top: `${position === "top" ? "-10%" : "auto"}`,
                bottom: `${position === "bottom" ? "-10%" : "auto"}`,
            }}
        ></Button>
    );
};

// Left And Right Buttons In map
export const LeftAndRight = ({ ArrowDir, position }) => {
    const style = {
        position: "absolute",
        borderWidth: "12px",
        background: "transparent",
        borderColor: ArrowDir,
        borderStyle: "solid",
        top: "50%",
        transform: "translateY(-50%)",
        padding: "0px",
    };
    return (
        <Button
            className="arrow"
            style={{
                ...style,
                left: `${position === "left" ? "-8%" : "auto"}`,
                right: `${position === "right" ? "-8%" : "auto"}`,
            }}
        ></Button>
    );
};
