import React, { useEffect, useState } from "react";
import "./containerRowStyle.css";
import CocktailContainer from "../cocktailContainer/cocktailContainer";
import { MeshSource } from "../../classes/objRenderer/objRenderer";
import Cocktail from "../../classes/cocktail/cocktail";


// const testMesh:MeshSource = {objectPath:"/assets/r2d2/r2-d2.obj", texturePath:"/assets/r2d2/R2D2_Textures.jpg", cameraDist:200}
// const gearMesh:MeshSource = {objectPath:"/assets/gear/Gear.obj", texturePath:"/assets/gear/Gear_Texture.png", cameraDist:20}

type CocktailRowProps = {
    left:Cocktail
    right?:Cocktail
}



const ContainerRow:React.FC<CocktailRowProps> = ({left, right}) =>
{    

    const [rightElement, setRightElement] = useState<JSX.Element>();

    useEffect(() => {
        if(right !== undefined){
            setRightElement(<CocktailContainer obj={right.getMesh()} name={right.getName()}/>);
        }
    },[]);



    return(
    <div className="containerRowMainDiv">
        <CocktailContainer obj={left.getMesh()} name={left.getName()}/>
        {rightElement}
    </div>
    )
}

export default ContainerRow;