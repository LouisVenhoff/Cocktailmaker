import React, { useEffect, useState } from "react";
import {ArrowBackIcon} from "@chakra-ui/icons";
import { motion } from "framer-motion"
import "./headerStyle.css";
import PageLogic from "../../classes/pageLogic/pageLogic";
import { Page } from "../../classes/pageLogic/pages";

type HeaderProps = {
    headline:string
    backBtnActive:boolean
}




const Header:React.FC<HeaderProps> = ({headline, backBtnActive}) => 
{

    const [headerText, setHeaderText] = useState<string>(headline);
    const [backBtn, setBackBtn] = useState<boolean>(backBtnActive);
    const [backBtnDisplayStr, setBackBtnDisplayStr] = useState<string>("none"); 
   
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



    return(<div className="headerMainDiv">
        <ArrowBackIcon className="backBtnElement" boxSize={7} display={backBtnDisplayStr} onClick={() => {PageLogic.setPage(Page.SELECT_PAGE)}}/>
        <h2 className="headerText">{headerText}</h2>
    </div>
    );
}

export default Header;