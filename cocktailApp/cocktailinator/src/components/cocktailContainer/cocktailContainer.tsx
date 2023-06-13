import React, { useState, useRef, useEffect } from "react";
import "./cocktailContainerStyle.css";
import ObjRenderer from "../../classes/objRenderer/objRenderer";
import { MeshSource, Animation } from "../../classes/objRenderer/objRenderer";

const CocktailContainer:React.FC = () => 
{
   
    const canvasElement = useRef<any>();
    const [sceneRenderer, setSceneRenderer] = useState<ObjRenderer>();

    useEffect(() => {
        if(canvasElement.current != undefined)
        {
            let obj:MeshSource = {objectPath:"/assets/r2d2/r2-d2.obj", texturePath:"/assets/r2d2/R2D2_Textures.jpg", cameraDist:200}
            //let obj:MeshSource = {objectPath:"/assets/gear/Gear.obj", texturePath:"/assets/gear/Gear_Texture.png", cameraDist:20}
            setSceneRenderer(new ObjRenderer(120, 120,obj, Animation.STATIC, canvasElement.current));
        }
    },[canvasElement]);



    return(
    <div className="cocktailContainerMainDiv">
        <div className="objCanvas" ref={canvasElement}>

        </div>
    </div>
    )
}

export default CocktailContainer;
