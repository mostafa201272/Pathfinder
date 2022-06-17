import React, { useState, useEffect } from "react";
import {io} from "socket.io-client";
import axios from "axios";
import { toast } from "react-toastify";
import { useParams } from "react-router";
import Map from "./Map";
import * as Three from "three"
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
    
    // GET PROJECT DATA
    const [projectData, setProjectData] = useState({});

    // PROJECT DATA INITIALIZATIONS
    const [robotIP, setRobotIP] = useState("http://127.0.0.1:5000")


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


        // Request to get Current Project Data
        (async () => {
            setLoadingTable(true);
            await axios
                .get(
                    `http://localhost:8000/maps/project/${id}/`,
                    { headers: { Authorization: `Token ${token}` } }
                )
                .then((res) => {
                    setProjectData(res.data);
                    console.log(res.data)
                    setRobotIP(res.data.robot.ip_address)
                })
                .catch((er) => {
                    toast.error(er.message);
                });
        })();

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

    /*
        =========================================================================
        =====              START OF [ROS] CONFIGURATIONS                    =====
        =========================================================================
    */

    /*
        ==================== States [ROS] ========================
    */
        const [aiState,setAiState] = useState(false);
        const [robotXposition, setRobotXposition] = useState(0);
        const [robotYposition, setRobotYposition] = useState(0);
        const [robotOrantation, setRobotOrantation] = useState(0);
        const [robotSpeed, setRobotRobotSpeed] = useState({linear: 0, angular: 0});
        const [missionTime, setMissionTime] = useState('');
        const [tempSensorData, setTempSensorData] = useState(0);
        const [humidSensorData, setHumidSensorData] = useState(0);

    
    /*
        ==================== Stablish [ROS] Connection ========================
    */

    // [ROS] initialization
    // useEffect(()=>{

    //     // Create ROS Object
    //     const ros = new window.ROSLIB.Ros()

    //     // Reconnect on close
    //     ros.on("close", ()=>{

    //         setTimeout(()=>{
    //             try{
    //                 ros.connect(`ws://127.0.0.1:9090`)
    //             }catch{
    //                 console.log("Connection error")
    //             }
    //         }, 1000);

    //     });

    //     // Connect ROS
    //     try{
    //         ros.connect(`ws://127.0.0.1:9090`)
    //     }catch{
    //         console.log("Connection error")
    //     }
        
        
    //     // Update Robot Position
    //     robotPosition(ros);

    // });


    /*
        ==================== Methods [ROS] ========================
    */

    // [ROS] AI Ativation Function
    const aiActivated = () =>{

        /*
            [01] Method Name: aiActivation
            [02] Description: This function stablish a socket connection with
                              Raspberry PI To activate and deactivate the AI  Algorithm
            
            [03] Parameters: No Parameters
            [04] Execution: Change the AI State [useState Hock]
                            Change the AI Button CSS Styling
                            Run or Stop the AI Script on Raspberry PI
        */


        // [01] Change the AI activation State
        if(aiState){
            // Set State to False
            setAiState(false);
        }else{

            // Set State to true
            setAiState(true)
        }

        // [02] Change the AI Button CSS Styling
        
        // ----- Get AI Button
        const ai_button = document.getElementById("ai_button");
        
        // ----- Change the AI Button CLass
        if (!aiState){

            // Add AI activated Class List
            ai_button.classList.add("ai_activate")

        }else{
            // Remove AI activated Class List
            ai_button.classList.remove("ai_activate")
        }

        /*  ---------------------------------------------
            ---- [03] Activate and DeActivate the AI ----
            ---------------------------------------------
        */

        // [03.01] Set ENDPOINT [Robot IP  + Port]
        const ENDPOINT = robotIP + ":5000";

        
        // [03.02] Activate AI
        if (!aiState){
            
            // [01] Stablish SOCKET Connection
            const sio = io(ENDPOINT);

            // [04] Connection Case
            sio.on("connect", () => {

                // [01] Emit Movement
                sio.emit("ActivateAI")

                // [02] Close Connection
                sio.close()
            });

            // [05] Disconnect Case
            sio.on("disconnect", () => {
                
                // Close Connection
                sio.close()

            });

        }else{
            
            // [01] Stablish SOCKET Connection
            const sio = io(ENDPOINT);

            // [02] Connection Case
            sio.on("connect", () => {

                // [01] Emit Movement
                sio.emit("DeActivateAI")

                // [02] Close Connection
                sio.close()

            });

            // [03] Disconnect Case
            sio.on("disconnect", () => {
                
                // Close Connection
                sio.close()

            });
        }


    }

    // [ROS] Manual Control START Movement
    const handleMove = (event) => {
        
        // [01] Movement Data
        const linear_speed = event.y;
        const angular_speed = event.x;
        
        // [02] Set ENDPOINT [Robot IP  + Port]
        const ENDPOINT = robotIP + ":5000";

        // [03] Stablish SOCKET Connection
        const sio = io(ENDPOINT);

        // [04] Connection Case
        sio.on("connect", () => {

            // [01] Emit Movement
            sio.emit("MANUAL", {speed: [linear_speed, angular_speed]})

            // [02] Data Acknoladge
            console.log(`Manual Action Sended With: [L: ${linear_speed} | A: ${angular_speed} ]`)

        });

        // [05] Disconnect Case
        sio.on("disconnect", () => {
            
            // Close Connection
            sio.close()

        });

    }

    // [ROS] Manual Control - STOP Movement
    const handleStop = () => {
        
        // [01] Stop Movement Data
        const linear_speed = 0;
        const angular_speed = 0;
        
        // [02] Set ENDPOINT [Robot IP  + Port]
        const ENDPOINT = robotIP + ":5000";

        // [03] Stablish SOCKET Connection
        const sio = io(ENDPOINT);

        // [04] Connection Case
        sio.on("connect", () => {

            // [01] Emit Movement
            sio.emit("MANUAL", {speed: [linear_speed, angular_speed]})

            // [02] Data Acknoladge
            console.log(`Manual STOP: [L: ${linear_speed} | A: ${angular_speed} ]`)

            // Close Connection
            sio.close()
        });

        // [05] Disconnect Case
        sio.on("disconnect", () => {
            
            // Close Connection
            sio.close()

        });
    }

    // [ROS] Robot Position
    const robotPosition = (ros) =>{

        // Position Subscriber
        let pose_subscriber = new window.ROSLIB.Topic({
            ros: ros,
            name: "/odom",
            messageType: "nav_msgs/Odometry",
        });

        pose_subscriber.subscribe((message) => {

            setRobotXposition(message.pose.pose.position.x.toFixed(2));
            setRobotYposition(message.pose.pose.position.y.toFixed(2));
            setRobotOrantation(getOrientationFromQuaternion(message.pose.pose.orientation).toFixed(2))
            setRobotRobotSpeed({
                                    linear: message.twist.twist.linear.x.toFixed(2), 
                                    angular: message.twist.twist.angular.z.toFixed(2)
                                });
        });
    }

    // [ROS] Calculate Orientation
    const getOrientationFromQuaternion = (ros_orientation_object) =>{

        // Quaternion object
        var q = new Three.Quaternion(
            ros_orientation_object.x,
            ros_orientation_object.y,
            ros_orientation_object.z,
            ros_orientation_object.w,
        );
            
        // Convert quaternion [ROLL, PITCH, YAW]
        var RPY = new Three.Euler().setFromQuaternion(q);

        // Return Degree
        return RPY["_z"] * (180 / Math.PI);

    }
    
    // [ROS] Mission Time Calculation
    const calcMissionTime = () =>{

        // Calc mission time
        setMissionTime( new Date((new Date()) - (new Date(projectData.last_updated))).getDate().toLocaleString() + ":" +
                        new Date((new Date()) - (new Date(projectData.last_updated))).getHours().toLocaleString() + ":" +
                        new Date((new Date()) - (new Date(projectData.last_updated))).getMinutes().toLocaleString() + ":" +
                        new Date((new Date()) - (new Date(projectData.last_updated))).getSeconds().toLocaleString());


    }

    // [ROS] Teamperature Sensor Data
    const getTemperatureSensorData = () => {

        // [01] Set ENDPOINT [Robot IP  + Port]
        const ENDPOINT = robotIP + ":5000";

        // [02] Stablish SOCKET Connection
        const sio = io(ENDPOINT);

        // [03] 


    }

    // [ROS] Humidity Sensor Data
    const getHumiditySensorData = () => {

    }

    

    /*
        ==================== RUNNING TASKS [ROS] ========================
    */

    // [01] Refresh Mission Time
    setInterval(() => {

        // Mission Time calculation function
        calcMissionTime();

    }, 1000);

    // [01] Refresh Mission Time
    setInterval(() => {

        // Temperature Sensors Data
        getTemperatureSensorData();

        // Humidity Sensors Data
        getHumiditySensorData();
            

    }, 10000);

    /*
        =========================================================================
        =====                END OF [ROS] CONFIGURATIONS                    =====
        =========================================================================
    */
    
    return (
        <>
            
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
                                        {projectData.project_name}
                                    </h6>
                                </Col>
                                {/* END Header */}

                                {/* START SENSOR CHARTS */}
                                <Col className="d-flex justify-content-between">
                                    <ProjectSliders name={"Temperature"} value={tempSensorData} start={tempSensorData - 25} end={tempSensorData + 45} />
                                    <ProjectSliders name={"Humidity"} value={humidSensorData} start={humidSensorData - 25} end={humidSensorData + 45} />
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
                                            {/* <span className="project_data__container_camera_view__tail"></span> */}
                                            <img src={robot2} className="w-100" alt=""/>
                                        </div>
                                        
                                        {/* Robot  Contols */}
                                        {/* <div className="project_data__container_camera_view__controls">
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
                                        </div> */}

                                        {/* Robot Data */}
                                        <div className="project_data__container_missin_data d-flex flex-column justify-content-between pt-4 h-100">
                                            <div>
                                                <span>Control</span>
                                                <h4
                                                    style={{
                                                        color: [aiState? "#cf182a": "#00f382"],
                                                    }}
                                                >
                                                    {aiState? "AI Control": "Manual Control"}
                                                </h4>
                                            </div>
                                            <div>
                                                <span>Last update date</span>
                                                <h4
                                                    style={{
                                                        color: "#00f382",   
                                                    }}
                                                >
                                                    {new Date(projectData.last_updated).getDate() + "-" + (new Date(projectData.last_updated).getMonth() + 1) + "-" + (new Date(projectData.last_updated).getFullYear()) }
                                                </h4>
                                            </div>
                                            <div>
                                                <span>Last update time</span>
                                                {projectData.last_updated && (
                                                    <h4
                                                        style={{
                                                            color: "#00f382",
                                                        }}
                                                    >
                                                        {projectData.last_updated ?.toString()?.slice(11, 13) > 12? `0${projectData.last_updated?.toString()?.slice(11,13) - 12}`: projectData.last_updated ?.toString()?.slice(11,13)}{" "}
                                                        {projectData.last_updated?.toString()?.slice(13, 16)}{" "}
                                                        {projectData.last_updated.toString().slice(11, 13) < 12? "AM": "PM"}
                                                    </h4>
                                                )}
                                            </div>
                                            <div>
                                                <span>Mission Time</span>
                                                <h4
                                                    style={{
                                                        color: "red",
                                                        fontWeight: '700',
                                                    }}
                                                >
                                                    {missionTime}
                                                </h4>
                                            </div>
                                        </div>
                                    </Col>
                                    
                                    {/* robot right */}
                                    <Col className="d-flex flex-column w-100">
                                        
                                        {/* Robot Images */}
                                        <div className="project_data__container_camera_view">
                                            {/* <span className="project_data__container_camera_view__tail"></span> */}
                                            <img src={robot2} className="w-100" alt=""/>
                                        </div>
                                        {/* Robot  Contols */}
                                        {/* <div className="project_data__container_camera_view__controls">
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
                                        </div>                 */}

                                        {/* Robot Data */}
                                        <div className="project_data__container_missin_data d-flex flex-column justify-content-between pt-4 h-100">
                                            <div>
                                                <span>Robot IP</span>
                                                <h4
                                                    style={{
                                                        color: "#00f382",
                                                    }}
                                                >
                                                    {robotIP}
                                                </h4>
                                            </div>
                                            <div className="robot-position">

                                                {/* X Positon */}
                                                <div>
                                                    <span>X-Position</span>
                                                    <h4
                                                        style={{
                                                            color: "#cf182a",
                                                        }}
                                                    >
                                                        {robotXposition}
                                                    </h4>
                                                </div>

                                                {/* Y position */}
                                                <div>
                                                    <span>Y-Position</span>
                                                    <h4
                                                        style={{
                                                            color: "#cf182a",
                                                        }}
                                                    >
                                                        {robotYposition}
                                                    </h4>
                                                </div>
                                                    
                                            </div>
                                            <div>
                                                <span>Orantation</span>
                                                <h4
                                                    style={{
                                                        color: "#cf182a",
                                                    }}
                                                >
                                                    {robotOrantation} <sub>Degree</sub>
                                                </h4>
                                            </div>
                                            <div className="robot-speed">
                                                    {/* Linear Speed */}
                                                    <div>

                                                        <span>Linear speed</span>
                                                        <h4
                                                            style={{
                                                                color: "red",
                                                                margin: "0",
                                                            }}
                                                        >
                                                            {robotSpeed.linear} <sub>m/s</sub>
                                                        </h4>

                                                    </div>

                                                    {/* Angular Speed */}
                                                    <div>
                                                        <span>Angular speed</span>
                                                        <h4
                                                            style={{
                                                                color: "red",
                                                                margin: "0",
                                                            }}
                                                        >
                                                           {robotSpeed.angular} <sub>rad/s</sub>
                                                        </h4>
                                                    </div>

                                            </div>
                                        </div>
                                    </Col>
                                </Row>
                            </Col>

                            {/* map image */}
                            <Col md={4} className="project_data__map" >
                                {/* AI BUTTON */}
                                <Button id="ai_button" onClick={aiActivated} className= "project_data__map__AI_button d-flex justify-content-center align-items-center position-absolute rounded-circle text-white fw-bold border-0">
                                    AI
                                </Button>
                                {/* END AI BUTTON */}
                                
                                
                                {/* JOY STICK */}
                                <div className="project_data__map__joystick">
                                    <Joystick size={100} sticky={false} baseColor="#1d2e4c" stickColor="#0c1824" move={handleMove} stop={handleStop}></Joystick>
                                </div>
                                {/* END STICK */}

                                
                                <Map></Map>
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

