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
import { Joystick } from 'react-joystick-component';
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
            <Container className="project_data__container" fluid>
                <Row className="project_data__container__ROW">
                    {loading ? (
                        <h2>loading...</h2>
                    ) : (
                        <>

                            {/* START SENSORS SIDE */}
                            <Col md={4} style={{ flex: "1" }}>
                                
                                {/* START Header */}
                                <Col>
                                    <h2 className="project_data__container__header_h1"> PATHFINDER-SC0</h2>
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
                                {/* END Header */}

                                {/* START SENSOR CHARTS */}
                                <Col className="d-flex justify-content-between">
                                    <ProjectSliders name={"Temperature"} value={`${-10}`} start={-25} end={45} />
                                    <ProjectSliders name={"Humidity"} value={15} start={-25} end={45} />
                                    <ProjectSliders name={"Gas"} value={10} start={0} end={70}/>
                                </Col>
                                {/* END SENSOR CHARTS */}
                            </Col>
                            {/* END SENSORS SIDE */}

                            
                            {/* START ROBOT CAMERA VIEWS */}
                            <Col md={4}>
                                <Row>
                                    
                                    {/* LEFT CAMERA and LEFT TASKS */}
                                    <Col className="d-flex flex-column w-100">
                                        {/* Robot Images */}
                                        <div className="project_data__container_camera_view">
                                            <span className="project_data__container_camera_view__tail"></span>
                                            <img src={robot2} className="w-100" alt=""/>
                                        </div>
                                        {/* Robot  Contols */}
                                        <div className="project_data__container_camera_view__controls">
                                            <div className="project_data__container_camera_view__controls_container"
                                            >
                                                <span>
                                                    <img alt="" style={{ width: "15px" }} src={redDot} />
                                                </span>
                                                <span>
                                                    <img alt="" style={{ width: "15px" }} src={backArrow} />
                                                </span>
                                                <span>
                                                    <img alt="" style={{ width: "15px" }} src={play}/>
                                                </span>
                                                <span>
                                                    <img alt="" style={{ width: "15px" }} src={forwardArrow} />
                                                </span>
                                                <span>
                                                    <img alt="" style={{ width: "15px" }} src={show} />
                                                </span>
                                                <span>
                                                    <img alt="" style={{ width: "15px" }} src={resize} />
                                                </span>
                                            </div>
                                        </div>
                                        {/* Robot Data */}
                                        <div className="project_data__container_missin_data d-flex flex-column justify-content-between pt-4 h-100">
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
                                        
                                        {/* Robot Images */}
                                        <div className="project_data__container_camera_view">
                                            <span className="project_data__container_camera_view__tail"></span>
                                            <img src={robot2} className="w-100" alt=""/>
                                        </div>
                                        {/* Robot  Contols */}
                                        <div className="project_data__container_camera_view__controls">
                                            <div className="project_data__container_camera_view__controls_container"
                                            >
                                                <span>
                                                    <img alt="" style={{ width: "15px" }} src={redDot} />
                                                </span>
                                                <span>
                                                    <img alt="" style={{ width: "15px" }} src={backArrow} />
                                                </span>
                                                <span>
                                                    <img alt="" style={{ width: "15px" }} src={play}/>
                                                </span>
                                                <span>
                                                    <img alt="" style={{ width: "15px" }} src={forwardArrow} />
                                                </span>
                                                <span>
                                                    <img alt="" style={{ width: "15px" }} src={show} />
                                                </span>
                                                <span>
                                                    <img alt="" style={{ width: "15px" }} src={resize} />
                                                </span>
                                            </div>
                                        </div>                

                                        {/* Robot Data */}
                                        <div className="project_data__container_missin_data d-flex flex-column justify-content-between pt-4 h-100">
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
                            </Col>

                            {/* map image */}
                            <Col md={4} className="project_data__map" >
                                {/* AI BUTTON */}
                                <Button onClick={() => console.log("Right button")} className= "project_data__map__AI_button d-flex justify-content-center align-items-center position-absolute rounded-circle text-white fw-bold border-0">
                                    AI
                                </Button>
                                {/* END AI BUTTON */}
                                
                                
                                {/* JOY STICK */}
                                <div className="project_data__map__joystick">
                                    <Joystick size={100} sticky={false} baseColor="#1d2e4c" stickColor="#0c1824" ></Joystick>
                                </div>
                                {/* END STICK */}

                                
                                <img
                                    id="map"
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
