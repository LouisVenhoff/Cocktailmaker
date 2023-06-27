import Cocktail from "../cocktail/cocktail";
import cocktails from "../../settings/cocktails.json";


class CocktailLoader{

   public static getCocktails():Cocktail[]{

         let cocktailList:Cocktail[] = [];
      
        for(let i = 0; i < cocktails.length; i++){
            cocktailList.push(new Cocktail(cocktails[i].name, cocktails[i].mesh))
        }

        return cocktailList;

   }

}

export default CocktailLoader;