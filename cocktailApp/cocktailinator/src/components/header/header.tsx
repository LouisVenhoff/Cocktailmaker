import React, { useEffect, useState } from "react";
import {ArrowBackIcon} from "@chakra-ui/icons";
import { motion } from "framer-motion"
import "./headerStyle.css";
import {useDispatch} from "react-redux";
import { switchPage } from "../../features/currentPage";
import { Page } from "../../classes/pageLogic/pages";
import ConnectionLamp from "../connectionLamp/connectionLamp";


type HeaderProps = {
    headline:string,
    backBtnActive:boolean,
    connected:boolean
}




const Header:React.FC<HeaderProps> = ({headline, backBtnActive, connected}) => 
{

    const [headerText, setHeaderText] = useState<string>(headline);
    const [backBtn, setBackBtn] = useState<boolean>(backBtnActive);
    const [backBtnDisplayStr, setBackBtnDisplayStr] = useState<string>("none"); 
   
    const dispatch = useDispatch();

    useEffect(() => {setHeaderText(headline)},[headline]);
    useEffect(() => {setBackBtn(backBtnActive)},[backBtnActive]);
    useEffect(() => {showHideBackBtn()},[backBtn]);


    const showHideBackBtn = () => {
        if(backBtn)
        {
            setBackBtnDisplayStr("");
        }
        else
        {
            setBackBtnDisplayStr("none");
        }
    }

    const backButtonClicked = () => {
        dispatch(switchPage(Page.SELECT_PAGE));
    }



    return(<div className="headerMainDiv">
        <ArrowBackIcon className="backBtnElement" boxSize={7} display={backBtnDisplayStr} onClick={backButtonClicked}/>
        <h2 className="headerText">{headerText}</h2>
        <ConnectionLamp connected={connected}/>
    </div>
    );
}

export default Header;