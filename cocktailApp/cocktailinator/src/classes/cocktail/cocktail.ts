import { MeshSource } from "../objRenderer/objRenderer";

class Cocktail{

    private name:string;
    private mesh:MeshSource;

    constructor(name:string, mesh:MeshSource)
    {
        this.name = name;
        this.mesh = mesh;
    }

    public getName():string
    {
        return this.name;
    }

    public getMesh():MeshSource{
        return this.mesh;
    }

}

export default Cocktail;