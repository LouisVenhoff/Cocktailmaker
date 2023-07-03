import React, { useEffect, useRef, useState } from "react";
import Cocktail from "../../classes/cocktail/cocktail";
import "./cocktailPageStyle.css";
import ObjRenderer, {Animation} from "../../classes/objRenderer/objRenderer";
import InfoPanel from "../infoPanel/infoPanel";
import { Button } from "@chakra-ui/react";
import {useSelector} from "react-redux";

type CocktailPageProps = {
    element:Cocktail
}




const CocktailPage:React.FC<CocktailPageProps> = ({element}) => {

   
    const [cocktail, setCocktail] = useState<Cocktail>(element);    
    const [renderer, setRenderer] = useState<ObjRenderer>();

    const objCanvas = useRef<any>();

    const cocktailRedux:any = useSelector((state:any) => state.currentCocktail.value);


    useEffect(() => {
        
        setRenderer(new ObjRenderer(350, 350, cocktail.mesh, Animation.STATIC, objCanvas.current));
    
    },[]);

    useEffect(() => {

        console.log(element);
       //setCocktail(element);

    },[element]);

    const order = () => {
        cocktail.make();
    }


    return(
    <div id="cocktailPageMainDiv">
        <div id="previewDiv">
            <div id="objDiv" ref={objCanvas}>

            </div>
            <p id="cocktailDesc">
                {cocktail.name}
            </p>
        </div>
        <div id="informationDiv">
            <InfoPanel headline="Zutaten" element={cocktail}/>
        </div>
        <div id="buttonDiv">
            <Button colorScheme="lightcoral" size="lg" width="350px" variant={"outline"} onClick={() => {order()}}>Bestellen</Button>
        </div>
       
    
    </div>);


}

export default CocktailPage;