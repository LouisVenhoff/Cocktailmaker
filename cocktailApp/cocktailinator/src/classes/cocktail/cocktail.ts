import { MeshSource } from "../objRenderer/objRenderer";
import Socket from "../socket/socket";

export type Ingridient = {
    pumpKey:string,
    fluidAmount:number
}

class Cocktail{

    public name:string;
    public mesh:MeshSource;

    public content:Ingridient[];

    private sendSocket:Socket = Socket.getInstance();

    constructor(name:string, mesh:MeshSource, content:Ingridient[])
    {
        this.name = name;
        this.mesh = mesh;
        this.content = content;
    }

    public make()
    {
        //TODO: Parse Ingridients Data to json and send through socket.send

        if(this.content.length === 0)
        {
            return;
        }
        let payload:string = JSON.stringify(this.content);

        if(this.sendSocket.connectionState !== true)
        {
            throw("Socket not connected!");
        }

        this.sendSocket.send(payload);

    }

}

export default Cocktail;