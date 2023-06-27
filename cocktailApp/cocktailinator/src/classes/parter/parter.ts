class Parter<T>{

    private list:T[]
    private finalized:boolean = false;
    private listLength:number;
    private isFilled = false;

    constructor(list?:T[]){
        if(list !== undefined){
            this.list = list;
            this.isFilled = true;
        }
        else{
            this.list = [];
        }

        this.listLength = this.list.length;
    }


    public add(param:T){
        
        if(!this.finalized){
            this.list.push(param);
            this.isFilled = true;
        }
    }

    public finalize(){
        this.finalized = true;
    }

    public getPart(sliceSize:number):T[]{
        
        let out:T[] = [];


        if(this.list.length == 1){
            
            let value:T = this.list.pop()!;
                this.cleanArr();
                return [value, undefined!]
        }


        for(let i = 0; i < sliceSize; i++){
            let value:T|undefined = this.list.pop();

            if(value !== undefined){
                out.push(value);
            }
        }

        this.cleanArr();


        return out;

    }

    public get fillStatus():boolean
    {
        if(this.list.length > 0)
        {
            this.isFilled = true;
        }
        else{
            this.isFilled = false;
        }

        return this.isFilled;
    }


    private cleanArr(){
        
        let tempArr = this.list.filter(this.checkValid);

        this.list = tempArr;

    }

    private checkValid(value:any):boolean{
        return value !== undefined
    }

    




}

export default Parter;