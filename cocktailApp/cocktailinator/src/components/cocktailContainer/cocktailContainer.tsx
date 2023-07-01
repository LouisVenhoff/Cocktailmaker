import React, { useState, useRef, useEffect } from "react";
import "./cocktailContainerStyle.css";
import ObjRenderer from "../../classes/objRenderer/objRenderer";
import { MeshSource, Animation } from "../../classes/objRenderer/objRenderer";
import { Page } from "../../classes/pageLogic/pages";
import { useNavigate } from "react-router-dom";
import PageLogic from "../../classes/pageLogic/pageLogic";

type CocktailContainerProps=
{
    obj:MeshSource,
    name:string
}




const CocktailContainer:React.FC<CocktailContainerProps> = ({obj, name}) => 
{
   
    const canvasElement = useRef<any>();
    const [sceneRenderer, setSceneRenderer] = useState<ObjRenderer>();
    const [mesh, setMesh] = useState<MeshSource>(obj);
    const [cocktailName, setCocktailName] = useState<string>(name);



    useEffect(() => {
        if(canvasElement.current != undefined && mesh != undefined)
        {
            // let obj:MeshSource = {objectPath:"/assets/r2d2/r2-d2.obj", texturePath:"/assets/r2d2/R2D2_Textures.jpg", cameraDist:200}
            //let obj:MeshSource = {objectPath:"/assets/gear/Gear.obj", texturePath:"/assets/gear/Gear_Texture.png", cameraDist:20}
            setSceneRenderer(new ObjRenderer(120, 120,mesh, Animation.STATIC, canvasElement.current));
        }
    },[canvasElement]);


    const selectCocktail = () => {
        PageLogic.setPage(Page.ORDER_PAGE);
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
