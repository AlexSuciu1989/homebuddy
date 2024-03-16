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

export const saveIngredients = async (saveBtn) => {
  saveBtn.addEventListener("click", async () => {
    const ingredients = document.querySelectorAll(".new-recipe-ingredient");
    let ingredientsArray = [];

    ingredients.forEach((ingredient) => {
      const ingredientObject = {
        recipe: document.querySelector(".form-title").value,
        name: ingredient.querySelector(".new-recipe-ingredient-name").value,
        quantity: ingredient.querySelector(".new-recipe-ingredient-quantity")
          .value,
        unit: ingredient.querySelector(".new-recipe-select").value,
        username: getCookie("username"),
      };

      if (ingredientObject.name !== "") {
        ingredientsArray.push(ingredientObject);
      }
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

  try {
    // Fetch ingredients data
    const response = await fetch(
      "https://homebuddy.ro/php/food-ingredients-from-sql.php?loggedUser=" +
        encodeURIComponent(loggedUser)
    );

    if (!response.ok) {
      throw new Error("Failed to fetch ingredient data");
    }

    const ingredients = await response.json();

    console.log(ingredients);
    // Fetch week menu data
    const weeknumber = document.querySelector(".weekno").innerHTML.trim();
    const weekMenuResponse = await fetch(
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

    if (!weekMenuResponse.ok) {
      throw new Error("Failed to fetch week menu data");
    }

    const weekMenuData = await weekMenuResponse.json();

    // Process ingredients and week menu data
    const myingredients = ingredients;
    const weeklyRecipesArray = [];
    const weekdays = ["mon", "tue", "wed", "thu", "fri", "sat", "sun"];

    weekdays.forEach((weekday) => {
      const weeklyRecipesItem = weekMenuData[0][weekday];

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
    const ingredientSumMap = {};
    let ingredientsForIndividualRecipes = [];
    weeklyRecipesArray.forEach((recipe) => {
      const ingredientsForRecipe = myingredients.filter(
        (item) => item.reteta === recipe
      );
      ingredientsForIndividualRecipes.push(...ingredientsForRecipe);
      ingredientsForRecipe.forEach((ingredient) => {
        const key = `${ingredient.numeingredient} (${ingredient.unitateingredient})`;
        if (!ingredientSumMap[key]) {
          ingredientSumMap[key] = parseFloat(ingredient.cantitateingredient);
        } else {
          ingredientSumMap[key] += parseFloat(ingredient.cantitateingredient);
        }
      });
    });

    const uniqueIngredients = removeDuplicates(ingredientsForIndividualRecipes);
    // for (const key in ingredientSumMap) {
    //   console.log(`${key}: ${ingredientSumMap[key]}`);
    // }
    console.log(uniqueIngredients);
    document.querySelector(".recipes-ingredients-summary").innerHTML = "";

    let groupedIngredients = {};
    uniqueIngredients.forEach((ingredient) => {
      if (!groupedIngredients[ingredient.reteta]) {
        groupedIngredients[ingredient.reteta] = [];
      }
      groupedIngredients[ingredient.reteta].push({
        numeingredient: ingredient.numeingredient,
        cantitateingredient: ingredient.cantitateingredient,
        unitateingredient: ingredient.unitateingredient,
      });
    });

    for (let reteta in groupedIngredients) {
      let ingredientRecipe = document.createElement("div");
      ingredientRecipe.className = "card m-2 col-md-5 col-lg-4 col-xl-3 p-3 ";
      ingredientRecipe.innerHTML = `<h5 class="card-title text-primary">${reteta}</h5><hr>`;
      groupedIngredients[reteta].forEach((ingredient) => {
        let div = document.createElement("div");
        div.className = "ps-2 text-muted";
        div.innerHTML = `${ingredient.numeingredient}: ${ingredient.cantitateingredient} ${ingredient.unitateingredient}`;
        ingredientRecipe.appendChild(div);
      });
      document
        .querySelector(".recipes-ingredients-summary")
        .appendChild(ingredientRecipe);
    }

    console.log(ingredientSumMap);
    document.querySelector(".ingredient-list").innerHTML = "";
    for (const ingredient in ingredientSumMap) {
      const quantity = ingredientSumMap[ingredient];

      const ingredientContainer = document.createElement("li");
      ingredientContainer.className = "list-group-item bg-secondary text-white";
      ingredientContainer.textContent = `${ingredient}: ${quantity}`;

      document
        .querySelector(".ingredient-list")
        .appendChild(ingredientContainer);
    }
    return ingredients;
  } catch (error) {
    console.error("Error:", error);
    document.querySelector(".ingredient-list").innerHTML = "";
  }
};

function removeDuplicates(array) {
  let unique = {};
  array.forEach((item) => {
    let key = item.reteta + item.numeingredient;
    if (!unique[key]) {
      unique[key] = item;
    }
  });
  return Object.values(unique);
}

const fetchIngredients = async () => {
  const loggedUser = getCookie("username");

  try {
    const response = await fetch(
      "https://homebuddy.ro/php/food-ingredients-from-sql.php?loggedUser=" +
        encodeURIComponent(loggedUser)
    );

    if (!response.ok) {
      throw new Error("Failed to fetch ingredient data");
    }

    const ingredients = await response.json();

    return ingredients;
  } catch (error) {
    console.error("Error:", error);
  }
};

export const addIngredientsToViewRecipe = async (formTitle) => {
  const ingredients = await fetchIngredients();

  const filteredIngredients = ingredients.filter(
    (ingredient) => ingredient.reteta === formTitle
  );

  console.log(filteredIngredients);
  return filteredIngredients;
};

export const updateIngredients = async () => {
  const loggedUser = getCookie("username");

  const ingredientContainer = document.querySelectorAll(
    ".recipe-ingredient-view"
  );
  const ingredientsToBeUpdated = [];
  ingredientContainer.forEach((ingredientLine) => {
    const updateObject = {
      recipeTitle: document.querySelector(".form-title").value,
      ingredientID: ingredientLine.querySelector(".ingredient-id").textContent,
      ingredientName: ingredientLine.querySelector(".recipe-ingredient-name")
        .value,
      ingredientQuantity: ingredientLine.querySelector(
        ".recipe-ingredient-quantity"
      ).value,
      ingredientUnit: ingredientLine.querySelector(".recipe-ingredient-unit")
        .value,
      username: loggedUser,
    };
    ingredientsToBeUpdated.push(updateObject);
  });

  try {
    const response = await fetch(
      "https://homebuddy.ro/php/food-ingredients-update-sql.php",
      {
        method: "UPDATE",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(ingredientsToBeUpdated),
      }
    );
    if (response.ok) {
      console.log(await response.text());
    } else {
      console.error("Failed to update ingredients");
    }
  } catch (error) {
    console.error("Error:", error);
  }
};

export const deleteIngredient = () => {
  const deleteButtons = document.querySelectorAll(".ingredient-close-button");
  deleteButtons.forEach((deleteButton) => {
    deleteButton.addEventListener("click", async () => {
      console.log("button clicked");
      const ingredientID = deleteButton.parentElement.firstChild.textContent;
      console.log(ingredientID);
      try {
        const response = await fetch(
          "https://homebuddy.ro/php/food-ingredients-delete-sql.php",
          {
            method: "DELETE",
            headers: {
              "Content-type": "application/json",
            },
            body: JSON.stringify(ingredientID),
          }
        );

        if (response.ok) {
          console.log(await response.text());

          deleteButton.parentElement.remove();
        } else {
          console.error("Failed to delete ingredient");
        }
      } catch (error) {
        console.error("Error:", error);
      }
    });
  });
};
