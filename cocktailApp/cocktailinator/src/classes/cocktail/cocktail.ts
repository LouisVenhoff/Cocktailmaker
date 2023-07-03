import { MeshSource } from "../objRenderer/objRenderer";
import Socket from "../socket/socket";

export type Ingridient = {
    pumpKey:string,
    fluidAmount:number
}

class Cocktail{

    private _name:string;
    private _mesh:MeshSource;

    private _content:Ingridient[];

    private sendSocket:Socket = Socket.getInstance();

    constructor(name:string, mesh:MeshSource, content:Ingridient[])
    {
        this._name = name;
        this._mesh = mesh;
        this._content = content;
    }

    public get name():string{
        return this._name;
    }

    public get mesh():MeshSource{
        return this._mesh;
    }

    public get content():Ingridient[]{
        return this._content;
    }

    public static instantiate(json:string):Cocktail{
        
        let element:any = JSON.parse(json);
        
        return new Cocktail(element._name, element._mesh, element._content);
    }


    public make()
    {
        //TODO: Parse Ingridients Data to json and send through socket.send

        if(this._content.length === 0)
        {
            return;
        }
        let payload:string = JSON.stringify(this._content);

        let payloadObj = {
            id: "",
            key: "",
            payload: this._content
        }


        if(this.sendSocket.connectionState !== true)
        {
            throw("Socket not connected!");
        }

        this.sendSocket.send(payloadObj);

    }

}

export default Cocktail;