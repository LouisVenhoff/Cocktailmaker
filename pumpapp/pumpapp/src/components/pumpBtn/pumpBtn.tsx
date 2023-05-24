import React, { useEffect, useState } from "react";
import "./pumpBtnStyle.css";
import { Button, ButtonGroup } from '@chakra-ui/react'
import { Skeleton } from "@chakra-ui/react";


type PumpBtnProps = {
    isLoaded:boolean,
    pumpNr:number,
    onClick:(pump:number) => void
}


const PumpBtn: React.FC<PumpBtnProps> = ({isLoaded, pumpNr, onClick}) => {
    
    const [active, setActive] = useState<boolean>(isLoaded);
    const [desc, setDesc] = useState<string>("");
    
    useEffect(() => {

        setDesc(`Pumpe ${pumpNr}`);

    },[]);
    
    useEffect(() => {setActive(isLoaded)},[isLoaded]);
    


    const btnClickHandler = () => {
        onClick(pumpNr);
    }

    const btnReleaseHandler = () => {
        onClick(0);
    }



    
    return (
        <div className="pumpBtnDiv">
            <Skeleton height={"50px"} isLoaded={active}>

                <Button colorScheme="teal" size="lg" width={window.innerWidth - 50} onMouseDown={btnClickHandler} onMouseUp={btnReleaseHandler}>{desc}</Button>
               

            </Skeleton>
        </div>

    );
}

export default PumpBtn;