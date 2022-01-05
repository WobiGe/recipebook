import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {
  @Output() recipeWasSelected =  new EventEmitter<Recipe>();
  recipes: Recipe[] = [
    new Recipe("Test", "Test Description", "http://cdn.shopify.com/s/files/1/0572/5909/8282/articles/BBQ-Burger-Rezept-Burger-vom-Grill_nwm1yp_82e595d6-69ed-4094-8a06-95956e21c113.jpg?v=1630322701"),
    new Recipe("Test2", "Test2 Description", "http://cdn.shopify.com/s/files/1/0572/5909/8282/articles/BBQ-Burger-Rezept-Burger-vom-Grill_nwm1yp_82e595d6-69ed-4094-8a06-95956e21c113.jpg?v=1630322701")

  ];
  constructor() { }

  ngOnInit(): void {
  }

  onRecipeSelected(recipe: Recipe){
    this.recipeWasSelected.emit(recipe);
  }

}
