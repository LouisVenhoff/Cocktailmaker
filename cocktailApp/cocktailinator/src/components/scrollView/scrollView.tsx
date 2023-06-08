import React from "react";
import "./scrollViewStyle.css"
import CocktailContainer from "../cocktailContainer/cocktailContainer";
import ContainerRow from "../containerRow/containerRow";

type ScrollViewProps = {
    title: string
}


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
            <ContainerRow />
            <ContainerRow />
            
            </div>


        </div>
    );
}

export default ScrollView;