import React, { useEffect, useState } from "react";
import "./connectionLampStyle.css"

type ConnectionLampProps ={
    connected:boolean
}

const ConnectionLamp:React.FC<ConnectionLampProps> = ({connected}) => {

    
    const [designClass, setDesignClass] = useState<string>("stateOff");


    useEffect(() => {
        if(connected)
        {
            setDesignClass("stateOn");
        }
        else
        {
            setDesignClass("stateOff");
        }
    },[connected]);



    return(
        <div id="connectionLampDiv" className={designClass}>

        </div>
    );

}


export default ConnectionLamp;

