import React, { useEffect, useState } from "react";
import "./scrollViewStyle.css"
import CocktailContainer from "../cocktailContainer/cocktailContainer";
import ContainerRow from "../containerRow/containerRow";
import Cocktail from "../../classes/cocktail/cocktail";
import { MeshSource } from "../../classes/objRenderer/objRenderer";
import loader from "../../classes/cocktailLoader/cocktailLoader";
import Parter from "../../classes/parter/parter";

type ScrollViewProps = {
    title: string
}



const testMesh:MeshSource = {objectPath:"/assets/r2d2/r2-d2.obj", texturePath:"/assets/r2d2/R2D2_Textures.jpg", cameraDist:200}
const gearMesh:MeshSource = {objectPath:"/assets/gear/Gear.obj", texturePath:"/assets/gear/Gear_Texture.png", cameraDist:20}


const cockt1:Cocktail = new Cocktail("R2D2",testMesh);
const cockt2:Cocktail = new Cocktail("Gear", gearMesh);



const ScrollView: React.FC<ScrollViewProps> = ({ title }) => {
    
    const [cocktails, setCocktails] = useState<Cocktail[]>();

    const [rowObjs, setRowObjs] = useState<JSX.Element[]>();



    useEffect(() => {

        setCocktails(loader.getCocktails());

        console.log(cocktails);

        

        

    },[]);

    useEffect(() => {

        if(cocktails !== undefined){
            setRowObjs(generateRowObjList());
        }

    },[cocktails]);


    const generateRowObjList = ():JSX.Element[]  => {

        let cocktailList:Parter<Cocktail> = new Parter<Cocktail>(cocktails);

        cocktailList.finalize();

        let out:JSX.Element[] = [];

        while(true){
            
            if(!cocktailList.fillStatus){
                break;
            }
            console.log("Loading!");
            let resources:Cocktail[] = cocktailList.getPart(2)
        
            out.push(<ContainerRow left={resources[0]} right={resources[1]} />);

        }

        return out;
        
    }
    
    
    return (
        <div className="scrollViewMainDiv">
            <div className="scrollViewTitleDiv">
                <h1 className="scrollViewTitle">{title}</h1>
            </div>
            <div className="scrollViewContentPacket">
                <div className="scrollViewDesc">
                    <p className="scrollViewDescText">Alle auf der Maschine verfügbaren Cocktails</p>
                </div>
            {/* <ContainerRow  left={cockt1} right={cockt1}/>
            <ContainerRow  left={cockt1} right={cockt2}/> */}
            {rowObjs}
            
            </div>


        </div>
    );
}

export default ScrollView;