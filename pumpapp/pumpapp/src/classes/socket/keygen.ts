


class Keygen{

    public static generateKey(len:number):string
    {
        
        let outStr:string = "";
        
        
        for(let i = 0; i < len; i++){
            let asciiInt:number = Math.floor(Math.random() * (90-65) + 65);   
            outStr += String.fromCharCode(asciiInt)
        }

        return outStr;
    
    
    }

}



export default Keygen