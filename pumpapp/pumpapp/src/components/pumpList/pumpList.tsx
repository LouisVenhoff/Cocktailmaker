import React, { MutableRefObject, useEffect, useRef, useState } from "react";
import "./pumpListStyle.css";
import PumpBtn from "../pumpBtn/pumpBtn";
import Socket from "../../classes/socket/socket";

type Command = {
    id: string
    key: string
    pumpNr: number
}

type LoginCommand = {
    id:string,
    key:string,
}

const PumpList: React.FC = () => {
    
    const [machineKey, setMachineKey] = useState<string>("");
    const [loaded, setLoaded] = useState<boolean>(false);
    const [socket, setSocket] = useState<Socket>(Socket.getInstance("ws://localhost:3014/ws", true, () => {login()}, () => {setLoaded(false)}, (payload:any) => {messageHandler(payload)}));
    


    useEffect(() => {
        if(machineKey !== undefined && machineKey !== "" && machineKey !== null)
        {
            setLoaded(true);
        }
        else
        {
            setLoaded(false);
        }
    },[machineKey]);



    
    const sendCommand = (pNr:number) => {
        let cmd:Command = {
            id: "",
            key: machineKey,
            pumpNr: pNr
        }

        socket.send(cmd);
    }

    const login = () => {
        console.log("Executed here!")
        let cmd:LoginCommand = {
            id:"",
            key:"",
        }
        socket.send(cmd);
    }

    const messageHandler = (payload:any) => {
        console.log(payload);
        if(payload.Key !== undefined)
        {
            setMachineKey(payload.Key);
        }
    }
    
    
    return (
        <div className="pumpListDiv">
            <PumpBtn isLoaded={loaded} pumpNr={1} onClick={sendCommand}></PumpBtn>
            <PumpBtn isLoaded={loaded} pumpNr={2} onClick={sendCommand}></PumpBtn>
            <PumpBtn isLoaded={loaded} pumpNr={3} onClick={sendCommand}></PumpBtn>
            <PumpBtn isLoaded={loaded} pumpNr={4} onClick={sendCommand}></PumpBtn>
            <PumpBtn isLoaded={loaded} pumpNr={5} onClick={sendCommand}></PumpBtn>
            <PumpBtn isLoaded={loaded} pumpNr={6} onClick={sendCommand}></PumpBtn>
            <PumpBtn isLoaded={loaded} pumpNr={7} onClick={sendCommand}></PumpBtn>
            <PumpBtn isLoaded={loaded} pumpNr={8} onClick={sendCommand}></PumpBtn>
        </div>
    )
}

export default PumpList;