import React from "react";
import "./scrollViewStyle.css"
import CocktailContainer from "../cocktailContainer/cocktailContainer";
import ContainerRow from "../containerRow/containerRow";
import Cocktail from "../../classes/cocktail/cocktail";
import { MeshSource } from "../../classes/objRenderer/objRenderer";


type ScrollViewProps = {
    title: string
}



const testMesh:MeshSource = {objectPath:"/assets/r2d2/r2-d2.obj", texturePath:"/assets/r2d2/R2D2_Textures.jpg", cameraDist:200}
const gearMesh:MeshSource = {objectPath:"/assets/gear/Gear.obj", texturePath:"/assets/gear/Gear_Texture.png", cameraDist:20}


const cockt1:Cocktail = new Cocktail("R2D2",testMesh);
const cockt2:Cocktail = new Cocktail("Gear", gearMesh);



const ScrollView: React.FC<ScrollViewProps> = ({ title }) => {
    return (
        <div className="scrollViewMainDiv">
            <div className="scrollViewTitleDiv">
                <h1 className="scrollViewTitle">{title}</h1>
            </div>
            <div className="scrollViewContentPacket">
                <div className="scrollViewDesc">
                    <p className="scrollViewDescText">Alle auf der Maschine verfügbaren Cocktails</p>
                </div>
            {/* <CocktailContainer /> */}
            <ContainerRow  left={cockt1} right={cockt1}/>
            <ContainerRow  left={cockt1} right={cockt2}/>
            
            </div>


        </div>
    );
}

export default ScrollView;