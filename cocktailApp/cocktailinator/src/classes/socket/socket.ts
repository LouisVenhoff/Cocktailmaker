//Websocket single connection implementation by Louis Venhoff



import Keygen from "./keygen";

class Socket 
{
    private addr:string;
    private connected:boolean = false;
    
    private socketInst:WebSocket | null = null;

    private deviceId:string;
    private machineKey:string = "";



    private onConnect:() => void;
    private onDisconnect: () => void;
    private onMessage: (payload:any) => void;

    private static instance:Socket | null = null;

    public static getInstance(addr?:string, autoConnect?:boolean, onConnect?:() => void, onDisconnect?:() => void, onMessage?: (payload:any) => void):Socket{

        if(Socket.instance !== null){
            return Socket.instance;
        }
        else{
           
                if(addr !== undefined && autoConnect !== undefined && onConnect !== undefined && onDisconnect !== undefined && onMessage !== undefined)
                {
                    Socket.instance = new Socket(addr, autoConnect, onConnect, onDisconnect, onMessage);
                    return Socket.instance;
                }  
                else{
                    throw("Socket Props error");
                }
        }

    }



    private constructor(addr:string, autoConnect:boolean, onConnect:() => void, onDisconnect:() => void, onMessage: (payload:any) => void)
    {
        this.addr = addr;
        this.onConnect = onConnect;
        this.onDisconnect = onDisconnect;
        this.onMessage = onMessage;
        this.deviceId = Keygen.generateKey(3);

        if(autoConnect)
        {
            this.connect();
        }
    }


    public connect()
    {
        console.log("Connect function executed!");
        this.socketInst = new WebSocket(`${this.addr}`);
        this.addListeners();

    }

   
    public send(payload:any){

        payload.id = this.deviceId;
        payload.key = this.machineKey;
        let payloadStr = JSON.stringify(payload);
        
        if(this.socketInst !== null)
        {
            this.socketInst.send(payloadStr);
        }
        else
        {
            throw("Error: Check socket connection!");
        }
    }


    public get connectionState():boolean{
        return this.connected;
    }


    private addListeners()
    {
        
        if(this.socketInst === null)
        {
            return;
        }
        
        this.socketInst.addEventListener("open", () => {
            if(this.connected === false){
                this.connected = true;
                this.onConnect();
            }
           
        });

        this.socketInst.addEventListener("close", () => {
            this.connected = false;
            Socket.instance = null;
            this.onDisconnect();
        });

        this.socketInst.addEventListener("message", (payload:any) => {
            let rawMsg:string = payload.data;
            let parsedMsg:any = JSON.parse(rawMsg);

            if(this.verifyMsgObj(parsedMsg))
            {
                if(parsedMsg.Key != undefined){
                    this.machineKey = parsedMsg.Key;
                }
                
                this.onMessage(parsedMsg);
            }

        })

        this.socketInst.addEventListener("error", (err:any) => {
            this.socketInst = null;
            this.connect();
        });
    }


    private verifyMsgObj(obj:any):boolean
    {
        
        try
        {
            if(obj.id !== this.deviceId){
                return true
            }
            else{
                return false;
            }
        }
        catch
        {
            window.alert("Wrong answer format");
            return false;
        }
        
    }

    //TODO: Add static function for convertig payload to server format 
    //@param: payload obj
    //@return: obj with id, key and payload field

}

export default Socket;