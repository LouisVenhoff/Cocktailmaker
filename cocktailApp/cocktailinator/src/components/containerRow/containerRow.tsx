import React from "react";
import "./containerRowStyle.css";
import CocktailContainer from "../cocktailContainer/cocktailContainer";

const ContainerRow:React.FC = () =>
{
    return(
    <div className="containerRowMainDiv">
        <CocktailContainer />
        <CocktailContainer />
    </div>
    )
}

export default ContainerRow;