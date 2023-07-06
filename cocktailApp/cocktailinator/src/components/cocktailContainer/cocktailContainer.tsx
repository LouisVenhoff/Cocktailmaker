import React, { useState, useRef, useEffect } from "react";
import "./cocktailContainerStyle.css";
import ObjRenderer from "../../classes/objRenderer/objRenderer";
import { MeshSource, Animation } from "../../classes/objRenderer/objRenderer";
import { Page } from "../../classes/pageLogic/pages";
import {useDispatch} from "react-redux"
import {load} from "../../features/currentCocktail";
import { switchPage } from "../../features/currentPage";
import Cocktail from "../../classes/cocktail/cocktail";


type CocktailContainerProps=
{
    element:Cocktail
}

const CocktailContainer:React.FC<CocktailContainerProps> = ({element}) => 
{
   
    const canvasElement = useRef<any>();
    const [sceneRenderer, setSceneRenderer] = useState<ObjRenderer>();
    const [mesh, setMesh] = useState<MeshSource>(element.mesh);
    const [cocktailName, setCocktailName] = useState<string>(element.name);

    const dispatch:any = useDispatch();


    useEffect(() => {
        if(canvasElement.current !== undefined && mesh !== undefined)
        {
            // let obj:MeshSource = {objectPath:"/assets/r2d2/r2-d2.obj", texturePath:"/assets/r2d2/R2D2_Textures.jpg", cameraDist:200}
            //let obj:MeshSource = {objectPath:"/assets/gear/Gear.obj", texturePath:"/assets/gear/Gear_Texture.png", cameraDist:20}
            setSceneRenderer(new ObjRenderer(120, 120,mesh, Animation.STATIC, canvasElement.current));
        }
    },[canvasElement]);


    const selectCocktail = async () => {
         await dispatch(load(JSON.stringify(element)));
         dispatch(switchPage(Page.ORDER_PAGE));
    }



    return(
    <div className="cocktailContainerMainDiv" onClick={() => {selectCocktail()}}>
        <div className="objCanvas" ref={canvasElement}>

        </div>
        <h4 className="discriptions">{cocktailName}</h4>
    </div>
    )
}

export default CocktailContainer;
