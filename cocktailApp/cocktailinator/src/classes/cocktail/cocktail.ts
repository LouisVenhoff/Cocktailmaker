import { MeshSource } from "../objRenderer/objRenderer";

export type Ingridient = {
    pumpKey:string,
    fluidAmount:number
}

class Cocktail{

    private name:string;
    private mesh:MeshSource;

    private content:Ingridient[];

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

    public make()
    {
        //TODO: Parse Ingridients Data to json and send through socket.send
    }

}

export default Cocktail;