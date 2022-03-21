import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { Ingredient } from "../shared/ingredient.model";
import { ShoppingListService } from "../shopping-list/shoppinglist.service";
import { Recipe } from "./recipe.model";

@Injectable()
export class RecipeService{

  private recipes: Recipe[] = [
    new Recipe("Test",
               "Test Description",
               "https://cdn.pixabay.com/photo/2020/02/08/09/05/burger-4829526_1280.jpg",
               [
                 new Ingredient("Toast", 2),
                 new Ingredient("Tomate", 3)
               ]),

    new Recipe("Test2",
               "Test2 Description",
               "https://images.lecker.de/,id=1a3d59af,b=lecker,w=610,cg=c.jpg",
               [
                new Ingredient("Brot", 2),
                new Ingredient("Ei", 6)
               ])

  ];

  constructor(private slService: ShoppingListService){}

  getRecipes(){
    return this.recipes.slice();
  }

  getRecipe(index: number ){
    return this.recipes[index];
  }

  addIngredientsToList(ingredients: Ingredient[]){
    this.slService.addIngredients(ingredients);
  }
}
