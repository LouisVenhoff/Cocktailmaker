import Keygen from "../helpers/keygen";


type LoginObj= {
    id:string;
    key:string;
}



class Socket{


    private addr:string;
    private port:number;

    private conn:any;


    private clientID:string = "";
    private machineKey:string = "";


    constructor(addr:string, port:number){
        this.addr = addr;
        this.port = port;

        this.clientID = Keygen.generateClientKey(3);

        
    }

    public async connect(){
        //TODO: Connect and asuthenticate to the Server

        try{
            this.conn = new WebSocket(this.addr);
        }
        catch{
            throw `Error while connecting to: ${this.addr}`
        }
    
        await this.authenticate();
    }

    private async authenticate():Promise<string>{

            //TODO: Authenticate on server and return promise with machine Id
            
            let loginData:LoginObj = {
                id:this.clientID,
                key:""
            }
            
            
            this.conn.send(JSON.stringify(loginData));
            
            
            
            
            return new Promise<string>((resolve, reject) => {

            });


    }





}

export default Socket;