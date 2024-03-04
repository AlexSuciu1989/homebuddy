import { getCookie } from "../cookies/cookies.js";

export const newIngredientLine = () => {
  const addNewLine = document.querySelector(".add-new-line");

  addNewLine.addEventListener("click", () => {
    const newLine = document.createElement("div");
    newLine.className = "new-recipe-ingredient input-group p-3";
    newLine.innerHTML =
      "<input type='text' class='new-recipe-ingredient-name form-control form-control-sm' /> <input type='number' class='new-recipe-ingredient-quantity form-control form-control-sm'/><select class='new-recipe-select form-select m-auto w-25'><option value='g'>g</option><option value='pcs'>pcs</option><option value='ml'>ml</option><option value='tblSpn'>tblSpn</option></select>";

    document.querySelector(".new-recipe-ingredients").appendChild(newLine);
  });
};

export const saveIngredients = async () => {
  const saveBtn = document.querySelector(".form-button-save");

  saveBtn.addEventListener("click", async () => {
    const ingredients = document.querySelectorAll(".new-recipe-ingredient");

    const ingredientsArray = [];

    ingredients.forEach((ingredient) => {
      const ingredientObject = {
        recipe: document.querySelector(".form-title").value,
        name: ingredient.querySelector(".new-recipe-ingredient-name").value,
        quantity: ingredient.querySelector(".new-recipe-ingredient-quantity")
          .value,
        unit: ingredient.querySelector(".new-recipe-select").value,
        username: getCookie("username"),
      };

      ingredientsArray.push(ingredientObject);
    });

    console.log(ingredientsArray);
    try {
      const response = await fetch(
        "https://homebuddy.ro/php/food-ingredients-to-sql.php",
        {
          method: "POST",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify(ingredientsArray),
        }
      );

      if (response.ok) {
        console.log(await response.text());
      } else {
        console.error("Failed to submit data");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  });
};

export const getIngredients = async () => {
  const loggedUser = getCookie("username");

  let myingredients;
  let responseData;

  fetch(
    "https://homebuddy.ro/php/food-ingredients-from-sql.php?loggedUser=" +
      encodeURIComponent(loggedUser)
  )
    .then((response) => response.json())
    .then((ingredients) => {
      myingredients = ingredients;
    });

  try {
    const weeknumber = document.querySelector(".weekno").innerHTML.trim();

    const response = await fetch(
      "https://homebuddy.ro/php/food-buddy-weekmenu-from-sql.php?loggedUser=" +
        encodeURIComponent(loggedUser),
      {
        method: "POST",
        headers: {
          "Content-type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
          weeknumber: encodeURIComponent(weeknumber),
        }),
      }
    );

    if (response.ok) {
      responseData = await response.json();
    } else {
      console.error("Failed to submit data");
    }
  } catch (error) {
    console.error("Error:", error);
  }

  // console.log(myingredients);
  // console.log(responseData);
  const weeklyRecipesArray = [];
  const weekdays = ["mon", "tue", "wed", "thu", "fri", "sat", "sun"];

  weekdays.forEach((weekday) => {
    const weeklyRecipesItem = responseData[0][weekday];

    if (weeklyRecipesItem.includes(",")) {
      const splitRecipes = weeklyRecipesItem.split(",");
      splitRecipes.forEach((recipe) => {
        if (recipe.trim() !== "") {
          weeklyRecipesArray.push(recipe.trim());
        }
      });
    } else {
      if (weeklyRecipesItem.trim() !== "") {
        weeklyRecipesArray.push(weeklyRecipesItem.trim());
      }
    }
  });

  // console.log(weeklyRecipesArray);
  // console.log(myingredients);

  const recipeIngredientsMap = {};

  // Iterate over the weeklyRecipesArray to populate the recipeIngredientsMap
  weeklyRecipesArray.forEach((recipe) => {
    const ingredientsForRecipe = myingredients.filter(
      (item) => item.reteta === recipe
    );
    recipeIngredientsMap[recipe] = ingredientsForRecipe;
  });
  // Create an object to store the sum of quantities for each distinct combination of numeingredient and unitateingredient
  const ingredientSumMap = {};

  // Iterate over each recipe in recipeIngredientsMap
  for (const recipe in recipeIngredientsMap) {
    // Get the ingredients array for the current recipe
    const ingredients = recipeIngredientsMap[recipe];

    // Iterate over each ingredient in the ingredients array
    for (const ingredient of ingredients) {
      // Create a key using the combination of numeingredient and unitateingredient
      const key = `${ingredient.numeingredient} (${ingredient.unitateingredient})`;

      // If the key doesn't exist in the ingredientSumMap, initialize it with the current quantity
      if (!ingredientSumMap[key]) {
        ingredientSumMap[key] = parseFloat(ingredient.cantitateingredient);
      } else {
        // If the key already exists, add the current quantity to the existing sum
        ingredientSumMap[key] += parseFloat(ingredient.cantitateingredient);
      }
    }
  }

  // Output the sum for each distinct combination of numeingredient and unitateingredient
  for (const key in ingredientSumMap) {
    console.log(`${key}: ${ingredientSumMap[key]}`);
  }
  console.log(ingredientSumMap);
};
