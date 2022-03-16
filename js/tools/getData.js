import recipes from "../../data/recipes.js";
import { notFoundedMessage } from "../template/Error-message.js";
/* 
  ┌─────────────────────────────────────────────────────────────────────────┐
  │ TO INIT                                                                 │
  └─────────────────────────────────────────────────────────────────────────┘
 */

/**
 * 
 * @param {*} data form recipes.js
 * @returns items list
 */

//INGREDIENTS
export function initIngredientsList(data){
  const allIngredients = new Array;

  for(let i = 0; i < data.length; i++){
    const ingredientsList = data[i].ingredients;
    ingredientsList.forEach(ingredient => {
      const ingredientName = ingredient.ingredient;
      allIngredients.push(ingredientName.toLowerCase());
    });
  }

  const allIngredientsNoDuplicates = new Set(allIngredients);
  return allIngredientsNoDuplicates;
}

//APPLIANCES
export function initAppliancesList(data){
  const allAppliances = new Array;

  data.forEach( recipe => {
    const applianceName = recipe.appliance;
    allAppliances.push(applianceName.toLowerCase());
  })

  const applicancesNoDuplicates = new Set(allAppliances);
  return applicancesNoDuplicates;
}

//USTENSILS
export function initUtensilsList(data){
  const allUstensils = new Array;

  data.forEach(recipe => {
    for(const ustensil of recipe.ustensils){
      allUstensils.push(ustensil.toLowerCase());
    }
  })

  const ustensilsNoDuplicates = new Set(allUstensils);
  return ustensilsNoDuplicates;
}

export function dataSwitcher(param,data){
  let dataType;
  switch (param) {
    case 'appliances':
      dataType = initAppliancesList(data);
      break;
    case 'ingredients':
      dataType = initIngredientsList(data);
      break;
    case 'utensils':
    dataType = initUtensilsList(data);
      break;
  
    default:
      break;
  }
  return dataType;
}


/* 
  ┌─────────────────────────────────────────────────────────────────────────┐
  │ TO MATCH                                                                │
  └─────────────────────────────────────────────────────────────────────────┘
 */

//DIPSLAY CARD
/**
 * @param {DOM element} container 
 * @param {*} data form recipes.js
 */
// export function displayRecipeCard(container,data){
//   const Template = new RecipeCard(data);
// 	container.appendChild(Template.createRecipeCard());
// }
export function displayRecipeCard(container,data){
  for(const recipe of data){
    const Template = new RecipeCard(recipe);
    container.appendChild(Template.createRecipeCard());
  }
}


// INGREDIENTS--INPUT
export const ingredientsWithInput = (recipe, entry, tempArray) => {
  // RECIPES INGREDIENTS LOOP
  for(const recipeIngredients of recipe.ingredients){
    //INGREDIENTS LIST LOOP
    for (const key in recipeIngredients) {
      //INGREDIENTS MATCH test
      if(key === 'ingredient' && recipeIngredients[key].toLowerCase().includes(entry)){
        notFoundedMessage.classList.add('hidden');
        tempArray.push(recipe);
      }
    }
  }
}

// APPLIANCES--TAG
export const appliancesWithTag = (recipes, tagName, cardDestination) => {
  for (const recipe of recipes) {

    if(recipe.appliance.toLocaleLowerCase() === tagName){
      console.log(`MATCH - appliance ${recipe.appliance.toLocaleLowerCase()} - ${tagName}`);
      displayRecipeCard(cardDestination,recipe);
    }
  }
}

//UTENSILS--TAG
export const utensilsWithTag = (recipes, tagName, cardDestination) => {
  for (const recipe of recipes) {
    for(const ustensil of recipe.ustensils){
      if(ustensil.toLocaleLowerCase() === tagName){
        console.log(`MATCH - appliance ${ustensil.toLocaleLowerCase()} - ${tagName}`);
        displayRecipeCard(cardDestination,recipe);
      }
    }
  }
}

/* 
  ┌─────────────────────────────────────────────────────────────────────────┐
  │ CATCH RECIPE INFO                                                       │
  └─────────────────────────────────────────────────────────────────────────┘
 */

/**
 * 
 * @param {data} recipe 
 * @param {data's property} appliances 
 * @param {data's property} ingredients 
 * @param {data's property} utensils 
 */
export const catchRecipeInfo = (recipe, appliances, ingredients, utensils) => {
  //ingredients
  for(const ingredient of recipe.ingredients){
    ingredients.push(ingredient.ingredient.toLocaleLowerCase());
  }

  //appliances
  appliances.push(recipe.appliance.toLocaleLowerCase());

  //utensils
  for(const utensil of recipe.ustensils){
    utensils.push(utensil.toLocaleLowerCase());
  }
}

/**
 * 
 * @param {*} array 
 * @returns Array without element duplicates
 */
export const withoutDuplicates = (array) => {
  let tempArray = new Array;
  tempArray = [...array];
  return [...new Set(tempArray)];
}