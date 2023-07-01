import { MeshSource } from "../objRenderer/objRenderer";
import Socket from "../socket/socket";

export type Ingridient = {
    pumpKey:string,
    fluidAmount:number
}

class Cocktail{

    private name:string;
    private mesh:MeshSource;

    private content:Ingridient[];

    private sendSocket:Socket = Socket.getInstance();

    constructor(name:string, mesh:MeshSource, content:Ingridient[])
    {
        this.name = name;
        this.mesh = mesh;
        this.content = content;
    }

    public getName():string
    {
        return this.name;
    }

    public getMesh():MeshSource{
        return this.mesh;
    }

    public getContent():Ingridient[]{
        return this.content;
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