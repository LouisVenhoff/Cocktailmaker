class Keygen{


    public static generateClientKey(length:number){

        let out:string = "";

        for(let i = 0; i < length; i++){
            out = out += Keygen.generateRandomChar();
        }

        return out;

    }



    private static generateRandomChar():string{

        //TODO: Add Random Char generation
        return "A"

    }




}

export default Keygen;