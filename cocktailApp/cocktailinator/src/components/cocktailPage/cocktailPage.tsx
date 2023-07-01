import React, { useEffect, useRef, useState } from "react";
import Cocktail from "../../classes/cocktail/cocktail";
import "./cocktailPageStyle.css";
import ObjRenderer, {Animation} from "../../classes/objRenderer/objRenderer";
import InfoPanel from "../infoPanel/infoPanel";

type CocktailPageProps = {
    element:Cocktail
}




const CocktailPage:React.FC<CocktailPageProps> = ({element}) => {

   
    const [cocktail, setCocktail] = useState<Cocktail>(element);    
    const [renderer, setRenderer] = useState<ObjRenderer>();

    const objCanvas = useRef<any>();


    useEffect(() => {
        setRenderer(new ObjRenderer(350, 350, cocktail.getMesh(), Animation.STATIC, objCanvas.current));
    },[]);




    return(
    <div id="cocktailPageMainDiv">
        <div id="previewDiv">
            <div id="objDiv" ref={objCanvas}>

            </div>
            <p id="cocktailDesc">
                {cocktail.getName()}
            </p>
        </div>
        <div id="contentInfo">

        </div>
        <div id="informationDiv">
            <InfoPanel headline="Zutaten" element={cocktail}/>
        </div>
    
    </div>);


}

export default CocktailPage;