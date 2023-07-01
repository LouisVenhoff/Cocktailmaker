import React, { useEffect, useState } from "react";
import { Page } from "../../classes/pageLogic/pages";
import ScrollView from "../scrollView/scrollView";
import "./pageProviderStyle.css";
import PageLogic from "../../classes/pageLogic/pageLogic";

const PageProvider:any = () =>  {

    const [activePage, setActivePage] = useState<JSX.Element>();

    useEffect(() => {

        setActivePage(<ScrollView title="CocktailKarte"/>);

    },[]);

    useEffect(() => {console.log("Got Here!")},[PageLogic.activePage]);

    
    const renderPage = () => {
        switch(PageLogic.activePage){
            case Page.ORDER_PAGE:
                setActivePage(<ScrollView title="Verfügbare Cocktails"/>);
                break;
            case Page.SELECT_PAGE:
                setActivePage(<div></div>);
                break;
        }
    }





    return(<div id="pageProviderDiv">{activePage}</div>);
}

export default PageProvider;