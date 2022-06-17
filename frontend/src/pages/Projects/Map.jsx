import React, {Component} from "react";
import "./styles/map.css"

class Map extends Component {
    
    state={
        ros: null,
        viewer: null,
        tfClient: null,
        depthCloud: null,
    };

    
    // Constractor
    constructor(){
        super();
        this.init_connection();

        // bind map function
        this.map_viewer = this.map_viewer.bind(this);
    }

    // Component Methods
    init_connection(){
        
        // Create ROS 
        this.state.ros = new window.ROSLIB.Ros();
        
        // Reconnect on close
        this.state.ros.on("close", ()=>{

            setTimeout(()=>{
                try{
                    this.state.ros.connect(`ws://127.0.0.1:9090`)
                }catch{
                    console.log("Connection error")
                }
            }, 1000);

        });

        // Try to connect
        try{
            this.state.ros.connect(`ws://127.0.0.1:9090`)
        }catch{
            console.log("Connection error")
        }
        
    }

    // Call Component functions after render the component
    componentDidMount(){
        this.init_map_viewer();

        setInterval(()=>{
            this.map_viewer();
        },1000);
        
    }

    init_map_viewer(){

        // Map viewer
        this.state.viewer = new window.ROS2D.Viewer({

            divID: "map_canvas",
            width: 600,
            height: 400,

        });

         
    }

    // Map Viewer
    map_viewer(){

        // Setup the map client.
        let gridClient = new window.ROS2D.OccupancyGridClient({
            ros : this.state.ros,
            rootObject : this.state.viewer.scene,
        });

        // Scale the canvas to fit to the map
        gridClient.on('change', () => {
            this.state.viewer.scaleToDimensions(gridClient.currentGrid.width, gridClient.currentGrid.height);
            this.state.viewer.shift(Math.ceil(gridClient.currentGrid.width / 2) * -1,  (Math.ceil(gridClient.currentGrid.height / 2)* -1));

        });

    }

    
    

    

    render(){


        return (
            <div className="map_canvace_container">
                <div className="map_canvas" id="map_canvas"></div>
            </div>
        );

    } 

  }
  
  export default Map;