import { Action } from "@ngrx/store";
import { Ingredient } from "src/app/shared/ingredient.model";

//define action name
export const ADD_INGREDIENT = 'ADD_INGREDIENT';

//describe action
export class AddIngredient implements Action {
  readonly type = ADD_INGREDIENT;
  payload: Ingredient;
}
