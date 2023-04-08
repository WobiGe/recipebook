import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { Subject } from "rxjs";
import { Ingredient } from "../shared/ingredient.model";
import { Recipe } from "./recipe.model";
import * as ShoppingListActions from "./../shopping-list/store/shopping-list.actions";
import * as fromShopppingList from "./../shopping-list/store/shopping-list.reducer";

@Injectable()
export class RecipeService{

  recipesChanged = new Subject<Recipe[]>();

  private recipes: Recipe[] = [
    // new Recipe("Test",
    //            "Test Description",
    //            "https://cdn.pixabay.com/photo/2020/02/08/09/05/burger-4829526_1280.jpg",
    //            [
    //              new Ingredient("Toast", 2),
    //              new Ingredient("Tomate", 3)
    //            ]),

    // new Recipe("Test2",
    //            "Test2 Description",
    //            "https://images.lecker.de/,id=1a3d59af,b=lecker,w=610,cg=c.jpg",
    //            [
    //             new Ingredient("Brot", 2),
    //             new Ingredient("Ei", 6)
    //            ])

  ];

  constructor( private store: Store<fromShopppingList.AppState>){}

  getRecipes(){
    return this.recipes.slice();
  }

  getRecipe(index: number ){
    return this.recipes[index];
  }

  addIngredientsToList(ingredients: Ingredient[]){
    // this.slService.addIngredients(ingredients);
    this.store.dispatch(new ShoppingListActions.AddIngredients(ingredients));
  }

  addRecipe(recipe: Recipe){
    this.recipes.push(recipe);
    this.recipesChanged.next(this.recipes.slice());
  }

  updateRecipe(index: number, newrecipe: Recipe){
    this.recipes[index] = newrecipe;
    this.recipesChanged.next(this.recipes.slice());
  }

  updateRecipes(recipes: Recipe[]){
    this.recipes = recipes;
    this.recipesChanged.next(this.recipes.slice());
  }

  deleteRecipe(index: number){
    this.recipes.splice(index,1);
    this.recipesChanged.next(this.recipes.slice());
  }
}
