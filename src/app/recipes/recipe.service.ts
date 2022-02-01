import { EventEmitter, Injectable } from "@angular/core";
import { Ingredient } from "../shared/ingredient.model";
import { ShoppingListService } from "../shopping-list/shoppinglist.service";
import { Recipe } from "./recipe.model";

@Injectable()
export class RecipeService{
  recipeSelected = new EventEmitter<Recipe>();
  private recipes: Recipe[] = [
    new Recipe("Test",
               "Test Description",
               "http://cdn.shopify.com/s/files/1/0572/5909/8282/articles/BBQ-Burger-Rezept-Burger-vom-Grill_nwm1yp_82e595d6-69ed-4094-8a06-95956e21c113.jpg?v=1630322701",
               [
                 new Ingredient("Toast", 2),
                 new Ingredient("Tomate", 3)
               ]),

    new Recipe("Test2",
               "Test2 Description",
               "http://cdn.shopify.com/s/files/1/0572/5909/8282/articles/BBQ-Burger-Rezept-Burger-vom-Grill_nwm1yp_82e595d6-69ed-4094-8a06-95956e21c113.jpg?v=1630322701",
               [
                new Ingredient("Brot", 2),
                new Ingredient("Ei", 6)
               ])

  ];

  constructor(private slService: ShoppingListService){}

  getRecipes(){
    return this.recipes.slice();
  }

  addIngredientsToList(ingredients: Ingredient[]){
    this.slService.addIngredients(ingredients);
  }
}
