import React from "react";
import "./infoElementStyle.css";


type InfoElementProps = {
    text:string,
    info:string
}



const InfoElement:React.FC<InfoElementProps> = ({text, info}) => {

    return(
    <div className="infoElementDiv">
        <p className="textElement">{text}</p>
        <p className="infoElement">{info}</p>
    </div>);

}

export default InfoElement;