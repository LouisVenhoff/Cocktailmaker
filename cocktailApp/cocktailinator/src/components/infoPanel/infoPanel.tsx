import React, { useEffect, useState } from "react";
import "./infoPanelStyle.css";
import Cocktail from "../../classes/cocktail/cocktail";
import InfoElement from "./infoElement/infoElement";
import {Ingridient} from "../../classes/cocktail/cocktail";

type InfoPanelProps = {
    headline:string,
    element:Cocktail
}



const InfoPanel:React.FC<InfoPanelProps> = ({headline, element}) => {
    
    const [cocktail, setCocktail] = useState<Cocktail>(element);

    const [infoElements, setInfoElements] = useState<JSX.Element[]>();


    useEffect(() => {
        
        generateInfoElements();
        
    },[]);


    useEffect(() => {

        setCocktail(element);

    },[element]); 

    const generateInfoElements = () => {
        let contents:Ingridient[] = cocktail.content;

        let temp:JSX.Element[] = [];

        for(let i = 0; i < contents.length; i++){
            temp.push(<InfoElement text={contents[i].pumpKey} info={contents[i].fluidAmount.toString() + "ml"}/>);
        }

        setInfoElements(temp);
    }





    return(
    <div className="infoPanelDiv">
        <p className="infoPanelHeadline">{headline}</p>
        <div className="bodyDiv">
            {infoElements}
        </div>
    </div>
    );
}

export default InfoPanel;